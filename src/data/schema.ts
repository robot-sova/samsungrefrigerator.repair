import { business } from './business';

/** JSON-LD helpers. Every node points at the ONE business node in Base.astro by @id. */

const provider = { '@id': `${business.url}/#business` };

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

export const articleSchema = (o: { headline: string; description: string; path: string }) => ({
  '@type': 'TechArticle',
  headline: o.headline,
  description: o.description,
  url: new URL(o.path, business.url).href,
  author: provider,
  publisher: provider,
  dateModified: '2026-10-12',
});

/** Text with blank lines → paragraphs. Content files keep long intros as one string. */
export const paras = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
