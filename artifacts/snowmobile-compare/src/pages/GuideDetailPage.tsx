import { Link, useParams } from "wouter";
import { guides, guideSources, researchedDate, researchedDateLabel } from "../data/guides";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";
import "./guide-content.css";

export default function GuideDetailPage() {
  const { id } = useParams<{ id: string }>();
  const guide = guides.find(g => g.id === id);
  usePageTitle(guide ? `${guide.title} | SledSpec.com` : "Guide | SledSpec.com");

  if (!guide) {
    return (
      <Layout>
        <div className="container">
          <div className="page-hero">
            <h1 className="page-hero__title">Guide Not Found</h1>
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
          <article className="guide-detail guide-research">
            <div className="guide-detail__header">
              <h1 className="guide-detail__title">{guide.title}</h1>
              <p className="guide-detail__meta">{guide.readTime} &nbsp;·&nbsp; Researched <time dateTime={researchedDate}>{researchedDateLabel}</time></p>
              <p className="guide-detail__summary">{guide.summary}</p>
              <p className="guide-methodology">AI-assisted desk research using the primary sources linked beside each topic. No hands-on testing, professional inspection or riding experience is claimed. Worksheets and hypothetical examples are our editorial synthesis, not manufacturer recommendations. Manufacturer marketing is not independent evidence. <Link href="/about" data-testid="link-guide-methodology">About our methods and limits</Link>.</p>
            </div>

            <nav className="guide-toc" aria-label="On this page">
              <h2>On this page</h2>
              <ol>{guide.sections.map((section, idx) => <li key={section.heading}><a href={`#section-${idx + 1}`} data-testid={`link-guide-section-${idx + 1}`}>{section.heading}</a></li>)}</ol>
              <a href="#guide-sources" data-testid="link-guide-sources">Sources and verification notes</a>
            </nav>
            <div className="guide-detail__body">
              {guide.sections.map((section, idx) => (
                <section key={idx} id={`section-${idx + 1}`} className="guide-detail__section">
                  <h2 className="guide-detail__section-heading">{section.heading}</h2>
                  <p className="guide-detail__section-body">{section.body}</p>
                  {section.table && <div className="guide-table-wrap" role="region" aria-label={`${section.heading} comparison`} tabIndex={0}>
                    <table className="guide-evidence-table"><thead><tr>{section.table.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
                      <tbody>{section.table.rows.map((row, rowIdx) => <tr key={rowIdx}>{row.map((cell, cellIdx) => cellIdx === 0 ? <th key={cellIdx} scope="row">{cell}</th> : <td key={cellIdx}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>}
                  {section.bullets && <ul className="guide-checklist">{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
                  {section.sourceIds && <p className="guide-citations">Source context: {section.sourceIds.map((sourceId, sourceIdx) => <span key={sourceId}>{sourceIdx > 0 && " · "}<a href={guideSources[sourceId].url} data-testid={`link-citation-${idx}-${sourceId}`}>{guideSources[sourceId].label}</a></span>)}</p>}
                </section>
              ))}
            </div>

            {guide.sources && guide.sources.length > 0 && (
              <section className="guide-sources" id="guide-sources">
                <h2 className="guide-sources__heading">Sources and verification notes</h2>
                <p>Reviewed {researchedDateLabel}. Linked pages can change model years or availability. The example Polaris manual applies only to its named models; locate your exact manual before service or operation. Local laws and daily conditions must be checked separately.</p>
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
              </section>
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
          </article>

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
                Use the comparison catalogue to build a shortlist, then confirm the exact configuration with its manufacturer.
              </p>
              <Link href="/" className="sidebar-cta">Browse All Sleds &rarr;</Link>
              <p className="sidebar-disclaimer">
                Published values are not hands-on test results. Confirm current specifications and delivered prices.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
