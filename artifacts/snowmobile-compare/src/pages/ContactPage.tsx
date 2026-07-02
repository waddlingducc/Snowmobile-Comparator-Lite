import { useState } from "react";
import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ContactPage() {
  usePageTitle("Contact Us | SledSpec.com");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Layout>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span> / </span>
          <span>Contact</span>
        </div>

        <div className="page-hero">
          <h2 className="page-hero__title">Contact SledSpec</h2>
          <p className="page-hero__sub">
            Have a spec correction, a model we missed, or a question about snowmobiles?
            We read every message and respond within a few business days.
          </p>
        </div>

        <div className="article-layout">
          <div className="guide-detail">
            <div className="guide-detail__body">

              <div className="guide-detail__section">
                <h3 className="guide-detail__section-heading">How We Can Help</h3>
                <p className="guide-detail__section-body">
                  SledSpec.com is run by a small team of snowmobile enthusiasts who built this tool
                  because we got tired of hunting for comparable specs across manufacturer websites.
                  We're not a dealership, we don't sell anything, and we have no financial relationship
                  with any manufacturer. That means when you reach out, you're talking to someone
                  whose only interest is making this comparison tool as accurate and useful as possible.
                </p>
                <p className="guide-detail__section-body" style={{ marginTop: "12px" }}>
                  Here's what we can help with:
                </p>
                <ul style={{ fontSize: "14px", color: "#475569", lineHeight: "2", marginLeft: "20px" }}>
                  <li><strong>Spec corrections</strong> — if you spot an error in our data, let us know which model and what's wrong. We verify and correct confirmed errors within 48 hours.</li>
                  <li><strong>Missing models</strong> — if there's a 2026 model we haven't included, send us the details and we'll add it in our next update.</li>
                  <li><strong>General snowmobile questions</strong> — we're riders, and we're happy to help point you in the right direction on buying decisions, spec interpretation, or category questions.</li>
                  <li><strong>Advertising inquiries</strong> — if you're interested in advertising on SledSpec.com, use the contact form and we'll follow up.</li>
                  <li><strong>Feedback on the tool</strong> — sorting, filtering, comparison features — we genuinely want to know what would make this more useful for you.</li>
                </ul>
              </div>

              <div className="guide-detail__section">
                <h3 className="guide-detail__section-heading">Send Us a Message</h3>
                <p className="guide-detail__section-body">
                  Fill out the form below and we'll get back to you at the email address you provide.
                  We aim to respond to all messages within 2–3 business days. For urgent spec corrections
                  (e.g. a pricing or safety-related error), please include "Urgent" in your subject line
                  and we'll prioritize it.
                </p>

                <div style={{ marginTop: "20px" }}>
                  {sent ? (
                    <div className="contact-success">
                      <p><strong>Message sent!</strong></p>
                      <p>Thanks for reaching out. We'll get back to you at {form.email} within a few days.</p>
                      <button className="btn btn-secondary" style={{ marginTop: "12px" }} onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                      <div className="form-row">
                        <label htmlFor="name">Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        />
                      </div>
                      <div className="form-row">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        />
                      </div>
                      <div className="form-row">
                        <label htmlFor="subject">Subject</label>
                        <select
                          id="subject"
                          value={form.subject}
                          onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        >
                          <option value="">Select a subject...</option>
                          <option>Spec correction</option>
                          <option>Add a model</option>
                          <option>General question</option>
                          <option>Advertising inquiry</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="form-row">
                        <label htmlFor="message">Message</label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          placeholder="Tell us what's on your mind..."
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "10px", fontSize: "15px" }}>
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="guide-detail__section">
                <h3 className="guide-detail__section-heading">About Our Data</h3>
                <p className="guide-detail__section-body">
                  All specifications on SledSpec.com are sourced from official manufacturer websites,
                  dealer spec sheets, and press materials at the start of the 2026 model year.
                  We compile this data manually and update it when manufacturers publish corrections
                  or mid-year changes. If you've received a spec sheet from your dealer that disagrees
                  with what we show, we'd love to see it — dealer-level corrections are some of
                  the most valuable updates we receive.
                </p>
                <p className="guide-detail__section-body" style={{ marginTop: "12px" }}>
                  Prices shown are approximate U.S. MSRP as published by each manufacturer.
                  Actual dealer pricing varies by region, available packages, current incentives,
                  and dealer markup. We always recommend verifying pricing directly with your
                  authorized local dealer before making any purchase decision.
                </p>
              </div>

              <div className="guide-detail__section">
                <h3 className="guide-detail__section-heading">What We're Not</h3>
                <p className="guide-detail__section-body">
                  SledSpec.com is not affiliated with, endorsed by, or compensated by any snowmobile
                  manufacturer or dealer. We can't help you with warranty claims, recall notices,
                  service appointments, or parts orders — for those, contact your authorized dealer
                  directly. We're also not a forum or community platform. For riding advice from
                  fellow snowmobilers, communities like Snowmobile World and TY4stroke are great
                  resources.
                </p>
              </div>

            </div>
          </div>

          <aside className="article-sidebar">
            <div className="sidebar-box">
              <p className="sidebar-box__heading">Direct Email</p>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6" }}>
                Prefer email? Reach us directly at:
              </p>
              <a href="mailto:info@sledspec.com" style={{ display: "block", marginTop: "8px", fontSize: "14px", color: "#2563eb", fontWeight: 600 }}>
                info@sledspec.com
              </a>
            </div>

            <div className="sidebar-box">
              <p className="sidebar-box__heading">Response Times</p>
              <ul style={{ fontSize: "13px", color: "#475569", lineHeight: "2" }}>
                <li>Spec corrections: within 48 hours</li>
                <li>General questions: 2–3 business days</li>
                <li>Model additions: next scheduled update</li>
                <li>Advertising: within 1 week</li>
              </ul>
            </div>

            <div className="sidebar-box">
              <p className="sidebar-box__heading">Common Questions</p>
              <p style={{ fontSize: "13px", color: "#475569", marginBottom: "8px", lineHeight: "1.5" }}>
                Many questions are already answered in our FAQ.
              </p>
              <Link href="/faq" className="sidebar-cta">Browse the FAQ &rarr;</Link>
            </div>

            <div className="sidebar-box">
              <p className="sidebar-box__heading">Compare Snowmobiles</p>
              <p style={{ fontSize: "13px", color: "#475569", marginBottom: "12px", lineHeight: "1.5" }}>
                23 models from all four major brands, side by side.
              </p>
              <Link href="/" className="sidebar-cta">Open Comparison Tool &rarr;</Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
