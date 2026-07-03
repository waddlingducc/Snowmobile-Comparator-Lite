---
name: Snowmobile spec consistency
description: Spec numbers in the snowmobile-compare artifact are duplicated across several files; changing one must update all, and some specs are model-year sensitive.
---

# Snowmobile spec cross-file consistency

Every numeric spec (hp, weight, price, track length) for a sled in
`artifacts/snowmobile-compare` is repeated in prose in **multiple places**:

- `src/data/snowmobiles.ts` — the source-of-truth `SPECS`, but each entry also
  restates numbers inside its `tagline` and `description` strings.
- `src/data/guides.ts` — buyer-guide bodies name specific models with specific
  hp/price figures.
- `src/pages/FaqPage.tsx` — FAQ answers cite specific models/prices.

**Rule:** when you change any spec field, grep the whole `src` tree for the old
number AND the model name, and update taglines/descriptions/guides/FAQ to match.
A field-only edit leaves the site self-contradicting on the same page load.

**Why:** an accuracy pass that only touched the data fields left `HomePage`,
`FaqPage`, and `guides.ts` displaying the old prices/hp — the page contradicted
its own dataset. Caught only by a cross-file grep during review.

**How to apply:** HomePage's "Most Powerful / Lightest / Most Affordable / Most
Expensive" quick-stats are now DERIVED from the `snowmobiles` array via a
`useMemo` (maxBy/minBy) — do not reintroduce hardcoded extremes there. For the
other prose, there is no derivation; grep is the safety net.

## Model-year sensitive specs (verify against the entry's `year`)

- Rotax **900 ACE Turbo**: 150 hp pre-2022, **130 hp for 2022+** (non-intercooled);
  the **Turbo R** is 180 hp. Match the figure to the model year and the exact
  engine variant named in the entry.
- Polaris **Titan Adventure**: 800 Cleanfire 2-stroke was discontinued after 2023;
  current (2025-2027) options include the **650 Patriot** (~130 hp) and 850 Patriot.
- Yamaha naming: **L-TX = 137"** track, **S-TX = 146"**. Don't swap them.
- Yamaha **Transporter Lite**: Yamaha publishes no official hp; ~40-50 hp is the
  defensible community estimate (not 65).
