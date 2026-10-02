import { useId, useMemo, useState } from "react";
import {
  calculateOwnership, formatUSD, ownershipRules, ownershipSample, toCsv, validateFields,
} from "../../lib/buyingCalculations";
import type { OwnershipInputs, OwnershipKey, OwnershipResult } from "../../lib/buyingCalculations";
import { IssueSummary, NumberField, downloadFile, printPage } from "./shared";
import "./buying-tools.css";

const blank = Object.fromEntries(ownershipRules.map(r => [r.key, ""])) as Record<OwnershipKey, string>;
const rule = (k: OwnershipKey) => ownershipRules.find(r => r.key === k)!;

const units: Record<OwnershipKey, string> = {
  acquisition: "USD", years: "years", annualMiles: "mi/yr", mpg: "mi/US gal", fuelPrice: "USD/US gal",
  oil: "USD/yr", service: "USD/yr", insurance: "USD/yr", registration: "USD/yr", transportStorage: "USD/yr",
  gearTraining: "USD", financingInterest: "USD", resale: "USD",
};
const hints: Partial<Record<OwnershipKey, string>> = {
  acquisition: "Delivered price including tax and fees. Enter the full price even if financed.",
  mpg: "US gallons (3.785 L). Use your own estimate; manufacturers rarely publish one. Converting from L/100 km: 235.2 / L per 100 km.",
  oil: "Two-stroke injection oil, or 0 if included in service.",
  financingInterest: "Interest only, from the lender's disclosure. Not the principal, which is already in acquisition price.",
  resale: "Your estimate from comparable sold listings. Enter 0 if you plan to ride it into the ground.",
};

const groups: { legend: string; keys: OwnershipKey[] }[] = [
  { legend: "Purchase and horizon", keys: ["acquisition", "years", "financingInterest", "resale"] },
  { legend: "Riding and fuel", keys: ["annualMiles", "mpg", "fuelPrice"] },
  { legend: "Recurring yearly costs", keys: ["oil", "service", "insurance", "registration", "transportStorage"] },
  { legend: "One-time extras", keys: ["gearTraining"] },
];

function summaryRows(raw: Record<OwnershipKey, string>, r: OwnershipResult): (string | number)[][] {
  return [
    ["Section", "Item", "Value"],
    ...ownershipRules.map(x => ["Input", `${x.label} (${units[x.key]})`, raw[x.key].trim()]),
    ["Result", "Fuel per year (US gallons)", r.annualFuelGallons.toFixed(2)],
    ["Result", "Fuel cost per year", formatUSD(r.annualFuelCost)],
    ["Result", "Recurring cost per year", formatUSD(r.annualRecurring)],
    ["Result", "Recurring cost over ownership", formatUSD(r.recurringTotal)],
    ["Result", "Upfront: acquisition + gear/training + interest", formatUSD(r.upfrontTotal)],
    ["Result", "Gross cash spending", formatUSD(r.grossCashSpending)],
    ["Result", "Less estimated resale", formatUSD(-r.resale)],
    ["Result", "Net cost after resale", formatUSD(r.netCostAfterResale)],
    ["Result", "Net cost per year", formatUSD(r.netPerYear)],
    ["Result", "Net cost per mile", r.netPerMile === null ? "n/a (0 miles)" : formatUSD(r.netPerMile)],
    ["Context", "Depreciation (already inside net; not added again)", formatUSD(r.depreciation)],
  ];
}

