import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function TermsPage() {
  usePageTitle("Terms of Use | SledSpec.com");
  return (
    <Layout>
      <main className="container">
        <div className="breadcrumb">
          <Link href="/" data-testid="link-terms-home">Home</Link>
          <span> / </span><span>Terms of Use</span>
        </div>
        <div className="page-hero">
          <h1 className="page-hero__title">Terms of Use</h1>
          <p className="page-hero__sub">Publication research date: <time dateTime="2026-10-01">October 1, 2026</time></p>
        </div>
        <article className="prose-content">
          <h3>Purpose and scope</h3>
          <p>
            SledSpec provides a public research catalog and explanatory guides. It does not sell
            snowmobiles, accept orders, or provide dealer, repair, warranty, or emergency services.
            The catalog contains selected models across multiple years, not a complete lineup or
            an inventory listing. Brand and model names identify products; trademarks belong to their
            respective owners.
          </p>
          <h3>Verify before relying on a comparison</h3>
          <p>
            Content is AI-assisted desk research, not hands-on testing or professional advice.
            Specifications, estimates, source links, and prices may be incomplete, outdated, or
            incorrect. A missing value is not zero, and an estimate is not a manufacturer-confirmed
            measurement. Read the <Link href="/about" data-testid="link-terms-methods">research methods and limitations</Link>.
          </p>
          <p>
            Confirm the model year, configuration, availability, specifications, total purchase price,
            and safety information with the manufacturer and an authorized dealer. Use the owner's
            manual and qualified professionals for operation, maintenance, and safety decisions.
            The site is offered as available, without a guarantee of accuracy or uninterrupted access.
            Nothing here removes rights or protections that applicable law does not allow to be waived.
          </p>
          <h3>Responsible use and content rights</h3>
          <p>
            Do not disrupt the site, attempt unauthorized access, or use it for unlawful activity.
            You may link to pages and use comparisons for personal research. Respect applicable
            copyright and third-party rights when reproducing text, photographs, or other material;
            access to this site does not grant ownership of that material.
          </p>
          <h3>External services and privacy</h3>
          <p>
            External source websites have their own terms and privacy practices. SledSpec does not
            control their content or availability. The current application does not load ad scripts.
            See the <Link href="/privacy" data-testid="link-terms-privacy">Privacy Policy</Link> for hosting
            requests, Google Fonts, email links, and requirements before future advertising can be enabled.
          </p>
          <h3>Corrections and changes</h3>
          <p>
            Report a disputed field with a model year, configuration, and supporting source using the{" "}
            <Link href="/contact" data-testid="link-terms-contact">email contact page</Link>.
            The published mailbox is unverified, and there is no response or update deadline.
            Content and these terms may change; check this page for the current version.
            No specific jurisdiction or arbitration requirement is stated here.
          </p>
        </article>
      </main>
    </Layout>
  );
}