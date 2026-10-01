/**
 * Desk research, not ride testing. A documented model can still have null specs.
 * Source status describes the retrieval, never a blanket verification of claims.
 * Dates are the actual UTC research date, not the model year or publication date.
 */
export type ResearchStatus = "documented" | "partial" | "archived";
export type SpecField = "price" | "horsepower" | "weight" | "displacement" | "trackLength" | "year";
export interface ResearchSource {
  label: string;
  url: string;
  note: string;
  checkedAt: string;
  status: "read" | "redirected" | "partial-extraction" | "unavailable";
}
export interface ModelResearch {
  checkedAt: string;
  status: ResearchStatus;
  configuration: string;
  analysis: string[];
  fit: string[];
  limitations: string[];
  buyingQuestions: string[];
  alternatives: { id: number; reason: string }[];
  sources: ResearchSource[];
  specNotes: Record<SpecField, string>;
}

export const RESEARCH_DATE = "2026-10-01";
export const RESEARCH_METHOD = "Manufacturer model-year pages and specification documents, checked by desk research. Buyer-fit conclusions are editorial inferences from equipment and intended use, not first-hand riding impressions, reliability tests or measured performance.";
const ski = (name: string) => `https://ski-doo.brp.com/us/en/models/previous-models/2026/${name}.html`;
const skiPdf = (name: string) => `https://ski-doo.brp.com/content/dam/global/en/ski-doo/my26/spec-sheets/na/en/SKI-MY26-${name}-SPEC-ENNA-Page-LR.pdf`;
const pol = (path: string) => `https://www.polaris.com/en-us/snowmobiles/2026/${path}/`;
const yam = (name: string) => `https://yamahamotorsports.com/models/${name}`;
const catArchive = "https://www.arcticcat.com/past-model-resources/2026?hsLang=en-us";
const catManual = (name: string) => `https://www.arcticcat.com/hubfs/model-archive-resources/2026/snowmobile/${name}/2026-${name}-owners-manual-en.pdf?hsLang=en-us`;
const source = (label: string, url: string, note: string, status: ResearchSource["status"] = "read"): ResearchSource => ({
  label, url, note, status, checkedAt: RESEARCH_DATE,
});
const notes = (overrides: Partial<Record<SpecField, string>>): Record<SpecField, string> => ({
  year: "The first linked manufacturer source explicitly identifies this model year.",
  displacement: "Published engine displacement in cc for the selected engine; marketing engine names are not substituted for displacement.",
  horsepower: "Not published as an exact output in the consulted model-year specifications; no estimate substituted.",
  weight: "No configuration-matched manufacturer weight established in the consulted evidence; unknown, not zero.",
  price: "Exact configuration MSRP not established. Family starting prices, dealer asking prices and newer model-year prices are not substituted.",
  trackLength: "Manufacturer specification identifies this track length in inches; other track options may exist.",
  ...overrides,
});
const record = (data: Omit<ModelResearch, "checkedAt">): ModelResearch => ({ checkedAt: RESEARCH_DATE, ...data });
const dry = "Manufacturer dry weight in pounds for the named engine and length, not ready-to-ride weight; accessories and options can change it.";
const estimated = "Polaris estimated dry weight in pounds for this specific model page; not a measured wet weight or an all-options build.";
const msrp = "Published US starting MSRP for this model, excluding destination, preparation, tax, registration and options; not a current transaction or used-market valuation.";
const catMissing = "The 2026 archive and operator manual establish model identity, but not a matching US sales specification. Legacy product URLs now show 2027 models; those figures are intentionally not carried backward.";
const catSources = (name: string, old: string, detail: string): ResearchSource[] => [
  source("Arctic Cat 2026 model archive", catArchive, `Model-year identity: ${detail}`),
  source("2026 manufacturer operator manual", catManual(name), "Retrieved the manual. It covers multiple models, not an individual sales build; the first extracted portion includes the EU model-code table. This is not a complete specification-sheet verification.", "partial-extraction"),
  source("Former manufacturer product URL", old, "Retrieval now resolves to a category containing 2027 products. Current prices and equipment cannot verify this 2026 record.", "redirected"),
];
const catNotes = (overrides: Partial<Record<SpecField, string>> = {}) => notes({
  displacement: "Unknown for the exact archived configuration. A 600/858/7000 marketing designation is not treated as a verified cc measurement.",
  horsepower: "No exact manufacturer horsepower established for this 2026 configuration.",
  weight: "No dry or wet weight established for this 2026 configuration.",
  price: "No 2026 US MSRP established. The replacement website's 2027 MSRP is not evidence for 2026.",
  trackLength: "Track variant not confirmed in the consulted 2026 evidence; the previous numeric claim has been removed.",
  ...overrides,
});