export default function OwnershipPlanner() {
  const uid = useId().replace(/:/g, "");
  const prefix = `own${uid}`;
  const [raw, setRaw] = useState<Record<OwnershipKey, string>>(blank);
  const [showMissing, setShowMissing] = useState(false);
  const [sampleLoaded, setSampleLoaded] = useState(false);

  const validation = useMemo(() => validateFields(raw, ownershipRules), [raw]);
  const result = useMemo(
    () => (validation.complete ? calculateOwnership(validation.values as OwnershipInputs) : null),
    [validation],
  );

  const set = (k: OwnershipKey) => (v: string) => { setRaw(p => ({ ...p, [k]: v })); setSampleLoaded(false); };
  const reset = () => { setRaw(blank); setShowMissing(false); setSampleLoaded(false); };
  const loadSample = () => { setRaw(ownershipSample); setSampleLoaded(true); };

  const exportText = () => {
    if (!result) return;
    const lines = summaryRows(raw, result).slice(1).map(([s, i, v]) => `${s === "Input" ? "  " : ""}${i}: ${v}`);
    downloadFile("sledspec-ownership-plan.txt", [
      "SledSpec ownership cost plan (your estimates, not a quote)", "",
      ...lines, "",
      "Formulas: gross = acquisition + gear/training + interest + (fuel + oil + service + insurance + registration + transport/storage) x years.",
      "Net = gross - resale. Depreciation is shown for context only and is never added on top.",
      "Excludes: repairs beyond your service estimate, opportunity cost, inflation, trailer purchase, tow-vehicle fuel unless entered.",
    ].join("\n"), "text/plain");
  };
  const exportCsv = () => { if (result) downloadFile("sledspec-ownership-plan.csv", toCsv(summaryRows(raw, result)), "text/csv"); };

  return (
    <section className="bt-tool" aria-labelledby={`${prefix}-title`} data-testid="tool-ownership-planner">
      <h2 id={`${prefix}-title`}>Ownership cost planner</h2>
      <p className="bt-intro">
        Plan what a sled could cost you over the years you expect to keep it. Every figure is your own estimate; nothing here is a
        tested or published cost. Fields start blank so nothing is assumed. Enter 0 for anything that does not apply.
        Values stay in this browser tab only and disappear on reload.
      </p>
      <div className="bt-actions">
        <button type="button" className="btn btn-secondary" onClick={loadSample} data-testid="button-ownership-sample">Load sample scenario (hypothetical)</button>
        <button type="button" className="btn btn-secondary" onClick={() => setShowMissing(true)} data-testid="button-ownership-check">Check for blank fields</button>
        <button type="button" className="btn btn-secondary" onClick={reset} data-testid="button-ownership-reset">Reset</button>
        <button type="button" className="btn btn-primary" onClick={printPage} data-testid="button-ownership-print">Print</button>
        <button type="button" className="btn btn-primary" onClick={exportText} disabled={!result} data-testid="button-ownership-text">Download text</button>
        <button type="button" className="btn btn-primary" onClick={exportCsv} disabled={!result} data-testid="button-ownership-csv">Download CSV</button>
      </div>
      {sampleLoaded && <p className="bt-hint" role="status" data-testid="status-ownership-sample">Sample scenario loaded. These are invented example numbers, not data for any specific sled.</p>}

      <form onSubmit={e => e.preventDefault()} noValidate>
        {groups.map(g => (
          <fieldset key={g.legend} className="bt-fieldset">
            <legend>{g.legend}</legend>
            <div className="bt-grid">
              {g.keys.map(k => (
                <NumberField key={k} id={`${prefix}-${k}`} rule={rule(k)} value={raw[k]} onChange={set(k)} unit={units[k]} hint={hints[k]} showMissing={showMissing} />
              ))}
            </div>
          </fieldset>
        ))}
      </form>

      <div aria-live="polite">
        <IssueSummary errors={validation.errors} missing={validation.missing} idPrefix={prefix} />
        {result && (
          <div className="bt-results" data-testid="results-ownership">
            <h3>Results</h3>
            <div className="bt-headline">
              <div className="bt-stat">
                <span className="bt-stat__label">Gross cash spending</span>
                <span className="bt-stat__value" data-testid="text-ownership-gross">{formatUSD(result.grossCashSpending)}</span>
                <span className="bt-stat__note">Everything you pay out over {raw.years.trim()} years, before selling.</span>
              </div>
              <div className="bt-stat bt-stat--alt">
                <span className="bt-stat__label">Net cost after resale</span>
                <span className="bt-stat__value" data-testid="text-ownership-net">{formatUSD(result.netCostAfterResale)}</span>
                <span className="bt-stat__note">{formatUSD(result.netPerYear)} per year{result.netPerMile !== null ? `, ${formatUSD(result.netPerMile)} per mile` : ""}.</span>
              </div>
            </div>
            <div className="bt-table-wrap" role="region" aria-label="Ownership cost breakdown" tabIndex={0}>
              <table className="bt-table">
                <caption className="bt-sr">Ownership cost breakdown</caption>
                <thead><tr><th scope="col">Line</th><th scope="col">Amount</th></tr></thead>
                <tbody>
                  <tr><th scope="row">Fuel: {result.annualFuelGallons.toFixed(2)} US gal/yr</th><td className="bt-num">{formatUSD(result.annualFuelCost)} /yr</td></tr>
                  <tr><th scope="row">All recurring costs</th><td className="bt-num">{formatUSD(result.annualRecurring)} /yr</td></tr>
                  <tr><th scope="row">Recurring over ownership</th><td className="bt-num">{formatUSD(result.recurringTotal)}</td></tr>
                  <tr><th scope="row">Acquisition + gear/training + interest</th><td className="bt-num">{formatUSD(result.upfrontTotal)}</td></tr>
                  <tr className="bt-total"><th scope="row">Gross cash spending</th><td className="bt-num">{formatUSD(result.grossCashSpending)}</td></tr>
                  <tr><th scope="row">Less estimated resale</th><td className="bt-num">{formatUSD(-result.resale)}</td></tr>
                  <tr className="bt-total"><th scope="row">Net cost after resale</th><td className="bt-num">{formatUSD(result.netCostAfterResale)}</td></tr>
                  <tr><th scope="row">Context: depreciation (acquisition minus resale)</th><td className="bt-num">{formatUSD(result.depreciation)}</td></tr>
                </tbody>
              </table>
            </div>
            {result.warnings.map(w => <p key={w} className="bt-warn">{w}</p>)}
          </div>
        )}
      </div>

      <details className="bt-notes">
        <summary>Formulas, units and exclusions</summary>
        <ul>
          <li>Fuel per year = miles per year / miles per US gallon x price per US gallon.</li>
          <li>Gross cash spending = acquisition + gear/training + total financing interest + recurring costs x years.</li>
          <li>Net cost = gross cash spending - estimated resale. Depreciation is already inside net cost; it is shown only for context and never added a second time.</li>
          <li>Enter financing interest only. Loan principal is already counted in the acquisition price.</li>
          <li>Not included: unplanned repairs, inflation, opportunity cost of cash, trailer or tow vehicle purchases, and anything you leave at 0.</li>
        </ul>
      </details>
    </section>
  );
}
