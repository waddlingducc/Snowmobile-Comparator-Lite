import img1 from "@assets/norm_id01.jpg";
import img2 from "@assets/norm_id02.jpg";
import img3 from "@assets/norm_id03.jpg";
import img4 from "@assets/norm_id04.jpg";
import img5 from "@assets/norm_id05.jpg";
import img6 from "@assets/norm_id06.jpg";
import img7 from "@assets/norm_id07.jpg";
import img8 from "@assets/norm_id08.jpg";
import img9 from "@assets/norm_id09.jpg";
import img10 from "@assets/norm_id10.jpg";
import img11 from "@assets/norm_id11.jpg";
import img12 from "@assets/norm_id12.jpg";
import img13 from "@assets/norm_id13.jpg";
import imgZR858RR from "@assets/norm_id14.jpg";
import imgRiot8500 from "@assets/norm_id15.jpg";
import img16 from "@assets/norm_id16.jpg";
import img17 from "@assets/norm_id17.jpg";
import imgPantera7000 from "@assets/norm_id18.jpg";
import img19 from "@assets/norm_id19.jpg";
import img20 from "@assets/norm_id20.jpg";
import img21 from "@assets/norm_id21.jpg";
import img22 from "@assets/norm_id22.jpg";
import img23 from "@assets/norm_id23.jpg";
import { modelResearch } from "./model-research";

export type Category = "Trail" | "Mountain" | "Touring" | "Crossover" | "Utility";

/** US catalog unless the linked research explicitly identifies regional evidence.
 * Price = published starting MSRP in USD, not an out-the-door or used price.
 * Weight = manufacturer dry/estimated dry pounds; see per-model qualification.
 * Null means not verified for this configuration, never zero.
 */
export interface Snowmobile {
  id: number;
  brand: "Ski-Doo" | "Polaris" | "Arctic Cat" | "Yamaha";
  model: string;
  year: number | null;
  engine: string;
  displacement: number | null;
  horsepower: number | null;
  weight: number | null;
  price: number | null;
  category: Category;
  trackLength: number | null;
  features: string[];
  tagline: string;
  description: string;
  officialUrl: string;
  image?: string;
}

type CatalogEntry = Omit<Snowmobile, "description" | "officialUrl">;

