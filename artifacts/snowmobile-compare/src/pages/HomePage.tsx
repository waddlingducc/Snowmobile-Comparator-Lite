import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { snowmobiles, Snowmobile, Category } from "../data/snowmobiles";
import { guides } from "../data/guides";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";
import { specNumber, specPrice } from "../lib/specFormat";
import { modelResearch, type SpecField } from "../data/model-research";

const fieldNotes: Record<string, SpecField> = {
  "Model year": "year", Displacement: "displacement", Horsepower: "horsepower",
  "Weight (see source basis)": "weight", "Track Length": "trackLength",
  "Published price (USD; see notes)": "price",
};

type SortKey = "price" | "horsepower" | "weight" | "displacement" | "trackLength" | "brand" | "model";

const brandClass: Record<string, string> = {
  "Ski-Doo": "brand-skidoo",
  "Polaris": "brand-polaris",
  "Arctic Cat": "brand-arctic",
  "Yamaha": "brand-yamaha",
};

const sortLabels: Record<SortKey, string> = {
  price: "Price: Low to High",
  horsepower: "Horsepower: High to Low",
  weight: "Weight: Light to Heavy",
  displacement: "Displacement (CC)",
  trackLength: "Track Length",
  brand: "Brand (A–Z)",
  model: "Model (A–Z)",
};

