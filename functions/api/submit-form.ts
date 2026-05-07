/**
 * Cloudflare Pages Function: POST /api/submit-form
 *
 * Handles the booking form (and, in commit B, the callback request form).
 * Validates per type and dispatches Telegram + Resend notifications in
 * parallel. Honeypot field silently drops bots.
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
  type?: unknown;
  name?: unknown;
  phone?: unknown;
  preferredDate?: unknown;
  preferredTime?: unknown;
  description?: unknown;
  bestTimeToCall?: unknown;
  source?: unknown;
  honeypot?: unknown;
  website?: unknown;
}

// Keep these in sync with src/pages/book.astro. The dash is U+2013 EN DASH.
const TIME_SLOTS = [
  '8 AM – 10 AM',
  '10 AM – 12 PM',
  '12 PM – 2 PM',
  '2 PM – 4 PM',
  '4 PM – 6 PM',
  '6 PM – 8 PM',
] as const;

const CALLBACK_WINDOWS = [
  'Anytime',
  'Morning (8 AM – 12 PM)',
  'Afternoon (12 PM – 4 PM)',
  'Evening (4 PM – 8 PM)',
] as const;

interface BookingData {
  type: 'booking';
  name: string;
  phone: string;
  phoneRaw: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string;
  description: string;
  source: string;
}

interface CallbackData {
  type: 'callback';
  name: string;
  phone: string;
  phoneRaw: string;
  bestTimeToCall: string;
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

const todayPTYMD = (): string => {
  // en-CA produces YYYY-MM-DD, ideal for date math + comparison.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
};

const addDays = (ymd: string, n: number): string => {
  const [y, m, d] = ymd.split('-').map((s) => parseInt(s, 10));
  const dt = new Date(Date.UTC(y!, (m! - 1), d!));
  dt.setUTCDate(dt.getUTCDate() + n);
  return dt.toISOString().slice(0, 10);
};

const isValidYMD = (s: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(`${s}T12:00:00Z`));

// Format YYYY-MM-DD as "Saturday, May 10, 2026" in PT.
const formatDateLong = (ymd: string): string => {
  const [y, m, d] = ymd.split('-').map((s) => parseInt(s, 10));
  // Construct at noon UTC so the calendar day is unambiguously the same in PT.
  const dt = new Date(Date.UTC(y!, (m! - 1), d!, 12, 0, 0));
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dt);
};

// Short PT date for email subject: "May 10".
const formatDateShort = (ymd: string): string => {
  const [y, m, d] = ymd.split('-').map((s) => parseInt(s, 10));
  const dt = new Date(Date.UTC(y!, (m! - 1), d!, 12, 0, 0));
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'short',
    day: 'numeric',
  }).format(dt);
};

const formatPTTimestamp = (date: Date): string => {
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

const validatePhone = (
  raw: unknown
): { ok: true; display: string; digits: string } | { ok: false; error: string } => {
  const phoneRawInput = cleanString(raw, 40);
  const digits = phoneRawInput.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    return { ok: false, error: 'Phone must include 10–15 digits.' };
  }
  return { ok: true, display: formatPhoneDisplay(digits), digits };
};

const validateBooking = (
  payload: FormPayload
): { ok: true; data: BookingData } | { ok: false; error: string } => {
  const name = cleanString(payload.name, 100);
  if (name.length < 2) return { ok: false, error: 'Name must be 2–100 characters.' };

  const phone = validatePhone(payload.phone);
  if (!phone.ok) return phone;

  const preferredDate = cleanString(payload.preferredDate, 10);
  if (!isValidYMD(preferredDate)) {
    return { ok: false, error: 'Pick a valid date.' };
  }
  const earliest = todayPTYMD();
  const latest = addDays(earliest, 7);
  if (preferredDate < earliest || preferredDate > latest) {
    return { ok: false, error: 'Date must be within the next 7 days.' };
  }

  const preferredTime = cleanString(payload.preferredTime, 30);
  if (!(TIME_SLOTS as readonly string[]).includes(preferredTime)) {
    return { ok: false, error: 'Pick one of the listed time slots.' };
  }

  const description = cleanString(payload.description, 2000);
  if (description.length < 5) {
    return { ok: false, error: 'Please describe the problem (5–2000 characters).' };
  }

  const source = cleanString(payload.source, 200) || '/book/';

  return {
    ok: true,
    data: {
      type: 'booking',
      name,
      phone: phone.display,
      phoneRaw: phone.digits,
      preferredDate,
      preferredTime,
      description,
      source,
    },
  };
};

const validateCallback = (
  payload: FormPayload
): { ok: true; data: CallbackData } | { ok: false; error: string } => {
  const name = cleanString(payload.name, 100);
  if (name.length < 2) return { ok: false, error: 'Name must be 2–100 characters.' };

  const phone = validatePhone(payload.phone);
  if (!phone.ok) return phone;

  const bestRaw = cleanString(payload.bestTimeToCall, 80);
  let bestTimeToCall = 'Anytime';
  if (bestRaw.length > 0) {
    if (!(CALLBACK_WINDOWS as readonly string[]).includes(bestRaw)) {
      return { ok: false, error: 'Pick one of the listed callback windows.' };
    }
    bestTimeToCall = bestRaw;
  }

  const source = cleanString(payload.source, 200) || '/book/';

  return {
    ok: true,
    data: {
      type: 'callback',
      name,
      phone: phone.display,
      phoneRaw: phone.digits,
      bestTimeToCall,
      source,
    },
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
  // Telegram Markdown (legacy) special chars.
  s.replace(/([_*`\[])/g, '\\$1');

const sendTelegramBooking = async (
  env: Env,
  data: BookingData,
  timestamp: string
): Promise<void> => {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    throw new Error('Telegram credentials missing');
  }
  const dateLabel = formatDateLong(data.preferredDate);
  const text = [
    '🆕 *New booking — Samsung Refrigerator Repair*',
    '',
    `👤 *Name:* ${escapeMarkdown(data.name)}`,
    `📞 *Phone:* ${escapeMarkdown(data.phone)}`,
    `📅 *Preferred date:* ${escapeMarkdown(dateLabel)}`,
    `🕐 *Preferred time:* ${escapeMarkdown(data.preferredTime)}`,
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

const sendResendBooking = async (
  env: Env,
  data: BookingData,
  timestamp: string
): Promise<void> => {
  if (!env.RESEND_API_KEY || !env.BUSINESS_EMAIL) {
    throw new Error('Resend credentials missing');
  }

  const dateLong = formatDateLong(data.preferredDate);
  const dateShort = formatDateShort(data.preferredDate);

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
    <dt style="font-weight:700; margin-top:12px;">Preferred date</dt>
    <dd style="margin:4px 0 0 0;">${escapeHtml(dateLong)}</dd>
    <dt style="font-weight:700; margin-top:12px;">Preferred time</dt>
    <dd style="margin:4px 0 0 0;">${escapeHtml(data.preferredTime)}</dd>
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
      subject: `🆕 New booking — ${dateShort} ${data.preferredTime}`,
      html,
      reply_to: env.BUSINESS_EMAIL,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${body.slice(0, 200)}`);
  }
};

const sendTelegramCallback = async (
  env: Env,
  data: CallbackData,
  timestamp: string
): Promise<void> => {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    throw new Error('Telegram credentials missing');
  }
  const text = [
    '📞 *Callback request — Samsung Refrigerator Repair*',
    '',
    `👤 *Name:* ${escapeMarkdown(data.name)}`,
    `📞 *Phone:* ${escapeMarkdown(data.phone)}`,
    `⏰ *Best time to call:* ${escapeMarkdown(data.bestTimeToCall)}`,
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

const sendResendCallback = async (
  env: Env,
  data: CallbackData,
  timestamp: string
): Promise<void> => {
  if (!env.RESEND_API_KEY || !env.BUSINESS_EMAIL) {
    throw new Error('Resend credentials missing');
  }

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Callback request</title></head>
<body style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color:#0a0a0a; line-height:1.5;">
  <h2 style="margin:0 0 16px 0;">Samsung Refrigerator Repair — Callback request</h2>
  <dl style="margin:0;">
    <dt style="font-weight:700; margin-top:12px;">Name</dt>
    <dd style="margin:4px 0 0 0;">${escapeHtml(data.name)}</dd>
    <dt style="font-weight:700; margin-top:12px;">Phone</dt>
    <dd style="margin:4px 0 0 0;"><a href="tel:+${escapeHtml(data.phoneRaw)}" style="color:#0a0a0a;">${escapeHtml(data.phone)}</a></dd>
    <dt style="font-weight:700; margin-top:12px;">Best time to call</dt>
    <dd style="margin:4px 0 0 0;">${escapeHtml(data.bestTimeToCall)}</dd>
  </dl>
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
      subject: `📞 Callback request — ${data.name}`,
      html,
      reply_to: env.BUSINESS_EMAIL,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${body.slice(0, 200)}`);
  }
};

const dispatchCallback = async (env: Env, data: CallbackData): Promise<Response> => {
  const timestamp = formatPTTimestamp(new Date());

  const [telegramResult, resendResult] = await Promise.all([
    (async () => {
      try {
        await sendTelegramCallback(env, data, timestamp);
        return { ok: true as const };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('Telegram failure:', msg);
        return { ok: false as const, error: msg };
      }
    })(),
    (async () => {
      try {
        await sendResendCallback(env, data, timestamp);
        return { ok: true as const };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('Resend failure:', msg);
        return { ok: false as const, error: msg };
      }
    })(),
  ]);

  if (!telegramResult.ok && !resendResult.ok) {
    return json({ success: false, error: 'Could not deliver your request.' });
  }

  return json({ success: true });
};

const dispatchBooking = async (env: Env, data: BookingData): Promise<Response> => {
  const timestamp = formatPTTimestamp(new Date());

  const [telegramResult, resendResult] = await Promise.all([
    (async () => {
      try {
        await sendTelegramBooking(env, data, timestamp);
        return { ok: true as const };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('Telegram failure:', msg);
        return { ok: false as const, error: msg };
      }
    })(),
    (async () => {
      try {
        await sendResendBooking(env, data, timestamp);
        return { ok: true as const };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('Resend failure:', msg);
        return { ok: false as const, error: msg };
      }
    })(),
  ]);

  if (!telegramResult.ok && !resendResult.ok) {
    return json({ success: false, error: 'Could not deliver your request.' });
  }

  return json({ success: true });
};

export const onRequestPost = async (ctx: Context): Promise<Response> => {
  let payload: FormPayload;
  try {
    payload = (await ctx.request.json()) as FormPayload;
  } catch {
    return json({ success: false, error: 'Invalid JSON.' }, 400);
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

  const type = isString(payload.type) ? payload.type : 'booking';

  if (type === 'booking') {
    const result = validateBooking(payload);
    if (!result.ok) return json({ success: false, error: result.error }, 400);
    return dispatchBooking(ctx.env, result.data);
  }

  if (type === 'callback') {
    const result = validateCallback(payload);
    if (!result.ok) return json({ success: false, error: result.error }, 400);
    return dispatchCallback(ctx.env, result.data);
  }

  return json({ success: false, error: 'Unsupported form type.' }, 400);
};
