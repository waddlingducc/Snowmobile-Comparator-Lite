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
        <p className="sdp-back"><Link href="/">← All snowmobiles</Link></p>

        <div className="sdp">
          <div className="sdp__left">
            {sled.image && (
              <img
                src={sled.image}
                alt={`${sled.year} ${sled.brand} ${sled.model}`}
                className="sdp__photo"
              />
            )}
            <p className="sdp__price">${sled.price.toLocaleString()}</p>
            <p className="sdp__price-note">Approx. MSRP — confirm with your dealer</p>
          </div>

          <div className="sdp__right">
            <p className="sdp__category">{sled.category} · {sled.year}</p>
            <h1 className="sdp__name">
              <span className={brandClass[sled.brand]}>{sled.brand}</span> {sled.model}
            </h1>
            <p className="sdp__engine">{sled.engine}</p>

            <p className="sdp__description">{sled.description}</p>

            <p className="sdp__official-link">
              <a href={sled.officialUrl} target="_blank" rel="noopener noreferrer">
                View on {sled.brand}'s official site
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </p>

            <h3 className="sdp__specs-heading">Specs</h3>
            <table className="sdp__specs-table">
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

            <h3 className="sdp__specs-heading">Features</h3>
            <ul className="sdp__features">
              {sled.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        </div>

        {others.length > 0 && (
          <div className="sdp__related">
            <h3 className="sdp__related-heading">Also worth a look</h3>
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

        <p style={{ marginTop: "32px" }}>
          <Link href="/">← Back to all snowmobiles</Link>
        </p>
      </div>
    </Layout>
  );
}
