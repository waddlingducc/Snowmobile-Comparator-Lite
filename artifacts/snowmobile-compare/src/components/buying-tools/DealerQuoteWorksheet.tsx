import { useId, useMemo, useState } from "react";
import {
  calculateQuote, compareQuotes, formatUSD, quoteRules, quoteSampleA, quoteSampleB, toCsv, validateFields,
} from "../../lib/buyingCalculations";
import type { QuoteInputs, QuoteKey, QuoteResult } from "../../lib/buyingCalculations";
import { IssueSummary, NumberField, downloadFile, printPage } from "./shared";
import "./buying-tools.css";

type Side = "A" | "B";
type QuoteState = { name: string; config: string; values: Record<QuoteKey, string> };

const blankValues = Object.fromEntries(quoteRules.map(r => [r.key, ""])) as Record<QuoteKey, string>;
const blankQuote = (): QuoteState => ({ name: "", config: "", values: { ...blankValues } });

const hints: Partial<Record<QuoteKey, string>> = {
  tax: "Copy the dollar tax amount printed on the quote. This tool does not assume a tax rate.",
  tradeInCredit: "What the dealer offers for your old sled.",
  tradeInPayoff: "What you still owe your lender on the trade-in.",
  deposit: "Money already paid. It reduces the balance due, not the price.",
};

const priceKeys: QuoteKey[] = ["basePrice", "freightSetup", "fees", "accessories", "tax", "registration"];
const tradeKeys: QuoteKey[] = ["tradeInCredit", "tradeInPayoff", "deposit"];
const rule = (k: QuoteKey) => quoteRules.find(r => r.key === k)!;
const label = (q: QuoteState, s: Side) => q.name.trim() || `Quote ${s}`;

function QuoteInputsBlock({ side, q, setQ, prefix, showMissing }: {
  side: Side; q: QuoteState; setQ: (u: (p: QuoteState) => QuoteState) => void; prefix: string; showMissing: boolean;
}) {
  const id = `${prefix}-${side}`;
  return (
    <fieldset className="bt-fieldset" data-testid={`fieldset-quote-${side}`}>
      <legend>Quote {side}</legend>
      <div className="bt-grid">
        <div className="bt-field">
          <label htmlFor={`${id}-name`}>Dealer or quote name</label>
          <input id={`${id}-name`} className="bt-text-input" value={q.name} maxLength={80}
            onChange={e => { const v = e.target.value; setQ(p => ({ ...p, name: v })); }} data-testid={`input-quote-${side}-name`} />
        </div>
        <div className="bt-field">
          <label htmlFor={`${id}-config`}>Model, year and configuration</label>
          <input id={`${id}-config`} className="bt-text-input" value={q.config} maxLength={120}
            onChange={e => { const v = e.target.value; setQ(p => ({ ...p, config: v })); }} data-testid={`input-quote-${side}-config`} />
        </div>
      </div>
      <h3 style={{ marginTop: 16 }}>Delivered price items</h3>
      <div className="bt-grid">
        {priceKeys.map(k => (
          <NumberField key={k} id={`${id}-${k}`} rule={rule(k)} unit="USD" hint={hints[k]} value={q.values[k]} showMissing={showMissing}
            onChange={v => setQ(p => ({ ...p, values: { ...p.values, [k]: v } }))} />
        ))}
      </div>
      <h3 style={{ marginTop: 16 }}>Trade-in and deposit (applied after the price)</h3>
      <div className="bt-grid">
        {tradeKeys.map(k => (
          <NumberField key={k} id={`${id}-${k}`} rule={rule(k)} unit="USD" hint={hints[k]} value={q.values[k]} showMissing={showMissing}
            onChange={v => setQ(p => ({ ...p, values: { ...p.values, [k]: v } }))} />
        ))}
      </div>
    </fieldset>
  );
}

function rowsFor(qa: QuoteState, qb: QuoteState, ra: QuoteResult | null, rb: QuoteResult | null): string[][] {
  const out = (r: QuoteResult | null, f: (r: QuoteResult) => number) => (r ? formatUSD(f(r)) : "incomplete");
  return [
    ["Item", label(qa, "A"), label(qb, "B")],
    ["Configuration", qa.config.trim(), qb.config.trim()],
    ...quoteRules.map(r => [`${r.label} (USD)`, qa.values[r.key].trim(), qb.values[r.key].trim()]),
    ["Pre-trade delivered price", out(ra, r => r.preTradeDelivered), out(rb, r => r.preTradeDelivered)],
    ["Trade-in equity (credit - payoff)", out(ra, r => r.tradeEquity), out(rb, r => r.tradeEquity)],
    ["Net after trade", out(ra, r => r.netAfterTrade), out(rb, r => r.netAfterTrade)],
    ["Less deposit paid", out(ra, r => -r.deposit), out(rb, r => -r.deposit)],
    ["Balance due at delivery", out(ra, r => r.balanceDue), out(rb, r => r.balanceDue)],
  ];
}

