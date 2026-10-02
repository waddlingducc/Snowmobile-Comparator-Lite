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
const catSpecPdf = "https://www.arcticinsider.com/wp-content/uploads/2025/05/2026-ARCTIC-CAT-MODEL-SPECS.pdf";
const catSpec = (page: number, detail: string) => source("Arctic Cat MY2026 specification booklet — third-party-hosted copy", `${catSpecPdf}#page=${page}`, `Arctic Cat-branded, ©2025 booklet linked by ArcticInsider. Read the complete extraction and cross-check native PDF text. Page ${page}: ${detail} Manufacturer-authored evidence on a third-party host; specifications subject to change.`);
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
const catMissing = "The archive's generic model name does not identify a sales build. Obtain a market- and trim-matched specification before assigning equipment or dimensions.";
const catSources = (name: string, old: string, detail: string): ResearchSource[] => [
  source("Arctic Cat 2026 model archive", catArchive, `Model-year identity: ${detail}`),
  source("2026 manufacturer operator manual", catManual(name), name === "pantera-7000" ? "Read all four extraction chunks through Reference Information: shared ZR/Riot/Pantera 7000/9000 manual, p/n 653-00049. Fuel, service and passenger controls are useful ownership evidence, not a trim-specific sales table. Some graphic labels extract poorly." : "Read all four extraction chunks through Reference Information: shared ZR/Riot/M 600/858 manual, p/n 653-00054, 6/25. EU model codes, track restrictions and service sections reviewed; no configuration-level displacement, MSRP or dry-weight sales table. Some graphic labels extract poorly."),
  source("Current manufacturer family page", old, "This URL presents 2027 products. It is a retrieval limitation, not a source for this record's 2026 figures.", "redirected"),
];
const catNotes = (overrides: Partial<Record<SpecField, string>> = {}) => notes({
  displacement: "Unknown for the exact archived configuration. A 600/858/7000 marketing designation is not treated as a verified cc measurement.",
  horsepower: "No exact manufacturer horsepower established for this 2026 configuration.",
  weight: "No dry or wet weight established for this 2026 configuration.",
  price: "No 2026 US MSRP established. The replacement website's 2027 MSRP is not evidence for 2026.",
   trackLength: "Track variant not confirmed for the generic archived package in the consulted 2026 evidence.",
  ...overrides,
});

