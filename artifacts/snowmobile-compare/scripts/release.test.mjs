import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { emitRelease, verifyRelease } from "./release-lib.mjs";
import { packageRelease, verifyZip } from "./package-static.mjs";
import { preflight } from "./live-preflight.mjs";

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "sledspec-release-test-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const dir = path.join(root, "public");
  await fs.mkdir(path.join(dir, "about"), { recursive: true });
  await fs.mkdir(path.join(dir, "assets"));
  // Synthetic content is confined to tests, never a production fallback.
  const html = title => `<html><head><title>${title}</title><meta name="description" content="${title} description" /><meta name="robots" content="${title === "Not found" ? "noindex, follow" : "index, follow"}" /><link rel="canonical" href="https://sledspec.com/" /></head><body><div id="root"><main><h1>${title}</h1><p>Fixture reader content.</p></main></div></body></html>`;
  for (const [name, data] of Object.entries({
    "index.html": html("Home"), "about/index.html": html("About"), "404.html": html("Not found"),
    ".nojekyll": "", "CNAME": "sledspec.com\n", "robots.txt": "User-agent: *\nAllow: /\n",
    "sitemap.xml": "<urlset></urlset>", "assets/example.js": "console.log('test');",
  })) await fs.writeFile(path.join(dir, name), data);
  await emitRelease(dir, "https://sledspec.com");
  return { root, dir };
}
function mocked(files, alter = () => {}) {
  return async url => {
    const route = new URL(url).pathname;
    const name = route === "/" ? "index.html" : route === "/__sledspec_preflight_nonexistent_route__/" ? "404.html" : route.endsWith("/") ? `${route.slice(1)}index.html` : route.slice(1);
    const result = { data: files.get(name), status: route === "/__sledspec_preflight_nonexistent_route__/" ? 404 : 200 };
    alter(route, result);
    return new Response(result.data, { status: result.status });
  };
}
test("content id and root ZIP are deterministic; hidden files survive; output is exclusive", async t => {
  const { root, dir } = await fixture(t);
  const first = await verifyRelease(dir);
  const again = await emitRelease(dir, "https://sledspec.com");
  assert.equal(again.releaseId, first.manifest.releaseId);
  await fs.utimes(path.join(dir, "index.html"), new Date(), new Date());
  const a = await packageRelease(dir, path.join(root, "a.zip"));
  const b = await packageRelease(dir, path.join(root, "b.zip"));
  assert.equal(a.sha256, b.sha256);
  const files = (await verifyRelease(dir)).files;
  files.set("release.json", await fs.readFile(path.join(dir, "release.json")));
  const zip = await fs.readFile(a.output);
  verifyZip(zip, files);
  assert.ok(zip.includes(Buffer.from(".nojekyll")));
  assert.ok(zip.includes(Buffer.from("CNAME")));
  await assert.rejects(packageRelease(dir, a.output), /EEXIST/);
  const corrupt = Buffer.from(zip); corrupt[45] ^= 1;
  assert.throws(() => verifyZip(corrupt, files));
});
test("manifest rejects changed content, missing file, unexpected file and forged marker", async t => {
  const { dir } = await fixture(t);
  const js = path.join(dir, "assets/example.js");
  await fs.appendFile(js, "changed");
  await assert.rejects(verifyRelease(dir), /Integrity mismatch/);
  await emitRelease(dir, "https://sledspec.com");
  await fs.unlink(js);
  await assert.rejects(verifyRelease(dir), /inventory differs/);
  await emitRelease(dir, "https://sledspec.com");
  await fs.writeFile(path.join(dir, "unexpected.txt"), "extra");
  await assert.rejects(verifyRelease(dir), /inventory differs/);
  await fs.unlink(path.join(dir, "unexpected.txt"));
  const html = await fs.readFile(path.join(dir, "index.html"), "utf8");
  await fs.writeFile(path.join(dir, "index.html"), html.replace(/content="[a-f0-9]{64}"/, `content="${"0".repeat(64)}"`));
  await assert.rejects(verifyRelease(dir), /Integrity mismatch/);
});
test("live fixture passes only exact release and real 404; stale HTML/assets/metadata/support fail", async t => {
  const { dir } = await fixture(t);
  const files = (await verifyRelease(dir)).files;
  files.set("release.json", await fs.readFile(path.join(dir, "release.json")));
  const run = alter => preflight({ dir, fetcher: mocked(files, alter) });
  assert.equal((await run()).status, "pass");
  for (const [route, alteration] of [
    ["/", r => { r.data = Buffer.from('<html><title>Old</title><div id="root"></div></html>'); }],
    ["/assets/example.js", r => { r.data = Buffer.from("old asset"); }],
    ["/about/", r => { r.status = 404; }],
    ["/sitemap.xml", r => { r.data = Buffer.from("old sitemap"); }],
    ["/robots.txt", r => { r.data = Buffer.from("Disallow: /"); }],
    ["/__sledspec_preflight_nonexistent_route__/", r => { r.status = 200; }],
    ["/release.json", r => { r.status = 404; }],
    ["/about/", r => { r.data = Buffer.from(r.data.toString().replace("About description", "wrong description")); }],
  ]) {
    const report = await run((current, result) => { if (current === route) alteration(result); });
    assert.equal(report.status, "fail", route);
  }
});
test("network-inaccessible origin is unknown, never a pass; invalid local input stops", async t => {
  const { dir } = await fixture(t);
  const report = await preflight({ dir, fetcher: async () => { throw new Error("fixture offline"); } });
  assert.equal(report.status, "unknown");
  assert.equal(report.checks.length, 1);
  await assert.rejects(preflight({ dir, origin: "https://sledspec.com/wrong-path" }), /origin/);
  await fs.unlink(path.join(dir, "release.json"));
  await assert.rejects(preflight({ dir }), /ENOENT/);
});