import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { sha256, verifyRelease } from "./release-lib.mjs";

export async function preflight({ dir, origin = "https://sledspec.com", timeout = 15000, fetcher = fetch }) {
  const { manifest, files } = await verifyRelease(dir);
  const base = new URL(origin);
  if (!["http:", "https:"].includes(base.protocol) || base.username || base.password || base.pathname !== "/" || base.search || base.hash) throw new Error("--origin must be an HTTP(S) origin without credentials, path, query or fragment");
  const report = { checkedAt: new Date().toISOString(), origin: base.origin, expectedRelease: manifest.releaseId, observedRelease: null, status: "unknown", checks: [] };
  async function request(route) {
    try {
      const response = await fetcher(new URL(route, base), {
        redirect: "follow", signal: AbortSignal.timeout(timeout),
        headers: { "Cache-Control": "no-cache", "User-Agent": "SledSpec-read-only-release-preflight/1" },
      });
      const data = Buffer.from(await response.arrayBuffer());
      return { response, data };
    } catch (error) { return { error: `${error.name}: ${error.message}` }; }
  }
  function compare(route, expected, status, result, kind) {
    if (result.error) { report.checks.push({ route, kind, result: "unknown", error: result.error }); return; }
    const { response, data } = result;
    const problems = [];
    if (response.status !== status) problems.push(`HTTP ${response.status}; expected ${status}`);
    if (new URL(response.url || new URL(route, base)).origin !== base.origin) problems.push("Redirected to a different origin");
    if (!data.equals(expected)) problems.push("Response bytes differ from expected release (SHA256 mismatch)");
    const check = { route, kind, result: problems.length ? "fail" : "pass", status: response.status, finalUrl: response.url, lastModified: response.headers.get("last-modified"), contentType: response.headers.get("content-type"), sha256: sha256(data), expectedSha256: sha256(expected), problems };
    if (kind === "html" || kind === "404") {
      const html = data.toString("utf8");
      check.release = html.match(/<meta name="sledspec-release" content="([^"]+)"/)?.[1] ?? null;
      check.title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? null;
      check.canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
      check.description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? null;
      check.hasReadableMain = /<main[\s>][\s\S]*<h1[\s>][\s\S]+<\/main>/.test(html);
      check.rootEmpty = /<div id="root">\s*<\/div>/.test(html);
      check.assetReferences = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(m => m[1]);
      if (check.release !== manifest.releaseId) problems.push("Missing or stale release marker");
      if (!check.hasReadableMain || check.rootEmpty) problems.push("Missing server-rendered readable page body");
      if (!check.title || !check.canonical || !check.description) problems.push("Missing title, canonical or description");
      if (kind === "404" && !/name="robots" content="noindex, follow"/.test(html)) problems.push("404 missing noindex metadata");
      check.result = problems.length ? "fail" : "pass";
    }
    report.checks.push(check);
  }
  const root = await request("/");
  compare("/", files.get("index.html"), 200, root, "html");
  if (root.error) {
    report.summary = "UNKNOWN: origin could not be read. No deployment success is established; remaining requests were skipped.";
    return report;
  }
  const release = await request("/release.json");
  compare("/release.json", Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`), 200, release, "manifest");
  if (release.data) {
    try { report.observedRelease = JSON.parse(release.data.toString("utf8")).releaseId ?? null; } catch {}
  }
  const queue = manifest.files.filter(f => !["index.html", "404.html", "CNAME", ".nojekyll"].includes(f.path));
  let index = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (index < queue.length) {
      const file = queue[index++];
      const route = file.route ?? `/${file.path}`;
      compare(route, files.get(file.path), 200, await request(route), file.route ? "html" : "asset/support");
    }
  }));
  for (const route of ["/404.html", "/__sledspec_preflight_nonexistent_route__/"]) {
    compare(route, files.get("404.html"), route === "/404.html" ? 200 : 404, await request(route), "404");
  }
  report.checks.sort((a, b) => a.route.localeCompare(b.route));
  report.status = report.checks.some(c => c.result === "fail") ? "fail" : report.checks.some(c => c.result === "unknown") ? "unknown" : "pass";
  report.summary = report.status === "pass" ? "PASS: public responses match the expected local release, including all route bodies, metadata, assets, robots, sitemap and honest 404s." :
    `${report.status.toUpperCase()}: public release is not verified. ${report.checks.filter(c => c.result === "fail").length} mismatches; ${report.checks.filter(c => c.result === "unknown").length} unreadable responses. No deployment or AdSense approval is implied.`;
  return report;
}
export function reportMarkdown(report) {
  return `# Read-only live release preflight\n\n- Checked: ${report.checkedAt}\n- Origin: ${report.origin}\n- Expected release: ${report.expectedRelease}\n- Observed release: ${report.observedRelease ?? "not established"}\n- Result: **${report.status.toUpperCase()}**\n\n${report.summary}\n\nThis check makes HTTP GET requests only. It does not deploy, change DNS, write to GitHub, or test browser hydration. Exact byte comparisons cover the expected HTML body and metadata as well as static assets. CNAME and .nojekyll are checked locally, not required as public HTTP endpoints. Network errors are unknown, never success.\n\n| Route | Result | HTTP | Evidence |\n|---|---|---|---|\n${report.checks.map(c => `| ${c.route} | ${c.result} | ${c.status ?? "unknown"} | ${[...(c.problems ?? []), c.error, c.title ? `title: ${c.title}` : "", c.release === null ? "release marker absent" : "", c.rootEmpty ? "empty React root" : ""].filter(Boolean).join("; ").replaceAll("|", "\\|")} |`).join("\n")}\n`;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  const options = { dir: path.join(import.meta.dirname, "../dist/public"), origin: "https://sledspec.com", timeout: 15000 };
  let reportBase;
  try {
    for (let i = 0; i < args.length; i += 2) {
      const value = args[i + 1];
      if (!value) throw new Error(`Missing value: ${args[i]}`);
      if (args[i] === "--dir") options.dir = path.resolve(value);
      else if (args[i] === "--origin") options.origin = value;
      else if (args[i] === "--report") reportBase = path.resolve(value);
      else if (args[i] === "--timeout-ms" && Number.isInteger(Number(value)) && Number(value) > 0) options.timeout = Number(value);
      else throw new Error(`Unknown or invalid argument: ${args[i]}`);
    }
    const report = await preflight(options);
    reportBase ??= path.join(import.meta.dirname, `../docs/live-preflight-${report.checkedAt.replaceAll(/[:.]/g, "-")}`);
    await fs.mkdir(path.dirname(reportBase), { recursive: true });
    // Local-only reports; exclusive creation protects earlier evidence.
    await fs.writeFile(`${reportBase}.json`, `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
    await fs.writeFile(`${reportBase}.md`, reportMarkdown(report), { flag: "wx" });
    console.log(`${report.summary}\nReports: ${reportBase}.{json,md}`);
    process.exitCode = report.status === "pass" ? 0 : report.status === "fail" ? 1 : 2;
  } catch (error) { console.error(`Preflight could not complete: ${error.message}`); process.exitCode = 2; }
}