export const modelResearch: Record<number, ModelResearch> = {
  1: record({
    status: "documented", configuration: "2026 Summit X with Expert Package, 850 E-TEC Turbo R, 165-inch high-altitude track option.",
    sources: [source("2026 Summit — Expert package specifications", ski("summit"), "Read Expert-package engine, weight, track and suspension tables; not the adjacent Summit X package.")],
    specNotes: notes({ horsepower: "BRP rates the Turbo R at 180 hp up to 8,000 ft; manufacturer claim, not a dyno result.", weight: dry, price: "Page separates engine/color starting prices but does not pin the displayed amount to the selected 165-inch build. The earlier $21,749 is unsupported." }),
    analysis: [
      "This record selects the Turbo R Expert package with the 165-inch track, rather than treating every Summit as the same sled. BRP documents a rigid-arm tMotion XT rear suspension, 32-inch ski stance and Pilot DS 4 skis. Those are concrete reasons to investigate it for dedicated deep-snow use, not proof that it will be easier for a particular rider to sidehill.",
      "The high-altitude track option and BRP's altitude-qualified power rating matter more than an unqualified horsepower ranking. A rider spending most days on groomed routes should compare a crossover before paying for this specialization. The page also offers a naturally aspirated engine; an entry package price cannot price this turbo build."
    ],
    fit: ["Deep-snow buyers specifically seeking a factory turbo two-stroke.", "Owners willing to choose track, altitude calibration and display equipment explicitly."],
    limitations: ["A 165-inch mountain track is not evidence of trail comfort or towing suitability.", "Published dry weight excludes operating fluids; the supplied image has not been independently matched to every option."],
    buyingQuestions: ["Does the build sheet specify the 165 x 16 x 3.0 high-altitude track?", "What cooling and scratcher procedures apply on your access trail?", "Which display, color and altitude calibration are included in the written quote?"],
    alternatives: [{ id: 4, reason: "Compare Freeride's 154-inch turbo configuration and KYB Pro 40 shock package." }, { id: 8, reason: "Compare a naturally aspirated long-track PRO RMK without assuming equal power or identical weight definitions." }],
  }),
  2: record({
    status: "documented", configuration: "2026 Renegade X-RS, 900 ACE Turbo R, 137-inch track; Smart-Shox is optional.",
    sources: [source("2026 Renegade X-RS specification sheet", skiPdf("REN-X-RS"), "Read North American engine, dimensions, dry-weight and equipment information."), source("2026 Renegade — X-RS model-year page", ski("renegade"), "Confirms black X-RS starting MSRP $18,799; only Turbo R and 137-inch tracks are listed for this package. Mineral Blue starts higher.")],
    specNotes: notes({ horsepower: "BRP publishes 180 hp for the 899 cc Turbo R.", weight: dry, price: "US black X-RS starting MSRP $18,799; excludes transportation, preparation, tax and options including Smart-Shox. Mineral Blue is separately listed at $19,099." }),
    analysis: [
      "The Renegade X-RS belongs in this catalog's Trail category, not as a promise of equal on/off-trail ability. Its model-year sheet identifies the 900 ACE Turbo R four-stroke, 137-inch trail tracks, RAS RX front suspension and heated trail seat. These details make it worth comparing for a groomed-route buyer who specifically wants a turbo four-stroke.",
      "Smart-Shox is listed as available, not universally fitted. Suspension controls, display and launch-mode availability therefore need checking on the actual unit. The published dry weight is useful for loading discussions but cannot establish steering effort, comfort or superiority over a lighter two-stroke."
    ],
    fit: ["Solo trail riders prioritizing a four-stroke engine and heated seat.", "Buyers comparing conventional and semi-active shock packages."],
    limitations: ["Not a dedicated mountain configuration.", "Optional technology must not be assumed from the X-RS name alone."],
    buyingQuestions: ["Is this unit equipped with Smart-Shox or conventional KYB Pro shocks?", "Which track profile and touchscreen package are included?", "What is the total delivered price, including setup and freight?"],
    alternatives: [{ id: 19, reason: "The archived SRX offers another turbo four-stroke trail layout with EPS and iQS." }, { id: 3, reason: "MXZ X-RS is the two-stroke trail comparison if engine architecture is still undecided." }],
  }),
  3: record({
    status: "documented", configuration: "2026 MXZ X-RS, naturally aspirated 850 E-TEC, 129-inch track; not Competition Package.",
    sources: [source("2026 MXZ model-year page", ski("mxz"), "Used the X-RS table, not Competition Package, X, Blizzard or Adrenaline; 497 lb for the 850/129 combination."), source("2026 MXZ X-RS specification sheet", skiPdf("MXZ-X-RS"), "Confirms engine, 129/137 choices, RAS RX, Pilot RX and optional Smart-Shox.")],
    specNotes: notes({ horsepower: "BRP publishes 165 hp for the 850 E-TEC.", weight: dry }),
    analysis: [
      "The useful distinction here is a naturally aspirated 850 E-TEC trail machine with the 129-inch track. The X-RS sheet documents RAS RX, Pilot RX skis and KYB Pro shocks, while offering a 137-inch alternative. These are equipment differences a buyer can verify, unlike the previous assertions that it absorbs bumps without slowing down.",
      "Do not confuse this X-RS with the separate Competition Package or assume an optional semi-active package is installed. The short-track selection is a starting point for a solo trail comparison, not a guarantee of precise steering. Suspension setup, track choice and the rider's load still need a dealer discussion."
    ],
    fit: ["Trail buyers seeking the 850 two-stroke without selecting the separate turbo competition package.", "Owners who want to compare 129- and 137-inch builds directly."],
    limitations: ["Not documented as a two-up touring or mountain build.", "No first-hand ride assessment supports claims about firmness or cornering."],
    buyingQuestions: ["Does the VIN/build sheet identify ordinary X-RS rather than Competition Package?", "Is the track 129 inches and which lug/profile is fitted?", "Are shocks conventional or Smart-Shox, and what setup support is included?"],
    alternatives: [{ id: 12, reason: "INDY XC offers a documented 650/137 trail configuration with FOX QS3." }, { id: 9, reason: "VR1 DYNAMIX is relevant if electronically controlled damping is the purchasing priority." }],
  }),
  4: record({
    status: "documented", configuration: "2026 Freeride, 850 E-TEC Turbo R, 154-inch track; lug profile and altitude build must be specified.",
    sources: [source("2026 Freeride model-year specifications", ski("freeride"), "Confirms 465 lb dry for Turbo R/154; the 146 and 165 versions have different weights."), source("2026 Freeride specification sheet", skiPdf("FREE"), "Read KYB Pro 40 EA-3, tMotion XT and available track configurations.")],
    specNotes: notes({ horsepower: "BRP's 180 hp rating is qualified up to 8,000 ft.", weight: dry }),
    analysis: [
      "Freeride is a deep-snow model, even with a shorter selected track than the Summit in this catalog. BRP documents KYB Pro 40 EA-3 shocks and rigid-arm tMotion XT suspension, with several lengths and lug profiles. The 154-inch selection does not justify the former claim that it is a half-trail, half-backcountry machine.",
      "Compare its shock equipment, track width and actual build with the Expert package before choosing on engine output alone. Both listed turbo engines carry an altitude-qualified manufacturer rating. Neither a specification sheet nor the Freeride name establishes suitability for jumping, safe landing loads or a rider's skill level."
    ],
    fit: ["Dedicated mountain buyers comparing suspension equipment within Ski-Doo's turbo range.", "Buyers who deliberately want the 154-inch Freeride rather than the longer catalog Summit."],
    limitations: ["Shorter than another mountain sled does not mean trail-oriented.", "No validated jumping or durability claim is made."],
    buyingQuestions: ["Which 154-inch track profile and altitude calibration does this unit have?", "What shock adjustment and service guidance comes with the purchase?", "How does the intended access route meet cooling and lubrication requirements?"],
    alternatives: [{ id: 1, reason: "Expert offers a different shock/stance package and the selected 165-inch track." }, { id: 5, reason: "Backcountry is the more relevant Ski-Doo family if mixed trail use is the actual requirement." }],
  }),
  5: record({
    status: "documented", configuration: "2026 Backcountry X-RS, 850 E-TEC, 154-inch track; verify ski stance and lug choice.",
    sources: [source("2026 Backcountry — X-RS specifications", ski("backcountry"), "Read naturally aspirated X-RS table: cMotion X, 482 lb for 154; not the Turbo R/146 entry.")],
    specNotes: notes({ horsepower: "BRP publishes 165 hp for the naturally aspirated 850.", weight: dry }),
    analysis: [
      "Backcountry is the mixed-use family in this Ski-Doo selection. The 2026 table names cMotion X, not simply cMotion, and separates 146- and 154-inch weights. Selecting the 154-inch naturally aspirated build gives the comparison a defined starting point instead of mixing the turbo and non-turbo packages.",
      "Front-suspension, ski and track choices change within the family, so the percentage of trail riding is a configuration question rather than a universal 50/50 guarantee. Compare the 146-inch alternatives if the majority of mileage is groomed. Neither track length nor the crossover label proves that it will float or corner better."
    ],
    fit: ["Riders intentionally splitting legal trail and off-trail use.", "Buyers wanting a naturally aspirated two-stroke rather than the water-injected Turbo R alternative."],
    limitations: ["154-inch build price cannot be inferred from the family starting price.", "Ski stance and track profile remain choices that require a build sheet."],
    buyingQuestions: ["Which stance and associated ski/front-suspension combination is fitted?", "Is this a 154-inch naturally aspirated build rather than a turbo 146?", "Which lug profile suits the surfaces you can legally access?"],
    alternatives: [{ id: 10, reason: "Switchback Assault Escape IFS is a documented 146-inch mixed-terrain comparison." }, { id: 4, reason: "Freeride becomes relevant only if mountain use takes precedence over trail travel." }],
  }),
  6: record({
    status: "documented", configuration: "2026 Expedition SE, 900 ACE Turbo (not Turbo R), 154 x 20-inch wide track.",
    sources: [source("2026 Expedition — SE specifications", ski("expedition"), "Read SE table: 130 hp non-R turbo, 683 lb dry, uMotion/ACS and removable passenger equipment.")],
    specNotes: notes({ horsepower: "130 hp is BRP's non-R 900 ACE Turbo rating; the Turbo R is a different 180 hp configuration.", weight: dry }),
    analysis: [
      "The 2026 Expedition SE combines a wide track and passenger equipment with utility-oriented hardware. For the selected non-R 900 ACE Turbo, BRP publishes 130 hp and identifies uMotion with an ACS rear shock. The earlier description mixed unverified winch/heated-seat claims with a substantially understated weight.",
      "This is a candidate for buyers who actually need the passenger/cargo conversion, not simply anyone taking a long trip. Cargo-plate ratings are not interchangeable with total payload or trailer limits. Confirm the entire loaded-use case against the operator manual and quote the exact engine; SE spans multiple powertrains."
    ],
    fit: ["Buyers needing a wide-track platform plus removable passenger seating.", "Work-and-recreation users evaluating cargo accessories and an air-controlled rear shock."],
    limitations: ["A standard winch and heated seats were not established and are not promised.", "Dry weight must not be confused with machine-plus-passenger weight or rated payload."],
    buyingQuestions: ["Does the quote say Turbo or Turbo R?", "What are the permissible combined rider, passenger, cargo and towing loads?", "Which cargo box, hitch and recovery accessories are actually included?"],
    alternatives: [{ id: 11, reason: "TITAN provides a documented 20-inch track, two-person capacity and high-low transmission." }, { id: 18, reason: "Pantera is a touring-family alternative, but its archived configuration needs further verification." }],
  }),
  7: record({
    status: "documented", configuration: "2026 850 RMK Khaos 155; 2.75-inch Series 8 or 3.25-inch Series 9 options.",
    sources: [source("2026 850 RMK Khaos 155 specifications", pol("rmk/rmk-khaos/850-rmk-khaos-155-specs"), "Read 840 cc, 426 lb estimated dry, QuickDrive2 and WER Hi-Lo equipment."), source("2026 RMK Khaos family page", pol("rmk/rmk-khaos"), "Family equipment and lengths; 155 starting price also appears in 2026 model recommendation cards."), source("2026 VR1 page — related model cards", pol("indy/indy-vr1"), "The explicitly labeled 2026 RMK Khaos 155 card lists starting US MSRP $17,449; not the default 146 price.")],
    specNotes: notes({ weight: estimated, price: msrp }),
    analysis: [
      "The manufacturer calls this build 850 RMK Khaos 155 and specifies the Matryx mountain layout, QuickDrive2 and WER Velocity Hi-Lo shocks. Slash remains a platform description, not a reason to mix in an earlier year's weight. The documented displacement is 840 cc despite the 850 engine name.",
      "Its useful comparison with PRO RMK is the rear-suspension design and shock selection, not an invented horsepower advantage. Ask for setup guidance and compare the two track profiles before ordering. Polaris's advertised handling language is not a substitute for a demonstration on terrain appropriate to your training."
    ],
    fit: ["Mountain riders researching the Khaos suspension rather than choosing solely by engine badge.", "Owners prepared to set high/low-speed compression and select a mountain track."],
    limitations: ["No exact manufacturer horsepower was found in the model specification.", "Single-person capacity; electric start is an option, not universal."],
    buyingQuestions: ["Is the installed track Series 8 or Series 9?", "Does the quoted dry build include electric start and the chosen display?", "Can the dealer explain Khaos versus PRO RMK suspension setup?"],
    alternatives: [{ id: 8, reason: "Same engine family with PRO RMK geometry and a selected 165-inch track." }, { id: 1, reason: "A turbo Expert offers a different engine and suspension package, not an equivalent power claim." }],
  }),
  8: record({
    status: "documented", configuration: "2026 850 PRO RMK 165; corrected from the unsupported 163-inch catalog value.",
    sources: [source("2026 850 PRO RMK 165 specifications", pol("rmk/pro-rmk/850-pro-rmk-165-specs"), "Read 165-inch track options, 840 cc and 428 lb estimated dry."), source("2026 PRO RMK family page", pol("rmk/pro-rmk"), "Confirms 155/165 range and WER Light/Velocity choices; default price is for 155, not this record.")],
    specNotes: notes({ weight: estimated, price: "The family defaults to the 155-inch $16,649 build. That amount cannot price the selected 165; null retained.", trackLength: "2026 165-inch Series 8/9 specification replaces the former unsupported 163-inch claim." }),
    analysis: [
      "For 2026, the long-track 850 PRO RMK page documents 165 inches, with Series 8 and Series 9 options. It lists QuickDrive2 and either WER Light or WER Velocity shocks. A long track and low published dry figure explain why a deep-snow buyer would shortlist it, but do not establish flotation or climbing results.",
      "The comparison with Khaos should focus on suspension configuration and preferred setup. The prior catalog's lightest-in-class language was not supported by consistent ready-to-ride measurements. Equally, the 155 model's starting price should not be presented as the price of this 165 build."
    ],
    fit: ["Single-rider mountain use where a documented long-track build is wanted.", "Buyers choosing between standard and reservoir-shock equipment."],
    limitations: ["Not a documented 163-inch 2026 build.", "No measured mass or exact manufacturer horsepower comparison is available here."],
    buyingQuestions: ["Which shock package and track series are on this VIN?", "What is the delivered price of the 165, not the advertised 155?", "What access-trail cooling procedures and maintenance intervals apply?"],
    alternatives: [{ id: 7, reason: "Khaos 155 changes track length and rear-suspension geometry within Polaris." }, { id: 1, reason: "Summit Expert 165 is a cross-brand mountain comparison with a factory turbo." }],
  }),
  9: record({
    status: "documented", configuration: "2026 Patriot Boost INDY VR1 137 DYNAMIX; specifically the turbo and semi-active combination.",
    sources: [source("2026 Boost VR1 DYNAMIX specifications", pol("indy/indy-vr1/patriot-boost-indy-vr1-137-dynamix-specs"), "Read 840 cc, 531 lb estimated dry, FOX DYNAMIX, PRO-CC and 7S."), source("2026 INDY VR1 family page", pol("indy/indy-vr1"), "Explains optional DYNAMIX; default family price is for a 650, not the Boost.")],
    specNotes: notes({ weight: estimated, price: "Do not use the default 650 DYNAMIX $19,299 price for this Boost build; configuration MSRP remains unverified." }),
    analysis: [
      "This comparison now names the actual combination being discussed: Boost engine, 137-inch track and DYNAMIX. The manufacturer lists FOX DYNAMIX shocks and PRO-CC rear suspension; the old Smart CRM label was incorrect. The 7S display is a documented component, not evidence that mapping or connectivity will cover every route.",
      "This is an appropriate shortlist item for a trail buyer specifically interested in electronically adjusted damping. It does not establish that the turbo is necessary for ordinary trail travel, nor that automation removes setup or servicing needs. Compare a conventional-shock model if those electronics are not a buying priority."
    ],
    fit: ["Trail riders deliberately shopping a turbo two-stroke with semi-active damping.", "Buyers who want the documented 7S equipment in the selected build."],
    limitations: ["Exact horsepower is not published in the consulted specification.", "The cheaper 650 family starting price is not this turbo's price."],
    buyingQuestions: ["Does the build sheet explicitly include DYNAMIX?", "Can the dealer demonstrate shock modes and offline navigation before delivery?", "What warranty and service procedures apply to the electronic suspension?"],
    alternatives: [{ id: 2, reason: "Renegade offers a turbo four-stroke with Smart-Shox as an option." }, { id: 12, reason: "INDY XC offers FOX QS3 without making semi-active equipment the central purchase." }],
  }),
  10: record({
    status: "documented", configuration: "2026 850 Switchback Assault 146 with Escape IFS, not the wider Race IFS.",
    sources: [source("2026 Escape IFS specification", pol("switchback/switchback-assault/850-switchback-assault-146-escape-ifs-specs"), "Read 494 lb estimated dry, 840 cc, 146-inch tracks and Escape equipment."), source("2026 Switchback Assault model page", pol("switchback/switchback-assault"), "Read $17,899 starting US MSRP for 850 Escape and the separate Race/ Escape descriptions.")],
    specNotes: notes({ weight: estimated, price: msrp }),
    analysis: [
      "The front end is an important 2026 buying decision: Escape IFS and Race IFS are distinct configurations. This record uses Escape, with the published narrower adjustable stance, IGX 146 rear suspension and 146-inch track choices. It is a defensible mixed-terrain shortlist entry without claiming measured on-trail or powder superiority.",
      "Ask how often your actual routes require off-trail access before selecting the narrower option. Track profile is another decision, not something settled by the Assault badge. The base price and estimated dry figure belong to this named version and should not silently carry over to a Boost or Race IFS quote."
    ],
    fit: ["Mixed-terrain riders specifically considering Escape IFS.", "Buyers comparing 1.6-inch Cobra and 2.0-inch Crossover tracks."],
    limitations: ["Not interchangeable with Race IFS or turbo variants.", "Passenger seat and tow equipment are accessories, not standard touring capability."],
    buyingQuestions: ["Is this Escape IFS or Race IFS?", "Which track profile is installed and permitted for your intended surfaces?", "Does the delivered quote include the display, starter and any passenger accessories?"],
    alternatives: [{ id: 5, reason: "Backcountry X-RS provides a documented 154-inch crossover alternative." }, { id: 15, reason: "Riot is a same-role comparison only after its archived equipment is confirmed." }],
  }),
  11: record({
    status: "documented", configuration: "2026 650 TITAN Adventure 155; not Adventure Ultimate or ProStar S4.",
    sources: [source("2026 650 TITAN Adventure specifications", pol("titan/titan-adventure-155/650-titan-adventure-155-specs"), "Read 650 cc, 667 lb estimated dry, two-person capacity, 20 x 155 track and H-L-N-R transmission."), source("2026 TITAN Adventure model page", pol("titan/titan-adventure-155"), "Describes BackTrak20 and utility equipment; default shown price is ProStar S4, not 650.")],
    specNotes: notes({ weight: estimated, price: "The page defaults to ProStar S4 at $16,999. The 650 quote is not established, so that price is not reused." }),
    analysis: [
      "This TITAN's documented equipment is genuinely different from the trail and mountain entries: high-low transmission, a 20-inch-wide track, BackTrak20 rear suspension and two-person capacity. Standard passenger seating, heated passenger grips and rack/hitch are useful reasons to investigate it for work and shared trips.",
      "Those features do not guarantee it can pull every load in soft snow. Establish the complete payload and towing limits for the actual unit and your route. The former integrated-winch claim has been removed because the consulted configuration does not establish it as standard equipment."
    ],
    fit: ["Utility buyers needing documented transmission ranges and passenger provisions.", "Owners comparing wide-track cargo and towing layouts rather than performance badges."],
    limitations: ["No standard winch is promised.", "Advertised towing capacity is not equivalent to safe capability on every gradient or surface."],
    buyingQuestions: ["Is this the 650 Adventure, S4 or Ultimate?", "What combined load and trailer limits apply to your planned task?", "Which hitch, recovery and cargo accessories are actually installed?"],
    alternatives: [{ id: 6, reason: "Expedition SE combines a 20-inch track with a non-R turbo four-stroke and removable passenger seating." }, { id: 23, reason: "Transporter Lite is worth examining for smaller utility needs, without assuming equal load capability." }],
  }),
  12: record({
    status: "documented", configuration: "2026 650 INDY XC 137, 15 x 137 x 1.35 Cobra track.",
    sources: [source("2026 650 INDY XC 137 specifications", pol("indy/indy-xc/650-indy-xc-137-specs"), "Read 650 cc, 495 lb estimated dry, FOX QS3, PRO-CC and electric start."), source("2026 INDY XC model page", pol("indy/indy-xc"), "Read $15,549 starting MSRP for the 650/137; 7S is optional.")],
    specNotes: notes({ weight: estimated, price: msrp, trackLength: "137 inches in the 2026 manufacturer specification. The previous 129-inch value was not supported." }),
    analysis: [
      "The 650 INDY XC offers a documented conventional-shock trail configuration: FOX QS3, PRO-CC and a 137-inch Cobra track. Its published 2026 dimensions and estimated dry weight replace the earlier 129-inch/453-pound combination. This is a useful reference point before paying for a turbo or electronic suspension.",
      "A smaller engine badge does not make a snowmobile automatically suitable for a beginner. Training, fit and throttle familiarity still matter. The optional 7S display also means two XC quotes can differ materially; compare equipment and delivered prices rather than treating the starting MSRP as an all-in offer."
    ],
    fit: ["Solo trail buyers wanting a non-turbo two-stroke and manually adjustable FOX shocks.", "Buyers comparing a specified base trail package with premium electronics."],
    limitations: ["No exact manufacturer horsepower was found; 130 hp is not presented as verified.", "Passenger equipment and 7S should not be assumed standard."],
    buyingQuestions: ["Is the quote for the 650/137 with the documented Cobra track?", "Is the 7S display included or is it the MessageCenter display?", "Can suspension setup be matched to rider weight before delivery?"],
    alternatives: [{ id: 3, reason: "MXZ X-RS compares a larger-displacement two-stroke in a selected 129-inch trail build." }, { id: 21, reason: "SRViper is a naturally aspirated four-stroke trail alternative from an archived model year." }],
  }),
  13: record({
    status: "partial", configuration: "2026 M 858 Sno Pro family; 154-inch EU variant documented, US sales build unresolved.",
    sources: catSources("m-858-sno-pro", "https://www.arcticcat.com/snowmobile/deep-snow/m", "M 858 Sno Pro is listed."),
    specNotes: catNotes({ trackLength: "154 inches appears in the 2026 manual's EU code S2026CMJS4EUP. This confirms a regional variant, not every US Sno Pro build." }),
    analysis: [
      "Arctic Cat's year-specific archive confirms an M 858 Sno Pro for 2026, and the linked manual identifies a 154-inch EU variant. However, the old M product URL now returns 2027 machines, including both twin-rail and ALPHA ONE variants. That newer page cannot substantiate the previous catalog's exact 2026 US suspension, weight or price.",
      "Treat this as a mountain-family research lead, not a fully resolved build ready for numeric ranking. A buyer should obtain the model code, regional specification sheet and rear-suspension identification before comparing it with Summit or RMK. In particular, do not infer mono-rail equipment simply from an M badge."
    ],
    fit: ["Mountain buyers prepared to verify the actual archived unit.", "Shoppers comparing rear-suspension layouts with a dealer-provided build sheet."],
    limitations: [catMissing, "The retained 154-inch value is explicitly regional evidence, not a US configuration guarantee."],
    buyingQuestions: ["What is the full model code and intended sales market?", "Does this unit have ALPHA ONE or another rear suspension?", "Can the dealer supply the original 2026 sales sheet and MSRP?"],
    alternatives: [{ id: 7, reason: "Khaos has a directly readable 2026 configuration-level specification." }, { id: 1, reason: "Summit Expert has engine- and length-specific manufacturer tables." }],
  }),
  14: record({
    status: "partial", configuration: "2026 ZR 858 R-XC; corrected from RR. A 137-inch EU R-XC is documented; US build unresolved.",
    sources: catSources("zr-858-r-xc", "https://www.arcticcat.com/snowmobile/trail/zr", "The archive names ZR 858 R-XC, not ZR 858 RR."),
    specNotes: catNotes({ trackLength: "137 inches appears in the manual's EU R-XC model code S2026CAJREEUG; the previous 129-inch RR combination was unsupported." }),
    analysis: [
      "Start with the exact package name before comparing prices. The manufacturer's 2026 archive lists ZR 858 R-XC, and its manual documents a 137-inch EU R-XC. Do not treat an RR listing or a 129-inch machine as the same configuration: ask for the model code and matching market-specific sales sheet.",
      "A trail buyer interested in this package should first establish the actual regional build and shock equipment. R-XC branding alone does not verify race readiness, a particular FOX shock model or chassis stiffness. The current 2027 ZR website has moved on and should not supply missing 2026 figures."
    ],
    fit: ["Trail buyers investigating a real 2026 R-XC with a traceable model code.", "Shoppers who can obtain the original sales specification before committing."],
    limitations: [catMissing, "The original photo remains an illustration and has not been authenticated as this corrected trim."],
    buyingQuestions: ["Does the VIN correspond to R-XC rather than an RR from a different year?", "Which track, shocks and steering equipment were factory installed?", "Can the original regional specification and purchase invoice be provided?"],
    alternatives: [{ id: 3, reason: "MXZ X-RS is a trail-package comparison with directly verified engine and track tables." }, { id: 9, reason: "VR1 DYNAMIX provides an explicitly named electronic-shock configuration if that is the objective." }],
  }),
  15: record({
    status: "partial", configuration: "2026 Riot 858 Sno Pro; 146-inch EU model documented; not a 2027 XF.",
    sources: catSources("riot-858-sno-pro", "https://www.arcticcat.com/snowmobile/crossover/xf", "Riot 858 Sno Pro and Riot 858 with ATAC are separate archive entries."),
    specNotes: catNotes({ trackLength: "146 inches is documented by EU Sno Pro code S2026COJRSEUB in the 2026 operator manual. Exact US lug/equipment package remains unresolved." }),
    analysis: [
      "The 2026 archive distinguishes Riot 858 Sno Pro from Riot 858 with ATAC. This record selects the documented Sno Pro name instead of silently combining equipment from both. The operator manual supplies a 146-inch regional variant, but the former XF URL now returns a later XF lineup, not an adequate 2026 sales specification.",
      "For a mixed-use buyer, the next useful comparison is a verified build's track profile, front stance and shock package against Backcountry and Switchback. There is no basis here for the old assertion that the Riot stays lively or holds together off trail. Those would require independent testing and a defined setup."
    ],
    fit: ["Crossover shoppers who have located a specific archived Sno Pro unit.", "Buyers willing to compare original build documents rather than current XF marketing."],
    limitations: [catMissing, "ATAC equipment is not assumed on the Sno Pro."],
    buyingQuestions: ["Is this Sno Pro or the separately listed ATAC model?", "Which regional model code and track profile are fitted?", "Can the seller document original suspension and any later modifications?"],
    alternatives: [{ id: 10, reason: "Switchback Escape IFS is a well-defined 146-inch crossover comparison." }, { id: 5, reason: "Backcountry offers a selected 154-inch mixed-use build with source-matched weight." }],
  }),
  16: record({
    status: "partial", configuration: "2026 ZR 600 family entry; former 137-inch configuration not yet verified.",
    sources: catSources("zr-600", "https://www.arcticcat.com/snowmobile/trail/zr", "ZR 600 is listed separately from EPS, Sno Pro, R-XC and ATAC."),
    specNotes: catNotes(),
    analysis: [
      "The 2026 archive confirms a ZR 600, but also lists several separately named 600 packages. That makes a generic ZR badge insufficient to assign a specific track, steering system or suspension package. The former 137-inch numeric value and 125-hp claim have been removed pending a matching model-year sales sheet.",
      "A trail buyer can still use this entry as an identification checklist. Ask for the exact version before comparing it with a 650 INDY XC; a smaller engine-family name does not by itself establish affordability or beginner suitability. Later 2027 prices returned by the current site do not price a leftover or used 2026 machine."
    ],
    fit: ["Trail shoppers investigating a specific ZR 600 listing.", "Buyers willing to resolve the package before comparing equipment or price."],
    limitations: [catMissing, "No verified horsepower, weight, track length or price ranking is possible for this record."],
    buyingQuestions: ["Is the actual package base ZR 600, Sno Pro, EPS, R-XC or ATAC?", "What original track dimensions appear on the build sheet?", "What is the condition of the track, shocks and service history on this unit?"],
    alternatives: [{ id: 12, reason: "INDY XC supplies a directly verified 650/137 trail reference." }, { id: 21, reason: "SRViper provides a documented naturally aspirated four-stroke trail comparison." }],
  }),
  17: record({
    status: "partial", configuration: "2026 M 600 Sno Pro archive entry; ALPHA ONE and 154-inch assumptions unresolved.",
    sources: catSources("m-600-sno-pro", "https://www.arcticcat.com/snowmobile/deep-snow/m", "The archive labels this model M 600 Sno Pro."),
    specNotes: catNotes(),
    analysis: [
      "The manufacturer archive provides a 2026 M 600 Sno Pro identity, but not enough configuration detail to retain the former ALPHA ONE/154-inch claim as verified. Current M pages describe newer combinations of twin-rail and mono-rail equipment. Using those later choices to fill this record would conceal the very distinction a mountain buyer needs to resolve.",
      "The smaller engine-family designation can be a reason to investigate this model, but it is not evidence that the sled is easier to learn on or cheaper to own. Establish the original track and rear suspension, then weigh training, terrain access and support alongside the purchase price. Mountain capability is not a substitute for avalanche education."
    ],
    fit: ["Mountain buyers specifically researching the archived 600-family offering.", "Shoppers who can physically identify the rear suspension and retrieve the model code."],
    limitations: [catMissing, "No claim of a sidehill advantage, beginner suitability or lower operating cost is supported."],
    buyingQuestions: ["What rear suspension is actually present, and is it original?", "Which track dimensions belong to the VIN?", "What terrain training and local service support will accompany ownership?"],
    alternatives: [{ id: 13, reason: "M 858 is another archived Cat research lead, not a verified horsepower upgrade calculation." }, { id: 7, reason: "Khaos offers a directly documented mountain configuration if specification certainty matters." }],
  }),
  18: record({
    status: "partial", configuration: "2026 Pantera 7000 archive entry; engine displacement, track and US sales equipment unresolved.",
    sources: catSources("pantera-7000", "https://www.arcticcat.com/snowmobile/touring/pantera", "Pantera 7000 and Pantera 9000 are separate 2026 entries."),
    specNotes: catNotes(),
    analysis: [
      "The Pantera 7000 exists in Arctic Cat's 2026 archive, and its linked operator manual covers 7000/9000 four-stroke models. That confirms a meaningful model-year research trail, but the old product URL now presents 2027 touring machines. This pass did not establish an exact 2026 sales specification for the previous 1049 cc, weight or 154-inch claims.",
      "For a touring buyer, passenger seating, handholds, wind protection and permitted combined load are more useful next checks than a generic engine-reliability reputation. Confirm those items on the actual machine and obtain the original manual and sales sheet. No promise of quiet operation, cold starting or remote-trip reliability is made here."
    ],
    fit: ["Touring shoppers prepared to document a specific 2026 Pantera.", "Buyers comparing passenger provisions and permitted loads rather than assumed engine reputation."],
    limitations: [catMissing, "The old 154-inch track and 620-pound figure must not be used to plan transport or payload."],
    buyingQuestions: ["Can the seller provide the original 2026 sales specification?", "Which passenger heating, seat and storage equipment is installed?", "What are the combined load limits and documented service history?"],
    alternatives: [{ id: 6, reason: "Expedition SE has directly documented removable passenger seating and wide-track equipment." }, { id: 11, reason: "TITAN's specification explicitly states two-person capacity and standard passenger hardware." }],
  }),
  19: record({
    status: "archived", configuration: "2025 Sidewinder SRX LE EPS, US final-edition trail model.",
    sources: [source("2025 SRX LE EPS specification", yam("sidewinder-srx-le-eps/specs"), "Read 998 cc turbo four-stroke, 137 x 1.00 track and iQS shocks. No weight or exact hp is populated."), source("2025 SRX LE EPS model page", yam("sidewinder-srx-le-eps"), "Read 2025 final-edition identity, EPS name and $21,499 US MSRP; $600 destination is additional.")],
    specNotes: notes({ price: msrp, horsepower: "The consulted specifications do not publish an exact hp figure. The former 200 hp and fastest-in-catalog claims are removed.", year: "Explicit 2025 Final Edition. Archived model year; a live inventory link is not evidence of ongoing production." }),
    analysis: [
      "The verified name includes EPS, and Yamaha's 2025 specification lists a 998 cc turbo four-stroke, iQS shocks and a 137-inch track with a 1.00-inch profile. That is a distinct trail configuration from the M-TX mountain model despite the shared engine displacement. It can be shortlisted by a buyer specifically wanting power steering and electronic shock adjustment.",
      "The manufacturer markets this as a Final Edition. Treat MSRP as historical model pricing, not proof of new-stock availability or a used value. The page does not supply an exact horsepower or weight measurement, so it cannot support the former catalog's fastest or most-powerful ranking."
    ],
    fit: ["Trail buyers interested in the documented EPS/iQS equipment.", "Shoppers comfortable evaluating a final-edition or remaining-stock machine."],
    limitations: ["Archived 2025 model, not a 2026 production entry.", "No exact hp, dry weight or comparative speed result is established."],
    buyingQuestions: ["Is the unit unused remaining stock or previously registered?", "What warranty starts at delivery and who will service EPS/iQS?", "Is the installed track the original 1.00-inch profile?"],
    alternatives: [{ id: 2, reason: "Renegade X-RS provides a newer-model-year turbo four-stroke trail comparison." }, { id: 21, reason: "SRViper removes the turbo from the Yamaha trail comparison." }],
  }),
  20: record({
    status: "archived", configuration: "2025 Sidewinder M-TX LE 153, US mountain specification.",
    sources: [source("2025 M-TX LE 153 specification", yam("sidewinder-m-tx-le-153/specs"), "Explicit 2025 heading; read 998 cc, 153 x 3.00 track, twin-rail suspension and Float QS3/QS3L."), source("2025 M-TX LE 153 model page", yam("sidewinder-m-tx-le-153"), "Read $19,999 US MSRP plus $600 destination.")],
    specNotes: notes({ price: msrp, year: "2025 is explicitly supported by the manufacturer model and specs pages. It should not be reclassified as an older M-TX merely from memory." }),
    analysis: [
      "Unlike a guessed carryover year, Yamaha's page explicitly identifies a 2025 M-TX LE 153. It documents a 998 cc turbo four-stroke, 153-inch track with 3.00-inch lugs and twin-rail mountain rear suspension. The FOX Float QS3 equipment, including a QS3L rear shock with climb lockout, separates its equipment discussion from the trail SRX.",
      "This gives a mountain buyer a sourced four-stroke alternative, but not proof of stronger climbing or less wheelspin than a two-stroke. Neither exact horsepower nor a weight figure is supplied in the consulted spec table. Confirm the actual machine's condition, air-shock setup and support arrangements before comparing remaining-stock prices."
    ],
    fit: ["Mountain buyers deliberately considering a turbo four-stroke.", "Shoppers who can verify the specific final-model-year M-TX build."],
    limitations: ["No sourced basis for a 580-pound weight or 200-hp comparison.", "Deep-lug mountain equipment should not be treated as equivalent to a trail track."],
    buyingQuestions: ["Is the model code and registration genuinely 2025?", "What air-shock setup, inspection and service history is documented?", "What cooling precautions and track limitations apply to access trails?"],
    alternatives: [{ id: 4, reason: "Freeride offers a sourced 154-inch turbo two-stroke mountain configuration." }, { id: 8, reason: "PRO RMK offers a naturally aspirated long-track mountain alternative." }],
  }),
  21: record({
    status: "archived", configuration: "2025 SRViper L-TX GT, naturally aspirated four-stroke solo trail model.",
    sources: [source("2025 SRViper L-TX GT specification", yam("srviper-l-tx-gt/specs"), "Read 1049 cc, FOX QS3 and 137 x 1.25 track; exact hp and weight not listed."), source("2025 SRViper L-TX GT model page", yam("srviper-l-tx-gt"), "Read 2025 Final Edition and $16,299 US MSRP plus $600 destination.")],
    specNotes: notes({ price: msrp, horsepower: "Yamaha describes a 125HP class in model copy, not a configuration-specific measured output. Neither that class label nor the old 130 is stored as exact hp.", year: "Manufacturer explicitly identifies 2025 Final Edition; archived catalog, not an assurance of inventory." }),
    analysis: [
      "The L-TX GT is better classified here as a solo trail sled than as a purpose-built two-up tourer. Yamaha documents a naturally aspirated 1049 cc four-stroke, FOX QS3 shocks and Dual Shock SR 137 rear suspension. A 137-inch track does not itself establish passenger capacity or long-distance comfort.",
      "This is a useful comparison for someone who wants a four-stroke without a turbo, while the 2024 GT provides a separate model-year reference. Yamaha's horsepower-class language is not treated as an exact output. Likewise, the engine's reputation cannot justify promises about cold starts, longevity or lower maintenance."
    ],
    fit: ["Solo trail buyers seeking a naturally aspirated four-stroke.", "Remaining-stock or used buyers comparing the documented GT shock package."],
    limitations: ["No verified two-person capacity is claimed.", "No exact horsepower, mass or reliability result is established."],
    buyingQuestions: ["Is this the 2025 GT Final Edition rather than the 2024 GT?", "What warranty and dealer support apply to this particular unit?", "Are the FOX shocks and original track present and serviced?"],
    alternatives: [{ id: 22, reason: "The archived 2024 GT is a year-specific comparison, not a cheaper base trim." }, { id: 12, reason: "INDY XC provides a newer two-stroke trail configuration with conventional adjustable shocks." }],
  }),
  22: record({
    status: "archived", configuration: "2024 SRViper L-TX GT, corrected using the original product-124 manufacturer link.",
    sources: [source("Original Yamaha product 124 page", "https://yamahamotorsports.com/models.php?product=124&action=productPage&yearTest=true", "Fetched page explicitly says 2024 SRViper L-TX GT and $16,199, not 2025 base L-TX. Destination $545 and freight surcharge $300 are separate."), source("2024 SRViper L-TX GT specifications", yam("srviper-l-tx-gt-24/specs"), "Read 1049 cc four-stroke, 137 x 1.25 track and GT suspension equipment.")],
    specNotes: notes({ year: "Corrected from 2025 to 2024 using the original catalog URL. GT trim also corrected; ID and image retained.", price: msrp, horsepower: "125HP-class marketing is not exact output. The former 130-hp value is removed." }),
    analysis: [
      "This is not evidence of a cheaper 2025 base L-TX. The original catalog link opens Yamaha's 2024 SRViper L-TX GT, with a 1049 cc four-stroke, 137-inch track and GT equipment. Preserving this ID as an explicitly archived 2024 GT avoids inventing a model to justify the earlier $13,299 price.",
      "Its role is now a model-year comparison with the 2025 GT, particularly for used and remaining-stock shopping. The difference in historical MSRP is not a valuation of today's condition or warranty. Inspect the unit's identity and maintenance record before assuming that similarly named machines or retained catalog images show identical equipment."
    ],
    fit: ["Buyers comparing actual 2024 GT inventory with the 2025 GT.", "Used-market shoppers prioritizing a traceable model year and maintenance record."],
    limitations: ["Not a documented 2025 base-model alternative.", "Image preserved for route continuity; exact year/trim appearance has not been independently authenticated."],
    buyingQuestions: ["Does the VIN and original invoice identify 2024 GT?", "How do hours, mileage, storage and servicing compare with the 2025 listing?", "What fees and remaining warranty apply rather than the historic MSRP?"],
    alternatives: [{ id: 21, reason: "The 2025 GT is the appropriate adjacent model-year comparison." }, { id: 19, reason: "SRX is relevant only if turbo powertrain and EPS/iQS equipment are intentional priorities." }],
  }),
  23: record({
    status: "archived", configuration: "2025 Transporter Lite, 397 cc two-stroke, 146-inch flip-up-rail rear suspension.",
    sources: [source("2025 Transporter Lite specification", yam("transporter-lite/specs"), "Read 397 cc, batteryless EFI, 146 x 1.60 track and hydraulic twin-tube shocks."), source("2025 Transporter Lite model page", yam("transporter-lite"), "Read $9,999 US MSRP plus $600 destination; no exact hp or weight established.")],
    specNotes: notes({ price: msrp, year: "Manufacturer explicitly identifies 2025. Archived model; availability must be checked independently.", horsepower: "No official numeric hp found in the consulted specification. Community estimates are not substituted." }),
    analysis: [
      "The Transporter Lite pairs a 397 cc two-stroke with batteryless EFI and a 146-inch rear suspension with flip-up rails. Those features make it worth investigating for utility use, but equipment alone does not establish reliability or towing capability. Hydraulic twin-tube shocks also distinguish its equipment from the performance trail models.",
      "Its published $9,999 is a US model MSRP before additional charges, not proof that it is the cheapest new snowmobile from any major brand. Nor does the utility label establish a particular towing load or passenger capacity. For fishing, property access or hauling, match the manual's limits to the task and verify local support for the actual archived unit."
    ],
    fit: ["Utility shoppers whose requirements can be checked against this smaller-engine model's manual.", "Buyers who want the documented flip-up-rail arrangement rather than a performance trail package."],
    limitations: ["No exact horsepower or weight established.", "No market-wide cheapest claim or assumed towing capacity is justified."],
    buyingQuestions: ["What cargo, towing and passenger limits apply to this VIN?", "Which hitch and rack accessories are included?", "Is it remaining new stock, and what service and warranty support is available?"],
    alternatives: [{ id: 11, reason: "TITAN is a documented wide-track two-person utility option if the task requires different capacity and transmission equipment." }, { id: 6, reason: "Expedition SE offers another documented wide-track/passenger layout, not an assumed equivalent payload." }],
  }),
};