import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function AboutPage() {
  usePageTitle("About SledSpec.com — Who We Are & How We Work");

  return (
    <Layout>
      <div className="container">
        <div className="page-hero">
          <h2 className="page-hero__title">About SledSpec.com</h2>
          <p className="page-hero__sub">
            A free, independent snowmobile comparison tool built by riders, for riders.
          </p>
        </div>

        <div className="guide-detail">
          <div className="guide-detail__body">

            <div className="guide-detail__section">
              <h3 className="guide-detail__section-heading">Why We Built This</h3>
              <p className="guide-detail__section-body">
                Shopping for a snowmobile is harder than it should be. Manufacturer websites are
                designed to sell — not to help you compare. Dealer lots vary by region, and spec
                sheets are scattered across PDFs, press releases, and model pages that don't
                talk to each other. We got frustrated searching for side-by-side numbers every
                season and decided to build the resource we wished existed: one page, all the
                specs, sortable and filterable so you can find what actually fits your riding
                style and budget.
              </p>
            </div>

            <div className="guide-detail__section">
              <h3 className="guide-detail__section-heading">What SledSpec Does</h3>
              <p className="guide-detail__section-body">
                SledSpec.com publishes free comparison data for current-model-year snowmobiles
                from the four major North American manufacturers: Ski-Doo, Polaris, Arctic Cat,
                and Yamaha. You can sort the full lineup by price, horsepower, weight, track
                length, or displacement — filter by brand or category — and compare up to four
                sleds side-by-side in a detailed panel. We also publish in-depth buying guides
                and explainers written by experienced riders covering everything from how to
                choose your first sled to understanding the difference between 2-stroke and
                4-stroke engines.
              </p>
            </div>

            <div className="guide-detail__section">
              <h3 className="guide-detail__section-heading">How We Compile Our Data</h3>
              <p className="guide-detail__section-body">
                All specifications on SledSpec.com come from official manufacturer sources:
                product pages on ski-doo.com, polaris.com, arctic-cat.com, and yamaha-motor.com,
                as well as dealer spec sheets and press materials for each model year. We compile
                this data manually at the start of each season and update it when manufacturers
                publish corrections or mid-year changes. Prices shown are approximate U.S. MSRP
                as listed by the manufacturer — actual dealer pricing varies by region, package,
                and availability. We always recommend verifying specs and pricing directly with
                your local authorized dealer before making a purchase.
              </p>
            </div>

            <div className="guide-detail__section">
              <h3 className="guide-detail__section-heading">Editorial Independence</h3>
              <p className="guide-detail__section-body">
                SledSpec.com is not affiliated with, endorsed by, or sponsored by Ski-Doo
                (Bombardier Recreational Products), Polaris Inc., Textron Arctic Cat, or
                Yamaha Motor Corporation. We do not receive compensation from any manufacturer
                or dealer for how we present, rank, or describe their products. Our guides
                are written independently and reflect our own analysis of publicly available
                information. We have no financial relationship with any snowmobile brand.
              </p>
            </div>

            <div className="guide-detail__section">
              <h3 className="guide-detail__section-heading">Advertising</h3>
              <p className="guide-detail__section-body">
                SledSpec.com is a free resource supported by display advertising. We may
                display ads served by Google AdSense or other third-party advertising networks.
                Advertisers have no influence over our editorial content, guide topics, or
                how we present snowmobile specifications. For more information on how we
                handle data related to advertising, see our{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>
            </div>

            <div className="guide-detail__section">
              <h3 className="guide-detail__section-heading">Corrections & Feedback</h3>
              <p className="guide-detail__section-body">
                Manufacturer specifications change, and we may occasionally have a number
                wrong. If you spot an error — or want to suggest a model we should add —
                please reach out. We take accuracy seriously and will correct confirmed
                errors promptly. You can reach us through our{" "}
                <Link href="/contact">contact form</Link> or by emailing{" "}
                <a href="mailto:info@sledspec.com" style={{ color: "#2563eb" }}>info@sledspec.com</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
