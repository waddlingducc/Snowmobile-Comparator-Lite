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

const categoryBadge: Record<string, string> = {
  "Trail": "badge-trail",
  "Mountain": "badge-mountain",
  "Touring": "badge-touring",
  "Crossover": "badge-crossover",
  "Utility": "badge-utility",
};

export default function SledDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sled = snowmobiles.find(s => s.id === Number(id));

  usePageTitle(
    sled
      ? `${sled.year} ${sled.brand} ${sled.model} — Specs & Review | SledSpec.com`
      : "Sled Not Found | SledSpec.com"
  );

  if (!sled) {
    return (
      <Layout>
        <div className="container" style={{ padding: "60px 0", textAlign: "center" }}>
          <h2>Sled not found</h2>
          <Link href="/" className="btn btn-primary" style={{ marginTop: "16px", display: "inline-block" }}>
            ← Back to all sleds
          </Link>
        </div>
      </Layout>
    );
  }

  const others = snowmobiles
    .filter(s => s.id !== sled.id && (s.brand === sled.brand || s.category === sled.category))
    .slice(0, 3);

  return (
    <Layout>
      <div className="container">
        <div style={{ marginBottom: "18px" }}>
          <Link href="/" style={{ fontSize: "13px", color: "#64748b", textDecoration: "none" }}>
            ← All snowmobiles
          </Link>
        </div>

        <div className="detail-page">
          <div className="detail-page__header">
            <div className="detail-page__title-row">
              <span className={`badge ${categoryBadge[sled.category]}`}>{sled.category}</span>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>{sled.year}</span>
            </div>
            <h1 className="detail-page__name">
              <span className={brandClass[sled.brand]}>{sled.brand}</span> {sled.model}
            </h1>
            <p className="detail-page__engine">{sled.engine}</p>
          </div>

          <div className="detail-page__body">
            <div className="detail-page__photo-col">
              {sled.image ? (
                <img
                  src={sled.image}
                  alt={`${sled.year} ${sled.brand} ${sled.model}`}
                  className="detail-page__photo"
                />
              ) : (
                <div className="detail-page__photo-placeholder">No photo available</div>
              )}

              <div className="detail-page__price-box">
                <span style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  MSRP (approx.)
                </span>
                <span className="detail-page__price">${sled.price.toLocaleString()}</span>
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                  Prices vary by dealer and region. Verify with your local dealer.
                </span>
              </div>
            </div>

            <div className="detail-page__content-col">
              <section>
                <h2 className="detail-page__section-heading">Overview</h2>
                <p className="detail-page__description">{sled.description}</p>
              </section>

              <section>
                <h2 className="detail-page__section-heading">Specifications</h2>
                <div className="detail-page__spec-grid">
                  <div className="detail-page__spec-item">
                    <span className="detail-page__spec-label">Engine</span>
                    <span className="detail-page__spec-value">{sled.engine}</span>
                  </div>
                  <div className="detail-page__spec-item">
                    <span className="detail-page__spec-label">Displacement</span>
                    <span className="detail-page__spec-value">{sled.displacement} cc</span>
                  </div>
                  <div className="detail-page__spec-item">
                    <span className="detail-page__spec-label">Horsepower</span>
                    <span className="detail-page__spec-value">{sled.horsepower} hp</span>
                  </div>
                  <div className="detail-page__spec-item">
                    <span className="detail-page__spec-label">Weight</span>
                    <span className="detail-page__spec-value">{sled.weight} lbs</span>
                  </div>
                  <div className="detail-page__spec-item">
                    <span className="detail-page__spec-label">Track Length</span>
                    <span className="detail-page__spec-value">{sled.trackLength}"</span>
                  </div>
                  <div className="detail-page__spec-item">
                    <span className="detail-page__spec-label">Category</span>
                    <span className="detail-page__spec-value">{sled.category}</span>
                  </div>
                  <div className="detail-page__spec-item">
                    <span className="detail-page__spec-label">Model Year</span>
                    <span className="detail-page__spec-value">{sled.year}</span>
                  </div>
                  <div className="detail-page__spec-item">
                    <span className="detail-page__spec-label">Brand</span>
                    <span className="detail-page__spec-value">{sled.brand}</span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="detail-page__section-heading">Key Features</h2>
                <ul className="detail-page__features">
                  {sled.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {others.length > 0 && (
            <section className="detail-page__related">
              <h2 className="detail-page__section-heading">Related Sleds</h2>
              <div className="detail-page__related-grid">
                {others.map(s => (
                  <Link key={s.id} href={`/sled/${s.id}`} className="detail-page__related-card">
                    {s.image && (
                      <img
                        src={s.image}
                        alt={`${s.year} ${s.brand} ${s.model}`}
                        className="detail-page__related-photo"
                      />
                    )}
                    <div className="detail-page__related-info">
                      <span className={`badge ${categoryBadge[s.category]}`} style={{ fontSize: "10px", padding: "2px 6px" }}>
                        {s.category}
                      </span>
                      <span className="detail-page__related-name">
                        <span className={brandClass[s.brand]}>{s.brand}</span> {s.model}
                      </span>
                      <span className="detail-page__related-price">${s.price.toLocaleString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div style={{ marginTop: "32px" }}>
            <Link href="/" className="btn btn-secondary">← Back to all snowmobiles</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
