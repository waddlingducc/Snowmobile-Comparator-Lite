import { useState, useEffect } from "react";
import { Link } from "wouter";

const STORAGE_KEY = "sledspec_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        SledSpec.com uses cookies to measure site usage and may display third-party advertising.
        By continuing to use this site you accept our{" "}
        <Link href="/privacy" style={{ color: "inherit", textDecoration: "underline" }}>Privacy Policy</Link>.
      </p>
      <button className="cookie-banner__btn" onClick={dismiss}>Got it</button>
    </div>
  );
}
