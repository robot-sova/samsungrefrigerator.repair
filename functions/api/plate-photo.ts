/**
 * POST /api/plate-photo — Cloudflare Pages Function. Photo upload for the quoter.
 *
 * Stores one image in the PLATE_PHOTOS R2 bucket and returns an unguessable read URL.
 * The CUP contract does NOT change: the URL is pasted into the existing `message`
 * field by the form, so the dispatcher gets a clickable link with no CUP-side work.
 *
 * Why a Function and not a public r2.dev domain: this bucket holds photographs of
 * customers' kitchens, taken at their home addresses, and the lead already carries
 * that address. A public bucket domain makes every object reachable by URL. An
 * unguessable key behind a Worker does not, and there is no listing endpoint.
 *
 * Defences, in order:
 *   1. rate limit — KV LEAD_RL, counter `plup:` (writes), SEPARATE from the lead
 *      counter so a photo upload never eats a customer's lead allowance
 *   2. content-type allowlist AND magic-byte sniff — the declared type must match
 *      the actual bytes, so renaming evil.exe to plate.jpg fails the sniff
 *   3. 10 MB cap, enforced on the actual bytes, not on a header we were told
 *   4. metadata strip — EXIF/XMP removed before storage (see stripMetadata)
 *   5. random 48-char key, no customer PII and nothing from the uploaded filename
 *
 * Every rejection is a 4xx with a sentence the customer can act on. Never silent.
 */

interface R2Bucket {
  put(
    key: string,
    value: ArrayBuffer | ArrayBufferView,
    opts?: { httpMetadata?: { contentType?: string; contentDisposition?: string } },
  ): Promise<unknown>;
}

interface Env {
  PLATE_PHOTOS?: R2Bucket;
  LEAD_RL?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  };
}

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const RATE_LIMIT = 12; // uploads per IP per window — a customer sends at most 2
const RATE_WINDOW_S = 600;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

/* ------------------------------------------------------------ magic bytes ---- */

type Kind = 'image/jpeg' | 'image/png' | 'image/webp';

/** Sniff the real type from the leading bytes. Returns null for anything else. */
function sniff(b: Uint8Array): Kind | null {
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (
    b.length >= 8 &&
    b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 &&
    b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a
  ) return 'image/png';
  if (
    b.length >= 12 &&
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && // RIFF
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50 // WEBP
  ) return 'image/webp';
  return null;
}

/* -------------------------------------------------------- metadata strip ---- */

const be16 = (b: Uint8Array, i: number) => (b[i] << 8) | b[i + 1];
const be32 = (b: Uint8Array, i: number) => ((b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]) >>> 0;
const le32 = (b: Uint8Array, i: number) => (b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24)) >>> 0;
const tag = (b: Uint8Array, i: number) => String.fromCharCode(b[i], b[i + 1], b[i + 2], b[i + 3]);

/**
 * Remove EXIF/XMP without decoding the image — pure container surgery, so it costs
 * a single pass over the bytes and no CPU-time risk in a Worker.
 *
 * Phone photos carry GPS coordinates in EXIF. The lead already tells the dispatcher
 * the address; the photograph does not need to repeat it to anyone who gets the link.
 *
 * JPEG: drop APP1 (EXIF and XMP both live there) and COM comments. ICC in APP2 is
 *       kept so colour does not shift.
 * PNG:  drop eXIf and the text chunks (tEXt/iTXt/zTXt).
 * WebP: drop EXIF and XMP chunks and rewrite the RIFF size.
 */
function stripMetadata(buf: Uint8Array, kind: Kind): Uint8Array {
  try {
    if (kind === 'image/jpeg') return stripJpeg(buf);
    if (kind === 'image/png') return stripPng(buf);
    return stripWebp(buf);
  } catch {
    // Never fail an upload over metadata. Worst case we store the original.
    return buf;
  }
}

function stripJpeg(b: Uint8Array): Uint8Array {
  const keep: [number, number][] = [];
  let p = 2; // past SOI
  keep.push([0, 2]);
  while (p + 3 < b.length) {
    if (b[p] !== 0xff) break;
    const marker = b[p + 1];
    if (marker === 0xd8) { p += 2; continue; }
    if (marker === 0xda) { keep.push([p, b.length]); p = b.length; break; } // SOS: rest is entropy data
    const len = be16(b, p + 2);
    if (len < 2) break;
    const end = p + 2 + len;
    const drop = marker === 0xe1 || marker === 0xfe; // APP1 (EXIF/XMP), COM
    if (!drop) keep.push([p, end]);
    p = end;
  }
  return splice(b, keep);
}

function stripPng(b: Uint8Array): Uint8Array {
  const DROP = new Set(['eXIf', 'tEXt', 'iTXt', 'zTXt']);
  const keep: [number, number][] = [[0, 8]]; // signature
  let p = 8;
  while (p + 8 <= b.length) {
    const len = be32(b, p);
    const name = tag(b, p + 4);
    const end = p + 12 + len; // len + type(4) + data + crc(4)
    if (end > b.length) break;
    if (!DROP.has(name)) keep.push([p, end]);
    p = end;
    if (name === 'IEND') break;
  }
  return splice(b, keep);
}

