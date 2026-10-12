# Tutorial construction pass, 12 October 2026

Branch `content/revised-articles`, on top of `9a96a05`.

This pass makes the counted wallet and tote diagrams readable on a phone and removes pictures that show a different object from the written pattern. It does not claim a physical sample, a measured yardage, or a load rating.

## What changed

- Twenty-two wallet diagrams that were 640 units wide with 16-unit type were redrawn as 480-wide text panels with 22-unit type. On a 360 px screen, after the article's 24 px side padding, that type renders at about 14 px.
- `tote-assembly.svg`, `card-wallet-layout.svg`, `cat-wallet-finished.svg`, and `ghost-wallet-flap.svg` were redrawn the same way. The tote diagram states two flat panels, a 19-stitch square edge, a 38-stitch panel seam, an open top, and strap placement 8 + 5 + 8 + 5 + 8 on a 34-stitch panel top. There is no base.
- The granny-tote picture of a boxed bag was removed from the article and renamed so it is not the listing image. The sentence that described that picture was removed.
- Zipper pouches, kiss-clasp coin purses, and a side-button spiderweb picture were removed from the wallet articles. Listings now use the flap, scalloped-ghost, rib, or loop pictures that match the written closure.
- The pumpkin stem-on-tab picture was removed from the article. The stem diagram says to sew the stem on the back rim. The listing image is the flat ribbed piece.
- The market-bag band and each handle now say to fasten off before the next piece is sewn on. A changed handle length uses the same row count for the second handle.

`scripts/step-diagrams/wallet-readable.mjs` is the source for the twenty-two wallet panels.

## Left as already specified

The row and round counts from the previous revision were not rewritten. AirPods 20 then 26, the ghost 17-stitch scallop and 19-stitch variation, the witch-hat divider and buttonhole, the glove thumb gaps, the tumbler short-row return, and the hood fold were already counted in that revision.

Reference charts, gear pages, and idea roundups were not forced into a project template. The Halloween wallet page stays a comparison and links to the five complete patterns.

## Still small on a phone

These drawings keep 20-unit labels inside a fixed picture, so the type renders at about 13 px on a 360 px screen. Raising the type further collides with the stitches:

`card-wallet-fold.svg`, `cat-wallet-turn.svg`, `folded-wallet-row-pairs.svg`, `ghost-pocket-orientation.svg`, `mini-wallet-step-1.svg`, `mini-wallet-step-2.svg`, `turn-first-stitch.svg`.

## Checks

- `npm run check`: 0 errors, 0 warnings, 8 hints. The duplicate-id lines are the known Windows path warning.
- `npm run build`: 85 pages.
- `node scripts/validate-diagrams.mjs`: 196 SVG files, 0 invalid. No 640-wide diagram still has text under 16 units.
- `node scripts/check-internal-links.mjs`: 0 broken links from published articles.

No browser was opened. A file check of the built HTML is not a browser review.

## Still needs a physical sample

Card clearance in each wallet, the AirPods oval and lid, whether the witch-hat divider stops a card from crossing, hood fit on a wearer, and whether a loaded market bag or tote holds its shape. None of those were tested with yarn.
