/**
 * Post-build gate. Runs after `astro build` on every build, local and Cloudflare.
 *
 *  1. Every internal link resolves to a built page (trailing-slash URLs).
 *  2. No Cyrillic in the built HTML — the site is English end to end.
 *  3. Meta description present and ≤ 160 chars; <title> ≤ 70 chars.
 *  4. Banned text: the old phone (SDAR Beverly Hills DID that lived on the old www copy),
 *     invented history and ratings, "24/7", "authorized/certified Samsung", an unfilled {PHONE}.
 *  5. Sitemap ⇄ built pages, both ways.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const HOST = 'samsungrefrigerator.repair';
const errors = [];

const BANNED = [
  [/248-?1199|2481199/, 'old phone 424-248-1199'],
  [/since 2010|founded in 2010/i, 'invented "since 2010"'],
  [/aggregateRating|ratingValue|★★★★★/, 'rating with no real reviews behind it'],
  [/24\/7/, '"24/7" — we work Mon–Sat'],
  [/(authorized|certified|factory)[ -](samsung|service center|dealer)/i, 'authorized/certified claim'],
  [/\{PHONE\}/, 'unfilled {PHONE} placeholder'],
  [/cdn-cgi\/l\/email-protection/, 'Cloudflare email obfuscation link'],
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const html = walk(DIST).filter((p) => p.endsWith('.html'));
const unescape = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&quot;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

for (const file of html) {
  const src = readFileSync(file, 'utf8');
  const page = '/' + relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '');

  for (const m of src.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (/\.(svg|png|ico|xml|txt|css|js|woff2|webmanifest)$/.test(href) || href.startsWith('/_astro/') || href.startsWith('/api/')) continue;
    const target = href.endsWith('/') ? join(DIST, href, 'index.html') : join(DIST, href);
    if (!existsSync(target)) errors.push(`broken link on ${page}: ${href}`);
    if (!href.endsWith('/')) errors.push(`link without trailing slash on ${page}: ${href} (costs a 308 redirect)`);
  }

  const desc = src.match(/<meta name="description" content="([^"]*)"/);
  if (!desc) errors.push(`no meta description on ${page}`);
  else if (unescape(desc[1]).length > 160) errors.push(`description ${unescape(desc[1]).length} chars (max 160) on ${page}`);

  const title = src.match(/<title>([^<]*)<\/title>/);
  if (!title) errors.push(`no <title> on ${page}`);
  else if (unescape(title[1]).length > 70) errors.push(`title ${unescape(title[1]).length} chars (max 70) on ${page}: ${unescape(title[1])}`);

  const cyr = src.match(/[Ѐ-ӿ]+/);
  if (cyr) errors.push(`Cyrillic on ${page}: "${cyr[0]}"`);

  for (const [re, why] of BANNED) if (re.test(src)) errors.push(`${why} on ${page}`);
}

const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const inMap = new Set([...sitemap.matchAll(new RegExp(`<loc>https://${HOST.replace('.', '\\.')}(/[^<]*)</loc>`, 'g'))].map((m) => m[1]));
const built = new Set(
  html.map((f) => '/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '')).filter((p) => p !== '/404.html'),
);
for (const p of built) if (!inMap.has(p)) errors.push(`page missing from sitemap: ${p}`);
for (const p of inMap) if (!built.has(p)) errors.push(`sitemap lists a page that was not built: ${p}`);

if (errors.length) {
  console.error(`check-site: ${errors.length} problem(s)`);
  for (const e of [...new Set(errors)]) console.error('  - ' + e);
  process.exit(1);
}
console.log(`check-site: ${html.length} pages ok${process.env.CF_PAGES_BRANCH ? ` (branch ${process.env.CF_PAGES_BRANCH})` : ''}`);
