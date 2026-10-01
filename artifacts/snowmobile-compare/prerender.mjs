import { build } from "vite";
import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = import.meta.dirname;
const OUT = path.join(ROOT, "dist/public");
const SERVER = path.join(ROOT, "dist/server");
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[c]));

function replaceOrThrow(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Static export: missing ${label}`);
  return html.replace(pattern, () => replacement);
}

async function main() {
  // Compile with Vite rather than using a development module loader: image
  // imports now resolve to the same hashed production assets as the client.
  await build({
    configFile: path.join(ROOT, "vite.config.ts"),
    build: {
      ssr: path.join(ROOT, "src/entry-server.tsx"),
      outDir: SERVER,
      emptyOutDir: true,
      rollupOptions: { output: { entryFileNames: "entry-server.mjs" } },
    },
  });
  const { render, getPages, getPageMetadata, canonicalUrl, SITE_URL } =
    await import(pathToFileURL(path.join(SERVER, "entry-server.mjs")).href);
  const pages = getPages();
  const template = await fs.readFile(path.join(OUT, "index.html"), "utf8");
  function documentFor(page) {
    let html = template;
    html = replaceOrThrow(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`, "title");
    for (const [attribute, key, value] of [
      ["name", "description", page.description],
      ["name", "robots", page.noindex ? "noindex, follow" : "index, follow"],
      ["property", "og:title", page.title],
      ["property", "og:description", page.description],
      ["property", "og:url", canonicalUrl(page.path)],
      ["name", "twitter:title", page.title],
      ["name", "twitter:description", page.description],
    ]) {
      html = replaceOrThrow(html, new RegExp(`<meta ${attribute}="${key}"[^>]*>`), `<meta ${attribute}="${key}" content="${esc(value)}" />`, key);
    }
    html = replaceOrThrow(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(canonicalUrl(page.path))}" />`, "canonical");
    const body = render(page.path);
    if (!body.includes("<main") || !body.includes("<h1")) throw new Error(`Missing readable content: ${page.path}`);
    if (body.includes("/@fs/") || body.includes("/src/")) throw new Error(`Development asset leaked: ${page.path}`);
    html = replaceOrThrow(html, /<div id="root"><\/div>/, `<div id="root">${body}</div>`, "root");
    return html;
  }
  for (const page of pages) {
    const dir = path.join(OUT, page.path);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "index.html"), documentFor(page));
  }
  await fs.writeFile(path.join(OUT, "404.html"), documentFor(getPageMetadata("/404")));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>${esc(canonicalUrl(p.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
  await fs.writeFile(path.join(OUT, "sitemap.xml"), sitemap);
  await fs.writeFile(path.join(ROOT, "public/sitemap.xml"), sitemap);
  await fs.writeFile(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  await fs.writeFile(path.join(OUT, "CNAME"), `${new URL(SITE_URL).hostname}\n`);
  await fs.writeFile(path.join(OUT, ".nojekyll"), "");
  console.log(`Rendered ${pages.length} complete HTML pages, plus a real 404, sitemap, CNAME and .nojekyll.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});