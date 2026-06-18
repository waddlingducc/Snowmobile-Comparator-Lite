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

        <div className="guide-detail">
          <div className="guide-detail__header">
            <h2 className="guide-detail__title">{guide.title}</h2>
            <p className="guide-detail__meta">{guide.readTime} &nbsp;·&nbsp; Updated 2026</p>
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
      </div>
    </Layout>
  );
}
