/*
 * Pure, side-effect-free calculation helpers for SledSpec buying tools.
 * All money values are US dollars. Fuel volume is US gallons (3.785 L).
 * Nothing here touches storage, network or the DOM.
 */

export type FieldRule = {
  key: string;
  label: string;
  /** Allow an explicit 0. If false, value must be greater than zero. */
  allowZero: boolean;
  /** Optional upper sanity bound. */
  max?: number;
  /** Must be a whole number. */
  integer?: boolean;
};

export type FieldError = { key: string; label: string; message: string };

export type ParseResult =
  | { ok: true; value: number }
  | { ok: false; kind: "missing" | "invalid"; message: string };

/** Parse a user-entered numeric string. Accepts "1,234.50" and "$1,234". Blank = missing. */
export function parseNumberInput(raw: string, rule: Pick<FieldRule, "allowZero" | "max" | "integer">): ParseResult {
  const trimmed = (raw ?? "").trim();
  if (trimmed === "") return { ok: false, kind: "missing", message: "Required. Enter 0 if it does not apply." };
  const cleaned = trimmed.replace(/[$,\s]/g, "");
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(cleaned)) return { ok: false, kind: "invalid", message: "Enter a number using digits only." };
  const value = Number(cleaned);
  if (!Number.isFinite(value)) return { ok: false, kind: "invalid", message: "Enter a finite number." };
  if (value < 0) return { ok: false, kind: "invalid", message: "Cannot be negative." };
  if (!rule.allowZero && value === 0) return { ok: false, kind: "invalid", message: "Must be greater than zero." };
  if (rule.integer && !Number.isInteger(value)) return { ok: false, kind: "invalid", message: "Enter a whole number." };
  if (rule.max !== undefined && value > rule.max) return { ok: false, kind: "invalid", message: `Must be ${rule.max.toLocaleString("en-US")} or less.` };
  return { ok: true, value };
}

export type ValidationResult<K extends string> = {
  values: Partial<Record<K, number>>;
  errors: FieldError[];
  missing: FieldError[];
  complete: boolean;
};

export function validateFields<K extends string>(raw: Record<K, string>, rules: (FieldRule & { key: K })[]): ValidationResult<K> {
  const values: Partial<Record<K, number>> = {};
  const errors: FieldError[] = [];
  const missing: FieldError[] = [];
  for (const rule of rules) {
    const r = parseNumberInput(raw[rule.key], rule);
    if (r.ok) values[rule.key] = r.value;
    else if (r.kind === "missing") missing.push({ key: rule.key, label: rule.label, message: r.message });
    else errors.push({ key: rule.key, label: rule.label, message: r.message });
  }
  return { values, errors, missing, complete: errors.length === 0 && missing.length === 0 };
}

export const roundCents = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

