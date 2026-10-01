import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ContactPage() {
  usePageTitle("Contact SledSpec.com — Email & Corrections");

  return (
    <Layout>
      <main className="container">
        <div className="breadcrumb">
          <Link href="/" data-testid="link-contact-home">Home</Link>
          <span> / </span><span>Contact</span>
        </div>
        <div className="page-hero">
          <h1 className="page-hero__title">Contact SledSpec</h1>
          <p className="page-hero__sub">Email-only contact for catalog corrections and site feedback.</p>
        </div>
        <div className="article-layout">
          <article className="guide-detail">
            <div className="guide-detail__body">
              <section className="guide-detail__section">
                <h3 className="guide-detail__section-heading">Open your email app</h3>
                <p className="guide-detail__section-body">
                  The existing published address is{" "}
                  <a href="mailto:info@sledspec.com" data-testid="link-contact-email">info@sledspec.com</a>.
                  Mailbox ownership, delivery, and monitoring have not been verified. The site owner
                  must verify this address before relying on it as a working contact channel.
                </p>
                <p className="guide-detail__section-body" style={{ marginTop: "12px" }}>
                  This link opens your configured email application; it does not send a message through
                  SledSpec. Review and send the email yourself. If no email application opens, copy the
                  address into your email service. This website has no contact submission backend and
                  cannot confirm delivery. No response time or correction deadline is guaranteed.
                </p>
                <a
                  href="mailto:info@sledspec.com?subject=SledSpec%20catalog%20correction"
                  className="btn btn-primary"
                  style={{ display: "inline-block", marginTop: "20px" }}
                  data-testid="link-compose-correction"
                >
                  Compose an email (not sent by this site)
                </a>
              </section>
              <section className="guide-detail__section">
                <h3 className="guide-detail__section-heading">What to include in a correction</h3>
                <ul style={{ fontSize: "14px", color: "#475569", lineHeight: "2", marginLeft: "20px" }}>
                  <li>The SledSpec page URL and the model year, engine, track, and package.</li>
                  <li>The specific field or statement that appears wrong.</li>
                  <li>The proposed correction and a manufacturer document or other identifiable source.</li>
                  <li>For missing models, the year and configuration rather than only the model family name.</li>
                  <li>For tool problems, your browser and steps to reproduce the issue.</li>
                </ul>
                <p className="guide-detail__section-body" style={{ marginTop: "12px" }}>
                  Do not include passwords, payment details, or other sensitive personal information.
                  Email is handled by your email provider and, if the mailbox is active, the recipient's
                  provider; it is not stored by a website form.
                </p>
              </section>
              <section className="guide-detail__section">
                <h3 className="guide-detail__section-heading">Research questions, not service support</h3>
                <p className="guide-detail__section-body">
                  Read the <Link href="/about" data-testid="link-contact-methods">research methods and limitations</Link>{" "}
                  before relying on a specification. SledSpec is a desk-research comparison resource,
                  not a dealer, repair service, or emergency contact. For recalls, warranty, parts,
                  service, and purchase quotes, consult the manufacturer or an authorized dealer.
                  For urgent safety concerns, use the appropriate local emergency or safety service.
                </p>
              </section>
            </div>
          </article>
          <aside className="article-sidebar">
            <div className="sidebar-box">
              <h3 className="sidebar-box__heading">Useful pages</h3>
              <ul className="sidebar-box__links">
                <li><Link href="/faq" data-testid="link-contact-faq">Frequently asked questions</Link></li>
                <li><Link href="/privacy" data-testid="link-contact-privacy">Privacy Policy</Link></li>
                <li><Link href="/terms" data-testid="link-contact-terms">Terms of Use</Link></li>
              </ul>
            </div>
            <div className="sidebar-box">
              <h3 className="sidebar-box__heading">Compare snowmobiles</h3>
              <Link href="/" className="sidebar-cta" data-testid="link-contact-compare">Open Comparison Tool &rarr;</Link>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
}