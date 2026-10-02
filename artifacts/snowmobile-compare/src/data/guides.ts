export interface GuideSource { label: string; url: string }
export interface GuideSection {
  heading: string;
  body: string;
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  sourceIds?: string[];
}
export interface Guide {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  sections: GuideSection[];
  sources: GuideSource[];
}

// Research dates describe this editorial review, not the publication date of a source.
export const researchedDate = "2026-10-01";
export const researchedDateLabel = "October 1, 2026";
export const guideSources: Record<string, GuideSource> = {
  buying: { label: "BRP / Ski-Doo: snowmobile buying guide (manufacturer category descriptions)", url: "https://ski-doo.brp.com/us/en/models/snowmobiles/buying-guide.html" },
  engines: { label: "BRP / Ski-Doo: Rotax engine technology (manufacturer claims, not independent tests)", url: "https://ski-doo.brp.com/us/en/discover/technologies/vehicle-technologies/rotax-engines.html" },
  manual: { label: "Polaris: 2023 Patriot Boost / 9R / Slash / Pro RMK / Khaos owner's manual (model-specific example)", url: "https://publications.polaris.com/owner/owners-manuals/0000813207.xml?onepage=true" },
  manuals: { label: "Polaris: find the owner's manual for your model and year", url: "https://www.polaris.com/en-us/snowmobiles/owner-resources/owners-manuals" },
  safety: { label: "Minnesota DNR: snowmobile safety, training and ice precautions", url: "https://www.dnr.state.mn.us/snowmobiling/safety.html" },
  avalanche: { label: "Avalanche Canada: mountain snowmobiling, forecasts and sled-based training", url: "https://avalanche.ca/resources/mountain-snowmobiling" },
  gear: { label: "Avalanche Canada: essential rescue gear and communication", url: "https://avysavvy.avalanche.ca/en-ca/essential-gear" },
  cat2026: { label: "Arctic Cat MY2026 specification booklet (manufacturer-authored; ArcticInsider-hosted copy)", url: "https://www.arcticinsider.com/wp-content/uploads/2025/05/2026-ARCTIC-CAT-MODEL-SPECS.pdf" },
  catMountainManual: { label: "Arctic Cat MY2026 ZR/Riot/M 600/858 operator manual, p/n 653-00054", url: "https://www.arcticcat.com/hubfs/model-archive-resources/2026/snowmobile/m-858-sno-pro/2026-m-858-sno-pro-owners-manual-en.pdf?hsLang=en-us" },
  catTouringManual: { label: "Arctic Cat MY2026 ZR/Riot/Pantera 7000/9000 operator manual, p/n 653-00049", url: "https://www.arcticcat.com/hubfs/model-archive-resources/2026/snowmobile/pantera-7000/2026-pantera-7000-owners-manual-en.pdf?hsLang=en-us" },
  viper2024: { label: "Yamaha 2024 SRViper L-TX GT: historical US price and separate charges", url: "https://yamahamotorsports.com/models/srviper-l-tx-gt-24" },
  viper2025: { label: "Yamaha 2025 SRViper L-TX GT: historical US price and separate charges", url: "https://yamahamotorsports.com/models/srviper-l-tx-gt" },
};
const sources = (...ids: string[]) => ids.map(id => guideSources[id]);

