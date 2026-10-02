# Catalog research audit

> Historical first-pass audit. For the subsequent full-manual research, resolved Arctic Cat fields, regional conflicts and current per-model evidence, use [source-audit-rework.md](source-audit-rework.md). Do not treat the unresolved fields below as the current catalog state.

Research performed: **2026-10-01 UTC**, established from the execution environment's actual date. This is not a review publication date or a claim of ongoing live verification.

## Scope and editorial standard

All 23 existing numeric catalog IDs and image imports are preserved. This work changes only the catalog, its new research module and this report. Manufacturer descriptions are evidence of published equipment, not evidence of independent performance, reliability, steering feel or ride quality. No riding, dyno testing, weighing, dealership visits or expert credentials are claimed.

Primary sources were searched and fetched, not merely attached as plausible links. Ski-Doo's North American MY26 PDFs and previous-model pages and Polaris's engine/length-specific MY26 specification pages yielded substantial configuration-level evidence. Yamaha's live pages retain explicitly dated 2024/2025 model records. Arctic Cat's old sales URLs now resolve to 2027 category pages: this is an important limitation, not evidence that 2027 equipment was available in 2026.

`null` means **not established for this configuration by this research**, never zero, nonexistent or universally unpublished. Exact horsepower estimates have not been derived from displacement, family badges, dyno reports or horsepower-class marketing. Starting MSRP is not an out-the-door quote, used valuation or proof of stock. Dry and estimated dry weights are not ready-to-ride measurements.

## Exported UI contract

`src/data/snowmobiles.ts` still exports `Snowmobile`, `Category` and `snowmobiles`.

- `price`, `horsepower`, `weight`, `displacement`, `trackLength` and `year` are `number | null`.
- Units remain USD starting MSRP, hp, dry/estimated dry pounds, cc and inches.
- All 23 IDs remain stable; category and corrected display name may change.
- Descriptions come from each research record's first analysis paragraph, keeping the source-grounded introduction consistent.
- `officialUrl` is the first research source URL and may be a manufacturer specification PDF or archive, not necessarily a sales landing page.
- Images are retained illustrations. This research did not authenticate every image against the corrected model/trim/year.

`src/data/model-research.ts` exports:

- `modelResearch: Record<number, ModelResearch>` with an entry for every ID.
- `RESEARCH_DATE` and `RESEARCH_METHOD`.
- `ModelResearch`: `checkedAt`, `status`, `configuration`, `analysis: string[]`, `fit: string[]`, `limitations: string[]`, `buyingQuestions: string[]`, `alternatives: {id, reason}[]`, `sources`, `specNotes`.
- `status`: `documented | partial | archived`. **Documented does not mean every field is verified.** Archived is an older explicitly identified model-year record, not an assertion that parts or dealer inventory are unavailable.
- `sources`: `{label, url, note, checkedAt, status}`. Source status is `read | redirected | partial-extraction | unavailable`, describing retrieval scope rather than certifying every field.
- `specNotes`: a required string for each of `price`, `horsepower`, `weight`, `displacement`, `trackLength`, `year`. Display these with the relevant figures, especially regional Cat track evidence and weight definitions.

Every model has two individually written buyer-analysis paragraphs, fit criteria, limitations, three purchasing questions and two alternative IDs with reasons. These are editorial implications of equipment or evidence gaps, not disguised ride tests.

## Findings by retained ID

Values below use `—` for null. Read the linked source and per-field qualifications before ranking.

