/**
 * Everything the owner may change lives here, and only here: phone, prices, warranty, hours.
 * Pages read from this file — never type a price or the phone into a page.
 * scripts/check-site.mjs fails the build on the old phone, invented ratings and "since 2010".
 */

export const business = {
  /** Independent service. Not Samsung, not "authorized" — the footer says so on every page. */
  brand: 'Samsung Refrigerator Repair',
  domain: 'samsungrefrigerator.repair',
  url: 'https://samsungrefrigerator.repair',

  /** ЦУП didMap: 14244071019 → Lead-Samsung. Calls are run by SDAR technicians (owner, 12.10.2026). */
  phone: { display: '(424) 407-1019', tel: '+14244071019' },

  /** Owner decision 12.10.2026: Mon–Sat 8 AM – 8 PM, Sunday closed. The form takes requests any time. */
  hours: {
    display: 'Mon–Sat 8 AM – 8 PM',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '20:00',
  },
} as const;

/** Owner decision 12.10.2026: $89 diagnostic visit, credited toward the repair if you go ahead. */
export const prices = {
  diagnostic: 89,
} as const;

/** Owner decision 12.10.2026: 90 days on the parts we installed and our labor. */
export const warranty = {
  days: 90,
  short: '90-day warranty on parts and labor',
  covers: 'The parts we installed and the work we did, for 90 days from the repair date.',
} as const;

export const usd = (n: number) => `$${n}`;

/** Content files write the phone as {PHONE}; this is the only place it becomes a number. */
export const fill = (s: string) => s.replaceAll('{PHONE}', business.phone.display);

export const diagnosticText = `${usd(prices.diagnostic)} diagnostic visit, credited toward the repair if you go ahead`;

/** Printed in the footer of every page. */
export const disclaimer =
  'Independent repair service. Not affiliated with, endorsed by or sponsored by Samsung Electronics. Samsung, Family Hub and Bespoke are trademarks of Samsung Electronics Co., Ltd.';

/**
 * GA4 tag that was already on the site before the rebuild (kept so history continues).
 * Loads ONLY on the production host. Events: generate_lead, click_phone.
 */
export const analytics = { ga4: 'G-4DNFF1D67L', host: 'samsungrefrigerator.repair' } as const;

/** Refrigerator types the request form offers. */
export const formTypes = [
  'French Door (3 or 4 door)',
  'Family Hub (touchscreen)',
  'Bespoke',
  'Side-by-side',
  'Top or bottom freezer',
  'Not sure',
] as const;
