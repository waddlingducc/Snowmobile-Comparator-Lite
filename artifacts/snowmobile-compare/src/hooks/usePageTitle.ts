import { useEffect } from "react";
import { useLocation } from "wouter";
import { canonicalUrl, getPageMetadata } from "../lib/pageMetadata";

export function usePageTitle(_title: string) {
  const [path] = useLocation();
  useEffect(() => {
    const page = getPageMetadata(path);
    document.title = page.title;
    const setMeta = (attribute: "name" | "property", name: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta("name", "description", page.description);
    setMeta("name", "robots", page.noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", canonicalUrl(path));
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = canonicalUrl(path);
  }, [path]);
}
