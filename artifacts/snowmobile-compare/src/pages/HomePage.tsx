import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { snowmobiles, Snowmobile, Category } from "../data/snowmobiles";
import { guides } from "../data/guides";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

type SortKey = "price" | "horsepower" | "weight" | "displacement" | "trackLength" | "brand" | "model";

const brandClass: Record<string, string> = {
  "Ski-Doo": "brand-skidoo",
  "Polaris": "brand-polaris",
  "Arctic Cat": "brand-arctic",
  "Yamaha": "brand-yamaha",
};

const categoryBadge: Record<Category, string> = {
  "Trail": "badge-trail",
  "Mountain": "badge-mountain",
  "Touring": "badge-touring",
  "Crossover": "badge-crossover",
  "Utility": "badge-utility",
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
  usePageTitle("SledSpec.com — 2026 Snowmobile Specs, Prices & Comparisons");
  const [, navigate] = useLocation();
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(() => {
    let result = [...snowmobiles];
    if (filterBrand !== "All") result = result.filter(s => s.brand === filterBrand);
    if (filterCategory !== "All") result = result.filter(s => s.category === filterCategory);
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
      if (sortKey === "horsepower") return b.horsepower - a.horsepower;
      if (sortKey === "weight") return a.weight - b.weight;
      return (a[sortKey] as number) - (b[sortKey] as number);
    });
    return result;
  }, [filterBrand, filterCategory, searchText, sortKey]);

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

  const totalBrands = new Set(snowmobiles.map(s => s.brand)).size;
  const avgPrice = Math.round(snowmobiles.reduce((a, b) => a + b.price, 0) / snowmobiles.length);
  const maxHp = Math.max(...snowmobiles.map(s => s.horsepower));

  return (
    <Layout>
      <div className="container">
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-value">23</span>
            <span className="stat-label">Models Listed</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{totalBrands}</span>
            <span className="stat-label">Manufacturers</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{maxHp} hp</span>
            <span className="stat-label">Highest Horsepower</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">${avgPrice.toLocaleString()}</span>
            <span className="stat-label">Avg. MSRP</span>
          </div>
        </div>

        <div className="controls">
          <div>
            <label>Brand</label>
            <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
              {brands.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label>Category</label>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label>Search</label>
            <input
              type="search"
              placeholder="model, brand, engine..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: "180px" }}
            />
          </div>
          <button className="btn btn-secondary" onClick={() => { setFilterBrand("All"); setFilterCategory("All"); setSearchText(""); }}>
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
                  {s.brand} {s.model}
                  <span className="remove" onClick={e => toggleCompare(id, e as React.MouseEvent)}>✕</span>
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
                      {s.model}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Engine", (s: Snowmobile) => s.engine],
                    ["Displacement", (s: Snowmobile) => s.displacement + " cc"],
                    ["Horsepower", (s: Snowmobile) => s.horsepower + " hp"],
                    ["Weight", (s: Snowmobile) => s.weight + " lbs"],
                    ["Track Length", (s: Snowmobile) => s.trackLength + '"'],
                    ["Price (MSRP)", (s: Snowmobile) => "$" + s.price.toLocaleString()],
                    ["Category", (s: Snowmobile) => s.category],
                  ] as [string, (s: Snowmobile) => string][]
                ).map(([label, fn]) => {
                  let bestIdx = -1;
                  if (label === "Horsepower") {
                    const vals = compareSleds.map(s => s.horsepower);
                    bestIdx = vals.indexOf(Math.max(...vals));
                  } else if (label === "Price (MSRP)") {
                    const vals = compareSleds.map(s => s.price);
                    bestIdx = vals.indexOf(Math.min(...vals));
                  } else if (label === "Weight") {
                    const vals = compareSleds.map(s => s.weight);
                    bestIdx = vals.indexOf(Math.min(...vals));
                  }
                  return (
                    <tr key={label}>
                      <td className="row-label">{label}</td>
                      {compareSleds.map((s, i) => (
                        <td key={s.id} className={i === bestIdx ? "best-value" : ""}>
                          {fn(s)}{i === bestIdx && " ★"}
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
              </tbody>
            </table>
            <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>★ = best in category among selected sleds</p>
          </div>
        )}

        <div className="sled-section-header">
          <div>
            <span className="sled-section-count">
              Showing <strong>{filtered.length}</strong> of {snowmobiles.length} snowmobiles
              {(filterBrand !== "All" || filterCategory !== "All" || searchText) && " (filtered)"}
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
                onClick={() => navigate(`/sled/${sled.id}`)}
                style={{ cursor: "pointer" }}
              >
                {sled.image ? (
                  <img
                    className="sled-card__photo"
                    src={sled.image}
                    alt={`${sled.year} ${sled.brand} ${sled.model}`}
                  />
                ) : (
                  <div className="sled-card__photo-placeholder">No photo</div>
                )}

                <div className="sled-card__body">
                  <div className="sled-card__title-row">
                    <h2 className="sled-card__name">
                      <span className={brandClass[sled.brand]}>{sled.brand}</span> {sled.model}
                    </h2>
                    <label className="sled-card__compare" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={compareIds.includes(sled.id)}
                        onChange={e => toggleCompare(sled.id, e)}
                      />
                      Compare
                    </label>
                  </div>

                  <p className="sled-card__engine">{sled.engine}</p>
                  <p className="sled-card__tagline">{sled.tagline}</p>

                  <p className="sled-card__stats">
                    {sled.horsepower} hp &nbsp;·&nbsp; {sled.weight} lbs &nbsp;·&nbsp; {sled.trackLength}" track
                  </p>

                  <div className="sled-card__footer">
                    <span className="sled-card__price">${sled.price.toLocaleString()}</span>
                    <span className="sled-card__link">View specs →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="quick-stats">
          <span>Quick Stats:</span>
          <span>Most Powerful: <strong>Yamaha Sidewinder SRX LE — 200 hp</strong></span>
          <span>Lightest: <strong>Polaris PRO RMK 850 — 420 lbs</strong></span>
          <span>Most Affordable: <strong>Yamaha Transporter Lite — $10,400</strong></span>
          <span>Most Expensive: <strong>Yamaha Sidewinder SRX LE — $21,200</strong></span>
        </div>

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
            SledSpec is a free snowmobile comparison tool built by a rider, for riders. We put together specs,
            pricing, and side-by-side comparisons so you can cut through the manufacturer noise and figure out
            which sled actually fits your riding style and budget. All specs come from manufacturer websites
            and dealer sheets — always double-check with your local dealer before buying.
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
