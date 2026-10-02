import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function TermsPage() {
  usePageTitle("Terms of Use | SledSpec.com");
  return (
    <Layout>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/" data-testid="link-terms-home">Home</Link>
          <span> / </span><span>Terms of Use</span>
        </div>
        <div className="page-hero">
          <h1 className="page-hero__title">Terms of Use</h1>
          <p className="page-hero__sub">Publication research date: <time dateTime="2026-10-01">October 1, 2026</time></p>
        </div>
        <article className="prose-content">
          <h2>Purpose and scope</h2>
          <p>
            SledSpec provides a public research catalog and explanatory guides. It does not sell
            snowmobiles, accept orders, or provide dealer, repair, warranty, or emergency services.
            The catalog contains selected models across multiple years, not a complete lineup or
            an inventory listing. Brand and model names identify products; trademarks belong to their
            respective owners.
          </p>
          <h2>Verify before relying on a comparison</h2>
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
          <h2>Planning calculations are not offers</h2>
          <p>
            The ownership-cost planner and dealer-quote worksheet use your inputs and the formulas
            and exclusions shown in each tool. Results are scenarios, not predictions of resale,
            reliability, fuel use, or future costs, and are not financial advice, loan terms, or a
            binding dealer quote. Confirm taxes, fees, trade-in treatment, and included equipment
            with the dealer and the relevant local authority.
          </p>
          <p>
            Tool inputs remain in browser memory and are not saved by the application or sent to a
            backend. You can choose to download or print results for your own records; those copies
            remain until you remove them yourself. Review outputs before sharing them.
          </p>
          <h2>Responsible use and content rights</h2>
          <p>
            Do not disrupt the site, attempt unauthorized access, or use it for unlawful activity.
            You may link to pages and use comparisons for personal research. Respect applicable
            copyright and third-party rights when reproducing text, photographs, or other material;
            access to this site does not grant ownership or a reproduction license. The retained
            reference photographs' source, publication permission, and exact configuration match
            have not been established; no permission to reuse them is represented.
          </p>
          <h2>External services and privacy</h2>
          <p>
            External source websites have their own terms and privacy practices. SledSpec does not
            control their content or availability. The current application does not load ad scripts.
            See the <Link href="/privacy" data-testid="link-terms-privacy">Privacy Policy</Link> for hosting
            requests, Google Fonts, email links, and local tool outputs.
          </p>
          <h2>Corrections and changes</h2>
          <p>
            Report a disputed field with a model year, configuration, and supporting source using the{" "}
            <Link href="/contact" data-testid="link-terms-contact">email contact page</Link>.
            The published mailbox is unverified, and there is no response or update deadline.
            Content and these terms may change; check this page for the current version.
            No specific jurisdiction or arbitration requirement is stated here.
          </p>
        </article>
      </div>
    </Layout>
  );
}