export const guides: Guide[] = [
  {
    id: "how-to-choose",
    title: "How to Choose Your First Snowmobile",
    summary: "Turn a riding plan into a shortlist, compare complete ownership costs, and know what to verify before paying a deposit.",
    readTime: "Decision worksheet",
    sources: sources("buying", "manuals", "safety", "viper2024", "viper2025"),
    sections: [
      {
        heading: "Start with a route, not an engine",
        body: "Write down the places you can legally ride, the people you will ride with, and the trips you can realistically take this season. A machine for an imagined mountain holiday may be a poor fit for regular local trail rides. Manufacturer categories describe intended use, not a guarantee of handling, safety or suitability. Ski-Doo separates trail, deep-snow, crossover, utility, mid-sized and youth machines; use those distinctions to ask questions rather than to choose a badge.",
        bullets: ["Name your usual trailhead, typical snow conditions and nearest service shop.", "Record solo-seat versus passenger needs, cargo and towing requirements; verify approved capacities in the exact manual.", "Check registration, training, age, access and insurance rules with the authority responsible for that destination.", "If access, storage or transport is unresolved, price a guided rental before committing to ownership."],
        sourceIds: ["buying", "safety"],
      },
      {
        heading: "Use non-negotiables to narrow the shortlist",
        body: "Reject unsuitable machines before comparing optional equipment. The table is our decision framework, not a manufacturer ranking. A crossover is not automatically the best beginner choice: a compromise only helps when you actually need both uses.",
        table: { headers: ["Your recurring use", "Start your search here", "Verify before shortlisting"], rows: [
          ["Groomed trails, one rider", "Trail-oriented machine", "Control reach, wind protection, suspension setup and low-snow restrictions"],
          ["Regular passenger trips", "Factory-approved two-up configuration", "Seating, handholds, footrests and total load limit; a long seat alone is not approval"],
          ["Deep snow away from trails", "Deep-snow or appropriate crossover machine", "Legal access, training, avalanche exposure and recovery plan"],
          ["Cargo or work", "Utility-oriented machine", "Cargo, hitch and towing limits; braking and route suitability under load"],
        ] },
        sourceIds: ["buying", "manuals"],
      },
      {
        heading: "Build a first-season cash budget",
        body: "Ask for a written out-the-door quote in your currency, including tax, freight, setup, registration and optional products separately. Then add protective equipment, training, transport, storage, fuel, service and a repair reserve. Financing payments do not capture the full cost: compare interest and total repayment too. The following invented budget demonstrates arithmetic only; it is not a market-price estimate.",
        table: { headers: ["Hypothetical expense", "Assumed amount (USD)"], rows: [
          ["Vehicle, taxes and dealer charges combined", "$9,000"],
          ["Gear and training", "$1,200"],
          ["Transport and storage for the season", "$800"],
          ["Insurance, permits and planned service", "$700"],
          ["Fuel and repair reserve", "$600"],
          ["First-season cash allocation", "$12,300"],
        ] },
        bullets: ["Calculation: 9,000 + 1,200 + 800 + 700 + 600 = 12,300. Replace every input with your quotes.", "The $600 reserve is money set aside, not necessarily spent. This example excludes financing, resale proceeds and depreciation.", "For an economic cost comparison, use depreciation plus running costs and interest; do not count both full purchase price and depreciation as expenses."],
      },
      {
        heading: "Compare the same price layers",
        body: "Yamaha's archived SRViper GT pages show why a lower MSRP can mislead. The 2024 page lists $16,199 MSRP, $545 destination and $300 freight surcharge: $17,044 before any tax, preparation or other fees. The 2025 page lists $16,299 and $600 destination: $16,899 on that limited basis. The older year has the lower base but the higher listed subtotal by $145. These are historical advertised amounts, not current offers or a reason to prefer one condition over another.",
        bullets: ["Use the dealer-quote worksheet to separate base price, freight/setup, accessories, fees and tax; mark missing mandatory charges unresolved.", "Request the written tax basis from each dealer. A trade-in allowance and financing offer should not conceal the vehicle's price.", "Transfer the normalized acquisition amount into the ownership-cost planner, then add your own fuel, oil, service, transport and resale assumptions.", "Save the quote date, currency and exact engine/track alongside the totals so a later offer can be compared consistently."],
        sourceIds: ["viper2024", "viper2025"],
      },
      {
        heading: "Compare new and used without mileage shortcuts",
        body: "A low odometer reading is not a condition report. For either choice, verify the VIN, exact model year, configuration, ownership documents, applicable recalls and any remaining warranty terms. Ask an independent qualified technician to inspect a used machine before purchase, especially if its maintenance history is incomplete. New stock can still need recall work or storage-related attention; confirm what the dealer will deliver in writing.",
        bullets: ["Request service invoices and ask about modifications, collisions, overheating and storage.", "Have track, steering, brakes, suspension and drivetrain condition assessed; obtain a repair estimate, not just a pass/fail opinion.", "Do not accept a seller's explanation of a sticking throttle, brake fault or fuel leak as a minor issue to fix later.", "Compare the delivered cost of the used machine plus known repairs with the delivered new quote. Keep an uncertainty reserve separate."],
        sourceIds: ["manuals"],
      },
      {
        heading: "Make the final choice in riding gear",
        body: "With the engine off and the dealer's permission, check brake reach, throttle reach, visibility, seated posture and the ability to change position while wearing your actual boots and gloves. Arrange supervised instruction or a legitimate demo where available; a showroom fit check cannot prove on-snow behavior. Ask who performs warranty work, how appointments are booked and which consumables are stocked. Choose only after your mandatory requirements are met; if none fits, renting is a valid outcome.",
        bullets: ["Take home: exact model/engine/track identification, owner's manual, itemized quote and service contact.", "Before the first ride: complete applicable training, read the pre-ride checklist and select an open route appropriate for the group.", "Do not let a discount or a more powerful engine compensate for poor fit, missing records or unaffordable upkeep."],
        sourceIds: ["safety", "manuals"],
      },
    ],
  },
  {
    id: "trail-vs-mountain",
    title: "Trail vs. Mountain Snowmobiles: Choose for Your Terrain",
    summary: "Understand track and chassis tradeoffs, the limits of crossover labels, and how a real route changes the buying decision.",
    readTime: "Terrain decision guide",
    sources: sources("buying", "manual", "avalanche", "catMountainManual"),
    sections: [
      {
        heading: "The route is the starting point",
        body: "Trail and mountain labels describe design priorities, not where a rider is allowed to go. Ski-Doo's buying guide describes trail machines for groomed routes and deep-snow machines around lightweight construction and longer tracks. A trail machine can encounter fresh snow; a mountain machine may use a trail to reach its destination. Neither fact makes the two interchangeable. Choose for the conditions you repeatedly face and confirm local access separately.",
        sourceIds: ["buying"],
      },
      {
        heading: "Compare the whole configuration",
        body: "Track length is the circumference of the endless track, not the length touching snow. Width, lug shape, track construction, suspension geometry and load also matter. Longer tracks can provide more snow contact in an appropriate chassis, but length alone cannot predict flotation, turning effort or climbing ability. This comparison describes priorities rather than fixed specifications.",
        table: { headers: ["Priority", "Trail-oriented", "Deep-snow-oriented", "What to check"], rows: [
          ["Repeated groomed travel", "Suspension and ergonomics aimed at trail use", "Designed primarily around deep-snow maneuvering", "Actual track, skis, cooling needs and rider fit"],
          ["Unpacked snow", "May compromise deep-snow mobility", "Longer-track, lightweight configurations are common", "Load, snow conditions and training rather than a length threshold"],
          ["Passenger comfort", "Some touring configurations provide approved two-up equipment", "Do not assume passenger approval", "Exact seating and load limits"],
          ["Mixed trips", "Can suit a mostly-trail itinerary", "May involve long unsuitable access sections", "Whether a crossover configuration addresses the actual compromise"],
        ] },
        sourceIds: ["buying"],
      },
      {
        heading: "Packed snow changes the operating limits",
        body: "The Polaris RMK-family manual warns that inadequate snow can mean inadequate slide lubrication and engine cooling. Arctic Cat's MY2026 600/858 manual goes further in its Deep Lug Track (M) section: it describes powder/deep-snow use, trail speed and scratcher requirements, track-specific sustained-speed limits and damage risks on ice or hard-packed snow. It also warns that track damage can precede the temperature light. A physically passable approach can therefore be unsuitable for the selected machine.",
        bullets: ["Ask the dealer to show the specific manual pages for your proposed track and cooling system.", "Plan an alternate route or cancel when conditions do not meet the machine's requirements.", "Treat an overheating warning or unusual running condition according to the manual; do not continue simply to reach better snow."],
        sourceIds: ["manual", "catMountainManual"],
      },
      {
        heading: "Worked route example: a crossover is not an average",
        body: "Assume a rider plans ten outings: eight on maintained trails and two guided deep-snow days. These are fictional plans, not usage statistics. Start by comparing a suitable trail machine plus rentals for the two specialist days against a crossover for all ten. Include rental availability and transport in the cost comparison. Do not calculate a supposedly ideal track by averaging trail and mountain lengths: a machine's configuration and operating limits cannot be averaged.",
        bullets: ["If the two deep-snow days disappear from the calendar, does the crossover still solve a regular need?", "If every outing includes a hard-packed approach, can the selected machine operate there under the expected conditions?", "If the off-trail route crosses avalanche terrain, is the whole group trained and equipped? Changing the sled does not remove that requirement."],
        sourceIds: ["manual", "avalanche"],
      },
      {
        heading: "Mountain capability is not avalanche readiness",
        body: "Avalanche Canada advises snowmobilers to pay attention to the specific avalanche problems in the daily forecast across elevations and aspects. A flat stopping place can still be below avalanche terrain; select the complete route, not just the slope you intend to ride. Get sled-specific avalanche education before entering exposed terrain and practice companion rescue. When you cannot evaluate the terrain or conditions, choose a route outside avalanche exposure with qualified local guidance.",
        bullets: ["Record a primary route, a lower-exposure alternative and a turnaround time.", "Check the local forecast on the day of travel, not only when booking the trip.", "Treat marketing photographs and horsepower claims as irrelevant to today's avalanche decision."],
        sourceIds: ["avalanche"],
      },
    ],
  },
  {
    id: "2-stroke-vs-4-stroke",
    title: "2-Stroke vs. 4-Stroke Snowmobiles: Compare Ownership, Not Stereotypes",
    summary: "Separate engine design from package weight, service obligations and running costs with a transparent comparison worksheet.",
    readTime: "Engine comparison worksheet",
    sources: sources("engines", "manuals", "buying", "catMountainManual", "catTouringManual"),
    sections: [
      {
        heading: "What the labels do and do not tell you",
        body: "A two-stroke completes its cycle in two piston strokes; a four-stroke completes it in four. That distinction does not specify throttle response, fuel economy, reliability or suitability for a new rider. Injection, boost, calibration, clutching, chassis and load all change the result. BRP offers both two-stroke E-TEC and four-stroke ACE engines, including turbocharged configurations. Its performance descriptions and internal-test numbers are manufacturer claims, not a controlled comparison across brands.",
        sourceIds: ["engines"],
      },
      {
        heading: "Compare complete machines under the same assumptions",
        body: "An engine's architecture is only one part of the purchase. A lighter published vehicle may exclude fluids or equipment that another weight includes. An adjustable throttle mode may be useful, but its presence must be verified on the actual trim, and it does not replace instruction. For a fair shortlist, keep track, seating, cargo and intended terrain as similar as possible.",
        table: { headers: ["Question", "Evidence to collect", "Avoid this shortcut"], rows: [
          ["Which is easier for me to manage?", "Supervised fit/demo, ready-to-ride weight and control behavior", "All four-strokes are gentle; all two-strokes are aggressive"],
          ["Which costs less to run?", "Your fuel use, required fuel grade, oil and service quotes", "A single advertised economy number settles it"],
          ["Which lasts longer?", "Condition, records, usage and model-specific service requirements", "One architecture guarantees a mileage lifespan"],
          ["Which suits the route?", "Complete chassis, track, cooling and load configuration", "Choose an engine first and ignore the rest"],
        ] },
        sourceIds: ["engines", "buying", "manuals"],
      },
      {
        heading: "Understand the lubrication obligation",
        body: "Many current two-stroke snowmobiles use oil injection; do not add oil to fuel unless your exact manual instructs you to. Four-strokes have engine-oil service requirements, but oil grade, checking procedure, interval and filter requirements are model-specific. Neither design is maintenance-free. Ask for the actual service schedule rather than assuming a universal rebuild interval for two-strokes or a universal valve-adjustment schedule for four-strokes.",
        bullets: ["Confirm the required fuel grade and permitted ethanol content from the manual.", "Identify each fill point and fluid specification with the dealer before your first ride.", "Get written prices for scheduled work at your expected annual distance and calendar age.", "For a used purchase, missing service records are uncertainty in either engine type, not proof of a bargain."],
        sourceIds: ["manuals"],
      },
      {
        heading: "Use the exact fuel and service schedule in the budget",
        body: "Two manuals from one manufacturer illustrate the difference. Arctic Cat's MY2026 600/858 C-TEC2 manual specifies premium 91-octane fuel and injection-oil obligations. Its 7000/9000 four-stroke manual distinguishes the 7000's 87-octane requirement from the 9000's 91, and includes engine-oil/filter and valve-clearance work. The shared manufacturer does not make fuel grade or service cost interchangeable.",
        bullets: ["Give the shop your exact engine, mileage and calendar/storage history when requesting service quotes.", "Use separate fuel-price assumptions when the two candidates require different grades.", "For an injection-oil machine, budget documented consumption or a clearly labeled estimate; for a four-stroke, include the applicable oil/filter service.", "These examples identify budgeting questions. Read the complete applicable fuel and service instructions before operating or maintaining a machine."],
        sourceIds: ["catMountainManual", "catTouringManual"],
      },
      {
        heading: "Worked running-cost example",
        body: "Assume two hypothetical candidates each travel 1,000 km. Candidate A uses 16 L/100 km and candidate B 13 L/100 km; assume fuel costs $1.80/L for both. These inputs are invented solely to show the calculation, are not measured economy and do not represent a particular engine type. A uses 160 L costing $288; B uses 130 L costing $234. The modeled fuel difference is $54, before oil or service.",
        bullets: ["Formula: distance ÷ 100 × L/100 km × fuel price.", "Add A's actual injection-oil consumption if applicable, and each machine's scheduled service, to compare running cash costs.", "If one hypothetical service quote is $100 higher, that alone exceeds this example's $54 fuel saving. Do not decide on fuel use alone.", "Repeat with your own high- and low-use estimates. Snow, load, pace and route changes make a single forecast uncertain."],
      },
      {
        heading: "Decide with a service-and-use worksheet",
        body: "List delivered price, ready-to-ride load, required fuel, consumables, service access and route suitability for each exact machine. Mark unverified fields as unknown. Choose only when the route and fit requirements pass, then compare total cost. A preference for one engine sound or feel is legitimate, but it should not be presented as evidence of lower breakdown risk.",
        bullets: ["Ask the dealer which maintenance tasks owners may perform and which need specialist tools or training.", "Check warranty terms for the exact vehicle and any modifications.", "If no comparable economy data exists, keep a range in the budget rather than borrowing a marketing figure from another chassis."],
        sourceIds: ["manuals", "engines"],
      },
    ],
  },
  {
    id: "reading-specs",
    title: "How to Read Snowmobile Specs Without False Comparisons",
    summary: "Normalize year, trim, weight and track definitions, then use a worked loading example to expose missing information.",
    readTime: "Spec-checking worksheet",
    sources: sources("engines", "buying", "manuals", "cat2026", "catMountainManual"),
    sections: [
      {
        heading: "Identify the machine before comparing numbers",
        body: "Record manufacturer, model year, market, trim, engine, track and installed options. A model-family page may show multiple configurations or a newer year than a dealer's inventory. Save the dated official specification or quote. If a value is absent, mark it unknown; displacement is not a substitute for a missing horsepower figure, and a different trim is not a substitute for a missing weight.",
        bullets: ["Compare prices in the same currency and on the same basis: base MSRP or complete delivered quote.", "Record whether each value is manufacturer-stated, dealer-provided, measured or calculated.", "Keep optional seats, batteries, storage and track packages attached to the exact configuration.", "Ask whether a power claim is engine output, track output, mechanical horsepower or metric horsepower before comparing it."],
        sourceIds: ["engines"],
      },
      {
        heading: "Use this spec dictionary",
        body: "Specifications help eliminate mismatches; they do not predict every riding outcome. In particular, engine displacement describes swept cylinder volume, not a skill level or a universal power class.",
        table: { headers: ["Specification", "Meaning", "What it cannot tell you alone"], rows: [
          ["Displacement (cc)", "Total swept volume of the engine's cylinders", "Power, throttle behavior, insurance cost or beginner suitability"],
          ["Track length", "Circumference of the endless track; not the clutch drive belt", "Ground contact length or flotation by itself"],
          ["Track width and lug height", "Belt width and height of its projecting traction features", "Compatibility with a different chassis or permission for every surface"],
          ["Suspension travel", "Published movement for the specified suspension measurement", "Comfort, damping quality or correct setup for your load"],
          ["Fuel capacity", "Nominal tank volume", "Usable range or a safe distance between fuel stops"],
          ["Weight", "Mass under the manufacturer's stated measurement conditions", "Loaded transport weight unless all omissions are accounted for"],
        ] },
        sourceIds: ["buying", "manuals"],
      },
      {
        heading: "Dry weight is not ready-to-ride weight",
        body: "Read the manufacturer's definition rather than assuming all dry weights exclude the same things. Fuel, some fluids, optional equipment and luggage may need to be added; do not add an item already included. There is no reliable universal 'add 15–25 lb' rule. For towing or trailer decisions, use a scale and the relevant vehicle, trailer, axle and hitch ratings, not a marketing weight.",
        bullets: ["Build a checklist of what the published weight includes and excludes.", "Separate machine-plus-cargo mass from rider/passenger load when checking the specific capacity limit.", "Include trailer weight and all other cargo in transport calculations; snow and ice accumulation can change actual weight.", "If the weight definition is unavailable, flag the comparison as unresolved rather than ranking close values."],
        sourceIds: ["manuals"],
      },
      {
        heading: "Worked loading example with explicit assumptions",
        body: "Assume an invented machine weighs 220 kg in a stated condition that excludes fuel and 8 kg of other required fluids. Assume it receives 35 L of fuel at an illustrative density of 0.74 kg/L, plus 12 kg of accessories and 9 kg of luggage. Fuel mass is 35 × 0.74 = 25.9 kg. Machine plus luggage is therefore 220 + 25.9 + 8 + 12 + 9 = 274.9 kg. This is not a specification for any snowmobile.",
        bullets: ["If the published 220 kg already includes those 8 kg of fluids, the result becomes 266.9 kg. Definition changes the comparison.", "A hypothetical 90 kg equipped rider brings the operating total to 364.9 kg under the first assumption; this does not establish any allowable load.", "Fuel density varies with blend and temperature. The assumed factor is arithmetic input, not a required constant.", "Weigh the actual loaded machine for critical capacity decisions and check how the manufacturer defines its load rating."],
      },
      {
        heading: "A real regional mismatch: ZR 858 R-XC",
        body: "The MY2026 Arctic Cat specification booklet's page 11 lists a 137 x 15 x 1.352-inch fully clipped Cobra for ZR 858 R-XC. The year's shared operator manual identifies an EU R-XC model code with a 137-inch track and 1.75-inch lug designation. Both support the length; they do not support an identical regional track. The booklet's 481-lb estimated dry figure belongs to its described build, not automatically to every machine with the same name.",
        bullets: ["Copy the market and full model code from the seller's documents.", "Match the installed track to the sales specification; a later replacement may differ from both sources.", "The shared manual advises against studding tracks with lugs over 1.6 inches. A traction-accessory decision needs the actual track, not just its circumference.", "When two sources disagree, retain the disagreement and ask for configuration evidence instead of averaging or choosing the more attractive number."],
        sourceIds: ["cat2026", "catMountainManual"],
      },
      {
        heading: "Turn unknowns into questions, not rankings",
        body: "Manufacturer engine claims can come from internal testing under stated conditions; BRP explicitly qualifies some horsepower and economy figures this way. A claimed peak does not reveal acceleration with your load or range on your route. Use specs to prepare a dealer conversation and a supervised demo, not to generate unsupported top-speed or reliability predictions.",
        bullets: ["Ask: Is this price for this exact track, engine and model year?", "Ask: What rider/load range can the suspension accommodate, and what setup is required?", "Ask: What snow conditions and track restrictions apply?", "Record the answer and source date alongside the value so a later specification change is visible."],
        sourceIds: ["engines", "manuals"],
      },
    ],
  },
  {
    id: "safety-gear",
    title: "Snowmobile Safety and Gear: A Trip-Readiness Checklist",
    summary: "Plan clothing, communications, training and turnaround decisions together. Equipment is not a substitute for terrain judgment.",
    readTime: "Pre-trip planning checklist",
    sources: sources("safety", "gear", "avalanche", "manuals"),
    sections: [
      {
        heading: "Make the go/no-go decision before loading",
        body: "Check weather, open-trail status, land access and the group's ability before planning distance. Minnesota DNR recommends safety training, riding with another snowmobiler, avoiding alcohol and checking conditions before departure. Its rules and local guidance are not a substitute for those at your destination. No gear list makes closed trails, uncertain ice or hazardous weather safe.",
        bullets: ["Complete required training and confirm operator-age, helmet, permit and registration rules.", "Leave a route, expected return time and overdue-response plan with someone not on the trip.", "Agree that anyone may call a turnaround without pressure to continue.", "Choose a route where the least experienced rider can participate comfortably; avoid treating a fast group's pace as a target."],
        sourceIds: ["safety"],
      },
      {
        heading: "Fit protective equipment as a system",
        body: "Use a properly fitted helmet certified to the standard required where you ride, with eye/face protection suitable for cold conditions. Minnesota DNR recommends a quality DOT helmet and face protection. Check that your helmet, goggles or shield, glasses and layers work together without obstructing vision or controls. Follow the helmet maker's inspection and replacement instructions, especially after an impact. Price is not a fit test, and certification systems should not be ranked with a blanket claim that one is always safer.",
        table: { headers: ["Check", "Practical preparation", "Reason to stop and fix"], rows: [
          ["Vision", "Test shield/goggle fit and fog-management setup", "Persistent fog or impaired field of view"],
          ["Hands and feet", "Try insulated, weather-resistant gloves and boots on the actual controls", "Cannot reliably reach or operate controls"],
          ["Layers", "Use a wind/water-resistant outer system and moisture-managing layers", "Wet clothing, worsening cold or overheating that cannot be managed"],
          ["Spare protection", "Pack dry gloves and emergency insulation", "Trip plan relies entirely on heated grips or reaching a warm building"],
        ] },
        sourceIds: ["safety"],
      },
      {
        heading: "Plan for a stopped machine, not just a moving one",
        body: "Carry navigation that remains usable without service, first-aid supplies you know how to use, food, water, emergency insulation and a communication method suited to coverage. Avalanche Canada identifies phones, satellite devices and radios as options with different limitations. Know how to transmit your location and who receives an SOS. A subscription, battery and clear view of the sky can be as important as owning the device.",
        bullets: ["Keep critical survival items with you if you could become separated from the machine.", "Carry model-appropriate tools and spares only with the knowledge to use them; recovery and towing must follow the manual.", "Do not assume another rider's kit covers your personal needs.", "Build a return plan that does not depend on using the last fuel or the last daylight."],
        sourceIds: ["gear", "manuals"],
      },
      {
        heading: "Avalanche exposure requires a separate preparation step",
        body: "Avalanche Canada calls for every person in a backcountry party to carry a transceiver, probe and shovel on their body, with the skills to use them. The transceiver is worn as instructed by its manufacturer; the probe and metal shovel belong in your pack, not only on the sled. Check batteries and perform the group transceiver check you learned in training. Follow device guidance on separation from electronics. An airbag is supplemental, not a replacement for rescue equipment or terrain selection.",
        bullets: ["Take sled-specific avalanche training and practice companion rescue as a group.", "Read the local avalanche forecast's problems, elevations and aspects, not only its danger color.", "Account for overhead slopes and runout zones even when the intended riding surface is flat.", "If the group lacks training, equipment or terrain understanding, choose an alternative outside avalanche exposure with qualified guidance."],
        sourceIds: ["gear", "avalanche"],
      },
      {
        heading: "Worked turnaround decision",
        body: "Assume a fictional group planned a two-hour trail loop. At the trailhead, visibility is deteriorating, one rider's shield repeatedly fogs and the proposed shortcut crosses a lake with unverified ice conditions. Extra horsepower and a tow strap do not address these hazards. Fix the visibility problem and select a shorter open land route only if weather and group capability permit; otherwise postpone. DNR identifies avoiding lakes and rivers as the safest ice choice.",
        bullets: ["On trails, obey local limits and slow further when visibility, traction, traffic or stopping distance require it.", "Do not use a posted limit as a recommended pace.", "If someone becomes impaired by cold, fatigue or alcohol, reassess the trip rather than pushing toward the original destination."],
        sourceIds: ["safety"],
      },
    ],
  },
  {
    id: "best-beginner-snowmobiles",
    title: "Choosing a Beginner Snowmobile: Fit Before a 'Best' List",
    summary: "A pass/fail shortlist for new riders, with configuration examples and a buying process that does not invent test results.",
    readTime: "Beginner selection tool",
    sources: sources("buying", "engines", "safety", "manuals"),
    sections: [
      {
        heading: "Why there is no universal beginner winner",
        body: "A first-time rider may be a smaller adult on local trails, an experienced motorcyclist new to snow, or someone planning work trips with cargo. None of those descriptions establishes snowmobile skill. Engine displacement and horsepower alone cannot define a safe beginner machine. We have not ridden or tested these configurations and do not award handling, reliability or value rankings. This guide instead gives you questions that a course, dealer fit check and supervised rental can answer.",
        sourceIds: ["safety", "buying"],
      },
      {
        heading: "Apply these pass/fail checks first",
        body: "Use the checklist before comparing brand, engine size or discounts. A failed safety, fit or route requirement cannot be offset by a low price. Ask an instructor for help evaluating throttle and braking behavior in an appropriate controlled setting rather than testing limits on a public trail.",
        table: { headers: ["Gate", "Pass evidence", "If unresolved"], rows: [
          ["Legal operator and route", "Age/training requirements met; destination permits this use", "Verify with the responsible authority"],
          ["Physical fit", "Controls can be operated in gloves and boots without awkward reach", "Try another configuration; do not assume an accessory will solve it"],
          ["Suitable terrain", "Track, cooling and seating match planned use", "Read the manual and reconsider the route or category"],
          ["Predictable operation for this rider", "Instruction and supervised practice establish usable control", "Rent and train before buying"],
          ["Affordable ownership", "Delivered quote plus gear, training, transport and upkeep fit the budget", "Reduce the purchase commitment, not protective preparation"],
          ["Condition and support", "Inspection/records acceptable and service available", "Obtain a repair assessment or walk away"],
        ] },
        sourceIds: ["safety", "manuals"],
      },
      {
        heading: "Configuration examples, not tested recommendations",
        body: "Ski-Doo's buying guide describes the MXZ Neo family as mid-sized and trail-oriented, with smaller-rider ergonomics; it describes Summit Neo as a deep-snow family. These names illustrate why similar positioning does not mean similar terrain suitability. BRP also lists drive modes and a Learning Key for some ACE engine configurations. Verify availability and operation on the exact model year and trim: family names and web pages change. These examples are not a complete market survey or a claim that BRP is the best brand.",
        bullets: ["For a smaller rider on groomed trails, investigate reduced-reach trail configurations and confirm actual fit; 'mid-sized' is not automatically youth-approved.", "For planned passenger use, inspect an approved two-up configuration and its total load limit; learn solo operation before adding complexity.", "For deep-snow ambitions, budget for instruction and avalanche preparation before choosing a specialist sled.", "For a used candidate, prioritize documented condition and support over a reputation attached to the model name."],
        sourceIds: ["buying", "engines", "manuals"],
      },
      {
        heading: "Worked shortlist: eliminate before scoring",
        body: "Assume a fictional adult plans six short groomed-trail days, no passenger, and has no snowmobile experience. Candidate A fits well but has no service history. Candidate B has complete records but its controls cannot be comfortably reached. A rental package includes instruction on an appropriate machine. B fails the fit gate. A remains conditional on inspection and a repair budget. The rental is a rational first step while those unknowns are resolved, even if its per-day cost appears higher than fuel alone.",
        bullets: ["Do not turn A's unknown condition into an arbitrary numerical reliability score.", "Do not buy B on a promise that confidence or experience will fix poor control reach.", "After instruction, revisit the shortlist with specific feedback about reach, posture and operation rather than a desired horsepower number."],
      },
      {
        heading: "Your first-season progression plan",
        body: "Start with applicable safety training, the owner's manual and a route appropriate to the group's current skills. Practice the procedures taught by your instructor in a permitted setting. Gradually add distance, variable conditions or cargo only when the instructor and rider are comfortable. Completing a calendar season does not automatically qualify someone for high-performance machinery or avalanche terrain.",
        bullets: ["Before purchase: identify a course or supervised rental, check dealer support and gather delivered quotes.", "Before departure: use the exact pre-ride checklist, confirm conditions and share the trip plan.", "After each outing: record discomfort, control difficulties and maintenance concerns to discuss with an instructor or technician.", "Upgrade only to solve a documented need; keeping a well-suited first machine is not a failure to progress."],
        sourceIds: ["safety", "manuals"],
      },
    ],
  },
  {
    id: "snowmobile-maintenance",
    title: "Snowmobile Pre-Season Maintenance: A Manual-First Checklist",
    summary: "Organize inspections and service records, identify stop-riding faults, and leave model-specific procedures to the correct manual or technician.",
    readTime: "Service planning checklist",
    sources: sources("manual", "manuals", "safety", "catTouringManual"),
    sections: [
      {
        heading: "This is a planning checklist, not a repair procedure",
        body: "Find the owner's manual matching the VIN, model year, engine and equipment. Its pre-ride, periodic-service and storage sections control the job. The Polaris RMK-family manual used here is an example of why that matters: it contains specific warnings for track operation, clutches and low-snow cooling. Its procedures cannot be applied to every snowmobile. If you lack the specified tools, support equipment or skills, have a qualified technician perform the task.",
        bullets: ["Record odometer, engine hours if available, date, outstanding recalls and the last documented service.", "Copy applicable calendar, distance and hour intervals into a service log; use the trigger specified by the manual.", "Identify items marked for dealer service and book them before planning the first ride.", "For a newly purchased used machine with unknown history, arrange a baseline inspection rather than assuming service is current."],
        sourceIds: ["manual", "manuals"],
      },
      {
        heading: "Separate observation from adjustment",
        body: "Park securely, let hot components cool and disable starting as directed by the manual before accessible visual checks. Never put hands near a moving track or exposed drive system. Do not run the engine indoors or in an enclosed trailer. Do not improvise a stand or raise and spin the track as a casual diagnostic. The owner's manual warning and support procedure must be followed for any task that requires lifting.",
        table: { headers: ["Area", "What to document", "Stop and get qualified help when"], rows: [
          ["Fuel and fluids", "Visible leaks, damaged hoses, required levels using the correct checking procedure", "Fuel odor/leak, unexplained loss or unknown fluid specification"],
          ["Controls and brakes", "Condition and manual-prescribed pre-ride function checks", "Throttle binds, brake action is abnormal, or a safety switch fails"],
          ["Track and suspension", "Visible damage, worn components or loose/missing parts", "Torn track, exposed cords, damaged fasteners or uncertain alignment"],
          ["Drive system", "Accessible belt condition and scheduled inspection status", "Damage, abnormal wear, vibration or clutch work is needed"],
          ["Electrical", "Lighting, wiring condition and battery-care requirements", "Damaged wiring, battery damage or required lights not functioning"],
        ] },
        sourceIds: ["manual", "manuals"],
      },
      {
        heading: "Do not generalize belt, clutch or track procedures",
        body: "The clutch drive belt and the track are different components. A replacement belt must have the correct specification; belt deflection, break-in and removal methods depend on the drivetrain. The reviewed Polaris manual explicitly tells owners not to attempt clutch service because of the complex high-speed, balanced assembly. Do not spray an unspecified solvent, apply lubricant to clutch faces or take a clutch apart based on generic advice. Track tension also requires the model's measurement location, load, support and adjustment procedure—not a universal amount of sag.",
        bullets: ["Obtain the correct belt part number and manual procedure before carrying out an owner-permitted replacement.", "Leave clutch disassembly, balancing and related diagnosis to qualified service personnel.", "Have track damage assessed before riding; adjusting tension does not repair damage.", "Do not loosen track tension for storage unless your exact manual directs it."],
        sourceIds: ["manual", "manuals"],
      },
      {
        heading: "Fuel, fluids and storage are engine-specific",
        body: "Do not automatically drain fuel, remove carburetors, fog through an intake, run an engine for a fixed time or replace every fluid on an invented annual schedule. Storage may involve different fuel treatment, lubrication or built-in procedures depending on the engine. Follow the specified fuel, oil, coolant, battery and storage instructions. Never open a hot pressurized cooling system. Fuel-system work and disposal require suitable precautions and may be better left to a shop.",
        bullets: ["For two-strokes, confirm the lubrication system and approved oil; do not assume premixing is required.", "For four-strokes, use the correct oil-level checking conditions, fluid and scheduled service, not a generic 'change it after summer' rule.", "Match charging equipment and storage instructions to the actual battery type.", "Keep receipts, fluid specifications and service dates so next season's decisions are evidence-based."],
        sourceIds: ["manuals"],
      },
      {
        heading: "Turn an archived Pantera's history into a service quote",
        body: "For a 2026 Pantera 7000, the applicable Arctic Cat 7000/9000 manual includes engine-oil/filter service, valve-clearance inspection, storage preparation and passenger-use guidance. Ask the shop to apply those sections to the odometer and last-service date before pricing a tour. On a used touring machine, passenger heaters, footrests, backrest and storage hardware also need a condition check; a complete engine invoice does not document them.",
        bullets: ["Bring the exact 7000 model identification rather than a generic Pantera description; 9000 instructions differ in relevant places.", "Separate overdue scheduled work from repairs discovered on inspection.", "Request a written scope and parts/labor estimate, and retain it with the service record.", "Check passenger equipment and permitted combined load before promising a shared trip."],
        sourceIds: ["catTouringManual"],
      },
      {
        heading: "Worked service-log decision",
        body: "Assume a hypothetical manual says a particular task is due every 12 months or 1,500 km, whichever comes first. This is an invented interval to explain the logic, not a recommendation for your machine. If the last service was 14 months and 600 km ago, the task is due by time. If it was four months and 1,600 km ago, it is due by distance. If the previous date is unknown, do not reset the clock without resolving the history or arranging service.",
        table: { headers: ["Log field", "Record for your machine"], rows: [
          ["Task and manual reference", "Exact section, procedure and applicable configuration"],
          ["Last completed", "Date, distance/hours, invoice or owner record"],
          ["Next due", "Calendar and usage triggers stated by the manual"],
          ["Responsible person", "Owner-permitted task or booked qualified technician"],
          ["Release to ride", "Fault resolved, required checks completed and record retained"],
        ] },
      },
      {
        heading: "The first ride is not a fault-finding expedition",
        body: "Complete the manual's pre-ride checks before every outing, not only before the season. After service, verify correct reassembly and function as instructed. Start with an appropriate short local outing and a partner once the machine is ready, not as a way to test a known brake, throttle or fuel problem. Stop and follow the manual if a warning, leak or abnormal behavior appears. A completed checklist cannot certify a machine safe when a fault remains unresolved.",
        sourceIds: ["manuals", "safety"],
      },
    ],
  },
];