/**
 * Cloudflare Pages Function: POST /api/submit-form
 *
 * Receives the booking form, validates it, and fires Telegram + Resend
 * notifications in parallel. Honeypot field silently drops bots.
 */

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  RESEND_API_KEY: string;
  BUSINESS_EMAIL: string;
}

interface Context {
  request: Request;
  env: Env;
}

interface FormPayload {
  name?: unknown;
  phone?: unknown;
  city?: unknown;
  description?: unknown;
  source?: unknown;
  honeypot?: unknown;
  website?: unknown;
}

interface ValidatedPayload {
  name: string;
  phone: string;
  phoneRaw: string;
  city: string;
  description: string;
  source: string;
}

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const isString = (v: unknown): v is string => typeof v === 'string';

const cleanString = (v: unknown, max: number): string =>
  isString(v) ? v.trim().slice(0, max) : '';

const formatPhoneDisplay = (digits: string): string => {
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return digits;
};

const validate = (payload: FormPayload): { ok: true; data: ValidatedPayload } | { ok: false; error: string } => {
  const name = cleanString(payload.name, 100);
  if (name.length < 2) return { ok: false, error: 'Name must be 2–100 characters.' };

  const phoneRawInput = cleanString(payload.phone, 40);
  const phoneDigits = phoneRawInput.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return { ok: false, error: 'Phone must include 10–15 digits.' };
  }
  const phoneDisplay = formatPhoneDisplay(phoneDigits);

  const city = cleanString(payload.city, 80);
  if (city.length < 2) return { ok: false, error: 'City must be 2–80 characters.' };

  const description = cleanString(payload.description, 2000);
  if (description.length < 5) return { ok: false, error: 'Please describe the problem (5–2000 characters).' };

  const source = cleanString(payload.source, 200) || '/book/';

  return {
    ok: true,
    data: { name, phone: phoneDisplay, phoneRaw: phoneDigits, city, description, source },
  };
};

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const escapeMarkdown = (s: string): string =>
  // Telegram Markdown (legacy) special chars: _, *, `, [
  s.replace(/([_*`\[])/g, '\\$1');

const formatPTTimestamp = (date: Date): string => {
  // ISO-like representation in Pacific Time
  try {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const parts = fmt.formatToParts(date).reduce<Record<string, string>>((acc, p) => {
      if (p.type !== 'literal') acc[p.type] = p.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} PT`;
  } catch {
    return date.toISOString();
  }
};

const sendTelegram = async (env: Env, data: ValidatedPayload, timestamp: string): Promise<void> => {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    throw new Error('Telegram credentials missing');
  }
  const text = [
    '🆕 *New booking — Samsung Refrigerator Repair*',
    '',
    `👤 *Name:* ${escapeMarkdown(data.name)}`,
    `📞 *Phone:* ${escapeMarkdown(data.phone)}`,
    `🏙 *City:* ${escapeMarkdown(data.city)}`,
    '',
    '📝 *Problem:*',
    escapeMarkdown(data.description),
    '',
    `🌐 *Source:* ${escapeMarkdown(data.source)}`,
    `🕐 *Received:* ${escapeMarkdown(timestamp)}`,
  ].join('\n');

  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      parse_mode: 'Markdown',
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Telegram ${res.status}: ${body.slice(0, 200)}`);
  }
};

const sendResend = async (env: Env, data: ValidatedPayload, timestamp: string): Promise<void> => {
  if (!env.RESEND_API_KEY || !env.BUSINESS_EMAIL) {
    throw new Error('Resend credentials missing');
  }

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New booking</title></head>
<body style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color:#0a0a0a; line-height:1.5;">
  <h2 style="margin:0 0 16px 0;">Samsung Refrigerator Repair — New booking</h2>
  <dl style="margin:0;">
    <dt style="font-weight:700; margin-top:12px;">Name</dt>
    <dd style="margin:4px 0 0 0;">${escapeHtml(data.name)}</dd>
    <dt style="font-weight:700; margin-top:12px;">Phone</dt>
    <dd style="margin:4px 0 0 0;"><a href="tel:+${escapeHtml(data.phoneRaw)}" style="color:#0a0a0a;">${escapeHtml(data.phone)}</a></dd>
    <dt style="font-weight:700; margin-top:12px;">City</dt>
    <dd style="margin:4px 0 0 0;">${escapeHtml(data.city)}</dd>
  </dl>
  <h3 style="margin:24px 0 8px 0;">Problem</h3>
  <blockquote style="margin:0; padding:12px 16px; border-left:4px solid #facc15; background:#f7f7f8; white-space:pre-wrap;">${escapeHtml(data.description)}</blockquote>
  <p style="color:#8a8a8a; font-size:0.85rem; margin-top:24px;">
    Source: ${escapeHtml(data.source)}<br>
    Received: ${escapeHtml(timestamp)}
  </p>
</body>
</html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Samsung Refrigerator Repair <info@samsungrefrigerator.repair>',
      to: [env.BUSINESS_EMAIL],
      subject: `🆕 New booking — ${data.city}`,
      html,
      reply_to: env.BUSINESS_EMAIL,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${body.slice(0, 200)}`);
  }
};

export const onRequestPost = async (ctx: Context): Promise<Response> => {
  let payload: FormPayload;
  try {
    payload = (await ctx.request.json()) as FormPayload;
  } catch {
    return json({ success: false, error: 'Invalid JSON.' });
  }

  // Honeypot: silently accept and drop. The form has both `honeypot` and
  // `website` field names so we cover either.
  const honeypotValue = isString(payload.honeypot)
    ? payload.honeypot
    : isString(payload.website)
      ? payload.website
      : '';
  if (honeypotValue.trim().length > 0) {
    console.log('honeypot triggered');
    return json({ success: true });
  }

  const result = validate(payload);
  if (!result.ok) {
    return json({ success: false, error: result.error });
  }

  const timestamp = formatPTTimestamp(new Date());
  const data = result.data;

  const [telegramResult, resendResult] = await Promise.all([
    (async () => {
      try {
        await sendTelegram(ctx.env, data, timestamp);
        return { ok: true as const };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('Telegram failure:', msg);
        return { ok: false as const, error: msg };
      }
    })(),
    (async () => {
      try {
        await sendResend(ctx.env, data, timestamp);
        return { ok: true as const };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('Resend failure:', msg);
        return { ok: false as const, error: msg };
      }
    })(),
  ]);

  // Succeed if at least one notification channel went through. If both failed,
  // surface a generic error so the form prompts the user to call instead.
  if (!telegramResult.ok && !resendResult.ok) {
    return json({ success: false, error: 'Could not deliver your request.' });
  }

  return json({ success: true });
};
