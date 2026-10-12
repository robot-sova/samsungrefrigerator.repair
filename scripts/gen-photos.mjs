#!/usr/bin/env node
/**
 * gen-photos.mjs — generate site photos with Gemini, using real-unit reference photos.
 *
 * Ported from socalcoffee.repair (scripts/gen-photos.mjs + gen-dating2.mjs): same API call,
 * same retry rules, plus reference images sent as inlineData so the machine in the frame has
 * the real shape. References live in refs/ (gitignored) and are never published.
 *
 *   node scripts/gen-photos.mjs                 # every id in scripts/photo-prompts.json
 *   node scripts/gen-photos.mjs --only a,b      # some ids
 *   node scripts/gen-photos.mjs --n 3           # candidates per id (default 2)
 *   node scripts/gen-photos.mjs --dry           # print the plan, no API calls
 *
 * Output: gen/<id>-c<N>.png (gitignored). Pick by eye, then scripts/process-photos.mjs.
 * Prompt map: keys starting with "_" are shared text; every entry gets "_common", plus
 * "_hands", "_person" or "_object" by its "frame". Key: secrets/gemini-key.txt. Never printed.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const key = readFileSync(resolve(ROOT, 'secrets/gemini-key.txt'), 'utf8').trim();
const map = JSON.parse(readFileSync(resolve(ROOT, 'scripts/photo-prompts.json'), 'utf8'));
const OUT = resolve(ROOT, 'gen');
mkdirSync(OUT, { recursive: true });

const MODEL = 'gemini-3-pro-image';
const RETRY_STATUSES = new Set([429, 500, 503]);
const MAX_ATTEMPTS = 4;
const MAX_PARALLEL = 4;
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

const argv = process.argv.slice(2);
const opt = (n) => (argv.includes(`--${n}`) ? argv[argv.indexOf(`--${n}`) + 1] : undefined);
const ONLY = opt('only') ? new Set(opt('only').split(',')) : null;
const N = Number(opt('n') ?? 2);
const DRY = argv.includes('--dry');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const mime = (f) => ({ '.png': 'image/png', '.webp': 'image/webp' })[extname(f).toLowerCase()] ?? 'image/jpeg';

function buildPrompt(e) {
  const parts = [map._common, map[`_${e.frame ?? 'object'}`]];
  if (e.refs?.length) {
    parts.push(
      `Reference images 1–${e.refs.length} are real photographs of the actual product. Reproduce its real shape, proportions, materials and colors faithfully — this must look like a photo of that exact real product. Do NOT copy the composition, background or lighting of the reference photos; build a new scene as described below.`,
    );
  }
  parts.push(e.prompt);
  return parts.filter(Boolean).join('\n\n');
}

async function generate(e, outPath) {
  const parts = (e.refs ?? []).map((f) => ({
    inlineData: { mimeType: mime(f), data: readFileSync(resolve(ROOT, 'refs', f)).toString('base64') },
  }));
  parts.push({ text: buildPrompt(e) });
  const body = {
    contents: [{ parts }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: e.aspect ?? '4:3' } },
  };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let why = '';
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (RETRY_STATUSES.has(res.status)) why = `HTTP ${res.status}`;
      else if (!res.ok) return { ok: false, why: `HTTP ${res.status} ${(await res.text()).slice(0, 200)}` };
      else {
        const j = await res.json();
        const cand = j.candidates?.[0];
        const img = (cand?.content?.parts ?? []).find((p) => p.inlineData?.data);
        if (!img) why = `no image (finishReason ${cand?.finishReason ?? 'none'})`;
        else {
          const bytes = Buffer.from(img.inlineData.data, 'base64');
          writeFileSync(outPath, bytes);
          if (readFileSync(outPath).subarray(0, 4).equals(PNG) || bytes[0] === 0xff) return { ok: true };
          why = 'not an image on disk';
        }
      }
    } catch (err) {
      why = `network: ${err.message}`;
    }
    if (attempt < MAX_ATTEMPTS) await sleep(1200 * attempt);
    else return { ok: false, why };
  }
}

const jobs = [];
for (const [id, e] of Object.entries(map)) {
  if (id.startsWith('_') || (ONLY && !ONLY.has(id))) continue;
  for (const r of e.refs ?? []) if (!existsSync(resolve(ROOT, 'refs', r))) throw new Error(`${id}: missing refs/${r}`);
  for (let c = 1; c <= N; c++) jobs.push({ id, e, out: resolve(OUT, `${id}-c${c}.png`) });
}
console.log(`${jobs.length} images (${N} per id), model ${MODEL}`);
if (DRY) {
  for (const j of jobs) console.log(`  ${j.id} refs=${(j.e.refs ?? []).join(',') || '-'} aspect=${j.e.aspect ?? '4:3'}`);
  process.exit(0);
}

let i = 0;
let failed = 0;
await Promise.all(
  Array.from({ length: MAX_PARALLEL }, async () => {
    while (i < jobs.length) {
      const j = jobs[i++];
      const r = await generate(j.e, j.out);
      if (r.ok) console.log(`✓ ${j.out.split(/[\\/]/).pop()}`);
      else { failed++; console.log(`✗ ${j.id}: ${r.why}`); }
    }
  }),
);
console.log(`done, ${failed} failed`);
process.exit(failed ? 1 : 0);
