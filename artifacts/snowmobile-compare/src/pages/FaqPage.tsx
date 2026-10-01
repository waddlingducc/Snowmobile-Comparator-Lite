import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";
import { guideSources, researchedDate, researchedDateLabel } from "../data/guides";
import "./guide-content.css";

interface FaqItem { q: string; a: string; sourceIds: string[] }
const faqs: { id: string; category: string; guideId: string; items: FaqItem[] }[] = [
  {
    id: "buying", category: "Buying and budgeting", guideId: "how-to-choose",
    items: [
      { q: "What makes a good beginner snowmobile?", a: "Start with legal access, training, control reach in riding gear, terrain suitability and manageable operation for that rider. There is no universal cc or horsepower cutoff that makes a machine safe for beginners. A supervised rental or instruction session can reveal fit problems before purchase. For passengers, verify an approved two-up configuration and its load limits; a long seat alone is not enough.", sourceIds: ["buying", "safety", "manuals"] },
      { q: "How much should I budget, and what does MSRP exclude?", a: "MSRP is a manufacturer's suggested retail price, not necessarily the delivered price. Obtain an itemized quote in your currency with the exact year, engine, track, tax, freight, setup and optional products. Add gear, training, transport, storage, permits, insurance, fuel and service. The buying guide includes a clearly hypothetical budget worksheet; it is not a current price list. Do not assume a fixed percentage above sticker price fits every owner.", sourceIds: ["engines"] },
      { q: "Is new or used better?", a: "Compare delivered cost, documented condition, repair estimates, warranty terms and service access. A low odometer reading cannot establish condition, and a new machine is not automatically free of recalls or storage-related needs. For a used machine, verify ownership and VIN, request records and arrange a qualified pre-purchase inspection. Missing history is an uncertainty to investigate, not an automatic discount you should accept.", sourceIds: ["manuals"] },
      { q: "Which brand is best?", a: "There is no brand winner established by this site's desk research. Compare exact configurations that fit your route, then verify local service capacity, parts availability and warranty support. We have not independently measured reliability or handling. A manufacturer's category guide can help organize a shortlist, but its promotional claims are not comparative test results.", sourceIds: ["buying"] },
      { q: "Is insurance required, and what will it cost?", a: "Check the law for every state or province where you intend to ride, plus trail, lender and rental requirements. Ask the responsible authority about liability requirements and ask a licensed insurer for a quote on the exact machine and use. Confirm coverage for passengers, off-trail use, transport, theft and any cross-border trip in writing. We do not publish a universal premium or assume a home policy covers a snowmobile. The linked Minnesota resource is a starting point for that jurisdiction only.", sourceIds: ["safety"] },
    ],
  },
  {
    id: "specs", category: "Understanding specifications", guideId: "reading-specs",
    items: [
      { q: "Is track length the same as drive-belt length?", a: "No. The track is the large endless traction assembly that contacts the snow; its nominal length is its circumference, not the length of its contact patch. The clutch drive belt is a separate component transferring power between clutches on a belt-driven drivetrain. Track length, width, lug geometry, suspension and load all influence performance. Never order a replacement track or belt by a model-family name alone.", sourceIds: ["manual", "buying"] },
      { q: "What does engine displacement tell me?", a: "Displacement in cubic centimeters is the total volume swept by the pistons. It does not establish horsepower, throttle behavior, top speed or beginner suitability. Two-stroke versus four-stroke design, boost and calibration matter. BRP's engine page illustrates multiple engine technologies; its performance figures are manufacturer claims with their own test conditions, not independent comparisons.", sourceIds: ["engines"] },
      { q: "How much should I add to dry weight?", a: "There is no reliable fixed fluid allowance. First check what that manufacturer's stated weight includes, then add only omitted fuel, fluids, equipment and luggage. Fuel alone can outweigh a small blanket allowance. Our spec guide has an explicitly hypothetical mass calculation. For trailer and load-limit decisions, weigh the actual loaded machine and check all relevant ratings; do not treat a dry-weight listing as transport weight.", sourceIds: ["manuals"] },
      { q: "How much horsepower do I need?", a: "We cannot responsibly assign horsepower targets by rider category. Decide the intended terrain, load, fit and control requirements first, then discuss exact configurations with an instructor and dealer. More peak power does not fix unsuitable track equipment, poor traction or inadequate training. Engine-output figures also cannot directly predict acceleration or range with your load.", sourceIds: ["engines", "safety"] },
      { q: "What is lug height, and can I fit a taller track?", a: "Lug height describes the height of the track's projecting traction features. A taller lug is not automatically better for every snow surface. Track compatibility, clearance, cooling, lubrication and operating restrictions are model-specific. The example Polaris deep-snow manual warns about inadequate cooling and slide lubrication in insufficient snow. Verify an approved configuration and its limits rather than making a change based only on dimensions.", sourceIds: ["manual", "manuals"] },
    ],
  },
  {
    id: "safety", category: "Riding and safety", guideId: "safety-gear",
    items: [
      { q: "What gear should I wear and carry?", a: "Use a properly fitted helmet meeting local requirements, eye/face protection, weather-resistant layers and gloves and boots that allow reliable control operation. Pack emergency insulation, navigation, first aid, food, water and communications appropriate to your route. Test how the helmet and eyewear work together before departure. Minnesota DNR recommends training, a quality DOT helmet and riding with another snowmobiler. Gear does not make bad conditions safe.", sourceIds: ["safety", "gear"] },
      { q: "What changes when a route enters avalanche terrain?", a: "Every person needs appropriate avalanche education and practiced companion-rescue skills, plus a transceiver, probe and metal shovel carried on the person, not only on the sled. Read the local forecast and understand its terrain implications, including slopes above flat travel or stopping areas. An airbag is supplemental. Avalanche Canada's sled-specific training resources and gear guidance explain why equipment alone is insufficient.", sourceIds: ["avalanche", "gear"] },
      { q: "Can I ride on roads or across private land?", a: "Only where the responsible authority and landowner permit that use. Road crossings, shoulders, ditches, age limits and access rules vary by location. Check the destination's current regulations and trail status before departure, and do not infer permission from existing tracks. Minnesota DNR's guidance emphasizes designated trails and landowner permission; consult your own jurisdiction for binding rules.", sourceIds: ["safety"] },
      { q: "How fast can I safely ride?", a: "There is no universally safe cruising speed or reliable top-speed estimate from the specifications here. Obey the local legal limit and slow further for sight distance, surface, traffic, weather and your ability. You need room to stop for hazards within the visible route. A posted maximum is not a target, and a claimed vehicle top speed is not safety guidance.", sourceIds: ["safety"] },
      { q: "Is a marked frozen lake safe to cross?", a: "A trail marker or another machine's tracks do not establish ice safety. Minnesota DNR identifies avoiding lakes and rivers as the safest option and warns about areas with current. Obtain current local guidance and choose a land route when ice conditions cannot be established. No generic thickness number or clothing item guarantees safe ice.", sourceIds: ["safety"] },
      { q: "What should I do if I get stuck?", a: "Stop and assess terrain, overhead avalanche exposure, people and the machine before attempting recovery. Shut down before anyone works near the track or drivetrain. Do not follow a blanket instruction to keep applying throttle, lift a running machine or use an improvised tow point. Use recovery methods learned in instruction and towing procedures specified by the manual. If safe recovery is beyond the group's skills, seek assistance rather than escalating the hazard.", sourceIds: ["manual", "avalanche"] },
    ],
  },
  {
    id: "maintenance", category: "Maintenance and ownership", guideId: "snowmobile-maintenance",
    items: [
      { q: "How often does my snowmobile need service?", a: "Use the schedule for the exact model year, engine and equipment, including calendar, distance or hour triggers and any special operating conditions. There is no single break-in interval, annual belt replacement rule or universal two-stroke rebuild mileage. Keep a dated service log. If previous work is undocumented, ask a qualified technician to establish a baseline rather than assuming the interval restarts when you buy it.", sourceIds: ["manuals"] },
      { q: "Can I clean or adjust the clutch myself?", a: "Do not treat clutch work as a generic owner task. The Polaris RMK-family manual reviewed here explicitly says not to attempt clutch service: it is a high-speed balanced assembly. Other machines require their own instructions. Do not prescribe a solvent, lubricate clutch faces or dismantle a clutch from online general advice. Correct belt selection and any owner-permitted replacement procedure must come from the exact manual.", sourceIds: ["manual", "manuals"] },
      { q: "How should I store it for the off-season?", a: "Follow your model's storage section for fuel treatment, engine lubrication, battery care, belt and track handling, cleaning and support. Do not universally drain fuel, fog an intake, run an engine for ten minutes or loosen track tension. Engine designs and storage systems differ. Never run an engine in an enclosed space. If the required procedure is unclear or needs equipment you lack, arrange qualified service.", sourceIds: ["manuals"] },
      { q: "How long will a snowmobile last?", a: "No credible lifespan can be promised from an odometer reading or engine type alone. Condition, operating load, maintenance, storage and repair history all matter, and individual components wear differently. Use service records and a qualified inspection to estimate upcoming work. We do not have long-term fleet data supporting a universal mileage or season count.", sourceIds: ["manuals"] },
      { q: "Which faults mean I should not ride?", a: "Do not ride with a binding throttle, abnormal brakes, a fuel leak, damaged track, unresolved safety-system fault or other condition the manual identifies as unsafe. Turn off and secure the machine as instructed, keep people clear of moving parts and get qualified help. A short test ride is not an acceptable substitute for repairing a known safety fault.", sourceIds: ["manual", "manuals"] },
    ],
  },
];

