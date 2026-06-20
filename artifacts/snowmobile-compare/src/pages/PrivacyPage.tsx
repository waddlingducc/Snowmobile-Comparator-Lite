import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function PrivacyPage() {
  usePageTitle("Privacy Policy | SledSpec.com");
  return (
    <Layout>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span> / </span>
          <span>Privacy Policy</span>
        </div>

        <div className="page-hero">
          <h2 className="page-hero__title">Privacy Policy</h2>
          <p className="page-hero__sub">Last updated: June 12, 2026</p>
        </div>

        <div className="prose-content">
          <h3>1. Introduction</h3>
          <p>
            SledSpec.com ("we", "us", or "our") operates this website as a free snowmobile
            comparison resource. This Privacy Policy explains how we collect, use, and share
            information when you visit SledSpec.com.
          </p>

          <h3>2. Information We Collect</h3>
          <p>
            We do not require you to create an account or provide any personal information to
            use SledSpec.com. The comparison tool, filters, and guides are all available without
            registration.
          </p>
          <p>
            When you use our site, certain information may be collected automatically, including:
          </p>
          <ul>
            <li>Your browser type and version</li>
            <li>Pages you visit and time spent on each page</li>
            <li>Your approximate geographic location (country/region level only)</li>
            <li>The device and operating system you use to access the site</li>
            <li>Referring URL (where you came from before visiting SledSpec.com)</li>
          </ul>
          <p>
            If you use our Contact form, we collect the name, email address, and message content
            you provide. This information is used solely to respond to your inquiry.
          </p>

          <h3>3. Cookies</h3>
          <p>
            SledSpec.com uses cookies and similar tracking technologies. Cookies are small text
            files stored on your device that help us understand how visitors use the site.
          </p>
          <p>We use the following types of cookies:</p>
          <ul>
            <li>
              <strong>Analytics cookies:</strong> These help us understand how visitors
              interact with SledSpec.com, which pages are most popular, and where visitors
              come from. We use Google Analytics for this purpose.
            </li>
          </ul>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is
            being sent. However, if you do not accept cookies, some portions of our site may not
            function properly.
          </p>

          <h3>4. How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Operate and improve SledSpec.com</li>
            <li>Understand how visitors use the site so we can add more useful content</li>
            <li>Respond to messages sent through our Contact form</li>
            <li>Monitor for and prevent abuse or misuse of the site</li>
          </ul>
          <p>
            We do not sell your personal information to third parties.
          </p>

          <h3>5. Data Sharing</h3>
          <p>
            We do not share your personal information with third parties except as required by
            law or as described in this policy (e.g., data shared with Google Analytics as
            described above).
          </p>

          <h3>6. Children's Privacy</h3>
          <p>
            SledSpec.com is not directed at children under the age of 13. We do not knowingly
            collect personal information from children under 13. If you believe we have
            inadvertently collected such information, please contact us so we can delete it.
          </p>

          <h3>7. Your Rights</h3>
          <p>
            Depending on your location, you may have the right to access, correct, or delete
            personal information we hold about you. To exercise these rights, contact us at{" "}
            <a href="mailto:info@sledspec.com">info@sledspec.com</a>.
          </p>

          <h3>8. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated date. Your continued use of SledSpec.com after any changes
            constitutes your acceptance of the revised policy.
          </p>

          <h3>9. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:info@sledspec.com">info@sledspec.com</a> or use our{" "}
            <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
