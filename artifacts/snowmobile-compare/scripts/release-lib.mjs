import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export const sha256 = (data) => createHash("sha256").update(data).digest("hex");
const marker = /<meta name="sledspec-release" content="[a-f0-9]{64}"\s*\/?>\n?/g;
export const unmarked = (data) => Buffer.from(data.toString("utf8").replace(marker, ""));
export async function inventory(dir, prefix = "") {
  const files = [];
  for (const entry of await fs.readdir(path.join(dir, prefix), { withFileTypes: true })) {
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Symlink is not a release file: ${name}`);
    if (entry.isDirectory()) files.push(...await inventory(dir, name));
    else if (entry.isFile() && name !== "release.json") files.push(name);
    else if (!entry.isFile()) throw new Error(`Unsupported release entry: ${name}`);
  }
  return files.sort();
}
export async function snapshot(dir) {
  return new Map(await Promise.all((await inventory(dir)).map(async name => [name, await fs.readFile(path.join(dir, name))])));
}
export function contentId(files) {
  // JSON encodes file boundaries unambiguously. Hash HTML before the marker is
  // inserted, avoiding a self-referential digest. No clocks or source mtimes.
  return sha256(JSON.stringify([...files].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
    .map(([name, data]) => [name, sha256(name.endsWith(".html") ? unmarked(data) : data)])));
}
export async function emitRelease(dir, siteUrl) {
  const files = await snapshot(dir);
  const releaseId = contentId(files);
  for (const [name, data] of files) {
    if (!name.endsWith(".html")) continue;
    const html = unmarked(data).toString("utf8");
    if (!html.includes("</head>")) throw new Error(`Missing head: ${name}`);
    // Outside the React root: the release marker cannot change hydration.
    const output = Buffer.from(html.replace("</head>", `<meta name="sledspec-release" content="${releaseId}" />\n</head>`));
    await fs.writeFile(path.join(dir, name), output);
    files.set(name, output);
  }
  const manifest = {
    schemaVersion: 1,
    releaseId,
    algorithm: "sha256",
    idBasis: "sorted [relative path, SHA256 of file bytes with sledspec-release meta removed from HTML]; release.json excluded",
    siteUrl,
    files: [...files].map(([name, data]) => ({
      path: name, bytes: data.length, sha256: sha256(data),
      ...(name.endsWith(".html") ? {
        route: name === "404.html" ? "/404.html" : name === "index.html" ? "/" : `/${name.slice(0, -"index.html".length)}`,
        status: name === "404.html" ? 404 : 200,
      } : {}),
    })),
  };
  await fs.writeFile(path.join(dir, "release.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}
export async function verifyRelease(dir) {
  const manifest = JSON.parse(await fs.readFile(path.join(dir, "release.json"), "utf8"));
  if (manifest.schemaVersion !== 1 || manifest.algorithm !== "sha256" || !/^[a-f0-9]{64}$/.test(manifest.releaseId)) throw new Error("Invalid release manifest header");
  const files = await snapshot(dir);
  if (JSON.stringify([...files.keys()]) !== JSON.stringify(manifest.files.map(f => f.path))) throw new Error("Manifest inventory differs from release directory");
  for (const file of manifest.files) {
    const data = files.get(file.path);
    if (data.length !== file.bytes || sha256(data) !== file.sha256) throw new Error(`Integrity mismatch: ${file.path}`);
    if (file.path.endsWith(".html")) {
      const html = data.toString("utf8");
      const matches = [...html.matchAll(/<meta name="sledspec-release" content="([^"]+)"/g)];
      if (matches.length !== 1 || matches[0][1] !== manifest.releaseId || html.indexOf(matches[0][0]) > html.indexOf("</head>")) throw new Error(`Release marker mismatch: ${file.path}`);
      const expectedRoute = file.path === "404.html" ? "/404.html" : file.path === "index.html" ? "/" : `/${file.path.slice(0, -"index.html".length)}`;
      if (file.route !== expectedRoute || file.status !== (file.path === "404.html" ? 404 : 200)) throw new Error(`Invalid route mapping: ${file.path}`);
    }
  }
  if (contentId(files) !== manifest.releaseId) throw new Error("Content-derived release identifier mismatch");
  for (const required of ["index.html", "404.html", ".nojekyll", "CNAME", "robots.txt", "sitemap.xml"]) {
    if (!files.has(required)) throw new Error(`Missing required release file: ${required}`);
  }
  return { manifest, files };
}