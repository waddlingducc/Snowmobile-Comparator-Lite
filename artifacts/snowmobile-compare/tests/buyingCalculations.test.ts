import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseNumberInput, validateFields, calculateOwnership, calculateQuote, compareQuotes,
  ownershipRules, quoteRules, ownershipSample, quoteSampleA, quoteSampleB,
  formatUSD, toCsv, csvEscape, roundCents,
} from "../src/lib/buyingCalculations";
import type { OwnershipInputs, QuoteInputs } from "../src/lib/buyingCalculations";

test("parseNumberInput handles blank, junk, negative, zero, infinity", () => {
  assert.deepEqual(parseNumberInput("", { allowZero: true }).ok, false);
  const blank = parseNumberInput("   ", { allowZero: true });
  assert.equal(blank.ok === false && blank.kind, "missing");
  for (const bad of ["abc", "1e999", "Infinity", "NaN", "1.2.3", "--4"]) {
    const r = parseNumberInput(bad, { allowZero: true });
    assert.equal(r.ok === false && r.kind, "invalid", bad);
  }
  assert.equal(parseNumberInput("-5", { allowZero: true }).ok, false);
  assert.equal(parseNumberInput("0", { allowZero: false }).ok, false);
  assert.deepEqual(parseNumberInput("0", { allowZero: true }), { ok: true, value: 0 });
  assert.deepEqual(parseNumberInput("$1,234.50", { allowZero: false }), { ok: true, value: 1234.5 });
  assert.equal(parseNumberInput("31", { allowZero: false, max: 30 }).ok, false);
  assert.equal(parseNumberInput("2.5", { allowZero: false, integer: true }).ok, false);
});

test("validateFields separates missing and invalid", () => {
  const raw = Object.fromEntries(ownershipRules.map(r => [r.key, ""])) as Record<string, string>;
  raw.years = "0"; raw.mpg = "-3"; raw.acquisition = "10000";
  const v = validateFields(raw as never, ownershipRules);
  assert.equal(v.complete, false);
  assert.deepEqual(v.errors.map(e => e.key).sort(), ["mpg", "years"]);
  assert.equal(v.missing.length, ownershipRules.length - 3);
  assert.equal(v.values.acquisition, 10000);
});

const own = (): OwnershipInputs => ({
  acquisition: 10000, years: 2, annualMiles: 1000, mpg: 10, fuelPrice: 4,
  oil: 50, service: 200, insurance: 300, registration: 100, transportStorage: 250,
  gearTraining: 1000, financingInterest: 500, resale: 6000,
});

test("ownership exact outputs and no double counted depreciation", () => {
  const r = calculateOwnership(own());
  assert.equal(r.annualFuelGallons, 100);
  assert.equal(r.annualFuelCost, 400);
  assert.equal(r.annualRecurring, 1300);
  assert.equal(r.recurringTotal, 2600);
  assert.equal(r.upfrontTotal, 11500);
  assert.equal(r.grossCashSpending, 14100);
  assert.equal(r.netCostAfterResale, 8100);
  assert.equal(r.depreciation, 4000);
  assert.equal(r.netPerYear, 4050);
  assert.equal(r.netPerMile, 4.05);
  assert.equal(r.totalMiles, 2000);
  // net = depreciation + everything else, not depreciation added on top of gross
  assert.equal(r.netCostAfterResale, r.depreciation + 1000 + 500 + r.recurringTotal);
  assert.deepEqual(r.warnings, []);
});

test("ownership zero miles: no per-mile figure, warning", () => {
  const r = calculateOwnership({ ...own(), annualMiles: 0 });
  assert.equal(r.annualFuelCost, 0);
  assert.equal(r.netPerMile, null);
  assert.equal(r.warnings.length, 1);
});

