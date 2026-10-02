import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function PrivacyPage() {
  usePageTitle("Privacy Policy | SledSpec.com");
  return (
    <Layout>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/" data-testid="link-privacy-home">Home</Link>
          <span> / </span><span>Privacy Policy</span>
        </div>
        <div className="page-hero">
          <h1 className="page-hero__title">Privacy Policy</h1>
          <p className="page-hero__sub">Publication research date: <time dateTime="2026-10-01">October 1, 2026</time></p>
        </div>
        <article className="prose-content">
          <h2>Current application behavior</h2>
          <p>
            SledSpec is a static, public comparison and guide application. It has no user accounts,
            login, payment collection, or application backend for visitor data. There is no contact
            form submission. Filters, sorting, and comparison selections are held in browser memory;
            the application does not save them to cookies, local storage, or a server, and reloading
            resets them. The current application does not load analytics or advertising scripts.
          </p>
          <h2>Buying tools, downloads, and printing</h2>
          <p>
            Ownership-cost planner and dealer-quote worksheet inputs and calculated results stay in
            memory in your current browser page. The application does not save them to cookies,
            local storage, session storage, or a backend. Reloading or leaving the page clears those
            inputs. The tools have no automatic upload or background export.
          </p>
          <p>
            A download creates a file only when you request it; printing opens your browser's print
            controls only when you choose to print. Files and printed outputs may include the
            assumptions and figures you entered. Once saved, they are outside the application's
            memory: reloading or resetting a tool does not remove a downloaded file, a print job,
            or a PDF saved through your print dialog. Manage or delete those copies yourself and
            consider who can access your device, download folder, or printer.
          </p>
          <h2>Hosting and request logs</h2>
          <p>
            Loading this site sends requests to its hosting infrastructure. Hosting providers may
            process your IP address, requested URL, request time, browser information, and referrer
            for delivery, security, and operational logs. A static application does not make these
            requests anonymous. The hosting operator's log retention, access, and deletion settings
            have not been verified here; no specific retention period or deletion guarantee is claimed.
          </p>
          <h2>External fonts and links</h2>
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
          <h2>Email, not a website submission</h2>
          <p>
            The <Link href="/contact" data-testid="link-privacy-contact">Contact page</Link> provides a
            mailto link. Clicking it opens your email software; nothing is submitted to a SledSpec
            backend. If you choose to send an email, its contents and sender details pass through your
            email provider and the recipient's provider, if the mailbox is active. The existing
            published address, info@sledspec.com, has not been verified for ownership, delivery, or
            monitoring. Avoid sending sensitive information.
          </p>
          <h2>Advertising is not enabled</h2>
          <p>
            No Google AdSense or other ad-serving script is currently loaded by this application.
            No advertising consent mechanism or Google-certified consent management platform (CMP)
            is implemented. There are no ad-personalization choices to exercise on this application
            at present. This is not a claim of AdSense approval.
          </p>
          <p>
            If Google advertising is added, it may involve third-party vendors using cookies to serve
            ads based on visits to this and other websites. Google's{" "}
            <a href="https://support.google.com/adsense/answer/1348695?hl=en" data-testid="link-privacy-ad-disclosures">advertising privacy guidance</a>{" "}
            describes those disclosures and personalization opt-outs through{" "}
            <a href="https://www.google.com/settings/ads" data-testid="link-privacy-ad-settings">Ads Settings</a>.
            This describes a possible future service, not cookies currently set by SledSpec ads.
          </p>
          <p>
            Google's{" "}
            <a href="https://support.google.com/adsense/answer/13554116?hl=en" data-testid="link-privacy-consent-requirements">publisher consent guidance</a>{" "}
            requires a Google-certified CMP integrated with the IAB TCF when serving personalized
            ads to users in the EEA, UK, and Switzerland. Its{" "}
            <a href="https://www.google.com/intl/en/about/company/user-consent-policy/">EU user consent policy</a>{" "}
            also addresses consent for cookies or local storage where legally required and personal
            data used for ad personalization, with instructions for withdrawing consent.
            Non-personalized ads do not automatically remove cookie-consent duties. Learn{" "}
            <a href="https://business.safety.google/privacy/" data-testid="link-privacy-google-data-use">how Google uses personal data</a>.
          </p>
          <h2>Your choices and policy updates</h2>
          <p>
            You can leave external links unopened and manage browser privacy settings. Reloading clears
            the application's in-memory selections, but does not delete hosting logs or emails.
            Depending on your location, rights may apply to personal data held by the relevant operator
            or service provider. For questions, consult the{" "}
            <Link href="/contact" data-testid="link-privacy-questions">contact information and its verification limitations</Link>.
            A named operator, working request channel, and provider-specific retention or deletion
            process have not been confirmed. This site cannot promise a response or deletion of
            records held by hosting or email providers.
          </p>
          <p>
            This policy describes the application practices disclosed above, not every service on an
            external website. Read the <Link href="/about" data-testid="link-privacy-about">About page</Link> for research limitations
            and the <Link href="/terms" data-testid="link-privacy-terms">Terms of Use</Link> for use of the content.
          </p>
        </article>
      </div>
    </Layout>
  );
}