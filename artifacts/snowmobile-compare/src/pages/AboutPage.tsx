import { Link } from "wouter";
import { guides } from "../data/guides";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function AboutPage() {
  usePageTitle("About SledSpec.com — Research Methods & Limitations");

  return (
    <Layout>
      <div className="container">
        <div className="page-hero">
          <h1 className="page-hero__title">About SledSpec.com</h1>
          <p className="page-hero__sub">A snowmobile research starting point, not a hands-on review site.</p>
        </div>
        <div className="article-layout">
          <article className="guide-detail">
            <div className="guide-detail__body">
              <section className="guide-detail__section">
                <h2 className="guide-detail__section-heading">What the catalog covers</h2>
                <p className="guide-detail__section-body">
                  SledSpec brings selected snowmobiles from Ski-Doo, Polaris, Arctic Cat, and Yamaha
                  into a filterable comparison catalog. It covers multiple model years, not a complete
                  current-year lineup. A listed model is not evidence that it is still in production,
                  available locally, or offered in every configuration. Check the year, engine, track,
                  package, and market before comparing two entries.
                </p>
              </section>
              <section className="guide-detail__section">
                <h2 className="guide-detail__section-heading">AI-assisted desk research</h2>
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
                <h2 className="guide-detail__section-heading">Sources and field-level uncertainty</h2>
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
                <h2 className="guide-detail__section-heading">Editorial limitations and corrections</h2>
                <p className="guide-detail__section-body">
                  AI-assisted research can misread a source, mix model years, or overstate a conclusion.
                  The catalog is selective and may contain errors or omissions. It is not a substitute
                  for an owner's manual, recall lookup, avalanche training, mechanical inspection, or
                  professional safety advice. No rider credentials, named expert review, or hands-on
                  testing are claimed here. A named operator and editorial reviewer have not been
                  confirmed, so no individual biography or professional credentials are presented.
                </p>
                <p className="guide-detail__section-body" style={{ marginTop: "12px" }}>
                  A useful correction identifies the model year and package, the disputed field, and a
                  year-specific source supporting the change. See the{" "}
                  <Link href="/contact" data-testid="link-about-corrections">email contact page</Link>.
                  There is no guaranteed response or correction deadline. An unresolved field
                  remains labeled uncertain until supporting evidence is available.
                </p>
              </section>
              <section className="guide-detail__section">
                <h2 className="guide-detail__section-heading">Buying tools and reference photographs</h2>
                <p className="guide-detail__section-body">
                  The ownership-cost planner and dealer-quote worksheet calculate scenarios from your
                  inputs, not forecasts or offers. Check assumptions, exclusions, and the quote's
                  tax and fee basis before using a result. Inputs stay in browser memory, with no
                  application storage or submission to a server. Downloads and printing happen only
                  when you choose them.
                </p>
                <p className="guide-detail__section-body" style={{ marginTop: "12px" }}>
                  Model photographs are retained reference images, not evidence of a SledSpec test
                  ride or the exact year and package shown in an entry. Their original source,
                  permission to publish, and configuration match have not been established.
                  They are not offered for reuse.
                </p>
              </section>
              <section className="guide-detail__section">
                <h2 className="guide-detail__section-heading">Advertising and site policies</h2>
                <p className="guide-detail__section-body">
                  The current site does not load advertising scripts. This page does not assert a
                  sponsorship history or financial relationship with manufacturers. If advertising is
                  introduced, its providers, data practices, and applicable consent choices will need
                  to be disclosed; none is represented as active here. Read the{" "}
                  <Link href="/privacy" data-testid="link-about-privacy">Privacy Policy</Link> and{" "}
                  <Link href="/terms" data-testid="link-about-terms">Terms of Use</Link>.
                </p>
              </section>
            </div>
          </article>
          <aside className="article-sidebar">
            <div className="sidebar-box">
              <h2 className="sidebar-box__heading">Research guides</h2>
              <ul className="sidebar-box__links">
                {guides.slice(0, 6).map(g => (
                  <li key={g.id}>
                    <Link href={`/guides/${g.id}`} data-testid={`link-about-guide-${g.id}`}>{g.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebar-box">
              <h2 className="sidebar-box__heading">Explore the catalog</h2>
              <p style={{ fontSize: "13px", color: "#475569", marginBottom: "12px", lineHeight: "1.5" }}>
                Compare selected models across years, with attention to configuration and uncertainty.
              </p>
              <Link href="/" className="sidebar-cta" data-testid="link-about-compare">Open Comparison Tool &rarr;</Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}