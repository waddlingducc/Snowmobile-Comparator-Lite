import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function PrivacyPage() {
  usePageTitle("Privacy Policy | SledSpec.com");
  return (
    <Layout>
      <main className="container">
        <div className="breadcrumb">
          <Link href="/" data-testid="link-privacy-home">Home</Link>
          <span> / </span><span>Privacy Policy</span>
        </div>
        <div className="page-hero">
          <h1 className="page-hero__title">Privacy Policy</h1>
          <p className="page-hero__sub">Publication research date: <time dateTime="2026-10-01">October 1, 2026</time></p>
        </div>
        <article className="prose-content">
          <h3>Current application behavior</h3>
          <p>
            SledSpec is a static, public comparison and guide application. It has no user accounts,
            login, payment collection, or application backend for visitor data. There is no contact
            form submission. Filters, sorting, and comparison selections are held in browser memory;
            the application does not save them to cookies, local storage, or a server, and reloading
            resets them. The current application does not load analytics or advertising scripts.
          </p>
          <h3>Hosting and request logs</h3>
          <p>
            Loading this site sends requests to its hosting infrastructure. Hosting providers may
            process your IP address, requested URL, request time, browser information, and referrer
            for delivery, security, and operational logs. A static application does not make these
            requests anonymous. The hosting operator's log retention, access, and deletion settings
            have not been verified here; no specific retention period or deletion guarantee is claimed.
          </p>
          <h3>External fonts and links</h3>
          <p>
            The page imports the Inter font through Google Fonts from fonts.googleapis.com and
            fonts.gstatic.com. Your browser contacts those services while loading the page, which
            exposes request information such as your IP address and browser headers to Google.
            See <a href="https://policies.google.com/privacy" data-testid="link-privacy-google">Google's Privacy Policy</a>.
          </p>
          <p>
            Manufacturer and other source links take you to separate websites. Those sites apply
            their own privacy and cookie practices. A link does not mean SledSpec controls their
            collection or endorses their policies.
          </p>
          <h3>Email, not a website submission</h3>
          <p>
            The <Link href="/contact" data-testid="link-privacy-contact">Contact page</Link> provides a
            mailto link. Clicking it opens your email software; nothing is submitted to a SledSpec
            backend. If you choose to send an email, its contents and sender details pass through your
            email provider and the recipient's provider, if the mailbox is active. The existing
            published address, info@sledspec.com, has not been verified for ownership, delivery, or
            monitoring. Avoid sending sensitive information.
          </p>
          <h3>Advertising is not enabled</h3>
          <p>
            No Google AdSense or other ad-serving script is currently loaded by this application.
            No advertising consent mechanism or Google-certified consent management platform (CMP)
            is implemented. This policy does not mean that future advertising is approved or ready to run.
          </p>
          <p>
            Before enabling Google advertising, the site operator must configure the actual advertising
            account and providers, update this policy to describe their data uses, and implement and
            test the required consent controls. Google's{" "}
            <a href="https://support.google.com/adsense/answer/1348695?hl=en" data-testid="link-privacy-ad-disclosures">required privacy disclosures</a>{" "}
            include that third-party vendors, including Google, use cookies to serve ads based on prior
            visits to this and other websites, that Google's advertising cookies enable Google and its
            partners to personalize ads, and how users can opt out through{" "}
            <a href="https://www.google.com/settings/ads" data-testid="link-privacy-ad-settings">Ads Settings</a>.
            Actual participating vendors and their privacy and opt-out links must also be identified.
          </p>
          <p>
            Google's{" "}
            <a href="https://www.google.com/intl/en_uk/about/company/user-consent-policy-help" data-testid="link-privacy-consent-requirements">EU user consent guidance</a>{" "}
            requires publishers serving ads to users in the EEA, UK, and Switzerland to use a
            Google-certified CMP under the applicable TCF requirements. Required disclosures and
            consent for cookies or local storage where legally required, and for collection, sharing,
            and use of personal data for ad personalization, must be obtained. Users must be able
            to withdraw consent. Non-personalized ads do not automatically remove cookie-consent duties.
            Future disclosures must link to{" "}
            <a href="https://business.safety.google/privacy/" data-testid="link-privacy-google-data-use">how Google uses personal data</a>{" "}
            and reflect the actual setup and applicable regional requirements, not just a generic banner.
          </p>
          <h3>Your choices and policy updates</h3>
          <p>
            You can leave external links unopened and manage browser privacy settings. Reloading clears
            the application's in-memory selections, but does not delete hosting logs or emails.
            Depending on your location, rights may apply to personal data held by the relevant operator
            or service provider. For questions, consult the{" "}
            <Link href="/contact" data-testid="link-privacy-questions">contact information and its verification limitations</Link>.
            The operator must confirm a working channel and actual provider practices to handle such requests.
          </p>
          <p>
            This page should be updated whenever hosting, fonts, data collection, or advertising changes.
            Read the <Link href="/about" data-testid="link-privacy-about">About page</Link> for research limitations
            and the <Link href="/terms" data-testid="link-privacy-terms">Terms of Use</Link> for use of the content.
          </p>
        </article>
      </main>
    </Layout>
  );
}