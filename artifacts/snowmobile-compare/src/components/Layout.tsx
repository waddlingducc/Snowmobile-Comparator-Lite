import { Link } from "wouter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top">
      <header className="site-header">
        <div className="header-inner">
          <div className="header-title">
            <Link href="/" style={{ textDecoration: "none" }}>
              <h1><span className="domain-tld">SledSpec</span><span className="domain-dot">.com</span></h1>
            </Link>
            <p>23 models from 4 major manufacturers — specs, pricing, and side-by-side comparisons</p>
          </div>
          <nav className="header-nav">
            <Link href="/">Home</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="footer">
        <p>Prices are approximate MSRP and may vary by region and dealer. Always verify specs before purchasing.</p>
        <p style={{ marginTop: "6px" }}>
          © 2026 SledSpec.com — Made by a snowmobile enthusiast &nbsp;·&nbsp;{" "}
          <Link href="/privacy" style={{ color: "inherit", textDecoration: "underline" }}>Privacy Policy</Link>
          &nbsp;·&nbsp;
          <Link href="/contact" style={{ color: "inherit", textDecoration: "underline" }}>Contact</Link>
        </p>
      </footer>
    </div>
  );
}
