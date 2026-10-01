import { Link } from "wouter";
import Layout from "../components/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page Not Found | SledSpec.com");
  return <Layout><div className="container page-hero">
    <h1 className="page-hero__title">Page not found</h1>
    <p className="page-hero__sub">That address does not match a page in our catalog. It may have moved, or the link may be incomplete.</p>
    <Link href="/" className="btn btn-primary">Compare snowmobiles</Link>{" "}
    <Link href="/guides" className="btn btn-secondary">Read buying guides</Link>
  </div></Layout>;
}