test("ownership resale above price warns; invalid input throws", () => {
  assert.equal(calculateOwnership({ ...own(), resale: 12000 }).warnings.length, 1);
  assert.throws(() => calculateOwnership({ ...own(), mpg: 0 }), RangeError);
  assert.throws(() => calculateOwnership({ ...own(), years: 0 }), RangeError);
  assert.throws(() => calculateOwnership({ ...own(), fuelPrice: NaN }), RangeError);
  assert.throws(() => calculateOwnership({ ...own(), oil: -1 }), RangeError);
  assert.throws(() => calculateOwnership({ ...own(), service: Infinity }), RangeError);
});

test("ownership sample scenario is valid and exact", () => {
  const v = validateFields(ownershipSample, ownershipRules);
  assert.equal(v.complete, true);
  const r = calculateOwnership(v.values as OwnershipInputs);
  assert.equal(r.annualFuelGallons, 100);
  assert.equal(r.annualFuelCost, 389);
  assert.equal(r.annualRecurring, 1691);
  assert.equal(r.grossCashSpending, 26820.4);
  assert.equal(r.netCostAfterResale, 17920.4);
  assert.equal(r.netPerYear, 4480.1);
  assert.equal(r.netPerMile, 3.2);
});

const quote = (): QuoteInputs => ({
  basePrice: 15000, freightSetup: 800, fees: 300, accessories: 1000, tax: 1100.55,
  registration: 75, tradeInCredit: 4000, tradeInPayoff: 1500, deposit: 500,
});

test("quote exact outputs, equity and deposit separated", () => {
  const r = calculateQuote(quote());
  assert.equal(r.preTradeDelivered, 18275.55);
  assert.equal(r.tradeEquity, 2500);
  assert.equal(r.netAfterTrade, 15775.55);
  assert.equal(r.balanceDue, 15275.55);
  assert.deepEqual(r.warnings, []);
});

test("quote negative equity raises balance and warns", () => {
  const r = calculateQuote({ ...quote(), tradeInCredit: 1000, tradeInPayoff: 3000, deposit: 0 });
  assert.equal(r.tradeEquity, -2000);
  assert.equal(r.netAfterTrade, 20275.55);
  assert.equal(r.balanceDue, 20275.55);
  assert.equal(r.warnings.length, 1);
});

test("quote overpayment warns; invalid throws", () => {
  const r = calculateQuote({ ...quote(), tradeInCredit: 20000, tradeInPayoff: 0 });
  assert.equal(r.balanceDue, -2224.45);
  assert.ok(r.warnings.some(w => w.includes("refund")));
  assert.throws(() => calculateQuote({ ...quote(), basePrice: 0 }), RangeError);
  assert.throws(() => calculateQuote({ ...quote(), tax: -1 }), RangeError);
  assert.throws(() => calculateQuote({ ...quote(), fees: NaN }), RangeError);
});

test("sample quotes and comparison", () => {
  const a = calculateQuote(validateFields(quoteSampleA, quoteRules).values as QuoteInputs);
  const b = calculateQuote(validateFields(quoteSampleB, quoteRules).values as QuoteInputs);
  assert.equal(a.preTradeDelivered, 19196.92);
  assert.equal(a.balanceDue, 15846.92);
  assert.equal(b.preTradeDelivered, 19126.65);
  assert.equal(b.balanceDue, 16676.65);
  const c = compareQuotes(a, b);
  assert.equal(c.preTradeDifference, -70.27);
  assert.equal(c.balanceDifference, 829.73);
  assert.equal(c.lowerPreTrade, "B");
  assert.equal(compareQuotes(a, a).lowerPreTrade, "tie");
});

test("formatting and CSV", () => {
  assert.equal(formatUSD(1234.5), "$1,234.50");
  assert.equal(formatUSD(-70.274), "-$70.27");
  assert.equal(roundCents(1.005), 1.01);
  assert.equal(csvEscape('Say "hi", ok'), '"Say ""hi"", ok"');
  assert.equal(toCsv([["a", 1], ["b,c", 2]]), 'a,1\r\n"b,c",2\r\n');
});
