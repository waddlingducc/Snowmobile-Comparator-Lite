export interface Guide {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  sections: { heading: string; body: string }[];
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
  },
  {
    id: "trail-vs-mountain",
    title: "Trail vs. Mountain Snowmobiles: What's the Difference?",
    summary: "Two of the most popular sled categories, but they're built for completely different conditions. Here's how to tell them apart.",
    readTime: "4 min read",
    sections: [
      {
        heading: "Trail Sleds: Built for Speed on Packed Snow",
        body: "Trail snowmobiles are optimized for groomed trails and hardpack snow conditions. They typically run shorter, narrower tracks (120\"–137\") with shallow lugs (around 1\" profile) designed to grip packed surfaces rather than float on powder. The chassis sits lower to the ground for a sportier feel and better cornering. Suspension is tuned firm to handle the bumps and chatter of a groomed trail at speed. Top trail sleds can hit speeds well over 100 mph on the right surface. Models like the Ski-Doo MXZ X-RS, Arctic Cat ZR 8500 RR, and Polaris Indy VR1 are purpose-built for this environment.",
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
        body: "If you ride both groomed trails and occasional off-trail or backcountry terrain, a crossover sled is worth serious consideration. Models like the Ski-Doo Backcountry X-RS, Polaris Switchback Assault 850, and Arctic Cat RIOT 8500 run mid-length tracks (137\"–154\") with moderate lug depth. They're not as capable as a dedicated mountain sled in deep powder, and not as fast as a dedicated trail sled on hardpack — but they're genuinely competent in both environments and are often the most versatile choice for riders who don't want to own two sleds.",
      },
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
        body: "Displacement is the total volume swept by all pistons in cubic centimeters. A 600cc engine is smaller and lighter but produces less power than an 850cc engine. For newer riders, a 600cc sled (like the Arctic Cat ZR 6000 or Polaris Indy XC 650) offers manageable power that's easier to learn on and is significantly cheaper to buy and insure. 850cc–900cc engines are the current performance sweet spot for most riders. Engines above 998cc are typically reserved for high-performance touring or turbocharged applications.",
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
  },
];
