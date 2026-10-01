import { guides } from "../data/guides";
import { snowmobiles } from "../data/snowmobiles";

// Existing custom-domain GitHub Pages destination, not the development preview.
export const SITE_URL = "https://sledspec.com";
export const normalizePath = (path: string) => path.split("?")[0].replace(/\/+$/, "") || "/";
export const canonicalUrl = (path: string) => `${SITE_URL}${normalizePath(path) === "/" ? "/" : `${normalizePath(path)}/`}`;

export interface PageMetadata {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

export function getPages(): PageMetadata[] {
  return [
    { path: "/", title: "Snowmobile Comparisons & Buying Guides | SledSpec.com", description: "Compare selected snowmobiles by model year, engine and intended use. Explore sourced specifications, buying tradeoffs and practical ownership guides." },
    { path: "/about", title: "About & Editorial Methodology | SledSpec.com", description: "Understand SledSpec's research method, selected model coverage, source limitations, corrections and the difference between research and hands-on testing." },
    { path: "/guides", title: "Snowmobile Buying & Ownership Guides | SledSpec.com", description: "Practical snowmobile guides with buying worksheets, specification examples, terrain tradeoffs, maintenance checklists and safety resources." },
    ...guides.map(g => ({ path: `/guides/${g.id}`, title: `${g.title} | SledSpec.com`, description: g.summary })),
    ...snowmobiles.map(s => ({ path: `/sled/${s.id}`, title: `${s.year ?? "Archive"} ${s.brand} ${s.model} | SledSpec.com`, description: s.tagline })),
    { path: "/faq", title: "Snowmobile Questions & Answers | SledSpec.com", description: "Understand snowmobile tracks, engine choices, purchasing costs, safety preparation and maintenance with clear answers and links to detailed guides." },
    { path: "/contact", title: "Contact & Report a Correction | SledSpec.com", description: "Find SledSpec's email contact and learn what to include when reporting a specification error, source correction or website issue." },
    { path: "/privacy", title: "Privacy & Data Practices | SledSpec.com", description: "How SledSpec's static comparison site handles local interactions, email contact, external resources and future advertising." },
    { path: "/terms", title: "Terms of Use & Content Limitations | SledSpec.com", description: "Read the terms for using SledSpec's research-based comparisons, including limitations on specifications, availability, safety and purchasing information." },
  ];
}

export function getPageMetadata(path: string): PageMetadata {
  const normalized = normalizePath(path);
  return getPages().find(p => p.path === normalized) ?? {
    path: normalized,
    title: "Page Not Found | SledSpec.com",
    description: "This page could not be found. Browse snowmobile comparisons and buying guides on SledSpec.",
    noindex: true,
  };
}