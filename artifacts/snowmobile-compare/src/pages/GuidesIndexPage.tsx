import { Link } from "wouter";
import { guides, researchedDate, researchedDateLabel } from "../data/guides";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";
import "./guide-content.css";

export default function GuidesIndexPage() {
  usePageTitle("Snowmobile Guides & Articles | SledSpec.com");
  const featured = guides.slice(0, 3);

  return (
    <Layout>
      <div className="container">
        <div className="page-hero">
          <h1 className="page-hero__title">Snowmobile Decision Guides</h1>
          <p className="page-hero__sub">
            Seven practical guides with decision worksheets, explicit example assumptions, and links to manufacturer manuals and public safety resources.
          </p>
          <p className="guide-methodology">Researched <time dateTime={researchedDate}>{researchedDateLabel}</time> using AI-assisted desk research. No hands-on testing or riding expertise is claimed. <Link href="/about" data-testid="link-index-methodology">Read our methodology and limits</Link>.</p>
        </div>

        <h2 className="section-label">Start with your decision</h2>
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

        <h2 className="section-label" style={{ marginTop: "36px" }}>All seven guides</h2>
        <div className="guide-table-wrap" role="region" aria-label="All guides" tabIndex={0}>
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
                <td style={{ fontWeight: 600 }}>{guide.title}</td>
                <td style={{ color: "#475569", fontSize: "13px" }}>{guide.summary}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link href={`/guides/${guide.id}`} className="read-link">Read &rarr;</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <div className="guides-quick-links">
          <h2 className="section-label">Quick Links</h2>
          <ul>
            <li><Link href="/">Explore the comparison catalogue</Link></li>
            <li><Link href="/">Browse specs and pricing</Link></li>
            <li><Link href="/contact">Contact us</Link></li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
