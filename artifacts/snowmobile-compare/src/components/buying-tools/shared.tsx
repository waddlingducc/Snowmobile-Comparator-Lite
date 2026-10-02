import type { FieldError } from "../../lib/buyingCalculations";
import { parseNumberInput } from "../../lib/buyingCalculations";
import type { FieldRule } from "../../lib/buyingCalculations";

type NumberFieldProps = {
  id: string;
  rule: FieldRule;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  hint?: string;
  showMissing?: boolean;
};

export function NumberField({ id, rule, value, onChange, unit, hint, showMissing }: NumberFieldProps) {
  const parsed = parseNumberInput(value, rule);
  const error = !parsed.ok && (parsed.kind === "invalid" || showMissing) ? parsed.message : null;
  const hintId = `${id}-hint`;
  const errId = `${id}-error`;
  return (
    <div className={`bt-field${error ? " bt-field--error" : ""}`}>
      <label htmlFor={id}>{rule.label}</label>
      <div className="bt-input-wrap">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hint ? hintId : "", error ? errId : ""].filter(Boolean).join(" ") || undefined}
          data-testid={`input-${id}`}
        />
        <span className="bt-unit" aria-hidden="true">{unit}</span>
      </div>
      {hint && <p id={hintId} className="bt-hint">{hint}</p>}
      {error && <p id={errId} className="bt-error" role="alert">{error}</p>}
    </div>
  );
}

export function IssueSummary({ errors, missing, idPrefix }: { errors: FieldError[]; missing: FieldError[]; idPrefix: string }) {
  if (errors.length === 0 && missing.length === 0) return null;
  return (
    <div className="bt-issues" data-testid={`status-${idPrefix}-incomplete`}>
      <p><strong>Results are hidden until every field is valid.</strong> Enter 0 for anything that does not apply.</p>
      {errors.length > 0 && (
        <ul>
          {errors.map(e => <li key={e.key}><a href={`#${idPrefix}-${e.key}`}>{e.label}</a>: {e.message}</li>)}
        </ul>
      )}
      {missing.length > 0 && <p className="bt-hint">{missing.length} field{missing.length === 1 ? "" : "s"} still blank.</p>}
    </div>
  );
}

export function downloadFile(filename: string, content: string, mime: string) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function printPage() {
  if (typeof window !== "undefined") window.print();
}