export default function HomePage() {
  usePageTitle("Snowmobile Comparisons & Buying Guides | SledSpec.com");
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    setSearchText(new URLSearchParams(window.location.search).get("q") ?? "");
  }, []);

  const filtered = useMemo(() => {
    let result = [...snowmobiles];
    if (filterBrand !== "All") result = result.filter(s => s.brand === filterBrand);
    if (filterCategory !== "All") result = result.filter(s => s.category === filterCategory);
    if (filterYear !== "All") result = result.filter(s => String(s.year ?? "Unconfirmed") === filterYear);
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter(s =>
        s.model.toLowerCase().includes(q) ||
        s.brand.toLowerCase().includes(q) ||
        s.engine.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      if (sortKey === "brand") return a.brand.localeCompare(b.brand);
      if (sortKey === "model") return a.model.localeCompare(b.model);
      const av = a[sortKey], bv = b[sortKey];
      if (av == null) return bv == null ? a.id - b.id : 1;
      if (bv == null) return -1;
      return sortKey === "horsepower" ? bv - av : av - bv;
    });
    return result;
  }, [filterBrand, filterCategory, filterYear, searchText, sortKey]);

  const toggleCompare = (id: number, e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation();
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 4) {
        alert("You can compare up to 4 snowmobiles at once.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const compareSleds = snowmobiles.filter(s => compareIds.includes(s.id));
  const brands = ["All", ...Array.from(new Set(snowmobiles.map(s => s.brand)))];
  const categories: (Category | "All")[] = ["All", "Trail", "Mountain", "Crossover", "Touring", "Utility"];

  const totalModels = snowmobiles.length;
  const totalBrands = new Set(snowmobiles.map(s => s.brand)).size;
  const years = [...new Set(snowmobiles.map(s => String(s.year ?? "Unconfirmed")))].sort().reverse();

  return (
    <Layout>
      <div className="container">
        <section className="comparison-intro">
          <p className="eyebrow">Research before the ride</p>
          <h1>Find the right kind of snowmobile.</h1>
          <p>Compare selected models, understand what the specifications leave out, and build a shortlist around your terrain—not just horsepower.</p>
          <div className="intro-links">
            <Link href="/guides/how-to-choose">Start with the buying worksheet →</Link>
            <a href="/guides/how-to-choose#buying-tools">Plan costs & compare dealer quotes →</a>
            <Link href="/about">How our research works →</Link>
          </div>
        </section>
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-value">{totalModels}</span>
            <span className="stat-label">Models Compared</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{totalBrands}</span>
            <span className="stat-label">Brands</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{guides.length}</span>
            <span className="stat-label">Practical buying & ownership guides</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">Year-specific</span>
            <span className="stat-label">Current & archive research</span>
          </div>
        </div>
        <p className="research-notice"><strong>Compare like with like.</strong> This is a selected, multi-year research catalog—not a complete current lineup or a dealer inventory. “Not confirmed” means we could not substantiate the exact specification; it does not mean zero. Read each model’s source notes before relying on a number.</p>

        <div className="controls">
          <div>
            <label htmlFor="brand-filter">Brand</label>
            <select id="brand-filter" value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
              {brands.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="category-filter">Category</label>
            <select id="category-filter" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="year-filter">Model year</label>
            <select id="year-filter" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
              <option>All</option>
              {years.map(year => <option key={year}>{year}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="model-search">Search</label>
            <input
              id="model-search"
              type="search"
              placeholder="model, brand, engine..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: "180px" }}
            />
          </div>
          <button className="btn btn-secondary" onClick={() => { setFilterBrand("All"); setFilterCategory("All"); setFilterYear("All"); setSearchText(""); }}>
            Reset
          </button>
          {compareIds.length >= 2 && (
            <button className="btn btn-primary" onClick={() => setShowCompare(!showCompare)}>
              {showCompare ? "Hide" : "Compare"} ({compareIds.length})
            </button>
          )}
        </div>

        {compareIds.length > 0 && (
          <div className="compare-bar">
            <strong>Comparing:</strong>
            {compareIds.map(id => {
              const s = snowmobiles.find(x => x.id === id)!;
              return (
                <span key={id} className="compare-tag">
                      {s.year} {s.brand} {s.model}
                  <button type="button" className="remove" aria-label={`Remove ${s.model} from comparison`} onClick={e => toggleCompare(id, e)}>×</button>
                </span>
              );
            })}
            {compareIds.length >= 2 && (
              <button className="btn btn-primary" onClick={() => setShowCompare(!showCompare)}>
                {showCompare ? "Hide Table" : "Compare Side-by-Side"}
              </button>
            )}
            <button className="btn btn-danger" onClick={() => { setCompareIds([]); setShowCompare(false); }}>
              Clear
            </button>
          </div>
        )}

        {showCompare && compareSleds.length >= 2 && (
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="row-label">Spec</th>
                  {compareSleds.map(s => (
                    <th key={s.id}>
                      <span className={brandClass[s.brand]}>{s.brand}</span><br />
                      <Link href={`/sled/${s.id}`}>{s.year} {s.model}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="row-label">Exact configuration</th>
                  {compareSleds.map(s => <td key={s.id}>{modelResearch[s.id].configuration}</td>)}
                </tr>
                {(
                  [
                    ["Engine", (s: Snowmobile) => s.engine],
                      ["Model year", (s: Snowmobile) => String(s.year ?? "Not confirmed")],
                      ["Displacement", (s: Snowmobile) => specNumber(s.displacement, " cc")],
                      ["Horsepower", (s: Snowmobile) => specNumber(s.horsepower, " hp")],
                      ["Weight (see source basis)", (s: Snowmobile) => specNumber(s.weight, " lb")],
                      ["Track Length", (s: Snowmobile) => specNumber(s.trackLength, '"')],
                      ["Published price (USD; see notes)", (s: Snowmobile) => specPrice(s.price)],
                    ["Category", (s: Snowmobile) => s.category],
                  ] as [string, (s: Snowmobile) => string][]
                ).map(([label, fn]) => {
                  return (
                    <tr key={label}>
                      <td className="row-label">{label}</td>
                      {compareSleds.map(s => (
                        <td key={s.id}>
                          {fn(s)}
                          {fieldNotes[label] && <span className="compare-source-note">{modelResearch[s.id].specNotes[fieldNotes[label]]}</span>}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td className="row-label">Features</td>
                  {compareSleds.map(s => (
                    <td key={s.id}>
                      <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#475569" }}>
                        {s.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="row-label">Evidence & buying questions</th>
                  {compareSleds.map(s => <td key={s.id}>
                    <p>{modelResearch[s.id].fit[0]}</p>
                    <p><strong>Check:</strong> {modelResearch[s.id].buyingQuestions[0]}</p>
                    <a href={modelResearch[s.id].sources[0].url} target="_blank" rel="noopener noreferrer">{modelResearch[s.id].sources[0].label}</a>
                    <p><a href={`/sled/${s.id}#source-notes`}>All sources & limitations</a></p>
                  </td>)}
                </tr>
              </tbody>
            </table>
            <p className="comparison-note">Numbers are not scores. Different model years, packages and weight definitions may not be directly comparable. Unknown values sort last, never as zero. Open the model pages for configuration and source details.</p>
          </div>
        )}

        <div className="sled-section-header">
          <div>
            <span className="sled-section-count">
              Showing <strong>{filtered.length}</strong> of {snowmobiles.length} snowmobiles
              {(filterBrand !== "All" || filterCategory !== "All" || filterYear !== "All" || searchText) && " (filtered)"}
            </span>
            <span style={{ fontSize: "12px", color: "#94a3b8", marginLeft: "12px" }}>
              Check to compare • Click for full details
            </span>
          </div>
          <div className="sled-sort-row">
            <label htmlFor="sort-select" style={{ fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.4px" }}>Sort</label>
            <select id="sort-select" value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)}>
              {(Object.keys(sortLabels) as SortKey[]).map(k => (
                <option key={k} value={k}>{sortLabels[k]}</option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8", background: "white", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
            No snowmobiles match your filters.
          </div>
        ) : (
          <div className="sled-grid">
            {filtered.map(sled => (
              <div
                key={sled.id}
                className={["sled-card", compareIds.includes(sled.id) ? "sled-card--comparing" : ""].filter(Boolean).join(" ")}
              >
                {sled.image ? (
                  <img
                    className="sled-card__photo"
                    src={sled.image}
                    alt={`${sled.year} ${sled.brand} ${sled.model}`}
                      loading="lazy"
                      width={600}
                      height={400}
                  />
                ) : (
                  <div className="sled-card__photo-placeholder">No photo</div>
                )}

                <div className="sled-card__body">
                  <div className="sled-card__title-row">
                    <h2 className="sled-card__name">
                      <Link href={`/sled/${sled.id}`}><span className={brandClass[sled.brand]}>{sled.brand}</span> {sled.model}</Link>
                    </h2>
                    <label className="sled-card__compare" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        aria-label={`Compare ${sled.year} ${sled.brand} ${sled.model}`}
                        checked={compareIds.includes(sled.id)}
                        onChange={e => toggleCompare(sled.id, e)}
                      />
                      Compare
                    </label>
                  </div>

                  <p className="sled-card__engine">{sled.year ?? "Year unconfirmed"} · {sled.category} · {sled.engine}</p>
                  <p className="sled-card__tagline">{sled.tagline}</p>

                  <p className="sled-card__stats">
                    {specNumber(sled.horsepower, " hp")} &nbsp;·&nbsp; Track: {specNumber(sled.trackLength, '"')}
                  </p>

                  <div className="sled-card__footer">
                    <span className="sled-card__price">{specPrice(sled.price)}</span>
                    <Link href={`/sled/${sled.id}`} className="sled-card__link">Research & specs →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="guides-teaser-section">
          <h2 className="guides-heading">Snowmobile Guides &amp; Articles</h2>
          <p className="guides-subheading">In-depth guides to help you ride smarter, buy better, and stay safe.</p>
          <div className="guides-teaser-grid">
            {guides.map(guide => (
              <Link key={guide.id} href={`/guides/${guide.id}`} className="guide-teaser-card">
                <span className="guide-teaser-card__title">{guide.title}</span>
                <span className="guide-teaser-card__summary">{guide.summary}</span>
                <span className="guide-teaser-card__footer">
                  <span className="guide-card__read-time">{guide.readTime}</span>
                  <span className="guide-teaser-card__cta">Read &rarr;</span>
                </span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link href="/guides" className="btn btn-secondary">View All Guides &rarr;</Link>
          </div>
        </div>

        <div id="about" className="about-section">
          <h3>About SledSpec.com</h3>
          <p>
            SledSpec is a free research-based comparison resource. It brings selected model specifications,
            configuration caveats and buying questions together to help you prepare for a dealer conversation.
            These are desk-researched comparisons, not hands-on ride tests. <Link href="/about">Read our editorial methodology and limitations.</Link>
          </p>
          <p>
            Have a correction or want a model added? <Link href="/contact">Contact us</Link> or email{" "}
            <a href="mailto:info@sledspec.com">info@sledspec.com</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
