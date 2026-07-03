export interface Guide {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  sections: { heading: string; body: string }[];
  sources?: { label: string; url: string }[];
}

export const guides: Guide[] = [
  {
    id: "how-to-choose",
    title: "How to Choose Your First Snowmobile",
    summary: "Buying your first sled is exciting but overwhelming. Here's how to cut through the options and find the right fit.",
    readTime: "5 min read",
    sections: [
      {
        heading: "Define How You'll Ride",
        body: "Before you look at a single spec sheet, be honest about where you plan to ride. Are you mostly sticking to groomed trails at a resort? Heading into the backcountry? Hauling gear across open fields? Each riding style has a purpose-built sled category, and buying the wrong type is the single biggest mistake first-time buyers make. A mountain sled is miserable on hardpack groomed trails, and a touring sled will frustrate you the second you try to push through deep powder.",
      },
      {
        heading: "Pick the Right Category",
        body: "Trail sleds are built for groomed, packed snow — they're lower, stiffer, and optimized for speed on known surfaces. Crossover sleds split the difference between trail and mountain riding and are a great choice if you do both. Mountain sleds have long, aggressive tracks (154\" and up), light frames, and deep-lug treads for floating on top of fresh powder. Touring sleds prioritize comfort over performance — heated grips, two-up seating, and extra storage. Utility sleds are workhorses with wide tracks and cargo capacity.",
      },
      {
        heading: "Set a Realistic Budget",
        body: "A brand-new entry-level sled starts around $10,000–$14,000. Mid-range performance sleds run $15,000–$18,000. High-end turbocharged models push past $20,000. Don't forget to budget for gear (helmet, boots, bibs, jacket, gloves — plan on $800–$1,500), a trailer ($1,500–$4,000), insurance, registration, and storage. First-year total cost of ownership is often 40–60% higher than the sticker price of the sled.",
      },
      {
        heading: "New vs. Used",
        body: "Used sleds can offer tremendous value, but snowmobiles are high-wear machines. Before buying used, check the track condition (look for cracks or worn lugs), inspect the clutch and belt, check the suspension for worn or broken parts, and look for evidence of water intrusion in the engine. A used sled with under 3,000 miles from a single careful owner can be a great deal — but a \"great deal\" sled that's been ridden hard in deep powder is a different story. If you can, bring a mechanic or an experienced rider to help inspect it.",
      },
      {
        heading: "Consider the Brand Ecosystem",
        body: "All four major brands — Ski-Doo, Polaris, Arctic Cat, and Yamaha — make quality sleds. The bigger factor is your local dealer network. A great sled with a poor or distant dealer is a headache when you need parts, warranty work, or emergency service mid-season. Visit your local dealers before committing to a brand. The relationship matters more than people think.",
      },
    ],
    sources: [
      { label: "Ski-Doo 2026 Lineup", url: "https://www.ski-doo.com" },
      { label: "Polaris Snowmobiles", url: "https://www.polaris.com/en-us/snowmobiles/" },
      { label: "Arctic Cat Snowmobiles", url: "https://www.arctic-cat.com/snowmobiles" },
      { label: "Yamaha Motor Snowmobiles", url: "https://www.yamahamotorsports.com/snowmobile" },
    ],
  },
  {
    id: "trail-vs-mountain",
    title: "Trail vs. Mountain Snowmobiles: What's the Difference?",
    summary: "Two of the most popular sled categories, but they're built for completely different conditions. Here's how to tell them apart.",
    readTime: "4 min read",
    sections: [
      {
        heading: "Trail Sleds: Built for Speed on Packed Snow",
        body: "Trail snowmobiles are optimized for groomed trails and hardpack snow conditions. They typically run shorter, narrower tracks (120\"–137\") with shallow lugs (around 1\" profile) designed to grip packed surfaces rather than float on powder. The chassis sits lower to the ground for a sportier feel and better cornering. Suspension is tuned firm to handle the bumps and chatter of a groomed trail at speed. Top trail sleds can hit speeds well over 100 mph on the right surface. Models like the Ski-Doo MXZ X-RS, Arctic Cat ZR 858 RR, and Polaris Indy VR1 are purpose-built for this environment.",
      },
      {
        heading: "Mountain Sleds: Float, Not Speed",
        body: "Mountain sleds are engineered around one core challenge: staying on top of deep, unpacked powder. They run long tracks — typically 154\" to 165\" — with aggressive 2\"–3\" lugs that dig and propel through deep snow. The chassis is lighter (often 100+ lbs lighter than a comparable trail sled), and the ergonomics are stand-up-riding focused, with narrower running boards and a repositioned handlebar that encourages weight shifting. The engine is placed higher in the tunnel to keep mass centered and improve float. These sleds are difficult to maneuver on groomed trails.",
      },
      {
        heading: "How Track Length Affects Everything",
        body: "Track length is the single biggest performance differentiator between categories. A 129\" trail track gives you quick turning and less drag on packed surfaces. A 165\" mountain track distributes weight over a larger surface area, preventing the sled from sinking. Going longer also increases the amount of snow the track can throw backward, which translates to better climbing ability on steep mountain terrain. Every inch of track adds a modest amount of weight and drag, which is why trail riders don't want more than they need.",
      },
      {
        heading: "Crossover: The Compromise",
        body: "If you ride both groomed trails and occasional off-trail or backcountry terrain, a crossover sled is worth serious consideration. Models like the Ski-Doo Backcountry X-RS, Polaris Switchback Assault 850, and Arctic Cat Riot 858 run mid-length tracks (137\"–154\") with moderate lug depth. They're not as capable as a dedicated mountain sled in deep powder, and not as fast as a dedicated trail sled on hardpack — but they're genuinely competent in both environments and are often the most versatile choice for riders who don't want to own two sleds.",
      },
    ],
    sources: [
      { label: "Ski-Doo MXZ Series", url: "https://www.ski-doo.com/us/en/snowmobiles/sport/mxz.html" },
      { label: "Polaris Indy Trail Sleds", url: "https://www.polaris.com/en-us/snowmobiles/trail/" },
      { label: "Polaris RMK Mountain Sleds", url: "https://www.polaris.com/en-us/snowmobiles/mountain/" },
      { label: "Arctic Cat Mountain Sleds", url: "https://www.arctic-cat.com/snowmobiles/mountain" },
    ],
  },
  {
    id: "2-stroke-vs-4-stroke",
    title: "2-Stroke vs. 4-Stroke Snowmobile Engines Explained",
    summary: "The engine debate is one of the most common arguments in snowmobiling. Here's the practical breakdown of what each type means for real-world riding.",
    readTime: "4 min read",
    sections: [
      {
        heading: "How 2-Stroke Engines Work",
        body: "A 2-stroke engine completes its power cycle in two piston strokes (one up, one down) rather than four. This means it fires every revolution, producing a high power-to-weight ratio in a compact, simple package. Snowmobile 2-strokes have been refined for decades and are extremely responsive — they feel \"snappy\" and deliver power in a very linear, rider-controlled way. Ski-Doo's 850 E-TEC and Arctic Cat's 858 C-TEC2 are the dominant 2-stroke engines on the market today, both producing around 165 hp from less than 860cc of displacement.",
      },
      {
        heading: "How 4-Stroke Engines Work",
        body: "A 4-stroke engine fires every other revolution and uses a more complex valve-driven cycle. The result is an engine that runs smoother, burns fuel more efficiently, and typically produces more torque at lower RPMs. 4-strokes are also quieter and generally considered more reliable for high-mileage touring applications. Yamaha has championed 4-stroke snowmobile engines for years, and the Genesis 998 Turbo in the Sidewinder SRX LE produces over 200 hp while returning competitive fuel economy for a high-performance sled.",
      },
      {
        heading: "Weight and Packaging",
        body: "One knock on 4-stroke engines is weight. A 4-stroke engine with its more complex valvetrain, oil system, and heavier rotating assembly is typically 30–60 lbs heavier than a comparable 2-stroke. In mountain riding, where every pound matters, this is a real consideration. Trail and touring riders care less about this, and the smoothness and torque of a 4-stroke can actually be an advantage for long-distance miles.",
      },
      {
        heading: "Maintenance Differences",
        body: "2-strokes are mechanically simpler but have specific maintenance requirements: they require pre-mixed fuel or a dedicated oil injection system, and they need the top end (piston, rings) rebuilt more frequently than a 4-stroke — typically every 5,000–10,000 miles depending on the engine and riding style. 4-strokes need oil changes and valve clearance checks but generally go longer between major services. Neither is necessarily harder to maintain, but 2-stroke maintenance is more frequent and 4-stroke maintenance is more involved when it does come up.",
      },
      {
        heading: "Which Should You Choose?",
        body: "For mountain and aggressive trail riding where weight matters, modern 2-strokes are hard to beat. For touring, long-distance trail riding, and cold-weather reliability, the 4-stroke advantage in smooth power delivery and fuel efficiency is real. Turbocharged 4-strokes (like the Yamaha Sidewinder or the Ski-Doo 900 ACE Turbo R) can match or exceed 2-stroke power numbers while delivering better low-end torque — but they carry a significant weight and cost penalty.",
      },
    ],
    sources: [
      { label: "Ski-Doo Rotax Engine Technology", url: "https://www.ski-doo.com/us/en/innovations/rotax-engines.html" },
      { label: "Yamaha Sidewinder / Genesis Engine", url: "https://www.yamahamotorsports.com/snowmobile/models/sidewinder-srx-le" },
      { label: "Arctic Cat C-TEC2 Engine Info", url: "https://www.arctic-cat.com/snowmobiles" },
    ],
  },
  {
    id: "reading-specs",
    title: "How to Read Snowmobile Specs (And What Actually Matters)",
    summary: "Manufacturer spec sheets can be confusing. Here's what each number actually means for your riding experience.",
    readTime: "5 min read",
    sections: [
      {
        heading: "Horsepower: The Most Overrated Number",
        body: "Horsepower is the number manufacturers love to advertise, but it tells an incomplete story. HP is measured at peak RPM — not at the power band where you'll be riding most of the time. A 165 hp 2-stroke that peaks at 8,500 RPM may feel slower in real-world acceleration than a 150 hp 4-stroke with more torque in the mid-range. That said, for raw top-end performance on a straight trail or a mountain face, peak horsepower does matter. Use HP as a rough category indicator, not a precise performance predictor.",
      },
      {
        heading: "Displacement (CC): Engine Size",
        body: "Displacement is the total volume swept by all pistons in cubic centimeters. A 600cc engine is smaller and lighter but produces less power than an 850cc engine. For newer riders, a 600cc sled (like the Arctic Cat ZR 600 or Polaris Indy XC 650) offers manageable power that's easier to learn on and is significantly cheaper to buy and insure. 850cc–900cc engines are the current performance sweet spot for most riders. Engines above 998cc are typically reserved for high-performance touring or turbocharged applications.",
      },
      {
        heading: "Dry Weight: Why It Matters More Than You Think",
        body: "Dry weight is the sled's weight without fuel or fluids — so the real-world riding weight is higher (add 15–25 lbs for fluids). For trail riding, weight matters less. For mountain riding, it's critical — a lighter sled is easier to maneuver, sidehills better, and is more forgiving when you get stuck. The lightest sleds in the current lineup (Polaris PRO RMK 850, Polaris RMK Khaos Slash) are around 420 lbs dry. Touring sleds and utility sleds can weigh 600–650 lbs — they're not designed to be thrown around.",
      },
      {
        heading: "Track Length and Lug Height",
        body: "Track length and lug profile are the two most important specs for understanding how a sled will perform in snow. Longer tracks (154\"+) float better in deep powder. Shorter tracks (120\"–137\") carve better on packed surfaces. Lug height tells you about the track's grip profile — 1\" lugs are trail-appropriate, 2.5\"–3\" lugs are for deep snow only. Running a deep-lug track on groomed trails creates drag and can damage the track over time. Match your track to your primary terrain.",
      },
      {
        heading: "Suspension Type: What to Look For",
        body: "Most modern snowmobiles use independent front suspension (IFS) or A-arm style front ends for trail sleds, and ski-style \"A-arm\" or strut setups for mountain sleds. Rear suspensions vary significantly — trail sleds use parallel rail suspensions (like Ski-Doo's rMotion X), mountain sleds increasingly use single-beam designs (like Arctic Cat's Alpha One) that allow more independent ski movement for sidehilling. Premium shocks (FOX, Walker Evans, KYB) offer adjustable compression and rebound. For most riders, factory suspension is adequate, but serious riders often tune or upgrade shocks.",
      },
    ],
    sources: [
      { label: "Ski-Doo 2026 Specifications", url: "https://www.ski-doo.com" },
      { label: "Polaris 2026 Snowmobile Specs", url: "https://www.polaris.com/en-us/snowmobiles/" },
      { label: "Arctic Cat 2026 Specs", url: "https://www.arctic-cat.com/snowmobiles" },
      { label: "Yamaha 2026 Snowmobile Specs", url: "https://www.yamahamotorsports.com/snowmobile" },
    ],
  },
  {
    id: "safety-gear",
    title: "Snowmobile Safety & Gear: What You Actually Need",
    summary: "Snowmobiling is one of the more dangerous winter sports. The right gear dramatically reduces your risk — here's what matters.",
    readTime: "4 min read",
    sections: [
      {
        heading: "The Helmet: Non-Negotiable",
        body: "A certified snowmobile helmet is the most important piece of gear you own. Full-face helmets are strongly preferred — they protect your face from branches, rocks, and debris, and they provide critical warmth in cold conditions. Look for a helmet with a DOT or ECE 22.06 certification (ECE is stricter). A modular helmet works for touring but is heavier and slightly less protective than a full-face. Budget at minimum $200–$300 for a quality certified helmet. Replace any helmet that has been in a crash, even if it looks fine — the foam liner is likely compromised.",
      },
      {
        heading: "Riding Suit and Layers",
        body: "A one-piece or two-piece snowmobile suit is designed specifically for the activity — it's waterproof, padded in key areas (shoulders, elbows, knees, tailbone), and built to handle a range of temperatures. Look for a suit with CE-rated armor in impact zones. Under the suit, layer with moisture-wicking base layers and an insulating mid-layer. Cotton kills in cold weather — it holds moisture and loses all insulating value when wet. Merino wool and synthetic performance base layers are far better choices.",
      },
      {
        heading: "Boots and Gloves",
        body: "Dedicated snowmobile boots are insulated to handle extreme cold and provide ankle support for off-trail riding. They're waterproof, have high traction soles, and are designed to interface with the foot pegs and running boards. Regular winter boots are not adequate for serious riding. For gloves, prioritize warmth and dexterity — heated grips on the sled help, but thin gloves in a crash or a breakdown situation can become a serious problem fast. Carry a spare pair of gloves in your pack.",
      },
      {
        heading: "Avalanche Gear for Backcountry Riding",
        body: "If you're riding in mountainous terrain, avalanche gear is not optional. An avalanche beacon (transceiver), probe, and shovel are the basic kit. The beacon must be worn on your body, not stored in your sled's cargo — in an avalanche, your sled and its contents may be buried far from you. Learn how to use your beacon before you need it. Many mountain riders also wear an avalanche airbag pack, which deploys a large balloon that helps keep you near the snow surface during an avalanche. Take an avalanche safety course if you're riding in slide terrain.",
      },
      {
        heading: "Trail Riding Safety Basics",
        body: "Even on groomed trails, basic safety habits prevent most incidents. Always ride with at least one other person — riding solo in remote areas means no one to help if you get hurt or stuck. Carry a charged phone, a hand warmer, a basic tool kit, tow rope, and enough fuel for unexpected detours. Know the trail system and download offline maps before you head out. Respect trail speed limits and right-of-way rules — trail collisions are the leading cause of serious snowmobile injuries. Ride at a speed where you can stop within your line of sight.",
      },
    ],
    sources: [
      { label: "International Snowmobile Safety Institute", url: "https://www.snowmobile.org/snowmobile-safety.php" },
      { label: "American Council of Snowmobile Associations", url: "https://www.snowmobilersofmichigan.org/" },
      { label: "Avalanche.org — Know Before You Go", url: "https://avalanche.org" },
    ],
  },
  {
    id: "best-beginner-snowmobiles",
    title: "Best Snowmobiles for Beginners in 2026",
    summary: "Not every sled is forgiving when you're learning. These models stand out for manageable power, approachable handling, and fair pricing for first-time buyers.",
    readTime: "5 min read",
    sections: [
      {
        heading: "What Makes a Good Beginner Sled",
        body: "A beginner snowmobile has three things going for it: manageable engine output, a chassis that doesn't punish mistakes, and a purchase price that doesn't hurt as much if you decide the sport isn't for you. That means staying under about 130 hp, choosing trail or touring categories over mountain or performance, and picking a sled with forgiving suspension tuning. Many experienced riders also recommend starting on a used sled for your first season — the learning curve involves some tip-overs and bumps, and a $7,000 used sled handles those better than a $16,000 new one.",
      },
      {
        heading: "Yamaha Transporter Lite — Best Value Entry Point",
        body: "The Yamaha Transporter Lite earns the top beginner recommendation for one simple reason: it's the least expensive new snowmobile you can buy from a major manufacturer at $9,999 MSRP. Its 400cc single-cylinder 2-stroke produces around 50 hp — enough to be fun without being overwhelming. The utility category means it's stable, forgiving, and designed for controlled conditions. It won't win drag races, but for someone learning the basics of sled handling on groomed trails or open fields, it's nearly impossible to outgrow too fast.",
      },
      {
        heading: "Polaris Indy XC 650 — Best Trail Beginner",
        body: "If you want a proper trail sled without the intimidating power of an 850cc engine, the Polaris Indy XC 650 threads the needle well. The 650cc Patriot engine produces 130 hp — spirited but not snappy — and the Indy platform is one of the best-handling trail chassis on the market. The 129\" track is short enough for quick, responsive steering. At $14,200 it's not cheap, but Polaris's dealer network is strong and the Indy line has a well-earned reputation for reliability. Many seasoned riders started on an Indy and still own one.",
      },
      {
        heading: "Ski-Doo MXZ Sport 600 — A Trusted Gateway Sled",
        body: "Ski-Doo's MXZ Sport 600 has served as the entry point into the performance trail category for years. The 600cc Rotax E-TEC engine is reliable, the REV platform chassis handles beautifully, and the sled benefits from decades of continuous refinement. It's lively without being hair-trigger, and the aftermarket parts and service support for Ski-Doo's 600 platform is among the best in the industry. A solid choice for anyone who wants a real performance feel from day one without the full 850cc power spike.",
      },
      {
        heading: "Arctic Cat Pantera 7000 — Best for Touring Beginners",
        body: "Not every beginner wants a sport sled — some just want to explore trails comfortably with a passenger. The Arctic Cat Pantera 7000 is purpose-built for two-up touring, with a wide padded rear seat, heated grips, a large windshield, and storage. Its Yamaha-sourced 1049cc 4-stroke 3-cylinder engine is smooth and predictable — not exciting, but completely manageable. At $15,500 it's pricier than the Transporter, but for someone whose primary plan is scenic rides with a partner, it's the most comfortable way to start.",
      },
      {
        heading: "Tips Before You Buy",
        body: "Whatever sled you choose, take a safety course before your first full season. The Snowmobile Safety Institute and most state snowmobile associations offer courses that cover machine handling, trail etiquette, and emergency procedures. Gear up properly — a good helmet and riding suit are not optional. And consider a demo ride or rental on the model you're considering before committing. Most dealers offer demo events in early season. An hour of seat time is worth more than hours of spec research.",
      },
    ],
    sources: [
      { label: "Yamaha Transporter Lite — Official Page", url: "https://www.yamahamotorsports.com/snowmobile/models/transporter-lite" },
      { label: "Polaris Indy XC 650 — Official Page", url: "https://www.polaris.com/en-us/snowmobiles/trail/indy-xc-650/" },
      { label: "Ski-Doo MXZ Sport 600 — Official Page", url: "https://www.ski-doo.com" },
      { label: "International Snowmobile Safety Courses", url: "https://www.snowmobile.org/snowmobile-safety.php" },
    ],
  },
  {
    id: "snowmobile-maintenance",
    title: "Snowmobile Pre-Season Maintenance: A Complete Checklist",
    summary: "Nothing ruins a riding season like a preventable breakdown. Here's the full pre-season checklist experienced riders use before the first ride of the year.",
    readTime: "6 min read",
    sections: [
      {
        heading: "Why Pre-Season Prep Matters",
        body: "Snowmobiles sit in storage for 6–8 months of the year. Fuel degrades, seals dry out, belts develop set, and small issues that were \"good enough\" at the end of last season become real problems in cold temperatures. A thorough pre-season inspection takes 2–4 hours and can prevent the most common mid-season breakdowns. Think of it as the difference between discovering a cracked track on your garage floor versus 30 miles from the trailhead in a blizzard.",
      },
      {
        heading: "Fuel System and Carb/Injector Check",
        body: "If you didn't stabilize your fuel before storage, drain the tank and start with fresh fuel. Stale gasoline (especially ethanol-blended fuel) degrades in as little as 30 days and can gum up carburetors and injectors. For carbureted sleds, remove and clean the carbs if the sled sat without stabilizer. For fuel-injected models (Ski-Doo E-TEC, Yamaha FICSM), check fuel filter condition and replace if you're over the manufacturer's interval. Inspect all fuel lines for cracking, hardening, or seeping at connections.",
      },
      {
        heading: "Drive Belt and Clutch Inspection",
        body: "The drive belt is one of the highest-wear components on a snowmobile and one of the most common causes of trail-side breakdowns. Inspect the belt for cracks, fraying, chunking, or glazing. Measure the belt width — if it's worn below the manufacturer's minimum spec, replace it. While you have the clutch cover off, inspect the primary and secondary clutch sheaves for wear, scoring, and debris. Clean the sheave faces with brake cleaner and a rag — glazed clutch surfaces cause poor engagement and belt slip. Carry a spare belt on every ride.",
      },
      {
        heading: "Track and Suspension",
        body: "Inspect the track for cracked or broken lugs, missing studs, and tears at the seam. A track failure at speed is dangerous — if you see significant cracking or any internal cord showing, replace it before the season starts. Check track tension and alignment according to your owner's manual. Incorrect tension causes premature track and slide wear. On the suspension, check all wear bars, slides, and idler wheels for wear. Compressed or cracked springs, bent limiter straps, and worn bushings on suspension arms are all common after a full season of riding.",
      },
      {
        heading: "Engine and Fluid Service",
        body: "For 4-stroke engines: change the engine oil and filter, even if you're not at the mileage interval — oil sitting in an engine over summer absorbs moisture and degrades. Check coolant level and condition; flush and replace if it's been more than two years. For 2-stroke engines: check the oil injection reservoir, inspect the injection pump operation, and check the power valve system (if equipped) for carbon buildup, which is a common cause of power loss. Check spark plugs for fouling, wear, or cracking and replace on schedule.",
      },
      {
        heading: "Electrical and Safety Systems",
        body: "Test all lights — headlight, taillight, and brake light. A non-functioning brake light on a trail is both unsafe and illegal in most jurisdictions. Check the kill switch function: it should cut the engine immediately when activated. Test the throttle for smooth operation and full return to idle — a sticky throttle is a serious safety hazard. Inspect hand warmer and grip warmer connections if equipped. Charge or replace the battery on electric-start models. Finally, verify that your registration documents and trail pass are current and stored on the sled.",
      },
    ],
    sources: [
      { label: "Ski-Doo Owner's Manuals & Maintenance", url: "https://www.ski-doo.com/us/en/owners.html" },
      { label: "Polaris Snowmobile Owner Resources", url: "https://www.polaris.com/en-us/owner/" },
      { label: "International Snowmobile Manufacturers Association", url: "https://www.snowmobile.org" },
    ],
  },
];
