import { Switch, Route } from "wouter";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GuidesIndexPage from "./pages/GuidesIndexPage";
import GuideDetailPage from "./pages/GuideDetailPage";
import SledDetailPage from "./pages/SledDetailPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import FaqPage from "./pages/FaqPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/sled/:id" component={SledDetailPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/guides" component={GuidesIndexPage} />
      <Route path="/guides/:id" component={GuideDetailPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/faq" component={FaqPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}
