# Read-only live release preflight

**Baseline evidence, not the final release:** the expected identifier below was added to an isolated `/tmp` copy of the pre-existing static export. No shared `dist` files or public website were changed. The main agent must build all merged changes and rerun against that final manifest before delivery or after owner deployment.

The live domain is still serving the older deployment. Independent read-only HTTP evidence from this check: the home page references `/assets/index-w7EDSHk2.js` and `/assets/index-BqxOHCqe.css`; the root response reports `Last-Modified: Mon, 06 Jul 2026 18:24:05 GMT`. Home, `/sled/23/`, `/about/` and `/contact/` return empty React root containers without readable main bodies or release markers. `/release.json` is HTTP 404. This establishes a local/public mismatch, not Google's private rejection reason or approval status.

- Checked: 2026-10-02T01:46:51.337Z
- Origin: https://sledspec.com
- Expected release: ed1de2d49511a17507612746fb164f606276c38258c900cf36babb15c895737d
- Observed release: not established
- Result: **FAIL**

FAIL: public release is not verified. 47 mismatches; 0 unreadable responses. No deployment or AdSense approval is implied.

This check makes HTTP GET requests only. It does not deploy, change DNS, write to GitHub, or test browser hydration. Exact byte comparisons cover the expected HTML body and metadata as well as static assets. CNAME and .nojekyll are checked locally, not required as public HTTP endpoints. Network errors are unknown, never success.

