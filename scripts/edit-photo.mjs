#!/usr/bin/env node
/**
 * edit-photo.mjs — ask Gemini to fix ONE candidate in place (a stray badge, a wordmark,
 * a misspelled label) and keep everything else identical. Same key and model as gen-photos.
 *
 *   node scripts/edit-photo.mjs <id>-c<N> "remove the small brand badge on the top of the right door"
 *
 * Writes gen/<id>-c<N>e.png; pick it as "<N>e" in photo-picks.json.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const key = readFileSync(resolve(ROOT, 'secrets/gemini-key.txt'), 'utf8').trim();
const [name, what] = process.argv.slice(2);
if (!name || !what) { console.error('usage: edit-photo.mjs <id>-c<N> "<what to fix>"'); process.exit(2); }

const img = readFileSync(resolve(ROOT, 'gen', `${name}.png`)).toString('base64');
const prompt = `Edit this photograph: ${what}. Replace it with plain brushed stainless steel (or whatever surface surrounds it), matching the reflections and lighting. Change NOTHING else — same framing, same objects, same colors, same light. No text, no logos anywhere in the result.`;
const body = { contents: [{ parts: [{ inlineData: { mimeType: 'image/png', data: img } }, { text: prompt }] }], generationConfig: { responseModalities: ['IMAGE'] } };
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image:generateContent?key=${key}`;

for (let attempt = 1; attempt <= 4; attempt++) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (res.ok) {
    const j = await res.json();
    const part = (j.candidates?.[0]?.content?.parts ?? []).find((p) => p.inlineData?.data);
    if (part) { writeFileSync(resolve(ROOT, 'gen', `${name}e.png`), Buffer.from(part.inlineData.data, 'base64')); console.log(`✓ gen/${name}e.png`); process.exit(0); }
  } else if (![429, 500, 503].includes(res.status)) { console.error(`HTTP ${res.status}`); process.exit(1); }
  await new Promise((r) => setTimeout(r, 1500 * attempt));
}
console.error('failed'); process.exit(1);
