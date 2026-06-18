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
    if (sortKey !== key) return "";
    return sortDir === "asc" ? "▲" : "▼";
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

  return (
    <div>
      <div className="top-bar">
        ❄️ SnowmobileCompare.net &nbsp;|&nbsp;
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <span style={{ float: "right", fontSize: "11px" }}>Updated: Jan 2025 | All prices approx. MSRP</span>
      </div>

      <div className="container">
        <h1>❄️ 2025 Snowmobile Comparison Guide ❄️</h1>
        <p className="subtitle">
          Compare 23 snowmobiles from Ski-Doo, Polaris, Arctic Cat, and Yamaha. Click a row for details. Check boxes to compare side-by-side.
        </p>

        <div className="controls">
          <div>
            <label>Brand:</label>
            <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
              {brands.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label>Category:</label>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label>Search:</label>
            <input
              type="search"
              placeholder="model, brand, engine..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: "170px" }}
            />
          </div>
          <button onClick={() => { setFilterBrand("All"); setFilterCategory("All"); setSearchText(""); }}>
            Reset
          </button>
          {compareIds.length >= 2 && (
            <button onClick={() => setShowCompare(!showCompare)}>
              {showCompare ? "Hide" : "Compare"} ({compareIds.length})
            </button>
          )}
        </div>

        {compareIds.length > 0 && (
          <div className="compare-bar">
            <strong>Compare:</strong>
            {compareIds.map(id => {
              const s = snowmobiles.find(x => x.id === id)!;
              return (
                <span key={id} style={{ background: "white", padding: "2px 8px", border: "1px solid #ccc" }}>
                  {s.brand} {s.model}&nbsp;
                  <span
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => toggleCompare(id)}
                  >✕</span>
                </span>
              );
            })}
            {compareIds.length >= 2 && (
              <button className="compare-btn" onClick={() => setShowCompare(!showCompare)}>
                {showCompare ? "Hide Comparison" : "Show Comparison Table"}
              </button>
            )}
            <button className="compare-btn" style={{ background: "#cc0000" }} onClick={() => { setCompareIds([]); setShowCompare(false); }}>
              Clear All
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
                    <th key={s.id}>{s.brand}<br />{s.model}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Engine", (s: Snowmobile) => s.engine],
                    ["Displacement (cc)", (s: Snowmobile) => s.displacement + " cc"],
                    ["Horsepower", (s: Snowmobile) => s.horsepower + " hp"],
                    ["Weight (lbs)", (s: Snowmobile) => s.weight + " lbs"],
                    ["Track Length", (s: Snowmobile) => s.trackLength + "\""],
                    ["Price (MSRP)", (s: Snowmobile) => "$" + s.price.toLocaleString()],
                    ["Category", (s: Snowmobile) => s.category],
                  ] as [string, (s: Snowmobile) => string][]
                ).map(([label, fn]) => {
                  let bestIdx = -1;
                  if (label === "Horsepower") {
                    const vals = compareSleds.map(s => s.horsepower);
                    bestIdx = vals.indexOf(Math.max(...vals));
                  }
                  if (label === "Price (MSRP)") {
                    const vals = compareSleds.map(s => s.price);
                    bestIdx = vals.indexOf(Math.min(...vals));
                  }
                  if (label === "Weight (lbs)") {
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
                      <ul style={{ margin: 0, paddingLeft: "16px" }}>
                        {s.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: "11px", color: "#666" }}>★ = best in category among selected sleds</p>
          </div>
        )}

        {selectedSled && (
          <div className="detail-panel">
            <button className="close-btn" onClick={() => setSelectedId(null)}>✕ Close</button>
            <h3>
              <span className={brandClass[selectedSled.brand]}>{selectedSled.brand}</span>{" "}
              {selectedSled.year} {selectedSled.model}
              <span className={`badge ${categoryBadge[selectedSled.category]}`}>{selectedSled.category}</span>
            </h3>
            <strong>Engine:</strong> {selectedSled.engine}
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
            <div style={{ marginTop: "8px" }}>
              <strong>Key Features:</strong>
              <ul className="features-list">
                {selectedSled.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div className="count-info">
          Showing {filtered.length} of {snowmobiles.length} snowmobiles
          {filterBrand !== "All" || filterCategory !== "All" || searchText ? " (filtered)" : ""}
        </div>

        <table>
          <thead>
            <tr>
              <th className="checkbox-col">✓</th>
              <th onClick={() => handleSort("brand")}>Brand <span className="sort-arrow">{arrow("brand")}</span></th>
              <th onClick={() => handleSort("model")}>Model <span className="sort-arrow">{arrow("model")}</span></th>
              <th>Category</th>
              <th>Engine</th>
              <th onClick={() => handleSort("displacement")}>CC <span className="sort-arrow">{arrow("displacement")}</span></th>
              <th onClick={() => handleSort("horsepower")}>HP <span className="sort-arrow">{arrow("horsepower")}</span></th>
              <th onClick={() => handleSort("weight")}>Wt (lbs) <span className="sort-arrow">{arrow("weight")}</span></th>
              <th onClick={() => handleSort("trackLength")}>Track" <span className="sort-arrow">{arrow("trackLength")}</span></th>
              <th onClick={() => handleSort("price")}>MSRP <span className="sort-arrow">{arrow("price")}</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                  No snowmobiles match your filters.
                </td>
              </tr>
            )}
            {filtered.map(sled => (
              <tr
                key={sled.id}
                className={`clickable-row ${selectedId === sled.id ? "selected-row" : ""}`}
                onClick={() => setSelectedId(selectedId === sled.id ? null : sled.id)}
              >
                <td className="checkbox-col" onClick={e => { e.stopPropagation(); toggleCompare(sled.id); }}>
                  <input
                    type="checkbox"
                    checked={compareIds.includes(sled.id)}
                    onChange={() => {}}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td><span className={brandClass[sled.brand]}>{sled.brand}</span></td>
                <td>
                  <strong>{sled.model}</strong>
                  <br />
                  <span style={{ fontSize: "11px", color: "#666" }}>{sled.year}</span>
                </td>
                <td>
                  <span className={`badge ${categoryBadge[sled.category]}`}>{sled.category}</span>
                </td>
                <td style={{ fontSize: "12px" }}>{sled.engine}</td>
                <td>{sled.displacement}</td>
                <td><strong>{sled.horsepower}</strong></td>
                <td>{sled.weight}</td>
                <td>{sled.trackLength}"</td>
                <td><strong>${sled.price.toLocaleString()}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ background: "#fff", border: "1px solid #ccc", padding: "10px 14px", marginTop: "14px", fontSize: "12px" }}>
          <strong>Quick Stats:</strong> &nbsp;
          Most Powerful: <strong>Yamaha Sidewinder SRX LE (200 hp)</strong> &nbsp;|&nbsp;
          Lightest: <strong>Polaris PRO RMK 850 (420 lbs)</strong> &nbsp;|&nbsp;
          Most Affordable: <strong>Yamaha Transporter Lite ($10,400)</strong> &nbsp;|&nbsp;
          Most Expensive: <strong>Yamaha Sidewinder SRX LE ($21,200)</strong>
        </div>

        <div className="footer">
          <p>
            SnowmobileCompare.net — This site is for informational purposes only.<br />
            All specs from manufacturer websites and dealer info. Prices are approximate MSRP and may vary by region.<br />
            Always verify specs with your local dealer before purchasing.
          </p>
          <p>© 2025 SnowmobileCompare.net | Made by a snowmobile enthusiast</p>
        </div>
      </div>
    </div>
  );
}