export const modelResearch: Record<number, ModelResearch> = {
  1: record({
    status: "documented", configuration: "2026 Summit X with Expert Package, 850 E-TEC Turbo R, 165-inch high-altitude track option.",
    sources: [source("2026 Summit — Expert package specifications", ski("summit"), "Read Expert-package engine, weight, track and suspension tables; not the adjacent Summit X package.")],
    specNotes: notes({ horsepower: "BRP rates the Turbo R at 180 hp up to 8,000 ft; manufacturer claim, not a dyno result.", weight: dry, price: "Page separates engine/color starting prices but does not pin the displayed amount to the selected 165-inch build. Request an exact-build quote." }),
    analysis: [
      "Summit Expert 165 is a dedicated turbo deep-snow candidate with rigid-arm tMotion XT rear suspension, a 32-inch ski stance and Pilot DS 4 skis. The narrow stance and selected long track distinguish its equipment from Freeride's 154-inch, 15-inch-wide layout. Ask the dealer to explain the setup for your equipped rider weight and destination elevation rather than choosing only on their shared power rating.",
      "Put the access route on the purchase checklist: the selected 3-inch high-altitude track must suit the snow conditions before the deep-snow section starts. Budget for mountain training and transport alongside the turbo premium. If groomed mileage dominates your calendar, compare Backcountry or a trail sled plus specialist rentals rather than buying for one imagined mountain trip."
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
      "The Renegade X-RS is a solo groomed-trail candidate for a buyer who wants a turbo four-stroke and a heated seat. Its 137-inch track choices keep this comparison focused on trail equipment, while RAS RX and rMotion X identify the suspension package. A buyer planning regular passenger trips should start with an approved two-up machine instead.",
      "Order the shock and display package together: Smart-Shox is optional, and launch mode requires the 10.25-inch touchscreen. A low advertised quote may omit the technology that attracted you to X-RS. Compare a conventional-shock quote with the electronic version, including service support, and check whether the low windshield needs changing for your usual winter exposure."
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
      "The naturally aspirated 850 E-TEC and selected 129-inch track make MXZ X-RS a different trail proposition from the four-stroke Renegade. RAS RX, Pilot RX skis and KYB Pro shocks give the dealer a specific setup to discuss. Compare the available 137-inch version on the same engine and shock basis before deciding that the shorter build is right for your routes.",
      "Spend the showroom visit on control reach and shock adjustment in riding gear. The separate Competition Package and optional Smart-Shox builds are not equivalent quotes. Ask which track profile, display and damping controls your deposit buys; paying for X-RS hardware is useful only if you can set it for your load or obtain dealer setup assistance."
    ],
    fit: ["Trail buyers seeking the 850 two-stroke without selecting the separate turbo competition package.", "Owners who want to compare 129- and 137-inch builds directly."],
    limitations: ["Solo trail configuration, not a factory two-up tourer.", "The selected 129-inch build should not be used to price or weigh the available 137-inch version."],
    buyingQuestions: ["Does the VIN/build sheet identify ordinary X-RS rather than Competition Package?", "Is the track 129 inches and which lug/profile is fitted?", "Are shocks conventional or Smart-Shox, and what setup support is included?"],
    alternatives: [{ id: 12, reason: "INDY XC offers a documented 650/137 trail configuration with FOX QS3." }, { id: 9, reason: "VR1 DYNAMIX is relevant if electronically controlled damping is the purchasing priority." }],
  }),
  4: record({
    status: "documented", configuration: "2026 Freeride, 850 E-TEC Turbo R, 154-inch track; lug profile and altitude build must be specified.",
    sources: [source("2026 Freeride model-year specifications", ski("freeride"), "Confirms 465 lb dry for Turbo R/154; the 146 and 165 versions have different weights."), source("2026 Freeride specification sheet", skiPdf("FREE"), "Read KYB Pro 40 EA-3, tMotion XT and available track configurations.")],
    specNotes: notes({ horsepower: "BRP's 180 hp rating is qualified up to 8,000 ft.", weight: dry }),
    analysis: [
      "Freeride's selected 154-inch turbo build is for dedicated deep-snow shopping, with KYB Pro 40 EA-3 shocks and rigid-arm tMotion XT suspension. Its 15-inch-wide track differs from the 16-inch Summit Expert; that width and the shock package are more useful comparison questions than their shared turbo power rating.",
      "Specify the lug profile and altitude calibration before comparing quotes: BRP lists both 2.5-inch and high-altitude 3.0-inch 154 tracks. On a used unit, ask a technician to assess rails, tunnel, steering and shocks for damage or modifications. The Freeride name is not a load rating for jumps, and a shorter mountain track does not solve a mostly-trail riding plan."
    ],
    fit: ["Dedicated mountain buyers comparing suspension equipment within Ski-Doo's turbo range.", "Buyers who deliberately want the 154-inch Freeride rather than the longer catalog Summit."],
    limitations: ["Deep-snow specialization still applies with the 154-inch track.", "Suspension equipment does not establish permissible jumping loads; inspect a used unit's chassis and service history."],
    buyingQuestions: ["Which 154-inch track profile and altitude calibration does this unit have?", "What shock adjustment and service guidance comes with the purchase?", "How does the intended access route meet cooling and lubrication requirements?"],
    alternatives: [{ id: 1, reason: "Expert offers a different shock/stance package and the selected 165-inch track." }, { id: 5, reason: "Backcountry is the more relevant Ski-Doo family if mixed trail use is the actual requirement." }],
  }),
  5: record({
    status: "documented", configuration: "2026 Backcountry X-RS, 850 E-TEC, 154-inch track; verify ski stance and lug choice.",
    sources: [source("2026 Backcountry — X-RS specifications", ski("backcountry"), "Read naturally aspirated X-RS table: cMotion X, 482 lb for 154; not the Turbo R/146 entry.")],
    specNotes: notes({ horsepower: "BRP publishes 165 hp for the naturally aspirated 850.", weight: dry }),
    analysis: [
      "Backcountry X-RS is worth shortlisting when the same outing genuinely combines trail travel with legal off-trail snow. This selected 154-inch naturally aspirated build uses cMotion X and KYB Pro shocks. It keeps the engine decision separate from the water-injected Turbo R version, whose selected length and service questions differ.",
      "The 154-inch choices include 2.0- and 2.5-inch profiles; put the intended access surfaces and low-snow operating instructions next to those choices. Front stance and skis also vary in the family. If most trips stay on maintained trails, price a 146-inch build or a trail machine before paying for longer-track equipment you rarely use."
    ],
    fit: ["Riders intentionally splitting legal trail and off-trail use.", "Buyers wanting a naturally aspirated two-stroke rather than the water-injected Turbo R alternative."],
    limitations: ["154-inch build price cannot be inferred from the family starting price.", "Ski stance and track profile remain choices that require a build sheet."],
    buyingQuestions: ["Which stance and associated ski/front-suspension combination is fitted?", "Is this a 154-inch naturally aspirated build rather than a turbo 146?", "Which lug profile suits the surfaces you can legally access?"],
    alternatives: [{ id: 10, reason: "Switchback Assault Escape IFS is a 146-inch mixed-terrain comparison with different front stance and track profiles." }, { id: 15, reason: "Riot Sno Pro offers a 146-inch, 15-inch-wide Hurricane and conventional AC5S shocks." }],
  }),
  6: record({
    status: "documented", configuration: "2026 Expedition SE, 900 ACE Turbo (not Turbo R), 154 x 20-inch wide track.",
    sources: [source("2026 Expedition — SE specifications", ski("expedition"), "Read SE table: 130 hp non-R turbo, 683 lb dry, uMotion/ACS and removable passenger equipment.")],
    specNotes: notes({ horsepower: "130 hp is BRP's non-R 900 ACE Turbo rating; the Turbo R is a different 180 hp configuration.", weight: dry }),
    analysis: [
      "Expedition SE is a passenger-and-cargo candidate rather than simply a long-distance trail sled. The 20-inch-wide track, removable passenger seat, heated passenger grips and ACS rear shock are relevant to buyers switching between shared recreation and utility tasks. This record selects the 130-hp 900 ACE Turbo, not the different Turbo R engine.",
      "Write down rider, passenger, cargo and trailer loads separately and ask the dealer to show the limits that apply to each. The 683-lb dry machine also calls for a transport check before adding fuel and accessories. Price the cargo box, hitch and recovery equipment explicitly; the SE badge spans several engines and does not make every accessory part of your quote."
    ],
    fit: ["Buyers needing a wide-track platform plus removable passenger seating.", "Work-and-recreation users evaluating cargo accessories and an air-controlled rear shock."],
    limitations: ["A standard winch and heated seats were not established and are not promised.", "Dry weight must not be confused with machine-plus-passenger weight or rated payload."],
    buyingQuestions: ["Does the quote say Turbo or Turbo R?", "What are the permissible combined rider, passenger, cargo and towing loads?", "Which cargo box, hitch and recovery accessories are actually included?"],
    alternatives: [{ id: 11, reason: "TITAN provides a documented 20-inch track, two-person capacity and high-low transmission." }, { id: 18, reason: "Pantera offers a narrower touring track and factory heated passenger seating when shared trail travel outweighs work tasks." }],
  }),
  7: record({
    status: "documented", configuration: "2026 850 RMK Khaos 155; 2.75-inch Series 8 or 3.25-inch Series 9 options.",
    sources: [source("2026 850 RMK Khaos 155 specifications", pol("rmk/rmk-khaos/850-rmk-khaos-155-specs"), "Read 840 cc, 426 lb estimated dry, QuickDrive2 and WER Hi-Lo equipment."), source("2026 RMK Khaos family page", pol("rmk/rmk-khaos"), "Family equipment and lengths; default price is for 146, not 155."), source("2026 INDY XC page — related model cards", pol("indy/indy-xc"), "Explicit 2026 RMK Khaos 155 recommendation card lists starting US MSRP $17,449 and a 2026 850/155 image/model code; not the family's default 146 price.")],
    specNotes: notes({ weight: estimated, price: msrp }),
    analysis: [
      "Khaos 155 puts WER Velocity Hi-Lo shocks and QuickDrive2 on the shortlist for a single mountain rider who wants adjustable equipment. The 850 Patriot badge represents a documented 840 cc engine. Against PRO RMK, focus on the rear-suspension design and dealer setup explanation rather than treating engine names as a power difference.",
      "The 2.75-inch Series 8 and 3.25-inch Series 9 tracks are separate purchasing decisions, particularly for the approach to deep snow. Ask the dealer to demonstrate high- and low-speed compression adjustment and document starter/display options in the quote. If you cannot use the mountain route regularly, compare the cost of transporting this specialist machine with renting at the destination."
    ],
    fit: ["Mountain riders researching the Khaos suspension rather than choosing solely by engine badge.", "Owners prepared to set high/low-speed compression and select a mountain track."],
    limitations: ["No exact manufacturer horsepower was found in the model specification.", "Single-person capacity; electric start is an option, not universal."],
    buyingQuestions: ["Is the installed track Series 8 or Series 9?", "Does the quoted dry build include electric start and the chosen display?", "Can the dealer explain Khaos versus PRO RMK suspension setup?"],
    alternatives: [{ id: 8, reason: "Same engine family with PRO RMK geometry and a selected 165-inch track." }, { id: 1, reason: "A turbo Expert offers a different engine and suspension package, not an equivalent power claim." }],
  }),
  8: record({
    status: "documented", configuration: "2026 850 PRO RMK 165, Series 8 or Series 9 track and WER Light/Velocity shock choices.",
    sources: [source("2026 850 PRO RMK 165 specifications", pol("rmk/pro-rmk/850-pro-rmk-165-specs"), "Read 165-inch track options, 840 cc and 428 lb estimated dry."), source("2026 PRO RMK family page", pol("rmk/pro-rmk"), "Confirms 155/165 range and WER Light/Velocity choices; default price is for 155, not this record.")],
    specNotes: notes({ weight: estimated, price: "The family starting price refers to the 155-inch build. Obtain a separate quote for the selected 165.", trackLength: "2026 configuration page specifies 165-inch Series 8/9 options." }),
    analysis: [
      "PRO RMK 165 is the long-track, naturally aspirated Polaris mountain comparison in this selection. QuickDrive2 and the choice of WER Light or WER Velocity shocks let you compare a specific equipment package with Khaos 155. Its published 428-lb estimated dry figure is a planning reference, not the weight of your fueled and accessorized machine.",
      "Get a delivered quote for the 165 rather than the shorter family entry model, then list the installed track series and reservoir-shock choice. Before collecting it, verify trailer clearance, tie-down arrangements and the manual's low-snow approach instructions. Choose between PRO RMK and Khaos on the setup and terrain you can actually evaluate, not a claimed class-wide weight winner."
    ],
    fit: ["Single-rider mountain use where a documented long-track build is wanted.", "Buyers choosing between standard and reservoir-shock equipment."],
    limitations: ["Mountain track and cooling requirements may restrict hard-packed access travel.", "Optional shocks, starter and display can change the quoted build and loading weight."],
    buyingQuestions: ["Which shock package and track series are on this VIN?", "What is the delivered price of the 165, not the advertised 155?", "What access-trail cooling procedures and maintenance intervals apply?"],
    alternatives: [{ id: 7, reason: "Khaos 155 changes track length and rear-suspension geometry within Polaris." }, { id: 1, reason: "Summit Expert 165 is a cross-brand mountain comparison with a factory turbo." }],
  }),
  9: record({
    status: "documented", configuration: "2026 Patriot Boost INDY VR1 137 DYNAMIX; specifically the turbo and semi-active combination.",
    sources: [source("2026 Boost VR1 DYNAMIX specifications", pol("indy/indy-vr1/patriot-boost-indy-vr1-137-dynamix-specs"), "Read 840 cc, 531 lb estimated dry, FOX DYNAMIX, PRO-CC and 7S."), source("2026 INDY VR1 family page", pol("indy/indy-vr1"), "Explains optional DYNAMIX; default family price is for a 650, not the Boost.")],
    specNotes: notes({ weight: estimated, price: "Do not use the default 650 DYNAMIX $19,299 price for this Boost build; configuration MSRP remains unverified." }),
    analysis: [
      "Boost VR1 137 DYNAMIX bundles a turbo two-stroke, FOX electronic damping, PRO-CC rear suspension and the 7S display. It is a purposeful trail shortlist item when electronic shock control is the feature you want to buy. If that is not a priority, use INDY XC as a conventional-shock reference before accepting the added purchase and support commitments.",
      "Make the technology demonstration part of the dealer visit: ask to see damping modes and how your intended routes are handled without cellular coverage. Confirm local electronic-suspension service capability and the installed 137-inch track profile. A family offer for a 650 engine does not establish the delivered price of this Boost configuration."
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
      "Switchback Assault Escape IFS is a 146-inch mixed-terrain candidate with the narrower of the family's two front-suspension packages. It pairs IGX 146 with WER Velocity shocks. Compare it with the wider Race IFS on your actual trail/off-trail itinerary; a shared Assault name does not mean the front-end equipment is interchangeable.",
      "Choose the 1.6-inch Cobra or 2.0-inch Crossover track against the access surfaces you repeatedly encounter, not an abstract percentage of trail use. Have the quote name Escape IFS, engine and track in one line. Passenger and towing accessories need their own approval and load check; this is not automatically a substitute for a factory two-up utility machine."
    ],
    fit: ["Mixed-terrain riders specifically considering Escape IFS.", "Buyers comparing 1.6-inch Cobra and 2.0-inch Crossover tracks."],
    limitations: ["Not interchangeable with Race IFS or turbo variants.", "Passenger seat and tow equipment are accessories, not standard touring capability."],
    buyingQuestions: ["Is this Escape IFS or Race IFS?", "Which track profile is installed and permitted for your intended surfaces?", "Does the delivered quote include the display, starter and any passenger accessories?"],
    alternatives: [{ id: 5, reason: "Backcountry X-RS provides a longer 154-inch crossover alternative." }, { id: 15, reason: "Riot Sno Pro offers AC5S damping and a 146 x 15 x 1.75 Hurricane rather than this model's Cobra/Crossover choices." }],
  }),
  11: record({
    status: "documented", configuration: "2026 650 TITAN Adventure 155; not Adventure Ultimate or ProStar S4.",
    sources: [source("2026 650 TITAN Adventure specifications", pol("titan/titan-adventure-155/650-titan-adventure-155-specs"), "Read 650 cc, 667 lb estimated dry, two-person capacity, 20 x 155 track and H-L-N-R transmission."), source("2026 TITAN Adventure model page", pol("titan/titan-adventure-155"), "Describes BackTrak20 and utility equipment; default shown price is ProStar S4, not 650.")],
    specNotes: notes({ weight: estimated, price: "The page defaults to ProStar S4 at $16,999. The 650 quote is not established, so that price is not reused." }),
    analysis: [
      "This TITAN's documented equipment is genuinely different from the trail and mountain entries: high-low transmission, a 20-inch-wide track, BackTrak20 rear suspension and two-person capacity. Standard passenger seating, heated passenger grips and rack/hitch are useful reasons to investigate it for work and shared trips.",
      "Build the buying conversation around the work cycle: load, gradient, turnaround space and passenger use, then ask which transmission range and suspension setup the manual requires. Check loaded transport weight separately from payload. Recovery equipment and cargo accessories should be itemized, and the quote must identify the 650 Adventure rather than ProStar S4 or Adventure Ultimate."
    ],
    fit: ["Utility buyers needing documented transmission ranges and passenger provisions.", "Owners comparing wide-track cargo and towing layouts rather than performance badges."],
    limitations: ["No standard winch is promised.", "Advertised towing capacity is not equivalent to safe capability on every gradient or surface."],
    buyingQuestions: ["Is this the 650 Adventure, S4 or Ultimate?", "What combined load and trailer limits apply to your planned task?", "Which hitch, recovery and cargo accessories are actually installed?"],
    alternatives: [{ id: 6, reason: "Expedition SE combines a 20-inch track with a non-R turbo four-stroke and removable passenger seating." }, { id: 18, reason: "Pantera's 15-inch touring track and passenger-focused equipment offer a different layout when shared trail trips outweigh work tasks." }],
  }),
  12: record({
    status: "documented", configuration: "2026 650 INDY XC 137, 15 x 137 x 1.35 Cobra track.",
    sources: [source("2026 650 INDY XC 137 specifications", pol("indy/indy-xc/650-indy-xc-137-specs"), "Read 650 cc, 495 lb estimated dry, FOX QS3, PRO-CC and electric start."), source("2026 INDY XC model page", pol("indy/indy-xc"), "Read $15,549 starting MSRP for the 650/137; 7S is optional.")],
    specNotes: notes({ weight: estimated, price: msrp, trackLength: "137 inches, 15-inch width and 1.35-inch Cobra profile in the 2026 manufacturer specification." }),
    analysis: [
      "INDY XC 650 is a useful solo trail baseline before adding turbo power or electronic damping. FOX QS3 shocks, PRO-CC suspension, electric start and the 137-inch Cobra track define a concrete package to price. Ask the dealer to explain the manual shock adjustments and set it up for your equipped rider weight before delivery.",
      "The display is a meaningful quote difference: 7S is optional, so compare it with the MessageCenter version using the same track and starter equipment. For a new rider, prioritize control reach and supervised instruction rather than assuming the 650 badge establishes suitability. Buyers committed to a naturally aspirated four-stroke can use SRViper as an engine-architecture alternative."
    ],
    fit: ["Solo trail buyers wanting a non-turbo two-stroke and manually adjustable FOX shocks.", "Buyers comparing a specified base trail package with premium electronics."],
    limitations: ["Manufacturer specification lists one-person capacity.", "7S is optional; passenger accessories require their own compatibility and approval check."],
    buyingQuestions: ["Is the quote for the 650/137 with the documented Cobra track?", "Is the 7S display included or is it the MessageCenter display?", "Can suspension setup be matched to rider weight before delivery?"],
    alternatives: [{ id: 3, reason: "MXZ X-RS compares a larger-displacement two-stroke in a selected 129-inch trail build." }, { id: 21, reason: "SRViper is a naturally aspirated four-stroke trail alternative from an archived model year." }],
  }),
  13: record({
    status: "partial", configuration: "2026 M 858 Sno Pro, selected 154-inch ALPHA ONE variant; starter, gauge and lug profile require model-code confirmation.",
    sources: [...catSources("m-858-sno-pro", "https://www.arcticcat.com/snowmobile/deep-snow/m", "M 858 Sno Pro is listed."), catSpec(20, "858 cc, ALPHA ONE, AC5S shocks; 154/165 dimension table, 427–462 lb family range. Feature bullets conflict with the length table.")],
    specNotes: catNotes({ displacement: "858 cc in the manufacturer-authored MY2026 booklet, page 20; not inferred from the engine badge.", weight: "Page 20 supplies a 427–462 lb estimated dry range across builds, not a 154-inch/starter/gauge-specific weight. No single value assigned.", trackLength: "154 inches supported by page 20's dimension table and EU manual code S2026CMJS4EUP (154, ES, 2.6). Booklet feature bullets say 146/154 while the table says 154/165; verify the actual model code and lug profile." }),
    analysis: [
      "The 2026 M 858 Sno Pro specification booklet identifies an 858 cc two-stroke, ALPHA ONE rear suspension and AC5S shocks. This is a mountain shortlist item for buyers deliberately considering a mono-rail layout. Ask to see the actual skid and its service requirements; the separate HCR and HCX entries use a different twin-rail arrangement.",
      "Track and starter choices materially affect this purchase. A 154-inch version is supported by both the booklet and an EU model code, but the booklet disagrees internally about the wider length range and gives only a family weight range. Have the dealer match the VIN to track, lug, starter, gauge and altitude clutch calibration before discussing loading weight or price. The manual's deep-lug section makes hard-packed access conditions an operating concern."
    ],
    fit: ["Mountain buyers prepared to verify the actual archived unit.", "Shoppers comparing rear-suspension layouts with a dealer-provided build sheet."],
    limitations: ["Booklet length bullets and dimension table conflict; only the selected 154-inch length has independent manual corroboration.", "Family estimated weight range cannot establish this build's loading weight."],
    buyingQuestions: ["What model code identifies market, starter, gauge and lug profile?", "Is the ALPHA ONE skid original and what inspection/service has it received?", "Which altitude clutch calibration and deep-lug access restrictions apply to the intended route?"],
    alternatives: [{ id: 7, reason: "Khaos has a directly readable 2026 configuration-level specification." }, { id: 1, reason: "Summit Expert has engine- and length-specific manufacturer tables." }],
  }),
  14: record({
    status: "documented", configuration: "2026 ZR 858 R-XC, MY2026 booklet's 137 x 15 x 1.352-inch Cobra, electric start; EU lug differs.",
    sources: [...catSources("zr-858-r-xc", "https://www.arcticcat.com/snowmobile/trail/zr", "ZR 858 R-XC is listed."), catSpec(11, "858 cc, 481 lb estimated dry, electric start, AWS 42, FOX QS3R/QS3 and 137 x 15 x 1.352 Cobra.")],
    specNotes: catNotes({ displacement: "858 cc, page 11 of the manufacturer-authored MY2026 booklet.", weight: "481 lb manufacturer estimated dry, page 11, electric-start R-XC; not measured wet weight. Options and regional changes need checking.", trackLength: "137 inches in booklet page 11 and EU code S2026CAJREEUG. Booklet gives 1.352-inch Cobra lugs; EU code says 1.75. Weight/equipment here follow the booklet, not an assumed identical EU build." }),
    analysis: [
      "ZR 858 R-XC offers a defined conventional-shock trail comparison: AWS 42, FOX QS3R ski/rear shocks, a QS3 center shock and R-XC SLIDE-ACTION suspension. The MY2026 booklet specifies electric start and a fully clipped 137-inch Cobra. It is relevant when adjustable mechanical damping, rather than ATAC electronic control, is the purchase priority.",
      "Do not order traction modifications from the package name alone. The booklet lists 1.352-inch lugs, while the EU manual's model code describes 1.75; the shared manual also cautions against studding tracks over 1.6 inches. Match the track and market first, then have the dealer review any proposed studs and tunnel protection. A race-oriented caliper or R-XC badge does not establish competition eligibility."
    ],
    fit: ["Trail buyers investigating a real 2026 R-XC with a traceable model code.", "Shoppers who can obtain the original sales specification before committing."],
    limitations: ["Regional lug difference prevents treating every 137-inch R-XC as the same build.", "Photo is illustrative; exact trim appearance has not been independently authenticated."],
    buyingQuestions: ["Does the model code identify the booklet build or the EU 1.75-inch track version?", "Are the FOX QS3R/QS3 shocks original and when were they serviced?", "What traction equipment is compatible with this track and what is the itemized delivered price?"],
    alternatives: [{ id: 3, reason: "MXZ X-RS is a trail-package comparison with directly verified engine and track tables." }, { id: 9, reason: "VR1 DYNAMIX provides an explicitly named electronic-shock configuration if that is the objective." }],
  }),
  15: record({
    status: "documented", configuration: "2026 Riot 858 Sno Pro, electric start, AC5S shocks, 146 x 15 x 1.75-inch Hurricane; Sport/G8 gauge choices.",
    sources: [...catSources("riot-858-sno-pro", "https://www.arcticcat.com/snowmobile/crossover/xf", "Riot 858 Sno Pro and Riot 858 with ATAC are separate archive entries."), catSpec(15, "858 cc, 469 lb estimated dry, AWS 39, CROSS-ACTION, AC5S and 146 x 15 x 1.75 Hurricane.")],
    specNotes: catNotes({ displacement: "858 cc, manufacturer-authored MY2026 booklet page 15.", weight: "469 lb estimated dry on the Sno Pro page; not the ATAC page's 478 lb and not a ready-to-ride measurement. Gauge choice is not separately weighed.", trackLength: "146 inches with 15-inch width and 1.75-inch lugs in booklet page 15; EU code S2026COJRSEUB also identifies 146/1.75." }),
    analysis: [
      "Riot 858 Sno Pro combines AWS 39, CROSS-ACTION rear suspension and AC5S shocks with a 146-inch Hurricane track. Its 1.75-inch lugs and adjustable 38–40-inch ski stance provide concrete comparison points against Switchback Escape IFS. The separate ATAC model adds different shocks; Sno Pro does not imply electronic damping.",
      "For recurring mixed trips, review the low-snow approach and lubrication requirements before buying traction accessories. The shared manual's caution against studding lugs over 1.6 inches is directly relevant to the listed Hurricane profile. Confirm Sport versus G8 gauge in the quote and compare with Backcountry's longer selected build only after recording track width, profile and actual route needs."
    ],
    fit: ["Mixed-terrain buyers seeking conventional AC5S damping and the 146/1.75 track.", "Buyers comparing front stance and track profile with other crossover packages."],
    limitations: ["ATAC equipment is a separate configuration.", "Published estimated dry weight does not resolve gauge-option weight or actual loaded mass."],
    buyingQuestions: ["Is this Sno Pro or the separately listed ATAC model?", "Which regional model code and track profile are fitted?", "Can the seller document original suspension and any later modifications?"],
    alternatives: [{ id: 10, reason: "Switchback Escape IFS offers two different 146-inch lug profiles and WER Velocity shocks." }, { id: 5, reason: "Backcountry offers a longer selected 154-inch, 16-inch-wide track in a mixed-use family." }],
  }),
  16: record({
    status: "partial", configuration: "2026 generic ZR 600 archive entry; no matching base-package sales specification established.",
    sources: [...catSources("zr-600", "https://www.arcticcat.com/snowmobile/trail/zr", "ZR 600 is listed separately from EPS, Sno Pro, R-XC and ATAC."), catSpec(5, "ZR 600 Sno Pro (599 cc, 129/137) is a named different package; pages 6–7 cover ATAC/R-XC. No generic base ZR 600 page, so these figures are not assigned to this record.")],
    specNotes: catNotes(),
    analysis: [
      "A listing that says only ZR 600 needs a package-identification step before it becomes a useful trail quote. Arctic Cat's archive separates the generic name from Sno Pro, EPS, R-XC and ATAC. The MY2026 booklet gives sales tables for named Sno Pro, ATAC and R-XC packages, but does not settle what the generic archive entry represents.",
      "Ask the seller for the model code and original invoice, then photograph the track label, shocks and steering equipment. The named packages differ in track length, damping and starting equipment, so an advertised engine family cannot normalize the deal. Until that is resolved, compare INDY XC's explicit 650/137 quote as a reference rather than assigning the Sno Pro's figures to an unidentified ZR."
    ],
    fit: ["Trail shoppers investigating a specific ZR 600 listing.", "Buyers willing to resolve the package before comparing equipment or price."],
    limitations: [catMissing, "Sno Pro's 599 cc and 129/137 choices cannot establish every field for the separately archived generic package."],
    buyingQuestions: ["Is the actual package base ZR 600, Sno Pro, EPS, R-XC or ATAC?", "What original track dimensions appear on the build sheet?", "What is the condition of the track, shocks and service history on this unit?"],
    alternatives: [{ id: 12, reason: "INDY XC supplies a directly verified 650/137 trail reference." }, { id: 21, reason: "SRViper provides a documented naturally aspirated four-stroke trail comparison." }],
  }),
  17: record({
    status: "documented", configuration: "2026 M 600 Sno Pro, selected 154 x 15 x 2.6-inch PowerClaw, ALPHA ONE, electric start.",
    sources: [...catSources("m-600-sno-pro", "https://www.arcticcat.com/snowmobile/deep-snow/m", "M 600 Sno Pro is listed."), catSpec(19, "599 cc, ALPHA ONE, AC5S, electric start, 146/154 x 15 x 2.6 PowerClaw; 457 or 466 lb not explicitly assigned to a length.")],
    specNotes: catNotes({ displacement: "599 cc in manufacturer-authored MY2026 booklet page 19.", trackLength: "154-inch selection from page 19's 146/154-inch options; both have 15-inch width and 2.6-inch lugs.", weight: "Page 19 lists 457 or 466 lb estimated dry but does not explicitly map a value to each length. A 154-specific figure is not assigned." }),
    analysis: [
      "M 600 Sno Pro provides a 599 cc ALPHA ONE mountain alternative to the 858 model, with AC5S shocks and electric start. This record selects the booklet's 154-inch PowerClaw with 2.6-inch lugs; a 146-inch option also exists. The engine and starter equipment are concrete reasons to compare it, without assuming the smaller engine makes mountain riding easy.",
      "The booklet's 6,000–8,000-ft clutch calibration makes the delivery setup a useful seller question if your destination is at a different elevation. Inspect mono-rail condition and scratcher equipment, and review deep-lug access restrictions from the manual. Price the whole mountain plan—training, transport and local servicing—rather than expecting the 600 badge alone to settle ownership cost."
    ],
    fit: ["Mountain buyers specifically researching the archived 600-family offering.", "Shoppers who can physically identify the rear suspension and retrieve the model code."],
    limitations: ["Booklet weight alternatives are not explicitly mapped to the selected length.", "Deep-lug track requires suitable snow for cooling and lubrication; mountain training remains a separate requirement."],
    buyingQuestions: ["Does the model code identify the 154 x 15 x 2.6 track?", "Has the ALPHA ONE rail or track been repaired or replaced?", "Is clutch calibration appropriate for your destination elevation, and who will service it locally?"],
    alternatives: [{ id: 13, reason: "M 858 is another archived Cat research lead, not a verified horsepower upgrade calculation." }, { id: 7, reason: "Khaos offers a directly documented mountain configuration if specification certainty matters." }],
  }),
  18: record({
    status: "documented", configuration: "2026 Pantera 7000, 1049 cc naturally aspirated four-stroke, factory touring seating, 146 x 15 x 1.25-inch RipSaw.",
    sources: [...catSources("pantera-7000", "https://www.arcticcat.com/snowmobile/touring/pantera", "Pantera 7000 and Pantera 9000 are separate entries."), catSpec(25, "1049 cc three-cylinder, 621 lb estimated dry, 146 x 15 x 1.25 RipSaw, heated seats, passenger equipment and storage.")],
    specNotes: catNotes({ displacement: "1049 cc, naturally aspirated three-cylinder four-stroke, manufacturer-authored MY2026 booklet page 25.", weight: "621 lb manufacturer estimated dry, page 25; not fueled touring load, payload capacity or Pantera 9000's weight.", trackLength: "146 inches, 15-inch width and 1.25-inch RipSaw lugs on page 25." }),
    analysis: [
      "Pantera 7000 is a factory passenger-focused touring candidate: the MY2026 booklet lists heated seats, passenger hand warmers and footrests, an adjustable backrest, mirrors and a rear storage compartment. Its naturally aspirated 1049 cc four-stroke and 146-inch RipSaw distinguish it from the turbo Pantera 9000 and the 20-inch-wide utility alternatives.",
      "Have both riders check seat, handhold and footrest fit in their winter gear, then verify combined load limits with luggage included. The 621-lb estimated dry figure needs a separate transport calculation. For ownership budgeting, the year-specific manual distinguishes the 7000's 87-octane fuel from the 9000's premium requirement and supplies oil/filter and valve-clearance service checks; ask for quotes at this unit's mileage and storage history."
    ],
    fit: ["Touring shoppers prepared to document a specific 2026 Pantera.", "Buyers comparing passenger provisions and permitted loads rather than assumed engine reputation."],
    limitations: ["15-inch touring track is not the same work layout as a 20-inch utility track.", "Standard heating and storage do not establish payload or remote-trip range; verify limits and condition."],
    buyingQuestions: ["Do both riders fit the passenger seating and footrests, and what loaded limit applies?", "Do seat heaters, passenger grips, mirrors and storage hardware operate correctly?", "Are oil/filter and valve-clearance checks documented, and what service is due before delivery?"],
    alternatives: [{ id: 6, reason: "Expedition SE has directly documented removable passenger seating and wide-track equipment." }, { id: 11, reason: "TITAN's specification explicitly states two-person capacity and standard passenger hardware." }],
  }),
  19: record({
    status: "archived", configuration: "2025 Sidewinder SRX LE EPS, US final-edition trail model.",
    sources: [source("2025 SRX LE EPS specification", yam("sidewinder-srx-le-eps/specs"), "Read 998 cc turbo four-stroke, 137 x 1.00 track and iQS shocks. No weight or exact hp is populated."), source("2025 SRX LE EPS model page", yam("sidewinder-srx-le-eps"), "Read 2025 final-edition identity, EPS name and $21,499 US MSRP; $600 destination is additional.")],
    specNotes: notes({ price: "Historical US MSRP $21,499 plus the page's separate $600 destination charge; tax, title, preparation and options additional. Not evidence of current inventory or transaction value.", horsepower: "No exact hp figure in the consulted table; Ultra Performance and fastest wording are marketing claims, not measured outputs.", year: "Explicit 2025 Final Edition. Archived model year; an inventory link is not evidence of ongoing production.", weight: "Yamaha displays a generic wet-weight definition but no populated numeric weight for this model. That footnote does not supply a weight." }),
    analysis: [
      "SRX LE EPS is a trail candidate for buyers intentionally seeking electric steering assistance and handlebar-controlled iQS compression adjustment. The 137-inch track has a 1.00-inch profile, unlike the M-TX's deep-lug mountain track despite their shared 998 cc turbo engine. The center shock is a separate monotube component, not another iQS unit.",
      "For a remaining-stock or used Final Edition, make an EPS/iQS demonstration and service availability part of the purchase. Have the seller identify any replacement track and traction modifications; do not assume a photograph shows the original profile. The historical $21,499 MSRP plus $600 destination is a reference for the original price basis, while condition, delivery charges and warranty determine the deal now."
    ],
    fit: ["Trail buyers interested in the documented EPS/iQS equipment.", "Shoppers comfortable evaluating a final-edition or remaining-stock machine."],
    limitations: ["Archived 2025 model, not a 2026 production entry.", "No exact hp, dry weight or comparative speed result is established."],
    buyingQuestions: ["Is the unit unused remaining stock or previously registered?", "What warranty starts at delivery and who will service EPS/iQS?", "Is the installed track the original 1.00-inch profile?"],
    alternatives: [{ id: 2, reason: "Renegade X-RS provides a newer-model-year turbo four-stroke trail comparison." }, { id: 21, reason: "SRViper removes the turbo from the Yamaha trail comparison." }],
  }),
  20: record({
    status: "archived", configuration: "2025 Sidewinder M-TX LE 153, US mountain specification.",
    sources: [source("2025 M-TX LE 153 specification", yam("sidewinder-m-tx-le-153/specs"), "Explicit 2025 heading; read 998 cc, 153 x 3.00 track, twin-rail suspension and Float QS3/QS3L."), source("2025 M-TX LE 153 model page", yam("sidewinder-m-tx-le-153"), "Read $19,999 US MSRP plus $600 destination.")],
    specNotes: notes({ price: "Historical US MSRP $19,999 plus separate $600 destination; excludes tax, title, preparation and options.", year: "2025 explicitly identified by the manufacturer model and specifications pages.", weight: "Generic wet-weight footnote appears, but no numeric weight is populated for this model." }),
    analysis: [
      "M-TX LE 153 is a distinct mountain option for someone deliberately considering a turbo four-stroke rather than a two-stroke. Its twin-rail suspension, 3.00-inch-lug track and 36-inch adjustable stance separate it from the trail SRX. FOX Float QS3 shocks and the QS3L rear climb-lockout feature give the dealer a specific air-shock setup to explain.",
      "Arrange a suspension inspection and setup demonstration before paying for an archived unit, particularly if air-shock service records are incomplete. Check access-trail restrictions for the deep-lug track and obtain an actual loading weight for transport; the online table supplies no number. Compare the whole ownership plan with Freeride or PRO RMK rather than borrowing a horsepower or mass estimate from another Sidewinder."
    ],
    fit: ["Mountain buyers deliberately considering a turbo four-stroke.", "Shoppers who can verify the specific final-model-year M-TX build."],
    limitations: ["Actual loading weight must be established independently; the specification table leaves it blank.", "Deep-lug mountain equipment should not be treated as equivalent to a trail track."],
    buyingQuestions: ["Is the model code and registration genuinely 2025?", "What air-shock setup, inspection and service history is documented?", "What cooling precautions and track limitations apply to access trails?"],
    alternatives: [{ id: 4, reason: "Freeride offers a sourced 154-inch turbo two-stroke mountain configuration." }, { id: 8, reason: "PRO RMK offers a naturally aspirated long-track mountain alternative." }],
  }),
  21: record({
    status: "archived", configuration: "2025 SRViper L-TX GT, naturally aspirated four-stroke solo trail model.",
    sources: [source("2025 SRViper L-TX GT specification", yam("srviper-l-tx-gt/specs"), "Read 1049 cc, FOX QS3 and 137 x 1.25 track; exact hp and weight not listed."), source("2025 SRViper L-TX GT model page", yam("srviper-l-tx-gt"), "Read 2025 Final Edition and $16,299 US MSRP plus $600 destination.")],
    specNotes: notes({ price: "Historical US MSRP $16,299 plus separate $600 destination; excludes tax, title, preparation and options.", horsepower: "Yamaha describes a 125HP class in model copy, not an exact configuration-specific output.", year: "Manufacturer identifies 2025 Final Edition; archived catalog, not an assurance of inventory.", weight: "A generic wet-weight footnote is shown without a numeric model weight." }),
    analysis: [
      "SRViper L-TX GT is the naturally aspirated four-stroke trail alternative to Sidewinder in this selection. Its 1049 cc engine, QS3 ski and rear shocks, monotube center shock and 137 x 1.25-inch track define a different package from the turbo SRX. Start here when a four-stroke is a deliberate preference but EPS and electronic damping are not essential.",
      "Compare actual 2025 GT inventory with the 2024 GT on service records, hours, mileage, track condition and warranty start rather than the $100 historical MSRP gap. Ask for shock service and seasonal engine-maintenance quotes. GT equipment is for a trail shortlist; it does not establish an approved passenger layout or make incomplete records unimportant."
    ],
    fit: ["Solo trail buyers seeking a naturally aspirated four-stroke.", "Remaining-stock or used buyers comparing the documented GT shock package."],
    limitations: ["No verified two-person capacity is claimed.", "No exact horsepower, mass or reliability result is established."],
    buyingQuestions: ["Is this the 2025 GT Final Edition rather than the 2024 GT?", "What warranty and dealer support apply to this particular unit?", "Are the FOX shocks and original track present and serviced?"],
    alternatives: [{ id: 22, reason: "The archived 2024 GT is a year-specific comparison, not a cheaper base trim." }, { id: 12, reason: "INDY XC provides a newer two-stroke trail configuration with conventional adjustable shocks." }],
  }),
  22: record({
    status: "archived", configuration: "2024 SRViper L-TX GT, US naturally aspirated four-stroke trail model.",
    sources: [source("2024 SRViper L-TX GT model page", yam("srviper-l-tx-gt-24"), "Explicit 2024 heading and $16,199 MSRP. Destination $545 and freight surcharge $300 are separate."), source("2024 SRViper L-TX GT specifications", yam("srviper-l-tx-gt-24/specs"), "Read 1049 cc four-stroke, 137 x 1.25 track, QS3 ski/rear and monotube center shocks.")],
    specNotes: notes({ year: "Manufacturer's year-specific page explicitly identifies 2024 GT.", price: "Historical US MSRP $16,199; manufacturer lists $545 destination and $300 freight surcharge separately, before tax, title, preparation or options.", horsepower: "125HP-class marketing is not exact output.", weight: "Generic wet-weight definition does not provide a numeric weight; model value is absent." }),
    analysis: [
      "The 2024 GT is a condition-led alternative to the 2025 SRViper, not a different low-equipment base trim. Yamaha's year-specific table identifies the same 1049 cc engine displacement and 137 x 1.25-inch track dimensions, with QS3 ski/rear shocks and a monotube center shock. That makes equipment and condition the useful basis for adjacent-year shopping.",
      "Normalize the fees before comparing original prices: this page separates $545 destination and a $300 freight surcharge, whereas the 2025 page lists $600 destination. For a purchase today, ask when it was first registered, how it was stored and which service is due. An older year can be worth considering, but a small historical MSRP difference cannot outweigh a repair estimate or lost warranty coverage."
    ],
    fit: ["Buyers comparing actual 2024 GT inventory with the 2025 GT.", "Used-market shoppers prioritizing a traceable model year and maintenance record."],
    limitations: ["Archived 2024 GT; availability and remaining warranty require seller confirmation.", "Photo is illustrative; exact year/trim appearance has not been independently authenticated."],
    buyingQuestions: ["Does the VIN and original invoice identify 2024 GT?", "How do hours, mileage, storage and servicing compare with the 2025 listing?", "What fees and remaining warranty apply rather than the historic MSRP?"],
    alternatives: [{ id: 21, reason: "The 2025 GT is the appropriate adjacent model-year comparison." }, { id: 19, reason: "SRX is relevant only if turbo powertrain and EPS/iQS equipment are intentional priorities." }],
  }),
  23: record({
    status: "archived", configuration: "2025 Transporter Lite, 397 cc two-stroke, 146-inch flip-up-rail rear suspension.",
    sources: [source("2025 Transporter Lite specification", yam("transporter-lite/specs"), "Read 397 cc, batteryless EFI, 146 x 1.60 track and hydraulic twin-tube shocks."), source("2025 Transporter Lite model page", yam("transporter-lite"), "Read $9,999 US MSRP plus $600 destination; no exact hp or weight established.")],
    specNotes: notes({ price: "Historical US MSRP $9,999 plus separate $600 destination; tax, title, preparation and accessories excluded.", year: "Manufacturer explicitly identifies 2025. Archived model; availability must be checked independently.", horsepower: "No official numeric hp in the consulted specification.", weight: "Generic wet-weight footnote appears but the model's numeric weight is not populated." }),
    analysis: [
      "Transporter Lite is worth investigating for property access or smaller utility tasks that do not demand a wide-track high-low transmission layout. Its 397 cc two-stroke, 146-inch flip-up-rail suspension and hydraulic twin-tube shocks are distinct from TITAN or Expedition. Batteryless EFI describes the injection system; it should not be confused with the absence of electric-start equipment, which Yamaha lists in the model copy.",
      "Have the seller demonstrate the rear-rail articulation and locking arrangement, then verify the approved rack, hitch and load limits for the task you have written down. The model page lists a rear rack and a 15.5-inch windscreen, useful items to inspect on used inventory. For passenger or larger-load work, compare an approved two-up utility configuration rather than adding accessories and assuming equivalent capacity."
    ],
    fit: ["Utility shoppers whose requirements can be checked against this smaller-engine model's manual.", "Buyers who want the documented flip-up-rail arrangement rather than a performance trail package."],
    limitations: ["No high-low transmission or two-person load capability is established here.", "Actual mass and approved towing/cargo limits need documentation before transport or work planning."],
    buyingQuestions: ["What cargo, towing and passenger limits apply to this VIN?", "Do flip-up rails and their locking mechanism operate correctly, and which hitch is approved?", "Is it remaining new stock, and what service and warranty support is available?"],
    alternatives: [{ id: 11, reason: "TITAN is a documented wide-track two-person utility option if the task requires different capacity and transmission equipment." }, { id: 6, reason: "Expedition SE offers another documented wide-track/passenger layout, not an assumed equivalent payload." }],
  }),
};