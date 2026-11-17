import { business } from './business';

/** JSON-LD helpers. Every node points at the ONE business node in Base.astro by @id. */

export const ORG_ID = `${business.url}/#organization`;
const provider = { '@id': ORG_ID };

export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const serviceSchema = (o: { name: string; description: string; path: string; area?: string }) => ({
  '@type': 'Service',
  name: o.name,
  serviceType: 'Refrigerator repair',
  description: o.description,
  url: new URL(o.path, business.url).href,
  provider,
  areaServed: o.area ?? 'Southern California',
  brand: { '@type': 'Brand', name: 'Samsung' },
});

/**
 * Error-code guides are the site's articles. Dates are real: the guides were first published
 * 2026-05-06 (commit e7db356) and rewritten in the 12.10.2026 rebuild. Bump `modified` when
 * the guide text changes. image / url come from Base.astro (og image, canonical) — pages pass
 * Base's `article` prop, not a node in `schema`.
 */
export const ARTICLE_DATES = { published: '2026-05-06', modified: '2026-10-12' } as const;

/** Site owner, author of the guides (owner, 16.11.2026). */
export const AUTHOR = { '@type': 'Person', name: 'Roman Abysov', url: `${business.url}/about/` } as const;

export const articleSchema = (o: { headline: string; description: string; url: string; image: string }) => ({
  '@type': 'Article',
  '@id': `${o.url}#article`,
  headline: o.headline,
  description: o.description,
  image: o.image,
  url: o.url,
  mainEntityOfPage: { '@id': o.url },
  datePublished: ARTICLE_DATES.published,
  dateModified: ARTICLE_DATES.modified,
  author: AUTHOR,
  publisher: provider,
  inLanguage: 'en-US',
});

/** Text with blank lines → paragraphs. Content files keep long intros as one string. */
export const paras = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