export function formatUSD(n: number): string {
  const v = roundCents(n);
  const sign = v < 0 ? "-" : "";
  return `${sign}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/* ------------------------------------------------------------------ */
/* Ownership planner                                                   */
/* ------------------------------------------------------------------ */

export type OwnershipKey =
  | "acquisition" | "years" | "annualMiles" | "mpg" | "fuelPrice"
  | "oil" | "service" | "insurance" | "registration" | "transportStorage"
  | "gearTraining" | "financingInterest" | "resale";

export const ownershipRules: (FieldRule & { key: OwnershipKey })[] = [
  { key: "acquisition", label: "Acquisition price (delivered, out the door)", allowZero: false, max: 500000 },
  { key: "years", label: "Years of ownership", allowZero: false, max: 30 },
  { key: "annualMiles", label: "Riding miles per year", allowZero: true, max: 50000 },
  { key: "mpg", label: "Fuel economy (miles per US gallon)", allowZero: false, max: 100 },
  { key: "fuelPrice", label: "Fuel price per US gallon", allowZero: true, max: 50 },
  { key: "oil", label: "Oil per year", allowZero: true, max: 100000 },
  { key: "service", label: "Service and maintenance per year", allowZero: true, max: 100000 },
  { key: "insurance", label: "Insurance per year", allowZero: true, max: 100000 },
  { key: "registration", label: "Registration and trail permits per year", allowZero: true, max: 100000 },
  { key: "transportStorage", label: "Transport and storage per year", allowZero: true, max: 100000 },
  { key: "gearTraining", label: "Upfront gear and training (one time)", allowZero: true, max: 500000 },
  { key: "financingInterest", label: "Total financing interest over the loan", allowZero: true, max: 500000 },
  { key: "resale", label: "Estimated resale value at end", allowZero: true, max: 500000 },
];

export type OwnershipInputs = Record<OwnershipKey, number>;

export type OwnershipResult = {
  annualFuelGallons: number;
  annualFuelCost: number;
  annualRecurring: number;
  recurringTotal: number;
  upfrontTotal: number;
  grossCashSpending: number;
  resale: number;
  netCostAfterResale: number;
  depreciation: number;
  netPerYear: number;
  netPerMile: number | null;
  totalMiles: number;
  warnings: string[];
};

/**
 * Formulas:
 *  fuel gallons/yr   = annualMiles / mpg (US gal)
 *  fuel $/yr         = gallons/yr * fuel price
 *  recurring $/yr    = fuel + oil + service + insurance + registration + transport/storage
 *  upfront           = acquisition + gear/training + total financing interest
 *  gross cash        = upfront + recurring/yr * years
 *  net after resale  = gross cash - resale
 *  depreciation      = acquisition - resale (shown for context; already inside net, never added again)
 */
export function calculateOwnership(i: OwnershipInputs): OwnershipResult {
  for (const k of Object.keys(i) as OwnershipKey[]) {
    if (!Number.isFinite(i[k]) || i[k] < 0) throw new RangeError(`Invalid ${k}`);
  }
  if (i.years <= 0) throw new RangeError("years must be > 0");
  if (i.mpg <= 0) throw new RangeError("mpg must be > 0");
  const annualFuelGallons = i.annualMiles / i.mpg;
  const annualFuelCost = annualFuelGallons * i.fuelPrice;
  const annualRecurring = annualFuelCost + i.oil + i.service + i.insurance + i.registration + i.transportStorage;
  const recurringTotal = annualRecurring * i.years;
  const upfrontTotal = i.acquisition + i.gearTraining + i.financingInterest;
  const grossCashSpending = upfrontTotal + recurringTotal;
  const netCostAfterResale = grossCashSpending - i.resale;
  const totalMiles = i.annualMiles * i.years;
  const warnings: string[] = [];
  if (i.resale > i.acquisition) warnings.push("Resale estimate is higher than the acquisition price. Check it against real sold listings before relying on it.");
  if (i.annualMiles === 0) warnings.push("Annual miles is 0, so fuel cost is 0 and cost per mile is not shown.");
  return {
    annualFuelGallons: Math.round(annualFuelGallons * 100) / 100,
    annualFuelCost: roundCents(annualFuelCost),
    annualRecurring: roundCents(annualRecurring),
    recurringTotal: roundCents(recurringTotal),
    upfrontTotal: roundCents(upfrontTotal),
    grossCashSpending: roundCents(grossCashSpending),
    resale: roundCents(i.resale),
    netCostAfterResale: roundCents(netCostAfterResale),
    depreciation: roundCents(i.acquisition - i.resale),
    netPerYear: roundCents(netCostAfterResale / i.years),
    netPerMile: totalMiles > 0 ? roundCents(netCostAfterResale / totalMiles) : null,
    totalMiles,
    warnings,
  };
}

export const ownershipSample: Record<OwnershipKey, string> = {
  acquisition: "16849.00", years: "4", annualMiles: "1400", mpg: "14", fuelPrice: "3.89",
  oil: "0", service: "385", insurance: "312", registration: "145", transportStorage: "460",
  gearTraining: "1275", financingInterest: "1932.40", resale: "8900",
};

/* ------------------------------------------------------------------ */
/* Dealer quote worksheet                                              */
/* ------------------------------------------------------------------ */

export type QuoteKey =
  | "basePrice" | "freightSetup" | "fees" | "accessories" | "tax" | "registration"
  | "tradeInCredit" | "tradeInPayoff" | "deposit";

export const quoteRules: (FieldRule & { key: QuoteKey })[] = [
  { key: "basePrice", label: "Base sled price", allowZero: false, max: 500000 },
  { key: "freightSetup", label: "Freight and setup (PDI)", allowZero: true, max: 100000 },
  { key: "fees", label: "Dealer and documentation fees", allowZero: true, max: 100000 },
  { key: "accessories", label: "Accessories and installed options", allowZero: true, max: 200000 },
  { key: "tax", label: "Sales tax amount on the quote", allowZero: true, max: 200000 },
  { key: "registration", label: "Registration and title", allowZero: true, max: 50000 },
  { key: "tradeInCredit", label: "Trade-in credit offered", allowZero: true, max: 500000 },
  { key: "tradeInPayoff", label: "Loan payoff owed on trade-in", allowZero: true, max: 500000 },
  { key: "deposit", label: "Deposit already paid", allowZero: true, max: 500000 },
];

export type QuoteInputs = Record<QuoteKey, number>;

export type QuoteResult = {
  preTradeDelivered: number;
  tradeEquity: number;
  netAfterTrade: number;
  deposit: number;
  balanceDue: number;
  warnings: string[];
};

/**
 * Formulas:
 *  pre-trade delivered = base + freight/setup + fees + accessories + tax amount + registration
 *  trade equity        = trade credit - payoff (can be negative; it is equity, not a discount)
 *  net after trade     = pre-trade delivered - trade equity
 *  balance due         = net after trade - deposit (deposit is money already paid, not a price reduction)
 */
export function calculateQuote(i: QuoteInputs): QuoteResult {
  for (const k of Object.keys(i) as QuoteKey[]) {
    if (!Number.isFinite(i[k]) || i[k] < 0) throw new RangeError(`Invalid ${k}`);
  }
  if (i.basePrice <= 0) throw new RangeError("basePrice must be > 0");
  const preTradeDelivered = i.basePrice + i.freightSetup + i.fees + i.accessories + i.tax + i.registration;
  const tradeEquity = i.tradeInCredit - i.tradeInPayoff;
  const netAfterTrade = preTradeDelivered - tradeEquity;
  const balanceDue = netAfterTrade - i.deposit;
  const warnings: string[] = [];
  if (tradeEquity < 0) warnings.push("Negative trade equity: the payoff exceeds the trade credit, so the shortfall is added to what you owe.");
  if (balanceDue < 0) warnings.push("Deposit and trade equity exceed the delivered price. Confirm how the dealer will refund the difference.");
  return {
    preTradeDelivered: roundCents(preTradeDelivered),
    tradeEquity: roundCents(tradeEquity),
    netAfterTrade: roundCents(netAfterTrade),
    deposit: roundCents(i.deposit),
    balanceDue: roundCents(balanceDue),
    warnings,
  };
}

export type QuoteComparison = { preTradeDifference: number; balanceDifference: number; lowerPreTrade: "A" | "B" | "tie" };

/** Differences are B minus A. */
export function compareQuotes(a: QuoteResult, b: QuoteResult): QuoteComparison {
  const preTradeDifference = roundCents(b.preTradeDelivered - a.preTradeDelivered);
  return {
    preTradeDifference,
    balanceDifference: roundCents(b.balanceDue - a.balanceDue),
    lowerPreTrade: preTradeDifference === 0 ? "tie" : preTradeDifference > 0 ? "A" : "B",
  };
}

export const quoteSampleA: Record<QuoteKey, string> = {
  basePrice: "15499", freightSetup: "895", fees: "349", accessories: "1180.50", tax: "1187.42",
  registration: "86", tradeInCredit: "4200", tradeInPayoff: "1350", deposit: "500",
};
export const quoteSampleB: Record<QuoteKey, string> = {
  basePrice: "15199", freightSetup: "1150", fees: "499", accessories: "1020", tax: "1172.65",
  registration: "86", tradeInCredit: "3800", tradeInPayoff: "1350", deposit: "0",
};

/* ------------------------------------------------------------------ */
/* Export helpers                                                      */
/* ------------------------------------------------------------------ */

export function csvEscape(value: string | number): string {
  const s = String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(rows: (string | number)[][]): string {
  return rows.map(r => r.map(csvEscape).join(",")).join("\r\n") + "\r\n";
}
