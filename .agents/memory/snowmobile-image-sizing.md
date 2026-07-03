---
name: Snowmobile image sizing
description: Why sled images appear different sizes and how to normalize them project-wide
---

# Sled image visual size is content-driven, not CSS-fixable

The image containers are already uniform (`object-fit: contain`, fixed heights, white bg). When sleds "look bigger/smaller than each other", the cause is the SOURCE images: each has a different aspect ratio AND a different amount of baked-in whitespace around the sled. `object-fit` alone cannot equalize this.

**Fix:** normalize the source images so each sled occupies the same fraction of an identical canvas. Sleds are clean cutouts on (near-)white backgrounds, so ImageMagick trim works:
`magick <src> -fuzz 6% -trim +repage -resize 840x430 -background white -gravity center -extent 900x480 -quality 90 <out>.jpg`
Then re-pad every one onto the same 900x480 white canvas. Output JPG (white bg baked in) — 23 sleds ≈ 1.6MB total; PNG would be far larger.

**Why:** verified in-browser that identical containers still showed wildly different sled scales; the variation is entirely in the pixels, so it must be fixed at the asset level.

**How to apply:** normalized files live at `attached_assets/norm_id01.jpg .. norm_id23.jpg` where NN = sled `id`. Imports in `snowmobiles.ts` point each sled's image var at its `norm_idNN.jpg`. If a sled's image is replaced, re-run the trim+repad recipe to the matching `norm_idNN.jpg` so it stays uniform. The original source images remain in `attached_assets` (unused, harmless).
