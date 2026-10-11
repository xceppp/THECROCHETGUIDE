# Premium batch 1 report

Checks below passed before this release. Production before the release was `3ccacddb616a7acd7400c343e0402d04d8423caf`.

The 4-H handbook, Crochet Made Easy, and the DK guide are not in this workspace. They were not used. Head sizes on the ear warmer are the Craft Yarn Council chart. Every other number below was checked as arithmetic.

Selection notes are in `planning/premium-batch-1-selection.md`.

## The five

| URL | Before | After | What was weak | What the rewrite teaches |
| --- | --- | --- | --- | --- |
| `/how-to-crochet-a-beginner-scarf/` | 776 words | 1,190 | 24 stitches and 150 rows sat on one unverified gauge. | Width is stitches times stitch size. The same 24 stitches are 8 inches at 3 per inch and 9.6 inches at 0.4 inch each. Chain-2 is not a stitch. Rows per inch are measured separately. |
| `/how-to-crochet-a-baby-blanket/` | 802 | 1,090 | Same stitch as the scarf, without a washed-gauge comparison. | 30 inches is 90 stitches at 3 per inch (chain 92) and 105 at 3.5 per inch (chain 107). Wash the swatch first. No buttons, flowers, or ties. |
| `/how-to-crochet-an-ear-warmer/` | 1,034 | 1,325 | Stitch gauge was copied into the row gauge, and a 2 inch ease cut was treated as a fit. | The chain is the width. The rows are the circumference. 12 ÷ 3.5 is about 3.4 inches. 20 × 3.5 is 70 rows only if the rows really are 3.5 per inch. |
| `/how-to-crochet-a-simple-flower/` | 980 | 1,149 | Filming and color advice. The leaf count was easy to miss. | One petal per center stitch: chain 2, 3 double, chain 2, slip stitch. The closing slip stitch is not a sixth stitch. The leaf is 6 stitches on one side of chain 7, not a two-sided leaf. |
| `/how-to-crochet-a-book-sleeve/` | 1,125 | 1,383 | 22 by 60 was stated without the fold. 120 yards was not weighed. | 5 + 0.5 = 5.5, times 4 = 22. Three quarters of 8 is 6, times 2 is 12, times 5 rows = 60. The half inch and the spine allowance are planning gaps, not a fitted sleeve. |

Word counts include Markdown. They are not the reason an article was kept.

## Errors corrected

- Scarf: copying 24 stitches onto a looser gauge makes a 9.6 inch scarf, not an 8 inch one.
- Blanket: 90 stitches and 105 stitches are different gauges for the same 30 inch target. They must not be mixed with each other's row counts.
- Ear warmer: 3.5 stitches per inch does not mean 3.5 rows per inch. The 2 inch ease cut and the "overlap eats an inch" line are no longer instructions.
- Flower: a one-pass leaf was easy to read as a finished botanical leaf. The 2 to 2.5 inch width is labeled unmeasured. Time, camera, and glue claims are gone.
- Book sleeve: 120 yards is withdrawn. Rain protection was already denied and stays denied.

## Diagrams added

- `public/diagrams/scarf-width.svg`
- `public/diagrams/scarf-first-stitch.svg`
- `public/diagrams/blanket-width.svg`
- `public/diagrams/ear-warmer-directions.svg`
- `public/diagrams/ear-warmer-seam.svg`
- `public/diagrams/flower-petals.svg`
- `public/diagrams/flower-leaf.svg`
- `public/diagrams/book-sleeve-width.svg`
- `public/diagrams/book-sleeve-fold.svg`

The scarf also reuses the existing half-double diagram. No new concept art.

## Still needs yarn

Every gauge on these pages. Whether a ribbed band cut shorter than the head will go on. Whether a flower lies flat in a given yarn. Whether the book actually slides into the folded sleeve. No yardage was weighed. Nothing was washed except as an instruction to the reader.

## Files

The five Markdown articles above, the nine SVGs, this report, `planning/premium-batch-1-selection.md`, and `planning/PREMIUM_BATCH_1_QUALITY_MATRIX.csv`.

## Tests

- Arithmetic script: all listed identities matched.
- `npm run check`: 0 errors, 4 hints.
- `npm run build`: 82 pages, exit 0.
- Internal links from published pages: 0 broken.
- SVGs: 31 valid, none unused.
- Sitemap: 78 URLs, 0 duplicates. `ads.txt` unchanged.
- Each page's canonical is its own URL. Structured data is BlogPosting and BreadcrumbList. None of the five emits HowTo.
- At 320px, each page's first diagram sits inside the column (272px wide, inset 24px) and the page does not overflow.

## Editorial status

Released with the five articles and nine diagrams after the checks in this file.
