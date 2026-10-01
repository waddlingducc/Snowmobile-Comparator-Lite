import { Link } from "wouter";
import { guides } from "../data/guides";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function AboutPage() {
  usePageTitle("About SledSpec.com — Research Methods & Limitations");

  return (
    <Layout>
      <main className="container">
        <div className="page-hero">
          <h1 className="page-hero__title">About SledSpec.com</h1>
          <p className="page-hero__sub">A snowmobile research starting point, not a hands-on review site.</p>
        </div>
        <div className="article-layout">
          <article className="guide-detail">
            <div className="guide-detail__body">
              <section className="guide-detail__section">
                <h3 className="guide-detail__section-heading">What the catalog covers</h3>
                <p className="guide-detail__section-body">
                  SledSpec brings selected snowmobiles from Ski-Doo, Polaris, Arctic Cat, and Yamaha
                  into a filterable comparison catalog. It covers multiple model years, not a complete
                  current-year lineup. A listed model is not evidence that it is still in production,
                  available locally, or offered in every configuration. Check the year, engine, track,
                  package, and market before comparing two entries.
                </p>
              </section>
              <section className="guide-detail__section">
                <h3 className="guide-detail__section-heading">AI-assisted desk research</h3>
                <p className="guide-detail__section-body">
                  The catalog, model summaries, and guides are prepared using AI-assisted desk research
                  of publicly available material. This is not first-hand riding experience: SledSpec
                  has not conducted instrumented performance tests, weighed these machines, or performed
                  hands-on reviews. Descriptions of likely use cases are interpretations of published
                  specifications, not measured handling, reliability, or ownership results.
                </p>
                <p className="guide-detail__section-body" style={{ marginTop: "12px" }}>
                  Publication research date: <time dateTime="2026-10-01">October 1, 2026</time>.
                  This is a research snapshot, not a promise of continuous updates or confirmation that
                  every linked page still describes the same model year.
                </p>
              </section>
              <section className="guide-detail__section">
                <h3 className="guide-detail__section-heading">Sources and field-level uncertainty</h3>
                <p className="guide-detail__section-body">
                  Follow the source links on model pages and guides to inspect the underlying material.
                  Manufacturer model pages, specifications, and owner documentation are the preferred
                  references. A general manufacturer link provides context; it does not prove every
                  number in an entry. Pages can change, omit a field, or describe a different package.
                </p>
                <p className="guide-detail__section-body" style={{ marginTop: "12px" }}>
                  Treat each field separately: a published displacement does not establish horsepower,
                  weight, or price. Estimates are not manufacturer-confirmed figures, and unavailable
                  values should not be interpreted as zero. Dry and ready-to-ride weights are not
                  interchangeable. MSRP is not a dealer quote and may exclude freight, setup, taxes,
                  accessories, and incentives. Verify uncertain fields against year-specific documents
                  or an authorized dealer rather than relying on a ranking alone.
                </p>
              </section>
              <section className="guide-detail__section">
                <h3 className="guide-detail__section-heading">Editorial limitations and corrections</h3>
                <p className="guide-detail__section-body">
                  AI-assisted research can misread a source, mix model years, or overstate a conclusion.
                  The catalog is selective and may contain errors or omissions. It is not a substitute
                  for an owner's manual, recall lookup, avalanche training, mechanical inspection, or
                  professional safety advice. No rider credentials, named expert review, or hands-on
                  testing are claimed here.
                </p>
                <p className="guide-detail__section-body" style={{ marginTop: "12px" }}>
                  A useful correction identifies the model year and package, the disputed field, and a
                  year-specific source supporting the change. See the{" "}
                  <Link href="/contact" data-testid="link-about-corrections">email contact page</Link>.
                  There is no guaranteed response or correction deadline. An unresolved field should
                  remain uncertain rather than be presented as verified.
                </p>
              </section>
              <section className="guide-detail__section">
                <h3 className="guide-detail__section-heading">Advertising and site policies</h3>
                <p className="guide-detail__section-body">
                  The current site does not load advertising scripts. This page does not assert a
                  sponsorship history or financial relationship with manufacturers. If advertising is
                  introduced, the operator must update disclosures and configure any required consent
                  controls before enabling it. Read the{" "}
                  <Link href="/privacy" data-testid="link-about-privacy">Privacy Policy</Link> and{" "}
                  <Link href="/terms" data-testid="link-about-terms">Terms of Use</Link>.
                </p>
              </section>
            </div>
          </article>
          <aside className="article-sidebar">
            <div className="sidebar-box">
              <h3 className="sidebar-box__heading">Research guides</h3>
              <ul className="sidebar-box__links">
                {guides.slice(0, 6).map(g => (
                  <li key={g.id}>
                    <Link href={`/guides/${g.id}`} data-testid={`link-about-guide-${g.id}`}>{g.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebar-box">
              <h3 className="sidebar-box__heading">Explore the catalog</h3>
              <p style={{ fontSize: "13px", color: "#475569", marginBottom: "12px", lineHeight: "1.5" }}>
                Compare selected models across years, with attention to configuration and uncertainty.
              </p>
              <Link href="/" className="sidebar-cta" data-testid="link-about-compare">Open Comparison Tool &rarr;</Link>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
}