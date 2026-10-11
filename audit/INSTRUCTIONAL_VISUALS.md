# Instructional visuals and safety recovery

Local only. Not committed, not pushed, not deployed. AdSense was not submitted.

Base: production commit `d28305533db779ebfb292adaabf9eed6656a97f2`.

## Diagrams created

Twelve original SVGs in `public/diagrams/`, drawn as schematics (yarn paths, hook paths, numbered loops). Each has a `<title>` and `<desc>`. They are not photographs and are not labeled as AI illustrations.

| File | What it shows |
| --- | --- |
| `slip-knot.svg` | Cross the tail, pull a loop through, seat it so it still slides. |
| `foundation-chain.svg` | Front V, back bump, and the live loop that is not a chain. |
| `insert-single-crochet.svg` | Hook under both top loops. |
| `yarn-over.svg` | Working yarn over the hook from back to front. |
| `single-crochet.svg` | Insert, two loops, yarn over and pull through both. |
| `half-double-crochet.svg` | Yarn over first, three loops, pull through all three. |
| `double-crochet.svg` | Three loops, then two pulls of two loops each. |
| `turning-chain.svg` | Single-crochet chain-1 is height, not a stitch. |
| `count-stitches.svg` | Count finished Vs. The loop on the hook is not a stitch. |
| `front-back-loops.svg` | Both loops, front loop only, back loop only. |
| `gauge-swatch.svg` | Measure a window in the middle, not the edge. |
| `uneven-edges.svg` | Equal counts stay straight. Gaining one stitch a row makes a wedge. |

Technique checked against the site's existing US rules and standard stitch order: yarn over is back to front; ordinary stitches use both loops; single crochet does not count its chain-1; half double closes all three loops; double crochet closes two and then two.

These are teaching diagrams. They are not copied from a book.

## Lessons upgraded

- `/basic-crochet-stitches/` — yarn over, slip knot, foundation chain, insertion, single, half double, double, front and back loops.
- `/crochet-turning-chain/` — turning chain, stitch count, uneven edges.
- `/crochet-gauge/` — where to measure a swatch.
- `/how-to-read-a-crochet-pattern/` — counting the Vs a row number refers to.
- `/crochet-abbreviations-chart/` — front loop and back loop next to the `BLO` / `FLO` rows.

Captions start with "Diagram." Raw HTML figures bypass the Markdown caption rewriter, so these are not prefixed with "AI illustration." Existing article photographs were left in place.

Print CSS still hides ordinary article images. `figure.diagram img` prints.

## Technical explanations corrected

- Bowl cozy no longer walks a reader through reheating. The answer to "Can I microwave it?" is no.
- Christmas stocking states that the heel-turn sequence has not been crocheted for this page.
- Christmas tree skirt states both gauge estimates (about 33 inches by stitch gauge, about 36 inches by row height) and does not promise the circle lies flat.
- Slippers state that the pictures are not a worn pair, the inches are not a fit, and the sole is not safe on stairs, tile, or wood.
- Hooded scarf treats the 8-inch seam as a planning guess. The page says to move the seam if the hood sits wrong, and that the scarf has not been worn.

No URL was removed. None of the five pages was set to draft.

## Safety concerns resolved

Bowl cozy:

- Do not microwave it.
- Do not use it as a pot holder, oven mitt, or trivet for a bowl that is too hot to hold.
- Cotton can scorch and burn. Acrylic can melt.
- Metal markers, needles, and metallic thread do not belong in the fabric.
- The page has no heat test and does not claim the cozy protects anyone.

## Unresolved physical testing

Still not made in yarn, so still not proven shapes:

- Stocking heel, foot, and hanging.
- Tree-skirt slit, increases, and whether the circle lies flat.
- Bowl-cozy squares, pinches, and any contact with heat. Heat use stays off the page until someone tests it.
- Slipper sole, cap, and tab on a foot.
- Hooded-scarf fold and face opening on a person.

Temporary withholding is reasonable for the stocking heel and the tree-skirt circle if you do not want untested constructions public. That would be a URL change, so it was not done here.

## Files changed

Modified:

- `src/content/posts/basic-crochet-stitches.md`
- `src/content/posts/crochet-turning-chain.md`
- `src/content/posts/crochet-gauge.md`
- `src/content/posts/how-to-read-a-crochet-pattern.md`
- `src/content/posts/crochet-abbreviations-chart.md`
- `src/content/posts/how-to-crochet-a-bowl-cozy.md`
- `src/content/posts/how-to-crochet-a-christmas-stocking.md`
- `src/content/posts/how-to-crochet-a-christmas-tree-skirt.md`
- `src/content/posts/how-to-crochet-slippers.md`
- `src/content/posts/how-to-crochet-a-hooded-scarf.md`
- `src/styles/global.css`

Added:

- `public/diagrams/*.svg` (12)
- `scripts/build-diagrams.mjs`
- `scripts/validate-diagrams.mjs`
- this report

Existing article photos were not replaced.

## Build results

- `npm run check`: 0 errors, 0 warnings, 3 existing hints in `BaseLayout.astro` and the social-card script. The first sync logged "duplicate id" for the ten edited posts. That is Astro rewriting the same file after the digest changes. Filenames are unique.
- `npm run build`: complete, 86 pages.
- `node scripts/check-internal-links.mjs`: 0 broken links.
- `node scripts/validate-diagrams.mjs`: 12 SVGs, each with title, description, and viewBox; every file is referenced from a lesson.
- Built HTML for the stitch lesson keeps `figure.diagram` and "Diagram." captions.
- Built bowl-cozy HTML contains "Do not microwave this cozy."
- Mobile click-through was not available in this environment. Labels are 26px in a 640-wide viewBox so they stay readable when the figure scales to a phone width. Images use `width: 100%`.

## Approval needed before any deploy

Nothing from this pass is on `main`. Say if you want it committed and pushed.
