#!/usr/bin/env node
/**
 * make-icons.mjs — every favicon size from public/favicon.svg (the source of truth).
 * PNGs via sharp; favicon.ico is three PNGs (16/32/48) in an ICO container, written by hand
 * because sharp has no ICO output. Apple touch icon is full-bleed with no rounded corners:
 * iOS rounds it itself, and our own rounding would leave dark corners on a light screen.
 *   node scripts/make-icons.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('public/favicon.svg');
const png = (size, src = svg) => sharp(src, { density: 384 }).resize(size, size).png().toBuffer();

for (const [file, size] of [['favicon-16.png', 16], ['favicon-32.png', 32], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  writeFileSync(`public/${file}`, await png(size));
}

// Apple touch: same mark on a square (no rx) background, a little more padding.
const square = Buffer.from(svg.toString().replace(/rx="14"/, '').replace('viewBox="0 0 64 64"', 'viewBox="-6 -6 76 76"').replace('<rect width="64" height="64"', '<rect x="-6" y="-6" width="76" height="76"'));
writeFileSync('public/apple-touch-icon.png', await png(180, square));

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...images]));
console.log('icons written');
