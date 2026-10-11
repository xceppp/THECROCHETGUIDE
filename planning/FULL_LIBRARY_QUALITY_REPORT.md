# Full library transformation: consolidated quality report

Date: 2026-10-11. Production is still `5964947`. Everything below is local and uncommitted, waiting for owner approval. Per-group detail is in `planning/FULL_LIBRARY_PROGRESS.md`.

## Totals

| | Count |
| --- | --- |
| Published articles | 63 |
| Already premium before this pass | 12 |
| Queue processed | 51 |
| Articles edited | 49 |
| Reviewed and left unchanged | 2 (`crochet-in-the-round`, `crochet-turning-chain`) |
| Flagged for human validation (H) | 36 |
| New diagrams | 38 (library total 79) |
| Diagrams edited | 1 (`us-uk-terms.svg`) |
| Illustrations removed from page bodies | 68 (files kept on disk) |
| Of those, misleading | 7 |
| Remaining queue | 0 |
| Drafts touched | 0 (all 10 still `draft: true`, none in the build) |

## What changed, by kind

**Arithmetic and geometry that did not work.** Examples: a phone sleeve chained to the face width only; a gift-card pocket deeper than the card; a 5-stitch scallop repeated on 36 stitches; cones for the gnome and tree built upside down; a triangle that could never reach 3 stitches; slipper caps with no room for a foot; a beanie body picked up from the rib's row gauge; a pattern-reading sample row that could not give its own count; and an increase check written as 8 x 3 instead of 6 x 4.

**Invented numbers withdrawn.** Every unweighed yardage figure and time estimate across the project pages is gone. Yardage tables on the yarn pages became a weigh-and-multiply method. Unsourced wraps-per-inch values and the "half a stitch per hook size" figure were removed.

**Reference charts checked against the Craft Yarn Council.** Hook sizes 9 mm and up, CYC in-between sizes, the lace row, triple treble (`trtr`), the UK slip stitch (`ss`), and the size 8 announcement. Legacy UK hook numbers and steel sizes are now labeled approximate.

**Duplicated pages separated.** The folded-rectangle pouches, drawstring bags, and small cases each now teach a different skill rather than repeating one body.

**Images.** Generic step illustrations were replaced by labeled diagrams. Seven images were removed because they contradicted the corrected text or showed an untested object posed in use.

## Human validation still needed (36 articles)

These pages are correct on paper but carry instructions nobody has physically worked. Before stronger claims ("tested", fit promises, finished sizes), make a sample:

- G1 small cases (8): phone sleeve fit, earbud pouch, lip balm loop, cable organizer length, gift card grip, coin pouch closure, card wallet, mini wallet.
- G2 bags (8): every fit and ease, strap stretch, the tumbler short-row wedge, and the market bag rim.
- G3 (6): the twisted-cord rule, beanie ease and depth, and slipper fit.
- G4 shaped pieces (9): stuffing proportions, the web chain progression, and whether each cone stands.
- G5 (4): the two granny pages, the ornament star, and the bag charm heart.
- G6 (1): legacy UK and steel hook sizes against a physical gauge.

## Final verification (all passed)

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings |
| `npm run build` | 82 pages |
| Internal links | 0 broken from published pages |
| SVGs | 79 valid, none unused, 3 new ones inspected visually |
| Canonical URL, BlogPosting data, sitemap entry | 63 of 63 |
| Image files resolve, alt text present | 63 of 63 |
| Drafts excluded from build | 10 of 10 |
| Mobile, 320 and 390 px | 0 horizontal overflow, 0 unscrolled tables, 85 diagram embeds load at each width |
| Article metadata | Descriptions 160 characters or less, 1,000+ words, no exclamation marks, US spelling |
| AdSense IDs | Unchanged: `ca-pub-5737689254964633`, ads.txt unchanged |

**Duplication review.** The highest share of 8-word sequences two published pages have in common is 12% (ghost candy bag and pumpkin treat bag). This comes from the shared drawstring and cord method sentences. No pair is close to a duplicate.

**Two findings that are not regressions.** No page emits HowTo structured data, because the helper in `src/lib/seo.ts` is not called anywhere. The `howTo` flag only drives the at-a-glance box. Every page has one empty-alt image, the hidden Pinterest source image, which is decorative on purpose. Both were already like this at `5964947`.

## Release

Not committed, not pushed. When the owner approves, stage only `src/content/posts/`, `public/diagrams/`, and `planning/FULL_LIBRARY_PROGRESS.md` plus this report. Leave the `audit/` dump, `scripts/triage-untested.mjs`, `scripts/inventory-images.mjs`, and `planning/premium-article-template.md` out. Commit with a PowerShell here-string, push `main`, then fast-forward `adsense-recovery` to `main`. Do not submit AdSense.
