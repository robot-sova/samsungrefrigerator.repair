/**
 * GET /api/plate-photo/<key> — serve ONE object from the PLATE_PHOTOS R2 bucket.
 *
 * This is the whole read surface. There is no listing endpoint and there never will
 * be one: a key gets you one object and nothing else. The bucket holds photographs of
 * customers' kitchens taken at their home addresses, which is why it is not exposed
 * through a public r2.dev domain.
 *
 * Behaviour that matters:
 *   - key shape is validated before touching R2, so a malformed key costs no read
 *   - a missing object and a malformed key return the SAME bare 404, so the response
 *     never confirms whether a key exists
 *   - Content-Type comes from the stored object, Content-Disposition is inline, so
 *     Telegram renders the photo instead of downloading it
 *   - reads are rate limited through LEAD_RL on counter `plrd:` — a SEPARATE counter
 *     from uploads (`plup:`) and from leads (`rl:`), so one cannot exhaust another
 *   - noindex/nofollow and no-store: these are customer photographs, not site assets
 */

interface R2Object {
  body: ReadableStream;
  size: number;
  httpMetadata?: { contentType?: string };
}

interface Env {
  PLATE_PHOTOS?: { get(key: string): Promise<R2Object | null> };
  LEAD_RL?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  };
}

const READ_LIMIT = 60; // per IP per window — a dispatcher opens a handful
const READ_WINDOW_S = 600;

/** Exactly what the upload endpoint mints: 48 hex chars + a known extension. */
const KEY_RE = /^[0-9a-f]{48}\.(jpg|png|webp)$/;

const TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

/** One indistinguishable answer for "no such key", "bad key" and "not an image". */
const notFound = () =>
  new Response('Not found', {
    status: 404,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });

async function allowedRead(env: Env, ip: string): Promise<boolean> {
  if (!env.LEAD_RL) return true; // local dev without the binding
  const now = Date.now();
  const key = `plrd:${ip}`;
  const raw = (await env.LEAD_RL.get(key)) ?? '[]';
  const hits = (JSON.parse(raw) as number[]).filter((t) => now - t < READ_WINDOW_S * 1000);
  if (hits.length >= READ_LIMIT) return false;
  hits.push(now);
  await env.LEAD_RL.put(key, JSON.stringify(hits), { expirationTtl: READ_WINDOW_S });
  return true;
}

export const onRequestGet = async (ctx: {
  request: Request;
  env: Env;
  params: { key: string | string[] };
}): Promise<Response> => {
  const { request, env, params } = ctx;

  const raw = Array.isArray(params.key) ? params.key.join('/') : params.key;
  const key = String(raw ?? '');

  // Validate before spending an R2 read, and before the rate limiter, so garbage
  // traffic is the cheapest possible path.
  if (!KEY_RE.test(key)) return notFound();

  if (!env.PLATE_PHOTOS) return notFound();

  const ip = request.headers.get('cf-connecting-ip') ?? '0.0.0.0';
  if (!(await allowedRead(env, ip))) {
    return new Response('Too many requests', {
      status: 429,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
    });
  }

  const obj = await env.PLATE_PHOTOS.get(key).catch(() => null);
  if (!obj) return notFound();

  const ext = key.slice(key.lastIndexOf('.') + 1);
  const type = obj.httpMetadata?.contentType ?? TYPES[ext] ?? 'application/octet-stream';

  return new Response(obj.body, {
    status: 200,
    headers: {
      'content-type': type,
      'content-disposition': 'inline',
      'content-length': String(obj.size),
      // Private customer content: never indexed, never stored by a shared cache.
      'cache-control': 'private, no-store',
      'x-robots-tag': 'noindex, nofollow, noimageindex',
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'no-referrer',
    },
  });
};
