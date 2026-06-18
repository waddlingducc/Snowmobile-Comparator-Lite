import { useState, useMemo } from "react";
import { snowmobiles, Snowmobile, Category } from "./data/snowmobiles";
import "./index.css";

type SortKey = keyof Pick<Snowmobile, "brand" | "model" | "horsepower" | "weight" | "price" | "displacement" | "trackLength">;

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

export default function App() {
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const arrow = (key: SortKey) => {
    if (sortKey !== key) return <span className="sort-arrow">↕</span>;
    return <span className="sort-arrow">{sortDir === "asc" ? "▲" : "▼"}</span>;
  };

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
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return result;
  }, [filterBrand, filterCategory, searchText, sortKey, sortDir]);

  const selectedSled = selectedId !== null ? snowmobiles.find(s => s.id === selectedId) : null;

  const toggleCompare = (id: number) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 4) {
        alert("You can only compare up to 4 snowmobiles at once!");
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
    <div>
      <header className="site-header">
        <div className="header-inner">
          <div className="header-title">
            <h1><span className="domain-tld">SledSpec</span><span className="domain-dot">.com</span></h1>
            <p>23 models from {totalBrands} major manufacturers — specs, pricing, and side-by-side comparisons</p>
          </div>
          <nav className="header-nav">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </div>
      </header>

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
          <span style={{ marginLeft: "auto", fontSize: "12px", color: "#94a3b8" }}>
            Click column headers to sort • Check boxes to compare
          </span>
        </div>

        {compareIds.length > 0 && (
          <div className="compare-bar">
            <strong>Comparing:</strong>
            {compareIds.map(id => {
              const s = snowmobiles.find(x => x.id === id)!;
              return (
                <span key={id} className="compare-tag">
                  {s.brand} {s.model}
                  <span className="remove" onClick={() => toggleCompare(id)}>✕</span>
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

        {selectedSled && (
          <div className="detail-panel">
            <div className="detail-header">
              <h3>
                <span className={brandClass[selectedSled.brand]}>{selectedSled.brand}</span>{" "}
                {selectedSled.year} {selectedSled.model}
              </h3>
              <span className={`badge ${categoryBadge[selectedSled.category]}`}>{selectedSled.category}</span>
              <button className="close-btn" onClick={() => setSelectedId(null)}>✕ Close</button>
            </div>
            <div style={{ display: "flex", gap: "16px", marginBottom: "14px", alignItems: "flex-start" }}>
              {selectedSled.image && (
                <img
                  src={selectedSled.image}
                  alt={`${selectedSled.brand} ${selectedSled.model}`}
                  style={{ height: "160px", width: "260px", objectFit: "contain", flexShrink: 0, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "3px", padding: "4px" }}
                />
              )}
              <p style={{ margin: "0", fontSize: "13px", color: "#475569", alignSelf: "center" }}>
                <strong>Engine:</strong> {selectedSled.engine}
              </p>
            </div>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Displacement</span>
                <span className="value">{selectedSled.displacement} cc</span>
              </div>
              <div className="detail-item">
                <span className="label">Horsepower</span>
                <span className="value">{selectedSled.horsepower} hp</span>
              </div>
              <div className="detail-item">
                <span className="label">Weight</span>
                <span className="value">{selectedSled.weight} lbs</span>
              </div>
              <div className="detail-item">
                <span className="label">Track Length</span>
                <span className="value">{selectedSled.trackLength}"</span>
              </div>
              <div className="detail-item">
                <span className="label">MSRP (approx.)</span>
                <span className="value">${selectedSled.price.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Category</span>
                <span className="value">{selectedSled.category}</span>
              </div>
            </div>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: "12px", fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.4px" }}>Key Features</p>
              <ul className="features-list">
                {selectedSled.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div className="count-info">
          Showing {filtered.length} of {snowmobiles.length} snowmobiles
          {(filterBrand !== "All" || filterCategory !== "All" || searchText) && " (filtered)"}
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th className="checkbox-col">✓</th>
                <th style={{ width: "80px" }}>Photo</th>
                <th onClick={() => handleSort("brand")}>Brand {arrow("brand")}</th>
                <th onClick={() => handleSort("model")}>Model {arrow("model")}</th>
                <th>Category</th>
                <th>Engine</th>
                <th onClick={() => handleSort("displacement")}>CC {arrow("displacement")}</th>
                <th onClick={() => handleSort("horsepower")}>HP {arrow("horsepower")}</th>
                <th onClick={() => handleSort("weight")}>Weight {arrow("weight")}</th>
                <th onClick={() => handleSort("trackLength")}>Track {arrow("trackLength")}</th>
                <th onClick={() => handleSort("price")}>MSRP {arrow("price")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>
                    No snowmobiles match your filters.
                  </td>
                </tr>
              )}
              {filtered.map(sled => (
                <tr
                  key={sled.id}
                  className={selectedId === sled.id ? "selected-row" : ""}
                  onClick={() => setSelectedId(selectedId === sled.id ? null : sled.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td className="checkbox-col" onClick={e => { e.stopPropagation(); toggleCompare(sled.id); }}>
                    <input
                      type="checkbox"
                      checked={compareIds.includes(sled.id)}
                      onChange={() => {}}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ padding: "4px 8px" }}>
                    {sled.image ? (
                      <img
                        src={sled.image}
                        alt={sled.model}
                        style={{ width: "76px", height: "48px", objectFit: "contain", display: "block", background: "#f8fafc" }}
                      />
                    ) : (
                      <div style={{ width: "76px", height: "48px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#94a3b8" }}>
                        No photo
                      </div>
                    )}
                  </td>
                  <td><span className={brandClass[sled.brand]}>{sled.brand}</span></td>
                  <td>
                    <span className="model-name">{sled.model}</span>
                    <span className="model-year"> '{String(sled.year).slice(2)}</span>
                  </td>
                  <td>
                    <span className={`badge ${categoryBadge[sled.category]}`}>{sled.category}</span>
                  </td>
                  <td style={{ fontSize: "12px", color: "#475569" }}>{sled.engine}</td>
                  <td>{sled.displacement}</td>
                  <td><strong>{sled.horsepower}</strong></td>
                  <td>{sled.weight} lbs</td>
                  <td>{sled.trackLength}"</td>
                  <td><strong>${sled.price.toLocaleString()}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="quick-stats">
          <span>Quick Stats:</span>
          <span>Most Powerful: <strong>Yamaha Sidewinder SRX LE — 200 hp</strong></span>
          <span>Lightest: <strong>Polaris PRO RMK 850 — 420 lbs</strong></span>
          <span>Most Affordable: <strong>Yamaha Transporter Lite — $10,400</strong></span>
          <span>Most Expensive: <strong>Yamaha Sidewinder SRX LE — $21,200</strong></span>
        </div>

        <footer className="footer">
          <p>Prices are approximate MSRP and may vary by region and dealer. Always verify specs before purchasing.</p>
          <p style={{ marginTop: "4px" }}>© 2026 SledSpec.com — Made by a snowmobile enthusiast</p>
        </footer>
      </div>
    </div>
  );
}
