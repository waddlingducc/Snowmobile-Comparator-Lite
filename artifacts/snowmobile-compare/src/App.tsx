import { Switch, Route } from "wouter";
import HomePage from "./pages/HomePage";
import GuidesIndexPage from "./pages/GuidesIndexPage";
import GuideDetailPage from "./pages/GuideDetailPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/guides" component={GuidesIndexPage} />
      <Route path="/guides/:id" component={GuideDetailPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route component={HomePage} />
    </Switch>
  );
}