| ID | Corrected identity / configuration | cc | hp | dry lb | track in | US starting MSRP |
|---|---|---:|---:|---:|---:|---:|
| 1 | 2026 Summit X with Expert Package, Turbo R / 165 | 849 | 180* | 461 | 165 | — |
| 2 | 2026 Renegade X-RS, 900 ACE Turbo R | 899 | 180 | 542 | 137 | 18,799 |
| 3 | 2026 MXZ X-RS, 850 E-TEC / 129, not Competition | 849 | 165 | 497 | 129 | — |
| 4 | 2026 Freeride 850 Turbo R / 154 | 849 | 180* | 465 | 154 | — |
| 5 | 2026 Backcountry X-RS, 850 E-TEC / 154 | 849 | 165 | 482 | 154 | — |
| 6 | 2026 Expedition SE, 900 ACE Turbo, not R | 899 | 130 | 683 | 154 | — |
| 7 | 2026 850 RMK Khaos 155 | 840 | — | 426† | 155 | 17,449 |
| 8 | 2026 850 PRO RMK 165 | 840 | — | 428† | 165 | — |
| 9 | 2026 Patriot Boost INDY VR1 137 DYNAMIX | 840 | — | 531† | 137 | — |
| 10 | 2026 850 Switchback Assault 146 Escape IFS | 840 | — | 494† | 146 | 17,899 |
| 11 | 2026 650 TITAN Adventure 155 | 650 | — | 667† | 155 | — |
| 12 | 2026 650 INDY XC 137 | 650 | — | 495† | 137 | 15,549 |
| 13 | 2026 M 858 Sno Pro, regional variant evidence | — | — | — | 154‡ | — |
| 14 | 2026 ZR 858 R-XC, corrected from RR | — | — | — | 137‡ | — |
| 15 | 2026 Riot 858 Sno Pro, not current XF | — | — | — | 146‡ | — |
| 16 | 2026 ZR 600, exact build unresolved | — | — | — | — | — |
| 17 | 2026 M 600 Sno Pro, Alpha/track unresolved | — | — | — | — | — |
| 18 | 2026 Pantera 7000, sales specs unresolved | — | — | — | — | — |
| 19 | Archived 2025 Sidewinder SRX LE EPS | 998 | — | — | 137 | 21,499 |
| 20 | Archived 2025 Sidewinder M-TX LE 153 | 998 | — | — | 153 | 19,999 |
| 21 | Archived 2025 SRViper L-TX GT | 1049 | — | — | 137 | 16,299 |
| 22 | Archived **2024 SRViper L-TX GT**, not 2025 base | 1049 | — | — | 137 | 16,199 |
| 23 | Archived 2025 Transporter Lite | 397 | — | — | 146 | 9,999 |

*BRP qualifies Turbo R mountain power as 180 hp up to 8,000 ft. These are manufacturer claims, not measured comparative results.*

†Polaris explicitly labels these as **estimated dry** weights.

‡The 2026 shared Cat operator manual's EU model-code table explicitly identifies these lengths. They confirm a regional variant, not every US trim. The UI must not suppress this qualification.

## Primary-source register and model-specific decisions

### Ski-Doo: IDs 1–6

