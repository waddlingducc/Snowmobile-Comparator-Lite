import { Link } from "wouter";
import { guides } from "../data/guides";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function GuidesIndexPage() {
  usePageTitle("Snowmobile Guides & Articles | SledSpec.com");
  const featured = guides.slice(0, 3);

  return (
    <Layout>
      <div className="container">
        <div className="page-hero">
          <h2 className="page-hero__title">Snowmobile Guides &amp; Articles</h2>
          <p className="page-hero__sub">
            In-depth guides to help you choose, buy, and ride the right snowmobile.
            Written by riders, for riders.
          </p>
        </div>

        <h3 className="section-label">Featured</h3>
        <div className="guide-cards-grid">
          {featured.map(guide => (
            <Link key={guide.id} href={`/guides/${guide.id}`} className="guide-preview-card">
              <div className="guide-preview-card__body">
                <span className="guide-preview-card__title">{guide.title}</span>
                <span className="guide-preview-card__summary">{guide.summary}</span>
              </div>
              <div className="guide-preview-card__footer">
                <span className="guide-card__read-time">{guide.readTime}</span>
                <span className="guide-preview-card__cta">Read &rarr;</span>
              </div>
            </Link>
          ))}
        </div>

        <h3 className="section-label" style={{ marginTop: "36px" }}>All Guides</h3>
        <table className="guides-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Summary</th>
              <th>Read</th>
            </tr>
          </thead>
          <tbody>
            {guides.map(guide => (
              <tr key={guide.id}>
                <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{guide.title}</td>
                <td style={{ color: "#475569", fontSize: "13px" }}>{guide.summary}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link href={`/guides/${guide.id}`} className="read-link">Read &rarr;</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="guides-quick-links">
          <h3 className="section-label">Quick Links</h3>
          <ul>
            <li><Link href="/">Compare all 23 snowmobiles</Link></li>
            <li><Link href="/">Browse specs and pricing</Link></li>
            <li><Link href="/contact">Contact us</Link></li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
