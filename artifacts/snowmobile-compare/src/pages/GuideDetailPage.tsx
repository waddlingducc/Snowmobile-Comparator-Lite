import { Link, useParams } from "wouter";
import { guides } from "../data/guides";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function GuideDetailPage() {
  const { id } = useParams<{ id: string }>();
  const guide = guides.find(g => g.id === id);
  usePageTitle(guide ? `${guide.title} | SledSpec.com` : "Guide | SledSpec.com");

  if (!guide) {
    return (
      <Layout>
        <div className="container">
          <div className="page-hero">
            <h2 className="page-hero__title">Guide Not Found</h2>
            <p className="page-hero__sub">
              We couldn't find that guide. <Link href="/guides">Back to all guides &rarr;</Link>
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const currentIdx = guides.findIndex(g => g.id === id);
  const prev = currentIdx > 0 ? guides[currentIdx - 1] : null;
  const next = currentIdx < guides.length - 1 ? guides[currentIdx + 1] : null;
  const otherGuides = guides.filter(g => g.id !== id).slice(0, 6);

  return (
    <Layout>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/guides">Guides</Link>
          <span> / </span>
          <span>{guide.title}</span>
        </div>

        <div className="article-layout">
          <div className="guide-detail">
            <div className="guide-detail__header">
              <h2 className="guide-detail__title">{guide.title}</h2>
              <p className="guide-detail__meta">{guide.readTime} &nbsp;·&nbsp; Updated June 2026</p>
              <p className="guide-detail__summary">{guide.summary}</p>
            </div>

            <div className="guide-detail__body">
              {guide.sections.map((section, idx) => (
                <div key={idx} className="guide-detail__section">
                  <h3 className="guide-detail__section-heading">{section.heading}</h3>
                  <p className="guide-detail__section-body">{section.body}</p>
                </div>
              ))}
            </div>

            {guide.sources && guide.sources.length > 0 && (
              <div className="guide-sources">
                <h4 className="guide-sources__heading">Sources & Further Reading</h4>
                <ul className="guide-sources__list">
                  {guide.sources.map((src, idx) => (
                    <li key={idx}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="guide-sources__link"
                      >
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="guide-detail__nav">
              {prev ? (
                <Link href={`/guides/${prev.id}`} className="guide-nav-link guide-nav-link--prev">
                  &larr; {prev.title}
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/guides/${next.id}`} className="guide-nav-link guide-nav-link--next">
                  {next.title} &rarr;
                </Link>
              ) : <span />}
            </div>

            <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
              <Link href="/guides" className="read-link">&larr; Back to all guides</Link>
            </div>
          </div>

          <aside className="article-sidebar">
            <div className="sidebar-box">
              <p className="sidebar-box__heading">More Guides</p>
              <ul className="sidebar-box__links">
                {otherGuides.map(g => (
                  <li key={g.id}>
                    <Link href={`/guides/${g.id}`}>{g.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-box">
              <p className="sidebar-box__heading">Compare Snowmobiles</p>
              <p style={{ fontSize: "13px", color: "#475569", marginBottom: "12px", lineHeight: "1.5" }}>
                Side-by-side specs for all 23 models from Ski-Doo, Polaris, Arctic Cat, and Yamaha.
              </p>
              <Link href="/" className="sidebar-cta">Browse All Sleds &rarr;</Link>
              <p className="sidebar-disclaimer">
                All specs from official manufacturer sources. Prices are approximate MSRP.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