export default function FaqPage() {
  usePageTitle("Snowmobile FAQ — Buying, Specs, Safety and Maintenance | SledSpec.com");
  return (
    <Layout>
      <div className="container faq-researched">
        <div className="breadcrumb"><Link href="/">Home</Link><span> / FAQ</span></div>
        <header className="page-hero">
          <h1 className="page-hero__title">Snowmobile FAQ</h1>
          <p className="page-hero__sub">Practical answers, source links and clear limits—not universal power targets or repair shortcuts.</p>
          <p className="guide-methodology">Researched <time dateTime={researchedDate}>{researchedDateLabel}</time>. AI-assisted desk research, not hands-on testing, legal advice or a service manual. Examples and selection frameworks are editorial synthesis. <Link href="/about" data-testid="link-faq-methodology">Our methods and limitations</Link>.</p>
        </header>
        <nav className="guide-toc" aria-label="FAQ topics"><h2>Find your topic</h2><ul>{faqs.map(cat => <li key={cat.id}><a href={`#${cat.id}`} data-testid={`link-faq-topic-${cat.id}`}>{cat.category}</a></li>)}</ul></nav>
        {faqs.map(cat => (
          <section key={cat.id} id={cat.id} className="faq-category">
            <h2 className="faq-category__heading">{cat.category}</h2>
            <div className="faq-list">{cat.items.map((item, idx) => (
              <section key={item.q} id={`${cat.id}-${idx + 1}`} className="faq-item faq-item--open">
                <h3 className="faq-item__question">{item.q}</h3>
                <div className="faq-item__answer">
                  <p>{item.a}</p>
                  <p className="guide-citations">Source context: {item.sourceIds.map((id, i) => <span key={id}>{i > 0 && " · "}<a href={guideSources[id].url} data-testid={`link-faq-source-${cat.id}-${idx}-${id}`}>{guideSources[id].label}</a></span>)}</p>
                </div>
              </section>
            ))}</div>
            <p><Link href={`/guides/${cat.guideId}`} data-testid={`link-faq-guide-${cat.id}`}>Open the detailed {cat.category.toLowerCase()} guide →</Link></p>
          </section>
        ))}
        <div className="faq-footer-cta">
          <p>Found an error? <Link href="/contact">Send a correction with the relevant source</Link>.</p>
          <p>For operation and service, use your exact owner's manual; for binding rules, consult the destination's authority. Source pages may change after the research date.</p>
        </div>
      </div>
    </Layout>
  );
}