#!/usr/bin/env node
/**
 * process-photos.mjs — chosen candidate PNG → final JPEG in src/assets/photos/<id>.jpg.
 * Same treatment as socalcoffee.repair: wide frames max 1920, the rest 4:3 max 1600,
 * slight lift (brightness 1.04, gamma 1.02), mozjpeg. Never upscales.
 *
 *   node scripts/process-photos.mjs scripts/photo-picks.json
 *   photo-picks.json: { "<id>": "<candidate number>", ... }
 */
import { readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const picks = JSON.parse(readFileSync(resolve(process.argv[2] ?? 'scripts/photo-picks.json'), 'utf8'));
const OUT = resolve(ROOT, 'src/assets/photos');
mkdirSync(OUT, { recursive: true });

for (const [id, c] of Object.entries(picks)) {
  const src = resolve(ROOT, 'gen', `${id}-c${c}.png`);
  const meta = await sharp(src).metadata();
  const wide = meta.width / meta.height > 1.6;
  let w, h;
  if (wide) { w = Math.min(meta.width, 1920); h = Math.round((w * meta.height) / meta.width); }
  else { w = Math.min(meta.width, 1600); h = Math.round((w * 3) / 4); if (h > meta.height) { h = meta.height; w = Math.round((h * 4) / 3); } }
  const info = await sharp(src)
    .resize(w, h, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 1.04 })
    .gamma(1.02)
    .jpeg({ quality: wide ? 84 : 86, mozjpeg: true })
    .toFile(resolve(OUT, `${id}.jpg`));
  console.log(`✓ ${id} ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}
