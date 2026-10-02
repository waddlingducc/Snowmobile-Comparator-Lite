import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { sha256, verifyRelease } from "./release-lib.mjs";

const table = Array.from({ length: 256 }, (_, n) => {
  for (let bit = 0; bit < 8; bit++) n = (n & 1) ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
const crc32 = data => {
  let crc = 0xffffffff;
  for (const byte of data) crc = table[(crc ^ byte) & 255] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};
export function makeZip(files) {
  const local = [], central = [];
  let offset = 0;
  for (const [name, data] of [...files].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)) {
    if (data.length > 0xffffffff || offset > 0xffffffff) throw new Error("ZIP64-sized releases are not supported");
    const filename = Buffer.from(name);
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0); header.writeUInt16LE(20, 4);
    header.writeUInt16LE(0x800, 6); // UTF-8, STORE: reproducible across zlib versions.
    header.writeUInt16LE(33, 12); // 1980-01-01, 00:00:00, independent of file mtimes.
    header.writeUInt32LE(crc32(data), 14);
    header.writeUInt32LE(data.length, 18); header.writeUInt32LE(data.length, 22);
    header.writeUInt16LE(filename.length, 26);
    const entry = Buffer.alloc(46);
    entry.writeUInt32LE(0x02014b50, 0); entry.writeUInt16LE(20, 4); entry.writeUInt16LE(20, 6);
    header.copy(entry, 8, 6, 30);
    entry.writeUInt32LE(offset, 42);
    local.push(header, filename, data); central.push(entry, filename);
    offset += header.length + filename.length + data.length;
  }
  if (files.size > 65535) throw new Error("Too many files for a classic ZIP");
  const directory = Buffer.concat(central), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.size, 8); end.writeUInt16LE(files.size, 10);
  end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, directory, end]);
}
export function verifyZip(zip, expected) {
  let offset = 0;
  const found = new Map();
  while (zip.readUInt32LE(offset) === 0x04034b50) {
    if (zip.readUInt16LE(offset + 8) !== 0) throw new Error("Unexpected compressed ZIP entry");
    const size = zip.readUInt32LE(offset + 18), nameLength = zip.readUInt16LE(offset + 26), extraLength = zip.readUInt16LE(offset + 28);
    const name = zip.subarray(offset + 30, offset + 30 + nameLength).toString("utf8");
    const begin = offset + 30 + nameLength + extraLength;
    const data = zip.subarray(begin, begin + size);
    if (!expected.has(name) || found.has(name) || !data.equals(expected.get(name)) || crc32(data) !== zip.readUInt32LE(offset + 14)) throw new Error(`ZIP integrity failure: ${name}`);
    found.set(name, data);
    offset = begin + size;
  }
  if (found.size !== expected.size || zip.readUInt32LE(offset) !== 0x02014b50) throw new Error("ZIP inventory mismatch");
  // Check central directory too, not merely extracted bytes.
  for (let i = 0; i < found.size; i++) {
    if (zip.readUInt32LE(offset) !== 0x02014b50) throw new Error("Invalid ZIP directory");
    const nameLength = zip.readUInt16LE(offset + 28);
    const name = zip.subarray(offset + 46, offset + 46 + nameLength).toString("utf8");
    const data = found.get(name);
    const localOffset = zip.readUInt32LE(offset + 42);
    if (!data || zip.readUInt32LE(offset + 16) !== crc32(data) || zip.readUInt32LE(offset + 24) !== data.length || zip.readUInt32LE(localOffset) !== 0x04034b50) throw new Error("Invalid ZIP central entry");
    offset += 46 + nameLength + zip.readUInt16LE(offset + 30) + zip.readUInt16LE(offset + 32);
  }
  if (zip.readUInt32LE(offset) !== 0x06054b50 || offset + 22 !== zip.length || zip.readUInt16LE(offset + 10) !== found.size) throw new Error("Invalid ZIP footer");
  if (!zip.equals(makeZip(expected))) throw new Error("ZIP differs from the deterministic root-layout encoding");
}
export async function packageRelease(dir, output) {
  const relativeOutput = path.relative(path.resolve(dir), path.resolve(output));
  if (relativeOutput === "" || (!relativeOutput.startsWith(`..${path.sep}`) && relativeOutput !== ".." && !path.isAbsolute(relativeOutput))) throw new Error("ZIP output must be outside the release directory");
  const manifestBytes = await fs.readFile(path.join(dir, "release.json"));
  const { manifest, files } = await verifyRelease(dir);
  files.set("release.json", manifestBytes);
  const zip = makeZip(files);
  verifyZip(zip, files);
  // Reject a concurrently changed build; do not rebuild or overwrite any ZIP.
  const after = await verifyRelease(dir);
  if (after.manifest.releaseId !== manifest.releaseId || !(await fs.readFile(path.join(dir, "release.json"))).equals(manifestBytes)) throw new Error("Build changed during packaging; retry after build finishes");
  const handle = await fs.open(output, "wx");
  try {
    await handle.writeFile(zip);
    await handle.close();
    const written = await fs.readFile(output);
    verifyZip(written, files);
    if (!written.equals(zip)) throw new Error("Written ZIP differs from packaged bytes");
  } catch (error) {
    await handle.close().catch(() => {});
    await fs.unlink(output).catch(() => {});
    throw error;
  }
  return { releaseId: manifest.releaseId, sha256: sha256(zip), bytes: zip.length, output };
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const dir = path.resolve(process.argv[2] ?? path.join(import.meta.dirname, "../dist/public"));
  try {
    const { manifest } = await verifyRelease(dir);
    const output = path.resolve(process.argv[3] ?? path.join(import.meta.dirname, `../sledspec-${manifest.releaseId}.zip`));
    console.log(JSON.stringify(await packageRelease(dir, output), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}