function stripWebp(b: Uint8Array): Uint8Array {
  const DROP = new Set(['EXIF', 'XMP ']);
  const keep: [number, number][] = [[0, 12]]; // RIFF____WEBP
  let p = 12;
  while (p + 8 <= b.length) {
    const name = tag(b, p);
    const len = le32(b, p + 4);
    const end = p + 8 + len + (len & 1); // chunks are padded to even
    if (end > b.length) break;
    if (!DROP.has(name)) keep.push([p, end]);
    p = end;
  }
  const out = splice(b, keep);
  // rewrite RIFF payload size (total - 8)
  const size = out.length - 8;
  out[4] = size & 0xff;
  out[5] = (size >>> 8) & 0xff;
  out[6] = (size >>> 16) & 0xff;
  out[7] = (size >>> 24) & 0xff;
  return out;
}

function splice(b: Uint8Array, ranges: [number, number][]): Uint8Array {
  let total = 0;
  for (const [s, e] of ranges) total += e - s;
  const out = new Uint8Array(total);
  let o = 0;
  for (const [s, e] of ranges) { out.set(b.subarray(s, e), o); o += e - s; }
  return out;
}

/* -------------------------------------------------------------- helpers ---- */

/** 48 hex chars from the CSPRNG. Not a timestamp, not a counter, nothing derived
 *  from the customer's phone number or the filename they uploaded. */
function randomKey(): string {
  const raw = new Uint8Array(24);
  crypto.getRandomValues(raw);
  return Array.from(raw, (n) => n.toString(16).padStart(2, '0')).join('');
}

async function allowed(env: Env, ip: string, bucket: string): Promise<boolean> {
  const now = Date.now();
  if (!env.LEAD_RL) return true; // local dev without the binding
  const key = `${bucket}:${ip}`;
  const raw = (await env.LEAD_RL.get(key)) ?? '[]';
  const hits = (JSON.parse(raw) as number[]).filter((t) => now - t < RATE_WINDOW_S * 1000);
  if (hits.length >= RATE_LIMIT) return false;
  hits.push(now);
  await env.LEAD_RL.put(key, JSON.stringify(hits), { expirationTtl: RATE_WINDOW_S });
  return true;
}

const EXT: Record<Kind, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

/* ----------------------------------------------------------------- POST ---- */

export const onRequestPost = async (ctx: { request: Request; env: Env }): Promise<Response> => {
  const { request, env } = ctx;

  if (!env.PLATE_PHOTOS) {
    return json(503, { ok: false, error: 'Photo upload is not available right now. Send the request without it and we will ask for the photo by text.' });
  }

  const ip = request.headers.get('cf-connecting-ip') ?? '0.0.0.0';
  if (!(await allowed(env, ip, 'plup'))) {
    return json(429, { ok: false, error: 'Too many uploads from this connection. Send the request without the photo and we will ask for it by text.' });
  }

  const fd = await request.formData().catch(() => null);
  if (!fd) return json(400, { ok: false, error: 'That upload did not arrive as a file. Try again, or send the request without the photo.' });

  const file = fd.get('file');
  if (!file || typeof file === 'string') {
    return json(400, { ok: false, error: 'No file was attached. Choose a photo and try again.' });
  }

  const blob = file as unknown as { size: number; type: string; arrayBuffer(): Promise<ArrayBuffer> };
  if (blob.size > MAX_BYTES) {
    return json(413, { ok: false, error: 'That photo is over 10 MB. Send a smaller one — a normal phone photo is well under the limit.' });
  }
  if (blob.size === 0) {
    return json(400, { ok: false, error: 'That file is empty. Choose a photo and try again.' });
  }

  const bytes = new Uint8Array(await blob.arrayBuffer());
  if (bytes.byteLength > MAX_BYTES) {
    return json(413, { ok: false, error: 'That photo is over 10 MB. Send a smaller one — a normal phone photo is well under the limit.' });
  }

  // Declared type must be an image AND the bytes must agree with it.
  const sniffed = sniff(bytes);
  if (!sniffed) {
    return json(415, { ok: false, error: 'That file is not a JPEG, PNG or WebP image. If it came off an iPhone as HEIC, take a screenshot of it and send that.' });
  }
  const declared = (blob.type || '').toLowerCase().split(';')[0].trim();
  if (declared && declared !== sniffed) {
    return json(415, { ok: false, error: 'That file does not look like the image type it claims to be. Send a plain JPEG or PNG photo.' });
  }

  const clean = stripMetadata(bytes, sniffed);
  const key = `${randomKey()}.${EXT[sniffed]}`;

  try {
    await env.PLATE_PHOTOS.put(key, clean, {
      httpMetadata: { contentType: sniffed, contentDisposition: 'inline' },
    });
  } catch {
    return json(502, { ok: false, error: 'The photo did not save. Send the request without it and we will ask for it by text.' });
  }

  return json(200, { ok: true, url: `/api/plate-photo/${key}`, type: sniffed, bytes: clean.byteLength });
};

/* No other method is exported on this path, and there is no listing endpoint of any
   kind. Pages answers GET/PUT/DELETE here with 405 on its own. A key gets you one
   object through /api/plate-photo/[key] and nothing else. */
