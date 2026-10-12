/**
 * POST /api/lead — Cloudflare Pages Function.
 *
 * Takes the estimate form, filters spam on our side, and forwards the lead to ЦУП:
 *   POST {CUP_WEBHOOK_URL | https://cup-production-48f8.up.railway.app/webhooks/web-lead}
 *   header x-web-lead-token: env.WEB_LEAD_TOKEN  ← secret in CF Pages settings, NEVER in code
 *
 * Same as vacuum.repair (honeypot, phone rule, caps, rate limit). ЦУП knows
 * `samsungrefrigerator.repair` as an ordinary source (not self-formatted): the card in LSA Call
 * Bot prints name / phone / email / city (= ZIP) / model (= fridge type + model number), then
 * the message. Photos ride inside the message as absolute /api/plate-photo/<key> links — ЦУП
 * downloads them and attaches them to the card (src/web/lead.ts, PHOTO_URL_RE).
 */

interface Env {
  WEB_LEAD_TOKEN: string;
  /** Optional override for local testing (wrangler pages dev --binding CUP_WEBHOOK_URL=...) */
  CUP_WEBHOOK_URL?: string;
  /** Optional KV namespace for the rate limit — add binding LEAD_RL in CF Pages to activate */
  LEAD_RL?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  };
}

const RECEIVER_DEFAULT = 'https://cup-production-48f8.up.railway.app/webhooks/web-lead';
const SOURCE = 'samsungrefrigerator.repair'; // required — without it the lead is attributed to another brand
const RATE_LIMIT = 3;
const RATE_WINDOW_S = 600;

const memRl = new Map<string, number[]>();

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const clip = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

/** Ten digits, or eleven with a leading 1; the area code does not start with 0 or 1. */
function isCallablePhone(raw: string): boolean {
  const digits = raw.split(/x|ext/i)[0].replace(/\D/g, '');
  const ten = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  return ten.length === 10 && /^[2-9]/.test(ten);
}

async function readBody(request: Request): Promise<Record<string, string>> {
  const ct = request.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    const data = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v ?? '')]));
  }
  const fd = await request.formData().catch(() => null);
  if (!fd) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of fd.entries()) out[k] = typeof v === 'string' ? v : '';
  return out;
}

async function allowedByRateLimit(env: Env, ip: string): Promise<boolean> {
  const now = Date.now();
  if (env.LEAD_RL) {
    const key = `rl:${ip}`;
    const raw = (await env.LEAD_RL.get(key)) ?? '[]';
    const hits = (JSON.parse(raw) as number[]).filter((t) => now - t < RATE_WINDOW_S * 1000);
    if (hits.length >= RATE_LIMIT) return false;
    hits.push(now);
    await env.LEAD_RL.put(key, JSON.stringify(hits), { expirationTtl: RATE_WINDOW_S });
    return true;
  }
  const hits = (memRl.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_S * 1000);
  if (hits.length >= RATE_LIMIT) {
    memRl.set(ip, hits);
    return false;
  }
  hits.push(now);
  memRl.set(ip, hits);
  return true;
}

export const onRequestPost = async (ctx: { request: Request; env: Env }): Promise<Response> => {
  const { request, env } = ctx;
  const body = await readBody(request);

  // Honeypot: answer like a success so the bot moves on.
  if (body._gotcha) return json(200, { ok: true });

  const phone = clip(body.phone, 30);
  if (!isCallablePhone(phone)) {
    return json(400, { ok: false, field: 'phone', error: 'A US phone number has 10 digits — check it so we can call you back.' });
  }

  const ip = request.headers.get('cf-connecting-ip') ?? '0.0.0.0';
  if (!(await allowedByRateLimit(env, ip))) {
    return json(429, {
      ok: false,
      error: 'You already sent us a request in the last few minutes — this one was not sent. Call us if it is urgent.',
    });
  }

  const fridgeType = clip(body.fridge_type, 60);
  const model = clip(body.model, 60);
  const zip = clip(body.zip, 10);
  const problem = clip(body.problem, 1500);
  const when = clip(body.when, 60);
  const origin = new URL(request.url).origin;
  // Only keys our own upload endpoint minted; anything else is dropped, never forwarded.
  const photos = String(body.photos ?? '')
    .split(/\s+/)
    .filter((u) => /^\/api\/plate-photo\/[0-9a-f]{48}\.(jpg|png|webp)$/.test(u))
    .slice(0, 3)
    .map((u, i) => `Photo ${i + 1}: ${origin}${u}`);

  const message = [problem, when ? `Preferred time: ${when}` : '', ...photos].filter(Boolean).join('\n');

  const lead: Record<string, string> = {
    source: SOURCE,
    name: clip(body.name, 100),
    phone,
    email: clip(body.email, 100),
    city: zip ? `ZIP ${zip}` : '',
    model: ['Samsung', fridgeType, model].filter(Boolean).join(' ').slice(0, 100),
    message,
    page: clip(body.page || request.headers.get('referer'), 300),
    zip,
  };

  try {
    const res = await fetch(env.CUP_WEBHOOK_URL || RECEIVER_DEFAULT, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-web-lead-token': env.WEB_LEAD_TOKEN ?? '' },
      body: JSON.stringify(lead),
    });
    if (res.ok) return json(200, { ok: true });
    if (res.status === 400) {
      return json(400, { ok: false, field: 'phone', error: 'We need a phone number to call you back.' });
    }
    return json(502, { ok: false, error: 'We could not take the request right now. Please call us.' });
  } catch {
    return json(502, { ok: false, error: 'We could not take the request right now. Please call us.' });
  }
};
