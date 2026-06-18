import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function TermsPage() {
  usePageTitle("Terms of Use | SledSpec.com");
  return (
    <Layout>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span> / </span>
          <span>Terms of Use</span>
        </div>

        <div className="page-hero">
          <h2 className="page-hero__title">Terms of Use</h2>
          <p className="page-hero__sub">Last updated: January 1, 2026</p>
        </div>

        <div className="prose-content">
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing or using SledSpec.com (the "Site"), you agree to be bound by these Terms
            of Use. If you do not agree to these terms, please do not use the Site.
            We reserve the right to modify these terms at any time. Continued use of the Site
            after any changes constitutes acceptance of the revised terms.
          </p>

          <h3>2. About SledSpec.com</h3>
          <p>
            SledSpec.com is an independent snowmobile comparison and information resource. We are
            not affiliated with, endorsed by, or sponsored by Ski-Doo (Bombardier Recreational
            Products), Polaris Inc., Arctic Cat (Textron), or Yamaha Motor Corporation. All brand
            names, model names, and trademarks belong to their respective manufacturers.
          </p>

          <h3>3. Accuracy of Information</h3>
          <p>
            We make reasonable efforts to ensure that specifications, pricing, and other data
            presented on SledSpec.com are accurate and up to date. However, we cannot guarantee
            the accuracy, completeness, or timeliness of this information. Specifications and
            pricing may change without notice. Always verify specifications and pricing directly
            with an authorized dealer before making a purchase decision.
          </p>
          <p>
            SledSpec.com is provided for informational purposes only and does not constitute
            professional advice. We are not responsible for any purchase decisions made based on
            information presented on this Site.
          </p>

          <h3>4. Disclaimer of Warranties</h3>
          <p>
            THE SITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE
            SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL
            COMPONENTS.
          </p>

          <h3>5. Limitation of Liability</h3>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, SLEDSPEC.COM AND ITS OPERATORS SHALL NOT
            BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
            ARISING FROM YOUR USE OF OR INABILITY TO USE THE SITE, INCLUDING ANY LOSS OF DATA,
            PROFITS, OR GOODWILL.
          </p>

          <h3>6. Third-Party Links and Advertising</h3>
          <p>
            The Site may contain links to third-party websites and display third-party
            advertisements through Google AdSense. These links and advertisements are provided
            for your convenience only. We have no control over the content of those sites and
            accept no responsibility for them or for any loss or damage that may arise from
            your use of them. The display of an advertisement does not constitute an endorsement
            of the advertised product or service.
          </p>

          <h3>7. Intellectual Property</h3>
          <p>
            The original written content on SledSpec.com — including guides, articles, and
            comparison text — is the property of SledSpec.com and may not be reproduced,
            distributed, or republished without written permission. Manufacturer product names,
            logos, and images remain the intellectual property of their respective owners.
          </p>

          <h3>8. User Conduct</h3>
          <p>
            You agree not to use the Site in any way that is unlawful, harmful, threatening,
            abusive, or otherwise objectionable. You may not attempt to gain unauthorized access
            to any part of the Site, interfere with the Site's operation, or use automated tools
            to scrape or copy content at scale.
          </p>

          <h3>9. Privacy</h3>
          <p>
            Your use of the Site is also governed by our{" "}
            <Link href="/privacy">Privacy Policy</Link>, which is incorporated into these Terms
            of Use by reference.
          </p>

          <h3>10. Governing Law</h3>
          <p>
            These Terms of Use shall be governed by and construed in accordance with applicable
            law. Any disputes arising under these terms shall be resolved through binding
            arbitration or in the appropriate court of jurisdiction.
          </p>

          <h3>11. Contact</h3>
          <p>
            If you have questions about these Terms of Use, please contact us at{" "}
            <a href="mailto:info@sledspec.com">info@sledspec.com</a> or through our{" "}
            <Link href="/contact">Contact page</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
