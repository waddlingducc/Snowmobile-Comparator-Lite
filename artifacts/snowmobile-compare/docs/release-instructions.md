# SledSpec root-site release instructions

These commands prepare an upload; they do not publish anything or promise AdSense acceptance. Run from `artifacts/snowmobile-compare`. The final build must wait until all editorial/code changes finish.

## Build, verify and package

```sh
pnpm run build:static
pnpm run verify:static
pnpm run test:release
pnpm run package:static
```

The package command reads the completed `dist/public` only. It produces `sledspec-<64-character-release-id>.zip` beside package.json and prints the ZIP SHA256. It never overwrites an existing ZIP; preserve the existing package or choose a **new** output path:

```sh
node scripts/package-static.mjs dist/public /tmp/sledspec-release-check.zip
```

Do not build concurrently with packaging. The packager verifies the directory before and after snapshotting, checks all ZIP entry bytes/CRCs and the central directory, then reads and checks the written file. Same emitted content yields the same release ID and ZIP bytes regardless of mtimes. STORE compression is deliberate for reproducibility across Node/zlib versions. No Python, zip utility, package install or deployment credential is required.

`release.json` inventories every exported file except itself with byte length and SHA256. The identifier hashes sorted paths and content digests, with its own HTML meta marker removed to avoid self-reference. Every HTML document includes `<meta name="sledspec-release" ...>` in the head, outside React's root. The manifest has no build clock; live reports do have check timestamps. The manifest is an integrity check, not a signed attestation or proof of ownership.

## Confirm the actual GitHub Pages publishing source — owner action

Before upload, the repository owner must open **GitHub repository → Settings → Pages → Build and deployment**, confirm the custom domain is still **sledspec.com**, and record the actual source:

- **Deploy from a branch:** record the selected branch and selected folder (`/(root)` or `/docs`). Upload the extracted files into that exact folder of that exact branch.
- **GitHub Actions:** identify the workflow and the artifact directory it publishes (for example the path passed to `actions/upload-pages-artifact`). Put the extracted files in that directory or have the existing authorized build publish this release. Committing unrelated root files will not necessarily update Pages.

This task cannot see the owner's Pages settings, repository permissions or deployment job. Do not infer the source from a ZIP filename, a local build or the custom domain. Confirm the successful Pages deployment in GitHub after the owner-authorized upload; this still requires a public preflight.

## Extract and upload the contents, not a wrapper folder

The ZIP is root-layout: `index.html`, `404.html`, `release.json`, `assets/`, each route folder, `robots.txt`, `sitemap.xml`, `ads.txt`, `CNAME` and **`.nojekyll`** appear directly at its root. Enable “show hidden files” in your file manager. Some web upload/file-selection dialogs skip hidden files; explicitly include `.nojekyll`. Preserve `CNAME` with `sledspec.com` and do not change DNS or replace it with a preview hostname.

Extract to a clean directory and compare its contents to `release.json`. Upload **all extracted entries** to the confirmed publishing folder, not the ZIP itself, `dist/`, `dist/public/`, a `sledspec-*` wrapper or the server bundle. Replace obsolete published routes/assets only within the confirmed site publishing directory; do not delete repository source, workflows or unrelated files. Preserve a rollback copy of the previous published site.

To verify a clean extraction locally (optional):

```sh
node --input-type=module -e 'import {verifyRelease} from "./scripts/release-lib.mjs"; console.log((await verifyRelease("/absolute/path/to/extracted-release")).manifest.releaseId)'
```

## Read-only live verification

After the owner confirms deployment completion:

```sh
pnpm run preflight:live
# Explicit options, when needed:
node scripts/live-preflight.mjs --dir dist/public --origin https://sledspec.com --timeout-ms 15000 --report docs/live-preflight-owner-deployment-unique
```

The default is the real existing domain, not a preview. This CLI makes HTTP GET requests only and writes reports locally. It fetches every expected readable route, emitted asset/support file, the manifest, the direct 404 document and a deliberately nonexistent deep link. It checks route HTTP status, same-origin redirects, exact expected bytes (therefore body and metadata), release markers, readable main content, robots/sitemap and a genuine HTTP 404 with the expected noindex error body. `CNAME` and `.nojekyll` are checked locally, not required as HTTP endpoints. Default timeout is per request, with four concurrent requests; large releases may take several minutes.

Both JSON details and a Markdown summary are saved with a unique timestamp by default; explicit report paths also refuse to overwrite earlier reports. Exit codes: **0 = exact expected release verified**, **1 = observed mismatch**, **2 = network/validation unknown or unable to complete**. A network failure is never success. A stale public page without a release marker remains a failure even if its assets load. A partial upload, soft 404, mismatched metadata or asset fails. CDN HTML transformations can cause conservative byte mismatches: investigate, never bypass them to claim success.

When a check predates the final build, label it as baseline evidence and run again against the final release. “Ready to upload; public deployment still pending” is the correct status until a complete check passes. This validator does not test interactive hydration, consent configuration, contact delivery, image permissions, the owner's AdSense account or Google's private review reasoning; those remain separate checks.