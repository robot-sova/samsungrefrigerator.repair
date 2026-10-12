import type { APIRoute } from 'astro';

/**
 * Search Console has /sitemap-index.xml on file from the old site (@astrojs/sitemap). Keep the
 * address alive as a sitemap index that points at the one real sitemap.
 */
export const GET: APIRoute = ({ site }) => {
  const base = site!.href.replace(/\/$/, '');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${base}/sitemap.xml</loc></sitemap>\n</sitemapindex>\n`,
    { headers: { 'content-type': 'application/xml; charset=utf-8' } },
  );
};
