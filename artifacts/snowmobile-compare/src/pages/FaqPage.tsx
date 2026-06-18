import { useState } from "react";
import { Link } from "wouter";
import Layout from "../components/Layout";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: { category: string; items: FaqItem[] }[] = [
  {
    category: "Buying Your First Sled",
    items: [
      {
        q: "What is a good beginner snowmobile?",
        a: "For most first-time buyers, a mid-range trail sled in the 600cc class is the right starting point. Models like the Arctic Cat ZR 6000 137, Polaris Indy XC 650, or Yamaha SXViper 600 offer manageable power, reliable drivetrains, and wide dealer support. Avoid high-performance 850cc or turbocharged sleds until you have at least one full season of riding experience — the power delivery is significantly more aggressive and the learning curve for handling them safely is real.",
      },
      {
        q: "How much does a new snowmobile cost?",
        a: "Entry-level utility and trail sleds start around $10,000–$14,000. Mid-range performance trail and crossover sleds run $14,000–$18,000. High-performance mountain sleds and turbocharged models push past $18,000, with top-tier options like the Yamaha Sidewinder SRX LE reaching $21,200. Budget an additional $800–$1,500 for safety gear (helmet, suit, boots, gloves), $1,500–$4,000 for a trailer, and variable costs for insurance, registration, and storage. First-year total cost of ownership is often 40–60% above sticker price.",
      },
      {
        q: "Should I buy new or used?",
        a: "Both can make sense depending on your situation. New sleds come with a full manufacturer warranty (typically 1 year, some 2 years), zero wear on the track and drivetrain, and the latest safety features. Used sleds can offer 30–50% savings but require careful inspection. Key things to check on a used sled: track condition (no cracks, adequate lug depth), clutch and belt wear, signs of water intrusion in the engine, frame cracks, and service history. A pre-purchase inspection by an experienced mechanic is worth every penny for a used sled purchase over $8,000.",
      },
      {
        q: "Which brand makes the best snowmobiles?",
        a: "All four major brands — Ski-Doo, Polaris, Arctic Cat, and Yamaha — produce capable, well-engineered sleds. The \"best\" brand is largely a function of your local dealer network, the riding category you prefer, and personal preference. Ski-Doo and Polaris dominate the trail performance segment. Polaris and Ski-Doo also have strong mountain lineups. Arctic Cat has a loyal following for its trail and crossover models. Yamaha is known for 4-stroke reliability and touring. Visit your local dealers for all four brands before making a decision — the dealer relationship matters as much as the sled.",
      },
      {
        q: "Is snowmobile insurance required?",
        a: "Insurance requirements vary by state and province. Many jurisdictions require at minimum liability coverage to operate a snowmobile on public trails. Even where it isn't legally required, insurance is strongly recommended: snowmobiles are expensive machines, accidents happen, and liability exposure from a collision with another rider or a third party can be significant. Many homeowners and renters insurance policies explicitly exclude snowmobiles, so you'll typically need a dedicated recreational vehicle policy. Annual premiums for basic coverage typically run $150–$400 depending on the sled's value and your coverage limits.",
      },
      {
        q: "What does MSRP mean, and is it the actual price I'll pay?",
        a: "MSRP stands for Manufacturer's Suggested Retail Price — it's the price the manufacturer recommends dealers charge. In practice, you may pay more or less than MSRP depending on dealer markup, regional demand, and available incentives. During high-demand periods (early fall, when new models are released), many dealers sell at or above MSRP. Off-season purchases (spring/summer) often come with discounts or manufacturer incentives. Freight, setup, and dealer fees are also typically added on top of MSRP. Always ask for the full out-the-door price before comparing dealers.",
      },
    ],
  },
  {
    category: "Understanding Specs",
    items: [
      {
        q: "What does track length mean, and why does it matter?",
        a: "Track length is the measurement of the snowmobile's drive belt in inches. It's one of the most important specs for understanding how a sled performs in different snow conditions. Shorter tracks (120\"–137\") are found on trail sleds — they're optimized for packed, groomed surfaces and provide quick, responsive steering. Longer tracks (146\"–165\") are used on mountain and deep-powder sleds — the extra length distributes the sled's weight over a larger snow surface area, preventing it from sinking. Utility sleds often run wide tracks (16\"–20\" wide) for flotation under heavy loads.",
      },
      {
        q: "What is displacement (CC) and how does it relate to performance?",
        a: "Displacement, measured in cubic centimeters (cc), is the total volume swept by all engine pistons in one stroke cycle. Larger displacement generally means more potential power, but the relationship isn't linear — engine design, turbocharging, and fuel delivery play huge roles. In the snowmobile world, 600cc engines are the entry-level performance class, 850–900cc is the current performance sweet spot, and engines above 900cc are typically turbocharged or designed for high-output touring applications. A 600cc 2-stroke making 125 hp can outperform a 1000cc 4-stroke with 135 hp in specific riding conditions due to weight and power delivery differences.",
      },
      {
        q: "What's the difference between dry weight and actual riding weight?",
        a: "Dry weight is the manufacturer-stated weight of the sled with no fuel or fluids. The actual weight you're dealing with on the trail is higher — typically add 15–25 lbs for engine oil, coolant, and a half tank of fuel. Some manufacturers are more conservative in their dry weight claims than others, so treat published dry weights as directionally accurate rather than precise. For mountain riding where weight is critical, the difference between a 420 lb dry weight and a 440 lb dry weight is meaningful and worth checking carefully across competing models.",
      },
      {
        q: "How much horsepower do I actually need?",
        a: "For most recreational trail riders, 120–135 hp is more than sufficient. You'll be hard-pressed to use that power responsibly on groomed trail systems. For mountain riding in deep powder, more power helps — 150+ hp gives you better climbing ability and the reserve to get unstuck. For touring, where you're covering long distances with a passenger and gear, 130–150 hp provides comfortable cruising power without excessive fuel consumption. The situations where you truly need 165–200 hp are competitive performance trail riding and aggressive backcountry mountain riding. Buying more power than you'll use just means more cost and higher insurance premiums.",
      },
      {
        q: "What do lug height numbers mean on snowmobile tracks?",
        a: "Lug height refers to the height of the rubber paddles on the underside of the track, measured in inches. Lugs are what grip and throw snow to propel the sled. Trail tracks typically run 1\"–1.25\" lugs — enough for grip on packed surfaces without excessive drag. Crossover tracks run 1.5\"–2\" lugs for mixed conditions. Deep-powder mountain tracks use 2.5\"–3\" lugs that dig aggressively into fresh, unpacked snow. Running deep-lug tracks on groomed trails creates significant drag, reduces performance, and can accelerate track wear. Match your lug height to your primary riding terrain.",
      },
    ],
  },
  {
    category: "Riding & Safety",
    items: [
      {
        q: "What safety gear do I need to ride a snowmobile?",
        a: "At minimum: a certified snowmobile helmet (full-face is strongly preferred over open-face), a snowmobile-specific riding suit (one-piece or jacket + bib with CE-rated impact padding), waterproof insulated gloves, snowmobile boots, and goggles or a helmet shield. For backcountry or mountain riding, add an avalanche beacon, probe, and shovel — and learn how to use them before you need them. Many mountain riders also wear an avalanche airbag pack. A quality gear setup runs $800–$1,500, and it's not the place to cut corners.",
      },
      {
        q: "Can I ride a snowmobile on public roads?",
        a: "In most jurisdictions, snowmobiles are not street-legal and cannot be operated on public roads. Many states and provinces have designated snowmobile trail systems and allow crossing of roads at designated crossing points. Some rural areas allow snowmobiles on road shoulders or ditches under specific conditions. Laws vary significantly by location — check your local Department of Motor Vehicles or natural resources department for the regulations in your area before you ride. Operating a snowmobile on a public road without authorization can result in significant fines and loss of riding privileges.",
      },
      {
        q: "What should I carry on a snowmobile ride?",
        a: "At minimum, carry a charged and fully powered cell phone (cold kills battery life — keep it inside your suit), a basic tool kit (spare belt, spark plugs, screwdrivers, zip ties), a small tow rope, a hand warmer or lighter, a snack, and extra gloves. For longer rides or backcountry trips, add a first aid kit, emergency bivouac bag, extra fuel (if range is a concern), trail maps downloaded offline, and communication beyond your cell phone (a handheld radio or satellite messenger). Never ride solo in remote areas — if you get stuck or injured, having a riding partner can be life-saving.",
      },
      {
        q: "How fast do snowmobiles go?",
        a: "Stock trail snowmobiles commonly reach 90–110 mph under the right conditions. High-performance trail sleds like the Polaris Indy VR1 or Arctic Cat ZR 8500 RR can exceed 120 mph. Turbocharged sleds like the Yamaha Sidewinder SRX LE (200 hp) are capable of even higher speeds. Mountain sleds have lower top speeds due to longer, heavier tracks but offer superior acceleration through deep snow. That said, trail speed limits on groomed trail systems are typically 50–60 mph, and responsible trail riding means operating well within the speed where you can stop within your line of sight. High-speed riding should only occur on closed, controlled environments.",
      },
      {
        q: "How do I avoid getting stuck in deep snow?",
        a: "Getting stuck is a rite of passage in mountain and backcountry riding, but technique reduces how often it happens. Maintain momentum — stopping in deep powder almost guarantees a stuck. When traversing or climbing, keep your weight forward and stay on the throttle. If you feel the sled sinking, steer toward firmer snow before you stop. When stuck, try rocking the sled side to side to break it loose before digging. A high-lift jack and collapsible shovel are invaluable tools. Riding with a partner means there's always help available when you do get buried — and you will.",
      },
    ],
  },
  {
    category: "Maintenance & Ownership",
    items: [
      {
        q: "How often does a snowmobile need service?",
        a: "Most manufacturers recommend an initial service at 500–1,000 miles for new sleds, then annual service or every 1,500–2,000 miles thereafter. 2-stroke sleds typically need more frequent top-end inspections (piston, rings) than 4-strokes. Key maintenance items: track tension and alignment check (every few rides), belt inspection and replacement (belts are wear items, budget one per season if you ride hard), spark plugs, air filter, coolant condition, and clutch cleaning. Always service your sled at the start and end of each season — end-of-season service prevents corrosion and makes the spring startup much smoother.",
      },
      {
        q: "How do I store a snowmobile for the off-season?",
        a: "Proper off-season storage prevents most common mechanical issues. Add fuel stabilizer to the tank and run the engine for 10 minutes to distribute it through the fuel system. Fog the engine cylinders with fogging oil (through the spark plug holes or air intake, depending on engine type). Change the engine oil if it's a 4-stroke. Clean and dry the exterior thoroughly. Lubricate the suspension pivot points and all grease fittings. Back off the track tension slightly (tracks can develop flat spots under tension over months). Store indoors if possible, covered with a breathable cover. Jack the skis off the floor to prevent them from deforming.",
      },
      {
        q: "How long does a snowmobile last?",
        a: "A well-maintained snowmobile can last 15,000–20,000+ miles with no major failures. Most recreational riders put on 1,000–3,000 miles per season, meaning a properly cared-for sled can realistically last 10–15 seasons. High-mileage doesn't automatically mean worn out — consistent maintenance matters far more than the odometer reading. Mountain sleds ridden hard in deep powder tend to see more mechanical stress than trail sleds. Turbocharged engines, while powerful, have more potential failure points than naturally aspirated powerplants and may need more maintenance attention as they age.",
      },
    ],
  },
];

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<string | null>(null);
  const totalQuestions = faqs.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <Layout>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span> / </span>
          <span>FAQ</span>
        </div>

        <div className="page-hero">
          <h2 className="page-hero__title">Snowmobile FAQ</h2>
          <p className="page-hero__sub">
            {totalQuestions} common questions answered — from buying your first sled to maintenance and safety.
          </p>
        </div>

        {faqs.map(cat => (
          <div key={cat.category} className="faq-category">
            <h3 className="faq-category__heading">{cat.category}</h3>
            <div className="faq-list">
              {cat.items.map((item, idx) => {
                const key = `${cat.category}-${idx}`;
                const isOpen = openIdx === key;
                return (
                  <div key={key} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                    <button
                      className="faq-item__question"
                      onClick={() => setOpenIdx(isOpen ? null : key)}
                    >
                      <span>{item.q}</span>
                      <span className="faq-item__chevron">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-item__answer">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="faq-footer-cta">
          <p>Didn't find your answer? <Link href="/contact">Contact us</Link> and we'll get back to you.</p>
          <p style={{ marginTop: "8px" }}>
            Ready to compare sleds? <Link href="/">Browse all 23 models &rarr;</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
