import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { snowmobiles } from "../data/snowmobiles";
import { modelResearch } from "../data/model-research";
import Layout from "../components/Layout";
import NotFound from "./not-found";
import { usePageTitle } from "../hooks/usePageTitle";
import { specNumber, specPrice } from "../lib/specFormat";

export default function SledDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sled = snowmobiles.find(s => String(s.id) === id);
  const research = sled ? modelResearch[sled.id] : undefined;
  usePageTitle(sled ? `${sled.brand} ${sled.model} | SledSpec.com` : "Page Not Found");
  useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0); }, [id]);
  if (!sled || !research) return <NotFound />;

  const rows = [
    ["Model year", specNumber(sled.year), research.specNotes.year],
    ["Engine", sled.engine, research.configuration],
    ["Displacement", specNumber(sled.displacement, " cc"), research.specNotes.displacement],
    ["Horsepower", specNumber(sled.horsepower, " hp"), research.specNotes.horsepower],
    ["Weight", specNumber(sled.weight, " lb"), research.specNotes.weight],
    ["Track length", specNumber(sled.trackLength, '"'), research.specNotes.trackLength],
    ["Published price (USD)", specPrice(sled.price), research.specNotes.price],
  ];

  return <Layout>
    <article className="container">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Compare snowmobiles</Link><span> / </span><span>{sled.brand} {sled.model}</span>
      </nav>
      <div className="listing-main">
        <div>
          <div className="listing-photo-box">
            {sled.image && <img src={sled.image} alt={`${sled.brand} ${sled.model} reference image`} className="listing-photo" width={900} height={600} />}
          </div>
          <p className="listing-photo-caption">Reference image; pictured color, equipment and model year may differ from the researched configuration. Confirm the actual machine before purchasing.</p>
        </div>
        <div className="listing-side">
          <div className="listing-card">
            <p className="eyebrow">{sled.year ?? "Archive / year unconfirmed"} · {sled.category}</p>
            <h1 className="listing-title">{sled.brand} {sled.model}</h1>
            <span className="listing-verified">Research-based model profile</span>
            <p className="listing-price">{specPrice(sled.price)}</p>
            <p className="research-meta">Published U.S. price where confirmed—not an out-the-door quote or availability guarantee.</p>
            <a href="#source-notes">Read the source notes below</a>
          </div>
          <a href={sled.officialUrl} target="_blank" rel="noopener noreferrer" className="listing-visit">Manufacturer reference →</a>
        </div>
      </div>

      <section className="listing-box">
        <h2 className="listing-box-heading">What this model is for</h2>
        <p className="listing-overview">{sled.description}</p>
        {research.analysis.slice(1).map((paragraph, i) => <p key={i} className="listing-overview" style={{ marginTop: 16 }}>{paragraph}</p>)}
        <p className="research-meta">Desk research checked {research.checkedAt}. This is source-based buying analysis, not a ride test. <Link href="/about">Methodology & corrections</Link></p>
        <div className="research-notice"><strong>Coverage status: {research.status}.</strong> {research.configuration}</div>
      </section>

      <div className="research-grid research-section">
        <section className="research-panel">
          <h2>Consider it if…</h2>
          <ul>{research.fit.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </section>
        <section className="research-panel">
          <h2>Understand the compromises</h2>
          <ul>{research.limitations.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </section>
      </div>

      <section className="research-section">
        <h2>Specifications, with context</h2>
        <p className="comparison-note">“Not confirmed” is an evidence gap, not a zero. Weight definitions, optional equipment, track choices and model years can change a comparison.</p>
        <div className="table-scroll">
          <table className="listing-specs">
            <thead><tr><th scope="col">Specification</th><th scope="col">Value</th><th scope="col">Basis & limitations</th></tr></thead>
            <tbody>{rows.map(([label, value, note]) => <tr key={label}><td>{label}</td><td>{value}</td><td className="spec-note">{note}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      {sled.features.length > 0 && <section className="research-section">
        <h2>Equipment to understand</h2>
        <ul className="listing-highlights">{sled.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
        <p className="comparison-note">Equipment can be package-specific. Match the listing, order sheet and model-year documentation rather than relying on a shared model-family name.</p>
      </section>}

      <section className="research-panel research-section">
        <h2>Questions to take to the seller</h2>
        <ol>{research.buyingQuestions.map((item, i) => <li key={i}>{item}</li>)}</ol>
        <p>Use the <Link href="/guides/how-to-choose">buying worksheet</Link> to compare complete quotes, and the <Link href="/guides/reading-specs">specification guide</Link> to check whether the figures use the same basis.</p>
        <p><a href="/guides/how-to-choose#buying-tools">Calculate ownership costs and compare itemized dealer quotes →</a></p>
      </section>

      <section className="research-section" id="source-notes">
        <h2>Sources & research limits</h2>
        <p className="comparison-note">These references support the notes above to the extent described. A current manufacturer page is not automatically proof of an older model-year specification.</p>
        <ul className="source-list">{research.sources.map((source, i) => <li key={i}>
          <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a>
          <span className="source-note">{source.note}</span>
        </li>)}</ul>
        <p className="comparison-note">Have model-year documentation that resolves a gap? <Link href="/contact">Send a source correction</Link>. For service, recalls or operating limits, use the exact owner’s manual and an authorized dealer.</p>
      </section>

      <section className="research-section">
        <h2>Alternatives—and why to compare them</h2>
        <div className="sdp__related-list">
          {research.alternatives.map(alternative => {
            const other = snowmobiles.find(s => s.id === alternative.id);
            if (!other) return null;
            return <Link key={other.id} href={`/sled/${other.id}`} className="sdp__related-item">
              {other.image && <img src={other.image} alt={`${other.brand} ${other.model}`} className="sdp__related-photo" loading="lazy" width={300} height={180} />}
              <span className="sdp__related-name">{other.brand} {other.model}</span>
              <span className="sdp__related-reason">{alternative.reason}</span>
            </Link>;
          })}
        </div>
      </section>
    </article>
  </Layout>;
}