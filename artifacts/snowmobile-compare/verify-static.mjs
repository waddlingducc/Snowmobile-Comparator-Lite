import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { verifyRelease } from "./scripts/release-lib.mjs";

const out = path.join(import.meta.dirname, "dist/public");
const { manifest } = await verifyRelease(out);
const { getPages, canonicalUrl } = await import(pathToFileURL(path.join(import.meta.dirname, "dist/server/entry-server.mjs")).href);
const pages = getPages();
const titles = new Set();
const descriptions = new Set();
let checkedLinks = 0;
let checkedAssets = 0;
const documents = new Map();
for (const page of [...pages, { path: "/404" }]) {
  const filename = page.path === "/404" ? "404.html" : path.join(page.path, "index.html");
  const html = await fs.readFile(path.join(out, filename), "utf8");
  documents.set(page.path, html);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${page.path}: exactly one h1`);
  assert.match(html, page.path === "/404" ? /<main[^>]*>[\s\S]+Page not found[\s\S]+<\/main>/ : /<main[^>]*>[\s\S]{500,}<\/main>/, `${page.path}: rendered main content`);
  assert.doesNotMatch(html, /\/@fs\/|src="\/src\//, `${page.path}: no development assets`);
  assert.doesNotMatch(html, />NaN|undefined hp|null hp|\$null/, `${page.path}: no invalid specs`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && !titles.has(title), `${page.path}: unique title`);
  assert.ok(desc && !descriptions.has(desc), `${page.path}: unique description`);
  titles.add(title); descriptions.add(desc);
  assert.ok(html.includes(`href="${canonicalUrl(page.path)}"`), `${page.path}: canonical`);
  if (page.path === "/404") assert.match(html, /name="robots" content="noindex, follow"/);
  else assert.match(html, /name="robots" content="index, follow"/);
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const url = match[1].replaceAll("&amp;", "&");
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
    if (!pathname.includes(".")) {
      await fs.access(path.join(out, pathname, "index.html")).catch(() => { throw new Error(`${page.path}: broken internal link ${url}`); });
      checkedLinks++;
    } else {
      await fs.access(path.join(out, pathname)).catch(() => { throw new Error(`${page.path}: missing asset ${url}`); });
      checkedAssets++;
    }
  }
}
for (const [route, html] of documents) {
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${match[1]}"`), `${route}: missing anchor ${match[1]}`);
  }
}
const sitemap = await fs.readFile(path.join(out, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(urls.sort(), pages.map(p => canonicalUrl(p.path)).sort(), "sitemap matches route inventory");
await fs.access(path.join(out, ".nojekyll"));
assert.equal((await fs.readFile(path.join(out, "CNAME"), "utf8")).trim(), "sledspec.com");
assert.match(await fs.readFile(path.join(out, "robots.txt"), "utf8"), /Sitemap: https:\/\/sledspec\.com\/sitemap\.xml/);
console.log(`PASS release ${manifest.releaseId}: ${documents.size} rendered documents, unique metadata, ${checkedLinks} internal links, ${checkedAssets} assets, anchors, sitemap, GitHub support files and all manifest SHA256 digests.`);