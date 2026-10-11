# Premium batch 1 report (second run)

Local only. Not committed and not deployed. Production is `c663d3c8254984089c78580fd8d8b341b71bd5d6`, which already contains the first run of this batch (scarf, baby blanket, ear warmer, flower, book sleeve). The report for that run is in that commit. AdSense was not submitted.

Benchmark: `/how-to-crochet-a-bowl-cozy/` and `/how-to-crochet-a-hooded-scarf/`.

## Articles

| URL | Words before | Words after | Diagrams added | Illustrations removed |
| --- | --- | --- | --- | --- |
| `/how-to-crochet-a-lace-bandana/` | 1366 | 2154 | 2 | 3 |
| `/how-to-crochet-fingerless-gloves/` | 1024 | 2190 | 2 | 3 |
| `/free-pattern-halloween-coasters/` | 1268 | 2039 | 2 | 0 |
| `/how-to-crochet-a-granny-square-tote/` | 1562 | 2097 | 2 | 3 |
| `/crochet-mug-cozy-for-beginners/` | 1238 | 1735 | 2 | 1 (a duplicate) |

Word counts are the Markdown body with tags stripped, so tables count. The increase comes mostly from worked-example tables, checkpoints, and troubleshooting, not from longer introductions. All five run longer than the 1,000–1,800 range in AGENTS.md. The brief asked for no fixed length, and the benchmarks run about 2,760.

## Technical errors corrected

**Lace bandana**
- The page said the chain worked into is the point. It is the middle of the long edge. Every row is a V whose ends make the long edge and whose corner moves toward the point.
- Row 2 was listed as 9 dc. Four shells are 12. Row n is 6n dc with 2(n − 1) chain-1 spaces.
- The page said a deep point could be fixed by stopping earlier for a "shallower cloth" at the same long edge. With a square granny corner, depth is about half the long edge. The fix is a shorter long edge and longer ties.
- "Chain 70" for a 12 inch tie assumed a chain gauge. Removed. Ties are now chained to length and slip-stitched back.
- The 80-yard figure was withdrawn. It is replaced by a forecast from the reader's own six rows: the stitch total through row N is 3N(N + 1).

**Fingerless gloves**
- The cuff called 28 rows 7 inches at 4 rows per inch. The page's own gauge was 5 rows per inch, which makes 5.6 inches. The cuff is now sized from the wrist: 6 in × 5 = 30 rows.
- Round 1 put one sc in each row end. At 5 rows per inch against 4 stitches per inch, that flares. Round 1 is now 4 sc per 5 row ends (24), then round 2 increases to 28.
- The thumb round chained 6 over 4 skipped stitches, which turns 28 into 30. It is now skip 5, chain 5, centered on stitch 14 opposite the join.
- The page warned about making "two right hands." With the gap opposite the join, both gloves are identical. The same warning in `crochet-christmas-gift-ideas.md` was corrected.
- The 140-yard figure was withdrawn.

**Halloween coasters**
- The granny coaster "about 4.5 inches" and the dishcloth "8–8.5 inches" contradicted the tote's "about 5 inches" for the same square. All inch claims for the square were removed. Readers measure.
- The 30 and 60 yard estimates were withdrawn.
- The spiral finish now smooths the step instead of joining to the first stitch as if the rounds were joined.

**Granny square tote**
- Counts were right but incomplete. Added: square edge 4n + 3 (19), panel edge 38, top edge 4n + 1 per square (68 around), and strap spacing 8 + 5 + 8 + 5 + 8 = 34 per panel.
- Removed the unsupported claim that acrylic grows while cotton stretches less. Replaced it with: every yarn lengthens under load, and cotton does not spring back.
- The 350-yard figure was withdrawn. It is replaced by weighing one square and one strap section.

**Mug cozy**
- Rows go around the mug, but the length was computed from the stitch gauge: 9 × 4 = 36 "rows". At 5 rows per inch it is 45 rows.
- "One inch less than the circumference" is replaced by a measurement: around the mug minus the handle base.
- The seamed option said to whipstitch "below and above the handle," which is where the handle is attached. A closed tube cannot pass a handle. The seamed option now applies only to cups with no handle.
- The loop is placed on the last row, so a fit correction (adding or removing rows) does not mean cutting off the button.
- Filming and flat-lay advice was removed.

## New educational explanations

- **Bandana:** where a granny triangle starts; why depth is half the long edge; forecasting rows and yarn from six rows.
- **Gloves:** why the cuff is worked sideways; turning row ends into stitches at a 4:5 ratio; why a chain must replace skipped stitches one for one; placing the gap so the gloves are interchangeable.
- **Coasters:** why a flat circle adds about 2π ≈ 6 stitches per round; why one written circle cups for one person and ruffles for another; each extra round adds about half an inch across at the example gauge; staggering increases to avoid a hexagon. The DK guide's 8-stitch and 6-stitch starts are cited as evidence that the rule is not a law.
- **Tote:** the bag is flat with no base; how the size follows the square; counting every seam and edge from one formula; why straps go into the edge, not into a chain space.
- **Mug cozy:** row gauge versus stitch gauge by direction; stripes run up the mug; how the handle dictates the closure; why tapered mugs defeat a straight strip.