1. [MY26 Summit archive](https://ski-doo.brp.com/us/en/models/previous-models/2026/summit.html): Expert-package table specifies 457/461 lb for Turbo R at 154/165 and 438/442 for naturally aspirated. The selected 165 turbo is 461, not the former 463. Published engine/color starting prices do not resolve a complete 165-inch quote; price left null.
2. [MY26 Renegade X-RS PDF](https://ski-doo.brp.com/content/dam/global/en/ski-doo/my26/spec-sheets/na/en/SKI-MY26-REN-X-RS-SPEC-ENNA-Page-LR.pdf) and [MY26 Renegade archive](https://ski-doo.brp.com/us/en/models/previous-models/2026/renegade.html): 542 lb, RAS RX, heated trail seat, optional Smart-Shox. Black X-RS starting MSRP $18,799 is tied to the Turbo R/137 range; Mineral Blue is $19,099. Corrected category to Trail. No off-trail handling promise.
3. [MY26 MXZ archive](https://ski-doo.brp.com/us/en/models/previous-models/2026/mxz.html) and [X-RS PDF](https://ski-doo.brp.com/content/dam/global/en/ski-doo/my26/spec-sheets/na/en/SKI-MY26-MXZ-X-RS-SPEC-ENNA-Page-LR.pdf): X-RS 850/129 weight is 497 lb; 506 belongs to 850/137. Kept separate from Competition Package, X, Blizzard and Adrenaline. Optional Smart-Shox is not universally standard.
4. [MY26 Freeride archive](https://ski-doo.brp.com/us/en/models/previous-models/2026/freeride.html) and [PDF](https://ski-doo.brp.com/content/dam/global/en/ski-doo/my26/spec-sheets/na/en/SKI-MY26-FREE-SPEC-ENNA-Page-LR.pdf): Turbo R/154 is 465 lb. Documented KYB Pro 40 EA-3/tMotion XT. Removed claim that a 154 mountain model is inherently suited to split trail/backcountry use.
5. [MY26 Backcountry archive](https://ski-doo.brp.com/us/en/models/previous-models/2026/backcountry.html): naturally aspirated X-RS/154 is 482 lb. Rear suspension is cMotion X. Turbo R weight/track is separate. Stance, skis and profile require actual build matching.
6. [MY26 Expedition archive](https://ski-doo.brp.com/us/en/models/previous-models/2026/expedition.html): non-R SE turbo is 130 hp/899 cc/683 lb. Rear suspension is uMotion with ACS. Corrected utility orientation and removed unverified standard winch/heated-seat claims. Passenger heated grips and removable seat are documented.

### Polaris: IDs 7–12

Read the following configuration-level pages, including engine, dimensions, suspension and features—not just the family page's default engine:

7. [850 Khaos 155 specs](https://www.polaris.com/en-us/snowmobiles/2026/rmk/rmk-khaos/850-rmk-khaos-155-specs/). [Family page](https://www.polaris.com/en-us/snowmobiles/2026/rmk/rmk-khaos/) describes 146/155/165. The [2026 VR1 page's related-model cards](https://www.polaris.com/en-us/snowmobiles/2026/indy/indy-vr1/) explicitly list 2026 Khaos 155 starting MSRP $17,449; the default Khaos family price is for 146 and was not substituted.
8. [850 PRO RMK 165 specs](https://www.polaris.com/en-us/snowmobiles/2026/rmk/pro-rmk/850-pro-rmk-165-specs/). Correct 163 to 165. [Family page](https://www.polaris.com/en-us/snowmobiles/2026/rmk/pro-rmk/) defaults to the $16,649 155, so price for this selected 165 stays null.
9. [Boost VR1 DYNAMIX specs](https://www.polaris.com/en-us/snowmobiles/2026/indy/indy-vr1/patriot-boost-indy-vr1-137-dynamix-specs/). Correct 521 to 531 estimated dry and Smart CRM to PRO-CC/FOX DYNAMIX. Family $19,299 price is the 650 DYNAMIX, not this Boost; price stays null.
10. [850 Assault Escape IFS specs](https://www.polaris.com/en-us/snowmobiles/2026/switchback/switchback-assault/850-switchback-assault-146-escape-ifs-specs/) and [family page](https://www.polaris.com/en-us/snowmobiles/2026/switchback/switchback-assault/): exact Escape version identified, 494 lb and $17,899 starting MSRP. Race IFS is not interchangeable.
11. [650 TITAN Adventure specs](https://www.polaris.com/en-us/snowmobiles/2026/titan/titan-adventure-155/650-titan-adventure-155-specs/). 667 lb, high-low transmission, two-person capacity and standard passenger/rack/hitch equipment verified. [Family page](https://www.polaris.com/en-us/snowmobiles/2026/titan/titan-adventure-155/) defaults to ProStar S4; do not use its $16,999 for the 650. No integrated winch established.
12. [650 INDY XC 137 specs](https://www.polaris.com/en-us/snowmobiles/2026/indy/indy-xc/650-indy-xc-137-specs/) and [family page](https://www.polaris.com/en-us/snowmobiles/2026/indy/indy-xc/): 137 inches, 495 lb estimated dry, $15,549 starting MSRP, FOX QS3 and optional 7S. Former 129/453/$14,200 combination removed.

All six Polaris spec tables provide displacement but no exact horsepower. These hp fields are deliberately null while the confirmed displacement, track and weight figures remain.

### Arctic Cat: IDs 13–18 — partial verification, not a completed spec audit

The [2026 manufacturer model archive](https://www.arcticcat.com/past-model-resources/2026?hsLang=en-us) was fetched. It explicitly lists:

- M 858 Sno Pro;
- ZR 858 R-XC (not the prior RR name);
- Riot 858 Sno Pro and a separate with-ATAC entry;
- ZR 600 and separate EPS, R-XC, Sno Pro and with-ATAC entries;
- M 600 Sno Pro;
- Pantera 7000 and separate Pantera 9000.

Fetched all six linked manuals:

- [M 858 Sno Pro manual](https://www.arcticcat.com/hubfs/model-archive-resources/2026/snowmobile/m-858-sno-pro/2026-m-858-sno-pro-owners-manual-en.pdf?hsLang=en-us)
- [ZR 858 R-XC manual](https://www.arcticcat.com/hubfs/model-archive-resources/2026/snowmobile/zr-858-r-xc/2026-zr-858-r-xc-owners-manual-en.pdf?hsLang=en-us)
- [Riot 858 Sno Pro manual](https://www.arcticcat.com/hubfs/model-archive-resources/2026/snowmobile/riot-858-sno-pro/2026-riot-858-sno-pro-owners-manual-en.pdf?hsLang=en-us)
- [ZR 600 manual](https://www.arcticcat.com/hubfs/model-archive-resources/2026/snowmobile/zr-600/2026-zr-600-owners-manual-en.pdf?hsLang=en-us)
- [M 600 Sno Pro manual](https://www.arcticcat.com/hubfs/model-archive-resources/2026/snowmobile/m-600-sno-pro/2026-m-600-sno-pro-owners-manual-en.pdf?hsLang=en-us)
- [Pantera 7000 manual](https://www.arcticcat.com/hubfs/model-archive-resources/2026/snowmobile/pantera-7000/2026-pantera-7000-owners-manual-en.pdf?hsLang=en-us)

The first five expose a shared 2026 ZR/Riot/M-600/858 operator manual (p/n 653-00054, 6/25), not five independent trim sheets. The Pantera document covers ZR/Riot/Pantera 7000/9000 (p/n 653-00049). The first approximately 50k-character extraction of each was read selectively; an additional approximately 50k was retrieved for the shared M858 manual and Pantera manual. Full documents extend beyond that. **No claim of reading every page or verifying every specification is made.**

The shared manual's EU model table documents S2026CMJS4EUP (M 858 /154), S2026CAJREEUG (ZR 858 R-XC /137) and S2026COJRSEUB (Riot 858 Sno Pro /146). Those regional lengths are retained with mandatory qualifications. Exact displacement cannot responsibly be obtained from the family number alone.

Searches specifically targeting MY26 brochure/specs and individual models repeatedly returned later sales pages or the archive. Fetching the old [M](https://www.arcticcat.com/snowmobile/deep-snow/m), [ZR](https://www.arcticcat.com/snowmobile/trail/zr), [XF](https://www.arcticcat.com/snowmobile/crossover/xf) and [Pantera](https://www.arcticcat.com/snowmobile/touring/pantera) links revealed 2027 category listings. Search snippets sometimes described an older rendering of the same URLs; those snippets were not treated as fetched MY26 specifications.

This is why Cat has more nulls: not absence of research effort, but absence of a matching primary sales sheet in the retrieved evidence. Future work should obtain original 2026 regional sales PDFs/build sheets, then resolve each record separately. Do not backfill with 2027 website values, generic engine-family knowledge, dealer asking prices or another variant's mass.

### Yamaha: IDs 19–23

19. [2025 SRX specs](https://yamahamotorsports.com/models/sidewinder-srx-le-eps/specs) and [model](https://yamahamotorsports.com/models/sidewinder-srx-le-eps): EPS belongs in the name, 998 cc/137 x 1.00/iQS confirmed, $21,499 MSRP. No exact hp or weight populated.
20. [2025 M-TX specs](https://yamahamotorsports.com/models/sidewinder-m-tx-le-153/specs) and [model](https://yamahamotorsports.com/models/sidewinder-m-tx-le-153): **2025 explicitly verified**, 998 cc/153 x 3.00/twin rail/Float QS3, $19,999. Do not automatically roll this back to an older M-TX year; the final lineup includes it.
21. [2025 GT specs](https://yamahamotorsports.com/models/srviper-l-tx-gt/specs) and [model](https://yamahamotorsports.com/models/srviper-l-tx-gt): 1049 cc/137 x 1.25/FOX QS3, $16,299. Classified Trail rather than claiming two-up touring capability.
22. [Original product 124](https://yamahamotorsports.com/models.php?product=124&action=productPage&yearTest=true) and [2024 GT specs](https://yamahamotorsports.com/models/srviper-l-tx-gt-24/specs): explicitly **2024 SRViper L-TX GT**, $16,199, 1049 cc/137. This resolves the duplicate-looking previous “2025 SR Viper L-TX” into a properly archived model-year comparison.
23. [2025 Transporter Lite specs](https://yamahamotorsports.com/models/transporter-lite/specs) and [model](https://yamahamotorsports.com/models/transporter-lite): 397 cc/146 x 1.60/flip-up rails/batteryless EFI, $9,999. No exact hp or weight. No “cheapest major-brand sled” claim.

Yamaha's 2025 pages show $600 destination separately. The 2024 GT page shows $545 destination and $300 freight surcharge separately. All listed MSRPs exclude extra fees and are not inventory checks. “125HP class” Viper copy is not stored as exact output.

## Removed unsupported claims

Removed precise but unsourced hp/weight/price figures; unqualified fastest/lightest/cheapest rankings; sidehill, cornering, flotation, wheelspin, ride softness and bump-absorption judgments; cold-start and reliability promises; invented race-readiness and chassis superiority; assumed standard winches and heated seats; generic recommendation of performance machines to beginners.

## Integration and follow-up

- Render unknown specs explicitly and exclude them from numeric rankings/ratios. Do not coerce null to zero.
- Show research status, configuration, source retrieval limitations and field notes on detail pages. Cat's regional evidence particularly needs visible qualification.
- Compare dry with dry only, preserving Polaris's estimated qualifier. Even then, equipment and measurement conventions differ.
- Historical MSRP is not a shopping quote. Any affordability ranking should name its limited subset, year mix and fee exclusions.
- Renegade and SRViper are now Trail; Expedition SE is Utility. Keep category introductions consistent.
- ID 22 is now 2024 GT, IDs 14 and 17 have corrected trim names, IDs 8 and 12 have corrected lengths. Routes stay keyed to the same IDs.
- A cross-file grep of guides and FAQ after the parallel editorial changes found numerical examples rather than the old model-specific performance prose in the inspected results. The owning agent should still perform the full final consistency review and application checks; this subtask did not edit UI, start workflows or test signed-in interfaces.