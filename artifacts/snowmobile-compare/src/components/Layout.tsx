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
          </div>
          <nav className="header-nav">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="footer">
        <p>Prices are approximate MSRP and may vary by region and dealer. Always verify specs before purchasing.</p>
        <p style={{ marginTop: "6px" }}>
          © 2026 SledSpec.com — Independent snowmobile comparison tool &nbsp;·&nbsp;{" "}
          <Link href="/about" style={{ color: "inherit", textDecoration: "underline" }}>About</Link>
          &nbsp;·&nbsp;
          <Link href="/privacy" style={{ color: "inherit", textDecoration: "underline" }}>Privacy Policy</Link>
          &nbsp;·&nbsp;
          <Link href="/terms" style={{ color: "inherit", textDecoration: "underline" }}>Terms of Use</Link>
          &nbsp;·&nbsp;
          <Link href="/faq" style={{ color: "inherit", textDecoration: "underline" }}>FAQ</Link>
          &nbsp;·&nbsp;
          <Link href="/contact" style={{ color: "inherit", textDecoration: "underline" }}>Contact</Link>
        </p>
      </footer>
    </div>
  );
}
