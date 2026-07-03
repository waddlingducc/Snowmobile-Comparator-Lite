import { useParams, Link } from "wouter";
import { snowmobiles } from "../data/snowmobiles";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

const brandClass: Record<string, string> = {
  "Ski-Doo": "brand-skidoo",
  "Polaris": "brand-polaris",
  "Arctic Cat": "brand-arctic",
  "Yamaha": "brand-yamaha",
};

function costTier(price: number) {
  if (price >= 19000) return "$$$";
  if (price >= 15000) return "$$";
  return "$";
}

export default function SledDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sled = snowmobiles.find(s => s.id === Number(id));

  usePageTitle(
    sled
      ? `${sled.year} ${sled.brand} ${sled.model} Specs & Price | SledSpec.com`
      : "Sled Not Found | SledSpec.com"
  );

  if (!sled) {
    return (
      <Layout>
        <div className="container" style={{ padding: "60px 0", textAlign: "center" }}>
          <h2>Sled not found</h2>
          <Link href="/">← Back to all sleds</Link>
        </div>
      </Layout>
    );
  }

  const others = snowmobiles
    .filter(s => s.id !== sled.id && (s.brand === sled.brand || s.category === sled.category))
    .slice(0, 4);

  return (
    <Layout>
      <div className="container">
        <Link href="/" className="listing-back">← Back to listings</Link>

        <div className="listing-main">
          <div className="listing-photo-box">
            {sled.image && (
              <img
                src={sled.image}
                alt={`${sled.year} ${sled.brand} ${sled.model}`}
                className="listing-photo"
              />
            )}
          </div>

          <div className="listing-side">
            <div className="listing-card">
              <h1 className="listing-title">
                <span className={brandClass[sled.brand]}>{sled.brand}</span> {sled.model}
              </h1>
              <span className="listing-verified">✓ Verified specs</span>
              <p className="listing-price">${sled.price.toLocaleString()}</p>
              <div className="listing-badges">
                <span className="listing-badge">{sled.category}</span>
                <span className="listing-badge">{sled.year}</span>
                <span className="listing-badge">{sled.horsepower} HP</span>
                <span className="listing-badge">COST {costTier(sled.price)}</span>
              </div>
            </div>

            <a
              href={sled.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="listing-visit"
            >
              View on {sled.brand}'s official site
            </a>
          </div>
        </div>

        <div className="listing-box">
          <h2 className="listing-box-heading">Description</h2>
          <p className="listing-overview">
            <strong>Quick overview:</strong> {sled.description}
          </p>

          <h3 className="listing-sub-heading">Highlights</h3>
          <ul className="listing-highlights">
            {sled.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>

        <div className="listing-box">
          <h2 className="listing-box-heading">Specifications</h2>
          <table className="listing-specs">
            <tbody>
              <tr><td>Engine</td><td>{sled.engine}</td></tr>
              <tr><td>Displacement</td><td>{sled.displacement} cc</td></tr>
              <tr><td>Horsepower</td><td>{sled.horsepower} hp</td></tr>
              <tr><td>Weight</td><td>{sled.weight} lbs</td></tr>
              <tr><td>Track length</td><td>{sled.trackLength}"</td></tr>
              <tr><td>Category</td><td>{sled.category}</td></tr>
              <tr><td>Model year</td><td>{sled.year}</td></tr>
            </tbody>
          </table>
        </div>

        {others.length > 0 && (
          <div className="listing-box">
            <h2 className="listing-box-heading">Also worth a look</h2>
            <div className="sdp__related-list">
              {others.map(s => (
                <Link key={s.id} href={`/sled/${s.id}`} className="sdp__related-item">
                  {s.image && <img src={s.image} alt={`${s.brand} ${s.model}`} className="sdp__related-photo" />}
                  <span className="sdp__related-name">
                    <span className={brandClass[s.brand]}>{s.brand}</span> {s.model}
                  </span>
                  <span className="sdp__related-price">${s.price.toLocaleString()}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
