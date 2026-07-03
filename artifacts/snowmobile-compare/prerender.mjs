import { createServer } from "vite";
import { promises as fs } from "fs";
import path from "path";

const SITE = "https://sledspec.com";
const OUT = path.resolve(import.meta.dirname, "dist/public");

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function loadData() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });
  try {
    const sleds = (await vite.ssrLoadModule("/src/data/snowmobiles.ts"))
      .snowmobiles;
    const guides = (await vite.ssrLoadModule("/src/data/guides.ts")).guides;
    return { sleds, guides };
  } finally {
    await vite.close();
  }
}

function buildPages({ sleds, guides }) {
  const pages = [
    {
      path: "/",
      title: "SledSpec.com — 2026 Snowmobile Specs, Prices & Comparisons",
      desc: "Compare 2026 snowmobiles from Ski-Doo, Polaris, Arctic Cat, and Yamaha. Side-by-side specs, pricing, and in-depth buying guides for every riding style.",
    },
    {
      path: "/about",
      title: "About SledSpec.com — How We Compare Snowmobiles",
      desc: "How SledSpec compares 2026 snowmobiles and sources specs, pricing, and buying guides.",
    },
    {
      path: "/guides",
      title: "Snowmobile Buying Guides — SledSpec.com",
      desc: "Practical guides to choosing, comparing, riding, and maintaining a snowmobile.",
    },
    ...guides.map((g) => ({
      path: `/guides/${g.id}`,
      title: `${g.title} — SledSpec.com`,
      desc: g.summary,
    })),
    ...sleds.map((s) => ({
      path: `/sled/${s.id}`,
      title: `${s.year} ${s.brand} ${s.model} — Specs, Price & Review | SledSpec.com`,
      desc: s.tagline,
    })),
    {
      path: "/faq",
      title: "Snowmobile FAQ — SledSpec.com",
      desc: "Common questions about snowmobile pricing, categories, maintenance, and safety gear.",
    },
    {
      path: "/contact",
      title: "Contact — SledSpec.com",
      desc: "Get in touch with SledSpec.com about the snowmobile comparison data.",
    },
    {
      path: "/privacy",
      title: "Privacy Policy — SledSpec.com",
      desc: "How SledSpec.com handles data, cookies, and third-party advertising.",
    },
    {
      path: "/terms",
      title: "Terms of Service — SledSpec.com",
      desc: "The terms and conditions for using SledSpec.com.",
    },
  ];
  return pages;
}

function replaceOrThrow(str, regex, replacement, label) {
  if (!regex.test(str)) {
    throw new Error(`prerender: head pattern not found (${label})`);
  }
  return str.replace(regex, () => replacement);
}

function renderHead(template, { path: p, title, desc }) {
  const t = esc(title);
  const d = esc(desc);
  const url = p === "/" ? `${SITE}/` : `${SITE}${p}/`;
  let html = template;
  html = replaceOrThrow(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`, "title");
  html = replaceOrThrow(html, /<meta name="description" content="[\s\S]*?"\s*\/>/, `<meta name="description" content="${d}" />`, "description");
  html = replaceOrThrow(html, /<meta property="og:title" content="[\s\S]*?"\s*\/>/, `<meta property="og:title" content="${t}" />`, "og:title");
  html = replaceOrThrow(html, /<meta property="og:description" content="[\s\S]*?"\s*\/>/, `<meta property="og:description" content="${d}" />`, "og:description");
  html = replaceOrThrow(html, /<meta property="og:url" content="[\s\S]*?"\s*\/>/, `<meta property="og:url" content="${url}" />`, "og:url");
  html = replaceOrThrow(html, /<meta name="twitter:title" content="[\s\S]*?"\s*\/>/, `<meta name="twitter:title" content="${t}" />`, "twitter:title");
  html = replaceOrThrow(html, /<meta name="twitter:description" content="[\s\S]*?"\s*\/>/, `<meta name="twitter:description" content="${d}" />`, "twitter:description");
  html = replaceOrThrow(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`, "canonical");
  return html;
}

async function main() {
  const { sleds, guides } = await loadData();
  const pages = buildPages({ sleds, guides });

  let template = await fs.readFile(path.join(OUT, "index.html"), "utf8");
  template = template.replace(/https:\/\/www\.sledspec\.com/g, SITE);

  for (const page of pages) {
    const html = renderHead(template, page);
    const dir =
      page.path === "/" ? OUT : path.join(OUT, page.path.replace(/^\//, ""));
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "index.html"), html, "utf8");
  }

  const notFound = renderHead(template, {
    path: "/",
    title: "Page Not Found — SledSpec.com",
    desc: "The page you were looking for could not be found on SledSpec.com.",
  }).replace(
    /<meta name="robots"[^>]*>/,
    '<meta name="robots" content="noindex" />',
  );
  await fs.writeFile(path.join(OUT, "404.html"), notFound, "utf8");

  await fs.writeFile(path.join(OUT, "CNAME"), "sledspec.com\n", "utf8");
  await fs.writeFile(path.join(OUT, ".nojekyll"), "", "utf8");

  console.log(
    `Prerendered ${pages.length} pages (+404.html, CNAME, .nojekyll) into dist/public`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