const entries: CatalogEntry[] = [
  {
    id: 1, brand: "Ski-Doo", model: "Summit X with Expert Package", year: 2026,
    engine: "Rotax 850 E-TEC Turbo R", displacement: 849, horsepower: 180,
    weight: 461, price: null, category: "Mountain", trackLength: 165,
    features: ["REV Gen5", "tMotion XT rigid rear arm", "Pilot DS 4 skis", "SHOT starter"],
    tagline: "Turbo two-stroke deep-snow configuration, not a trail crossover.", image: img1,
  },
  {
    id: 2, brand: "Ski-Doo", model: "Renegade X-RS", year: 2026,
    engine: "Rotax 900 ACE Turbo R", displacement: 899, horsepower: 180,
    weight: 542, price: 18799, category: "Trail", trackLength: 137,
    features: ["RAS RX front suspension", "rMotion X rear suspension", "Smart-Shox available, not standard", "Heated trail seat"],
    tagline: "Four-stroke trail package with optional semi-active suspension.", image: img2,
  },
  {
    id: 3, brand: "Ski-Doo", model: "MXZ X-RS", year: 2026,
    engine: "Rotax 850 E-TEC", displacement: 849, horsepower: 165,
    weight: 497, price: null, category: "Trail", trackLength: 129,
    features: ["RAS RX front suspension", "Pilot RX skis", "KYB Pro shocks", "Smart-Shox available on selected configurations"],
    tagline: "A 129-inch two-stroke trail choice within a configurable X-RS range.", image: img3,
  },
  {
    id: 4, brand: "Ski-Doo", model: "Freeride 850 Turbo R", year: 2026,
    engine: "Rotax 850 E-TEC Turbo R", displacement: 849, horsepower: 180,
    weight: 465, price: null, category: "Mountain", trackLength: 154,
    features: ["REV Gen5", "KYB Pro 40 EA-3 shocks", "tMotion XT rigid rear arm"],
    tagline: "A dedicated deep-snow Freeride, not a half-trail recommendation.", image: img4,
  },
  {
    id: 5, brand: "Ski-Doo", model: "Backcountry X-RS", year: 2026,
    engine: "Rotax 850 E-TEC", displacement: 849, horsepower: 165,
    weight: 482, price: null, category: "Crossover", trackLength: 154,
    features: ["cMotion X rear suspension", "KYB Pro shocks", "REV Gen5"],
    tagline: "The 154-inch naturally aspirated configuration of Ski-Doo's crossover.", image: img5,
  },
  {
    id: 6, brand: "Ski-Doo", model: "Expedition SE", year: 2026,
    engine: "Rotax 900 ACE Turbo", displacement: 899, horsepower: 130,
    weight: 683, price: null, category: "Utility", trackLength: 154,
    features: ["uMotion rear suspension", "ACS rear shock", "Removable passenger seat", "Heated passenger grips"],
    tagline: "A wide-track utility and two-up package with the non-R turbo engine.", image: img6,
  },
  {
    id: 7, brand: "Polaris", model: "850 RMK Khaos 155", year: 2026,
    engine: "850 Patriot", displacement: 840, horsepower: null,
    weight: 426, price: 17449, category: "Mountain", trackLength: 155,
    features: ["QuickDrive2", "RMK React front suspension", "WER Velocity Hi-Lo shocks"],
    tagline: "Khaos rear suspension with a manufacturer-documented 155-inch track.", image: img7,
  },
  {
    id: 8, brand: "Polaris", model: "850 PRO RMK 165", year: 2026,
    engine: "850 Patriot", displacement: 840, horsepower: null,
    weight: 428, price: null, category: "Mountain", trackLength: 165,
    features: ["QuickDrive2", "RMK React", "Series 8 or Series 9 track options"],
    tagline: "The documented long-track PRO RMK is 165 inches, not 163.", image: img8,
  },
  {
    id: 9, brand: "Polaris", model: "Patriot Boost INDY VR1 137 DYNAMIX", year: 2026,
    engine: "Patriot Boost turbo two-stroke", displacement: 840, horsepower: null,
    weight: 531, price: null, category: "Trail", trackLength: 137,
    features: ["FOX DYNAMIX shocks", "PRO-CC rear suspension", "7S display with RIDE COMMAND"],
    tagline: "The Boost-powered VR1 with the specifically identified DYNAMIX package.", image: img9,
  },
  {
    id: 10, brand: "Polaris", model: "850 Switchback Assault 146 Escape IFS", year: 2026,
    engine: "850 Patriot", displacement: 840, horsepower: null,
    weight: 494, price: 17899, category: "Crossover", trackLength: 146,
    features: ["Escape front suspension", "IGX 146 rear suspension", "WER Velocity shocks", "7S display"],
    tagline: "Escape IFS identifies which of the two front-suspension packages is compared.", image: img10,
  },
  {
    id: 11, brand: "Polaris", model: "650 TITAN Adventure 155", year: 2026,
    engine: "650 Patriot", displacement: 650, horsepower: null,
    weight: 667, price: null, category: "Utility", trackLength: 155,
    features: ["20-inch-wide Cobra track", "BackTrak20 rear suspension", "High-low transmission", "Standard passenger seat and tow hitch"],
    tagline: "A two-person wide-track utility configuration, without an assumed standard winch.", image: img11,
  },
  {
    id: 12, brand: "Polaris", model: "650 INDY XC 137", year: 2026,
    engine: "650 Patriot", displacement: 650, horsepower: null,
    weight: 495, price: 15549, category: "Trail", trackLength: 137,
    features: ["FOX QS3 shocks", "PRO-CC rear suspension", "Electric start", "Optional 7S display"],
    tagline: "The 2026 manufacturer listing specifies a 137-inch XC, not 129.", image: img12,
  },
  {
    id: 13, brand: "Arctic Cat", model: "M 858 Sno Pro", year: 2026,
    engine: "858-series two-stroke; exact configuration pending", displacement: null, horsepower: null,
    weight: null, price: null, category: "Mountain", trackLength: 154,
    features: ["2026 model confirmed in manufacturer archive", "154-inch variant documented in EU model-code table"],
    tagline: "Model-year identity found; US trim specifications need further confirmation.", image: img13,
  },
  {
    id: 14, brand: "Arctic Cat", model: "ZR 858 R-XC", year: 2026,
    engine: "858-series two-stroke; exact configuration pending", displacement: null, horsepower: null,
    weight: null, price: null, category: "Trail", trackLength: 137,
    features: ["R-XC name confirmed in 2026 archive", "137-inch R-XC documented in EU model-code table"],
    tagline: "Corrected from the unsupported ZR 858 RR label; regional specification caveat applies.", image: imgZR858RR,
  },
  {
    id: 15, brand: "Arctic Cat", model: "Riot 858 Sno Pro", year: 2026,
    engine: "858-series two-stroke; exact configuration pending", displacement: null, horsepower: null,
    weight: null, price: null, category: "Crossover", trackLength: 146,
    features: ["Sno Pro name confirmed in 2026 archive", "146-inch variant documented in EU model-code table"],
    tagline: "A documented 2026 Riot, not the 2027 XF now returned by the old link.", image: imgRiot8500,
  },
  {
    id: 16, brand: "Arctic Cat", model: "ZR 600", year: 2026,
    engine: "600-series two-stroke; exact configuration pending", displacement: null, horsepower: null,
    weight: null, price: null, category: "Trail", trackLength: null,
    features: ["2026 ZR 600 archive entry", "Separate EPS, Sno Pro, R-XC and ATAC archive entries"],
    tagline: "The model is documented, but the former 137-inch build is not yet verified.", image: img16,
  },
  {
    id: 17, brand: "Arctic Cat", model: "M 600 Sno Pro", year: 2026,
    engine: "600-series two-stroke; exact configuration pending", displacement: null, horsepower: null,
    weight: null, price: null, category: "Mountain", trackLength: null,
    features: ["2026 M 600 Sno Pro archive entry", "ALPHA ONE equipment requires configuration confirmation"],
    tagline: "A mountain-family record with unresolved track and rear-suspension details.", image: img17,
  },
  {
    id: 18, brand: "Arctic Cat", model: "Pantera 7000", year: 2026,
    engine: "7000-series four-stroke; exact specification pending", displacement: null, horsepower: null,
    weight: null, price: null, category: "Touring", trackLength: null,
    features: ["2026 Pantera 7000 archive entry", "Manufacturer 7000/9000 operator manual available"],
    tagline: "Touring-family identity verified; newer Pantera specifications are not backfilled.", image: imgPantera7000,
  },
  {
    id: 19, brand: "Yamaha", model: "Sidewinder SRX LE EPS", year: 2025,
    engine: "998 cc turbo four-stroke", displacement: 998, horsepower: null,
    weight: null, price: 21499, category: "Trail", trackLength: 137,
    features: ["Electric power steering", "FOX iQS front and rear shocks", "15 x 137 x 1.00-inch track"],
    tagline: "Archived final-edition trail model; no independently verified horsepower ranking.", image: img19,
  },
  {
    id: 20, brand: "Yamaha", model: "Sidewinder M-TX LE 153", year: 2025,
    engine: "998 cc turbo four-stroke", displacement: 998, horsepower: null,
    weight: null, price: 19999, category: "Mountain", trackLength: 153,
    features: ["Twin-rail mountain rear suspension", "FOX Float QS3 shocks", "15 x 153 x 3.00-inch track"],
    tagline: "The M-TX returned for 2025; this is not an invented carryover year.", image: img20,
  },
  {
    id: 21, brand: "Yamaha", model: "SRViper L-TX GT", year: 2025,
    engine: "1049 cc naturally aspirated four-stroke", displacement: 1049, horsepower: null,
    weight: null, price: 16299, category: "Trail", trackLength: 137,
    features: ["FOX QS3 front and rear shocks", "Dual Shock SR 137 rear suspension", "15 x 137 x 1.25-inch track"],
    tagline: "Naturally aspirated solo trail alternative to the turbo Sidewinder.", image: img21,
  },
  {
    id: 22, brand: "Yamaha", model: "SRViper L-TX GT", year: 2024,
    engine: "1049 cc naturally aspirated four-stroke", displacement: 1049, horsepower: null,
    weight: null, price: 16199, category: "Trail", trackLength: 137,
    features: ["Archived 2024 GT specification", "FOX QS3 shocks", "Dual Shock SR 137 rear suspension"],
    tagline: "The original product-124 link identifies a 2024 GT, not a 2025 base L-TX.", image: img22,
  },
  {
    id: 23, brand: "Yamaha", model: "Transporter Lite", year: 2025,
    engine: "397 cc two-stroke", displacement: 397, horsepower: null,
    weight: null, price: 9999, category: "Utility", trackLength: 146,
    features: ["Batteryless electronic fuel injection", "Flip-up rear rails", "15 x 146 x 1.60-inch track"],
    tagline: "Archived utility model with verified dimensions, not a claimed market-wide price winner.", image: img23,
  },
];

export const snowmobiles: Snowmobile[] = entries.map((entry) => ({
  ...entry,
  description: modelResearch[entry.id].analysis[0],
  officialUrl: modelResearch[entry.id].sources[0].url,
}));