| Route | Result | HTTP | Evidence |
|---|---|---|---|
| / | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: SledSpec.com — 2026 Snowmobile Specs, Prices &amp; Comparisons; release marker absent; empty React root |
| /__sledspec_preflight_nonexistent_route__/ | fail | 404 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; 404 missing noindex metadata; title: Page Not Found — SledSpec.com; release marker absent; empty React root |
| /404.html | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; 404 missing noindex metadata; title: Page Not Found — SledSpec.com; release marker absent; empty React root |
| /about/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: About SledSpec.com — How We Compare Snowmobiles; release marker absent; empty React root |
| /ads.txt | pass | 200 |  |
| /assets/index-BWOALATE.js | fail | 404 | HTTP 404; expected 200; Response bytes differ from expected release (SHA256 mismatch) |
| /assets/index-M7a-sbui.css | fail | 404 | HTTP 404; expected 200; Response bytes differ from expected release (SHA256 mismatch) |
| /assets/norm_id01-DdOcIWO0.jpg | pass | 200 |  |
| /assets/norm_id02-DcDlE2Bh.jpg | pass | 200 |  |
| /assets/norm_id03-LzTH5xBz.jpg | pass | 200 |  |
| /assets/norm_id04-D-p-uibZ.jpg | pass | 200 |  |
| /assets/norm_id05-Bcq7Hi87.jpg | pass | 200 |  |
| /assets/norm_id06-BZ6UurGe.jpg | pass | 200 |  |
| /assets/norm_id07-C0pyxg43.jpg | pass | 200 |  |
| /assets/norm_id08-B8cZoEx6.jpg | pass | 200 |  |
| /assets/norm_id09-CtUyLuU1.jpg | pass | 200 |  |
| /assets/norm_id10-DP000FS4.jpg | pass | 200 |  |
| /assets/norm_id11-BFc9uOvv.jpg | pass | 200 |  |
| /assets/norm_id12-CtL-uQPA.jpg | pass | 200 |  |
| /assets/norm_id13-Dc3DGlWA.jpg | pass | 200 |  |
| /assets/norm_id14-DtLOdo5r.jpg | pass | 200 |  |
| /assets/norm_id15-gg1-yIis.jpg | pass | 200 |  |
| /assets/norm_id16-DPVCsOyW.jpg | pass | 200 |  |
| /assets/norm_id17-B3PZPkiM.jpg | pass | 200 |  |
| /assets/norm_id18-BOUqHMxi.jpg | pass | 200 |  |
| /assets/norm_id19-DPXobXGW.jpg | pass | 200 |  |
| /assets/norm_id20-1O0IZfIC.jpg | pass | 200 |  |
| /assets/norm_id21-BNK623IH.jpg | pass | 200 |  |
| /assets/norm_id22-ZEE5XwoD.jpg | pass | 200 |  |
| /assets/norm_id23-BjlbG5i_.jpg | pass | 200 |  |
| /contact/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: Contact — SledSpec.com; release marker absent; empty React root |
| /faq/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: Snowmobile FAQ — SledSpec.com; release marker absent; empty React root |
| /favicon-sled.png | fail | 200 | Response bytes differ from expected release (SHA256 mismatch) |
| /favicon.svg | fail | 404 | HTTP 404; expected 200; Response bytes differ from expected release (SHA256 mismatch) |
| /guides/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: Snowmobile Buying Guides — SledSpec.com; release marker absent; empty React root |
| /guides/2-stroke-vs-4-stroke/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2-Stroke vs. 4-Stroke Snowmobile Engines Explained — SledSpec.com; release marker absent; empty React root |
| /guides/best-beginner-snowmobiles/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: Best Snowmobiles for Beginners in 2026 — SledSpec.com; release marker absent; empty React root |
| /guides/how-to-choose/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: How to Choose Your First Snowmobile — SledSpec.com; release marker absent; empty React root |
| /guides/reading-specs/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: How to Read Snowmobile Specs (And What Actually Matters) — SledSpec.com; release marker absent; empty React root |
| /guides/safety-gear/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: Snowmobile Safety &amp; Gear: What You Actually Need — SledSpec.com; release marker absent; empty React root |
| /guides/snowmobile-maintenance/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: Snowmobile Pre-Season Maintenance: A Complete Checklist — SledSpec.com; release marker absent; empty React root |
| /guides/trail-vs-mountain/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: Trail vs. Mountain Snowmobiles: What's the Difference? — SledSpec.com; release marker absent; empty React root |
| /opengraph.jpg | fail | 404 | HTTP 404; expected 200; Response bytes differ from expected release (SHA256 mismatch) |
| /privacy/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: Privacy Policy — SledSpec.com; release marker absent; empty React root |
| /release.json | fail | 404 | HTTP 404; expected 200; Response bytes differ from expected release (SHA256 mismatch) |
| /robots.txt | fail | 200 | Response bytes differ from expected release (SHA256 mismatch) |
| /sitemap.xml | fail | 200 | Response bytes differ from expected release (SHA256 mismatch) |
| /sled/1/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Ski-Doo Summit X Expert — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/10/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Polaris Switchback Assault 850 — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/11/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Polaris Titan Adventure — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/12/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Polaris Indy XC 650 — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/13/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Arctic Cat M 858 Sno Pro — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/14/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Arctic Cat ZR 858 RR — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/15/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Arctic Cat Riot 858 — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/16/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Arctic Cat ZR 600 137 — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/17/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Arctic Cat M 600 Alpha One — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/18/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Arctic Cat Pantera 7000 — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/19/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2025 Yamaha Sidewinder SRX LE — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/2/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Ski-Doo Renegade X-RS — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/20/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2025 Yamaha Sidewinder M-TX LE — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/21/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2025 Yamaha SR Viper L-TX GT — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/22/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2025 Yamaha SR Viper L-TX — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/23/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2025 Yamaha Transporter Lite — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/3/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Ski-Doo MXZ X-RS — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/4/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Ski-Doo Freeride 850 — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/5/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Ski-Doo Backcountry X-RS — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/6/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Ski-Doo Expedition SE — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/7/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Polaris RMK Khaos Slash — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/8/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Polaris PRO RMK 850 — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /sled/9/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: 2026 Polaris Indy VR1 — Specs, Price &amp; Review \| SledSpec.com; release marker absent; empty React root |
| /terms/ | fail | 200 | Response bytes differ from expected release (SHA256 mismatch); Missing or stale release marker; Missing server-rendered readable page body; title: Terms of Service — SledSpec.com; release marker absent; empty React root |