## Diagrams added (10, all original SVG, ASCII text)

| File | Article | What it teaches |
| --- | --- | --- |
| `bandana-construction.svg` | Bandana | Start at the middle of the long edge; nested V rows; depth = half the long edge |
| `bandana-row-count.svg` | Bandana | Row 2 in order (12 dc); table of 6n dc and 2(n − 1) spaces |
| `gloves-construction.svg` | Gloves | Flat cuff, ring, hand in rounds; 30 row ends to 24 stitches |
| `gloves-thumb-round.svg` | Gloves | 11 + ch 5 over 5 + 12 = 28; chain 6 over 4 = 30 |
| `coaster-increases.svg` | Coasters | Six wedges; 6n per round; 48 sts → 12 in → 3.8 in |
| `coaster-cup-ruffle.svg` | Coasters | Flat, cupped, ruffled profiles and their causes |
| `tote-assembly.svg` | Tote | Two 2×2 panels; 38 per panel edge; 34-stitch top split |
| `granny-square-edge.svg` | Tote | 2 + 12 + 3 + 2 = 19; 4n + 3 |
| `mug-cozy-strip.svg` | Mug cozy | Chain = height; rows = length; 45 rows, not 36 |
| `mug-cozy-handle.svg` | Mug cozy | Top view; body = around minus handle base; the loop passes inside the handle |

## Illustrations removed or recaptioned

These were removed because they show something the page does not make:
- Bandana: flat layout with flower medallions, worn view with floral lace, and in-progress mesh.
- Gloves: knit-looking cuff, ribbed tube, and finger-stub pair with an eyelet row.
- Tote: whole bags in a different motif, two of them with boxed bases, and needle-sewn squares.
- Mug cozy: a duplicate of the hero image.

Kept images were recaptioned to name what they draw differently from the page: the tote hero's motif and base, the gloves hero's thumb, the mug hero's texture and tab, the pumpkin stem, and the bandana texture. The image files stay in `src/assets/articles/`. Nothing was deleted.

## Still needs physical validation

- Every gauge on these pages: 4 sc and 5 rows to the inch, and the cuff rib at 5 rows per inch.
- Bandana: that the corner blocks square in DK cotton, and the 16 inch edge on a real head.
- Gloves: the half-inch reduction, the thumb gap at half the thumb's circumference, and the 4:5 pickup on a real cuff.
- Coasters: whether 6 increases lie flat in the reader's single crochet, and the 3.8 inch disc.
- Tote: the 5 inch square, seam flatness, strap strength, and behavior under load.
- Mug cozy: loop fit through a real handle, and whether the strip stays put on a warm mug.
- Yardage for all five. None was weighed.

## Files changed

- `src/content/posts/how-to-crochet-a-lace-bandana.md`
- `src/content/posts/how-to-crochet-fingerless-gloves.md`
- `src/content/posts/free-pattern-halloween-coasters.md`
- `src/content/posts/how-to-crochet-a-granny-square-tote.md`
- `src/content/posts/crochet-mug-cozy-for-beginners.md`
- `src/content/posts/crochet-christmas-gift-ideas.md` (one line, the glove mirror claim)
- `public/diagrams/` — the 10 SVGs above (new)
- `planning/premium-batch-1-selection.md`, `planning/PREMIUM_BATCH_1_REPORT.md`, `planning/PREMIUM_BATCH_1_QUALITY_MATRIX.csv`

URLs unchanged. No frontmatter `draft` change. `howTo: true` kept: the site emits only BlogPosting and BreadcrumbList, and the flag controls only the at-a-glance box.

## Tests

| Check | Result |
| --- | --- |
| Arithmetic script (every count, ratio, and conversion above) | batch math ok |
| `npm run check` | 0 errors, 0 warnings, 4 existing hints |
| `npm run build` | 82 pages, 63 social cards, complete |
| `scripts/validate-diagrams.mjs` | 41 SVGs, 0 invalid, none unused |
| New SVG integrity | 10 files, title, desc, and viewBox present, 0 non-ASCII characters |
| `scripts/check-internal-links.mjs` | 0 broken from published pages |
| `scripts/check-premium-release.mjs` | sitemap 78 locations, 0 duplicates; ads.txt ok |
| Built pages | canonicals correct; JSON-LD BlogPosting + BreadcrumbList; no HowTo; all five in sitemap; every image path exists; article images all have alt text |
| Mobile, local preview, 320px | 5/5 pages overflow 0; diagrams 272px wide, left 24, right 296; no table overflow |
| Mobile, local preview, 390px | 5/5 pages overflow 0; diagrams 342px wide, left 24, right 366; no table overflow |
| Rendered review of all 10 diagrams | Labels checked against the text; two overlapping labels moved; the mug handle redrawn for a true top view |

Status: ready for editorial review. Do not start the next batch until this one is approved.
