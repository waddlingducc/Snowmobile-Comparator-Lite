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
            Have a spec correction, a model we missed, or just want to say hi?
            We read every message.
          </p>
        </div>

        <div className="contact-layout">
          <div className="contact-form-wrap">
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

          <div className="contact-info">
            <h3>Other ways to reach us</h3>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@sledspec.com">info@sledspec.com</a>
            </p>
            <p style={{ marginTop: "16px", fontSize: "13px", color: "#64748b" }}>
              SledSpec.com is a small independent site run by snowmobile enthusiasts.
              We're not affiliated with Ski-Doo, Polaris, Arctic Cat, or Yamaha.
              All specs come from manufacturer websites and dealer sheets.
            </p>
            <div style={{ marginTop: "24px" }}>
              <h4 style={{ marginBottom: "8px", color: "#334155" }}>Common questions</h4>
              <ul style={{ fontSize: "13px", color: "#475569", lineHeight: "1.8" }}>
                <li>Spec errors are usually fixed within 48 hours.</li>
                <li>We add new models at the start of each model year.</li>
                <li>All comparison data is free — no account needed.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
