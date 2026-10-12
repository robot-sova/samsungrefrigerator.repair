# CLAUDE.md — samsungrefrigerator.repair

Read before any change. Owner: Roman. Lead site for in-home Samsung refrigerator repair in
Southern California. Rebuilt 12.10.2026 on the vacuum.repair stack (Astro 6, static) — the old
astro-cube template is gone.

## Business facts (owner decisions 12.10.2026) — only in `src/data/business.ts`

- $89 diagnostic visit, credited toward the repair. 90-day warranty on parts and labor.
- Hours Mon–Sat 8 AM – 8 PM, Sunday closed. Never write "24/7" (the build fails on it).
- 7 counties: LA, Orange, Riverside, San Bernardino, Ventura, San Diego, Santa Barbara.
- Jobs are run by SDAR technicians. Phone (424) 407-1019 = ЦУП didMap `Lead-Samsung`.
- Independent service: the footer disclaimer is on every page. No "authorized/certified
  Samsung", no invented reviews or ratings, no "since 2010" — `check-site.mjs` fails on them.
- Never type the phone or a price into a page or a content file. Content files write `{PHONE}`;
  pages pass text through `fill()`.

## URLs are fixed

The 90 URLs that existed before the rebuild are kept 1:1 (they carry the Search Console
history: /error-codes/84c/ alone had 2,277 impressions in 90 days). Do not rename a slug.
San Diego and Santa Barbara have county pages only (`cityPages: false` in `locations.ts`): a city
page needs real local text in `cityContent.ts` first — the city route throws without it.
`sitemap.xml` is built from the same data; `/sitemap-index.xml` stays because GSC has it on file.

## Leads

Form (`LeadForm.astro`) → `functions/api/lead.ts` → ЦУП `POST /webhooks/web-lead`, source
`samsungrefrigerator.repair`, header `x-web-lead-token` = `WEB_LEAD_TOKEN` (Cloudflare Pages
secret, Production only — previews get 403 from ЦУП on purpose). Photos: `functions/api/plate-photo.ts`
(copied from socalcoffee.repair) stores into R2 binding `PLATE_PHOTOS`, the form passes the keys,
`lead.ts` writes absolute `/api/plate-photo/<key>` links into the message, and ЦУП attaches them
to the card. Rate limit uses KV binding `LEAD_RL` (works without it, per-isolate).

Local test of the whole chain (no ЦУП involved):
```
npx wrangler pages dev dist --r2 PLATE_PHOTOS --kv LEAD_RL --binding CUP_WEBHOOK_URL=http://127.0.0.1:<echo-port>/ --binding WEB_LEAD_TOKEN=local-test
```

## Photos

Same pipeline as vacuum.repair: `scripts/photo-prompts.json` → `node scripts/gen-photos.mjs`
(Gemini, key in `secrets/gemini-key.txt`, gitignored) → pick → `scripts/photo-picks.json` →
`node scripts/process-photos.mjs` → `src/assets/photos/<id>.jpg`; alt text in `src/data/photos.ts`.
Scenes are in-home (kitchen, drop cloth, hands of a technician, faces never visible). No
lettering anywhere — zoom into every candidate: the model draws Samsung badges and misspells
them ("SAMSELI" on the first run). Fix a single stray badge with
`node scripts/edit-photo.mjs <id>-c<N> "remove …"` and pick `"<N>e"`.

## Deploy

GitHub `robot-sova/samsungrefrigerator.repair` → Cloudflare Pages project
`samsungrefrigerator-repair` (Git integration; `main` = production). Work on `dev` → preview at
`dev.samsungrefrigerator-repair.pages.dev`; merge to `main` only with the owner's "yes".

```
npm run build   # astro build + scripts/check-site.mjs
npm run indexnow   # after a production deploy
```
