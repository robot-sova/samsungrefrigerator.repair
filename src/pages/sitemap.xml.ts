import type { APIRoute } from 'astro';
import { SERVICES } from '../data/services';
import { ERROR_CODES } from '../data/errorCodes';
import { MODELS } from '../data/models';
import { COUNTIES } from '../data/locations';

/**
 * Every indexable page, built from the same data the pages are built from — a new service,
 * code, model or city lands here by itself. 404 is left out. check-site.mjs compares this
 * list against dist both ways.
 */
export const PATHS = [
  '/',
  '/book/',
  '/about/',
  '/services/',
  ...SERVICES.map((s) => `/services/${s.slug}/`),
  '/error-codes/',
  ...ERROR_CODES.map((c) => `/error-codes/${c.slug}/`),
  '/models/',
  ...MODELS.map((m) => `/models/${m.slug}/`),
  '/service-area/',
  ...COUNTIES.flatMap((c) => [
    `/service-area/${c.slug}/`,
    ...(c.cityPages === false ? [] : c.cities.map((ct) => `/service-area/${c.slug}/${ct.slug}/`)),
  ]),
];

/** Date of the rebuild. Bump when a page's content changes for real, not on every deploy. */
const LASTMOD = '2026-10-12';

export const GET: APIRoute = ({ site }) => {
  const base = site!.href.replace(/\/$/, '');
  const urls = PATHS.map((p) => `  <url><loc>${base}${p}</loc><lastmod>${LASTMOD}</lastmod></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'content-type': 'application/xml; charset=utf-8' } },
  );
};