export default function DealerQuoteWorksheet() {
  const uid = useId().replace(/:/g, "");
  const prefix = `dq${uid}`;
  const [qa, setQa] = useState<QuoteState>(blankQuote);
  const [qb, setQb] = useState<QuoteState>(blankQuote);
  const [showMissing, setShowMissing] = useState(false);
  const [sampleLoaded, setSampleLoaded] = useState(false);

  const va = useMemo(() => validateFields(qa.values, quoteRules), [qa.values]);
  const vb = useMemo(() => validateFields(qb.values, quoteRules), [qb.values]);
  const ra = useMemo(() => (va.complete ? calculateQuote(va.values as QuoteInputs) : null), [va]);
  const rb = useMemo(() => (vb.complete ? calculateQuote(vb.values as QuoteInputs) : null), [vb]);
  const cmp = ra && rb ? compareQuotes(ra, rb) : null;
  const any = !!(ra || rb);

  const wrap = (fn: typeof setQa) => (u: (p: QuoteState) => QuoteState) => { fn(u); setSampleLoaded(false); };
  const reset = () => { setQa(blankQuote()); setQb(blankQuote()); setShowMissing(false); setSampleLoaded(false); };
  const loadSample = () => {
    setQa({ name: "Sample Dealer North", config: "Hypothetical 600cc trail sled, 137 in track", values: { ...quoteSampleA } });
    setQb({ name: "Sample Dealer Lakeside", config: "Same configuration, hypothetical", values: { ...quoteSampleB } });
    setSampleLoaded(true);
  };

  const exportCsv = () => downloadFile("sledspec-dealer-quotes.csv", toCsv(rowsFor(qa, qb, ra, rb)), "text/csv");
  const exportText = () => {
    const rows = rowsFor(qa, qb, ra, rb);
    const lines = rows.slice(1).map(([i, a, b]) => `${i}\n  ${rows[0][1]}: ${a || "-"}\n  ${rows[0][2]}: ${b || "-"}`);
    downloadFile("sledspec-dealer-quotes.txt", [
      "SledSpec dealer quote worksheet (figures you entered from written quotes)", "",
      ...lines, "",
      cmp ? `Pre-trade delivered difference (B - A): ${formatUSD(cmp.preTradeDifference)}` : "Comparison: needs both quotes complete.",
      cmp ? `Balance due difference (B - A): ${formatUSD(cmp.balanceDifference)}` : "",
      "",
      "Pre-trade delivered = base + freight/setup + fees + accessories + tax amount + registration.",
      "Trade-in equity = credit - payoff. It is value you bring, not a discount on the sled.",
      "Balance due = pre-trade delivered - trade-in equity - deposit.",
      "Excludes: financing interest, extended warranties, and anything not written on the quote.",
    ].join("\n"), "text/plain");
  };

  const resultCell = (r: QuoteResult | null, f: (r: QuoteResult) => number, testid: string) =>
    <td className="bt-num" data-testid={testid}>{r ? formatUSD(f(r)) : <span className="bt-hint">incomplete</span>}</td>;

  return (
    <section className="bt-tool" aria-labelledby={`${prefix}-title`} data-testid="tool-dealer-quote-worksheet">
      <h2 id={`${prefix}-title`}>Dealer quote worksheet</h2>
      <p className="bt-intro">
        Copy two written quotes line by line to see what each sled actually costs delivered, separately from what you owe after your
        trade-in and deposit. Enter the tax dollar amount from each quote. Enter 0 for lines a quote does not include. Nothing is saved
        or sent anywhere.
      </p>
      <div className="bt-actions">
        <button type="button" className="btn btn-secondary" onClick={loadSample} data-testid="button-quote-sample">Load sample quotes (hypothetical)</button>
        <button type="button" className="btn btn-secondary" onClick={() => setShowMissing(true)} data-testid="button-quote-check">Check for blank fields</button>
        <button type="button" className="btn btn-secondary" onClick={reset} data-testid="button-quote-reset">Reset</button>
        <button type="button" className="btn btn-primary" onClick={printPage} data-testid="button-quote-print">Print</button>
        <button type="button" className="btn btn-primary" onClick={exportText} disabled={!any} data-testid="button-quote-text">Download text</button>
        <button type="button" className="btn btn-primary" onClick={exportCsv} disabled={!any} data-testid="button-quote-csv">Download CSV</button>
      </div>
      {sampleLoaded && <p className="bt-hint" role="status" data-testid="status-quote-sample">Sample quotes loaded. Dealers and amounts are invented for illustration.</p>}

      <form onSubmit={e => e.preventDefault()} noValidate className="bt-quotes">
        <QuoteInputsBlock side="A" q={qa} setQ={wrap(setQa)} prefix={prefix} showMissing={showMissing} />
        <QuoteInputsBlock side="B" q={qb} setQ={wrap(setQb)} prefix={prefix} showMissing={showMissing} />
      </form>

      <div aria-live="polite">
        {!va.complete && <><p className="bt-hint"><strong>Quote A</strong></p><IssueSummary errors={va.errors} missing={va.missing} idPrefix={`${prefix}-A`} /></>}
        {!vb.complete && <><p className="bt-hint"><strong>Quote B</strong></p><IssueSummary errors={vb.errors} missing={vb.missing} idPrefix={`${prefix}-B`} /></>}
        {any && (
          <div className="bt-results" data-testid="results-quotes">
            <h3>Results</h3>
            <div className="bt-table-wrap" role="region" aria-label="Quote comparison" tabIndex={0}>
              <table className="bt-table">
                <caption className="bt-sr">Dealer quote comparison</caption>
                <thead><tr><th scope="col">Line</th><th scope="col">{label(qa, "A")}</th><th scope="col">{label(qb, "B")}</th></tr></thead>
                <tbody>
                  <tr className="bt-total"><th scope="row">Pre-trade delivered price</th>{resultCell(ra, r => r.preTradeDelivered, "text-quote-A-delivered")}{resultCell(rb, r => r.preTradeDelivered, "text-quote-B-delivered")}</tr>
                  <tr><th scope="row">Trade-in equity (credit minus payoff)</th>{resultCell(ra, r => r.tradeEquity, "text-quote-A-equity")}{resultCell(rb, r => r.tradeEquity, "text-quote-B-equity")}</tr>
                  <tr><th scope="row">Net after trade</th>{resultCell(ra, r => r.netAfterTrade, "text-quote-A-net")}{resultCell(rb, r => r.netAfterTrade, "text-quote-B-net")}</tr>
                  <tr><th scope="row">Less deposit already paid</th>{resultCell(ra, r => -r.deposit, "text-quote-A-deposit")}{resultCell(rb, r => -r.deposit, "text-quote-B-deposit")}</tr>
                  <tr className="bt-total"><th scope="row">Balance due at delivery</th>{resultCell(ra, r => r.balanceDue, "text-quote-A-balance")}{resultCell(rb, r => r.balanceDue, "text-quote-B-balance")}</tr>
                </tbody>
              </table>
            </div>
            {cmp ? (
              <p className="bt-intro" style={{ marginTop: 12 }} data-testid="text-quote-comparison">
                {cmp.lowerPreTrade === "tie"
                  ? "Both quotes have the same pre-trade delivered price."
                  : `${cmp.lowerPreTrade === "A" ? label(qa, "A") : label(qb, "B")} has the lower pre-trade delivered price by ${formatUSD(Math.abs(cmp.preTradeDifference))}.`}
                {" "}Balance due differs by {formatUSD(Math.abs(cmp.balanceDifference))}. Compare sleds on delivered price; balance due also reflects your trade-in and deposit, which are not discounts. Confirm both quotes cover the same configuration.
              </p>
            ) : <p className="bt-hint" style={{ marginTop: 12 }}>Complete both quotes to see a comparison.</p>}
            {[...(ra ? ra.warnings.map(w => `${label(qa, "A")}: ${w}`) : []), ...(rb ? rb.warnings.map(w => `${label(qb, "B")}: ${w}`) : [])]
              .map(w => <p key={w} className="bt-warn">{w}</p>)}
          </div>
        )}
      </div>

      <details className="bt-notes">
        <summary>Formulas, units and exclusions</summary>
        <ul>
          <li>All amounts are US dollars as written on each quote.</li>
          <li>Pre-trade delivered price = base + freight/setup + fees + accessories + tax amount + registration.</li>
          <li>Trade-in equity = trade credit - payoff. Negative equity increases what you owe. Equity is value you bring, not savings on the sled.</li>
          <li>Balance due = pre-trade delivered price - trade-in equity - deposit already paid.</li>
          <li>Tax is the amount you enter. Tax treatment of trade-ins varies by state or province; ask the dealer how they calculated it.</li>
          <li>Not included: financing interest, extended warranties, rebates not written on the quote.</li>
        </ul>
      </details>
    </section>
  );
}
