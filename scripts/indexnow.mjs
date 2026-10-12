#!/usr/bin/env node
// scripts/indexnow.mjs — IndexNow ping for samsungrefrigerator.repair.
//
// Usage:
//   node scripts/indexnow.mjs                 # submits every URL from the live /sitemap.xml
//   node scripts/indexnow.mjs <url> [...]     # submits specific URLs (path or absolute)
//
// The URL list comes from https://samsungrefrigerator.repair/sitemap.xml (falls back to dist/sitemap.xml
// after a local build) — never hardcoded. Key file: public/<KEY>.txt, deployed to the site root.
// 200/202 = accepted; 403 = key file not reachable yet (deploy first, then re-run).

import { readFile } from "node:fs/promises";

const HOST = "samsungrefrigerator.repair";
const KEY = "c55430d71b978e2b0ba428884649ebb2";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function sitemapXml() {
  try {
    const res = await fetch(`https://${HOST}/sitemap.xml`);
    if (res.ok) return await res.text();
  } catch {}
  return readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
}

const args = process.argv.slice(2);
let urlList;
if (args.length > 0) {
  urlList = args.map((u) => (u.startsWith("http") ? u : `https://${HOST}${u.startsWith("/") ? "" : "/"}${u}`));
} else {
  const xml = await sitemapXml();
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (urlList.length === 0) throw new Error("No URLs found in the sitemap");

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

console.log(`IndexNow → ${res.status} ${res.statusText} for ${urlList.length} URL(s)`);
if (res.status !== 200 && res.status !== 202) {
  console.log("Note: 403 usually means the key file isn't reachable yet at", KEY_LOCATION);
}
