# SVG step-by-step inventory

Date: 2026-10-11. Generated from the articles by
`node scripts/step-diagrams/inventory.mjs`. Rerun it after any change.

## How the step diagrams are made

- Source: `scripts/step-diagrams/`. `lib.mjs` holds the drawing primitives,
  `generic.mjs` the shared diagrams, and `articles-a.mjs` to `articles-l.mjs`
  one batch each, with a `placements` list naming the article, the paragraph
  the figure follows, and its caption.
- Size: 480 units wide, text 20 units or larger, so labels stay readable at a
  288 px content width on a 320 px phone. The validator fails any 480-wide
  file with smaller text.
- Accuracy: `roundChart` throws an error if a round's written repeat does not
  produce its stated count, so a round chart cannot disagree with its text.
  `foldSeam` draws flat and folded pieces to true scale from the inches the
  article gives. Every other count was checked by hand against the article
  before the diagram was drawn. Nothing in a diagram comes from outside the
  article it sits in.
- Alt text is the SVG's own `<desc>`. `refresh.mjs` re-syncs it if a
  diagram changes.
- Workflow per batch: `build.mjs` (write SVGs), `preview.mjs` (288 px
  contact sheet for review), `inject.mjs` (place into articles),
  `refresh.mjs` (sync alt text).

## Diagrams the brief asked for by name

| Request | Diagram | Where |
| --- | --- | --- |
| Wallet foundation turn | `cat-wallet-turn.svg`: CORRECT 16 + 16 = 32 vs COMMON MISTAKE 16 + 15 = 31, with the 33 case in the caption | `/black-cat-crochet-wallet/` |
| Granny corner vs side spaces | `granny-side-space.svg`: CORRECT cluster in the ch-1 space vs COMMON MISTAKE cluster in a stitch top; `granny-round-1/2/4.svg` for corners and side spaces per round | Halloween and Christmas granny variations, granny square tote, Halloween coasters |
| Measure a pouch flat before seaming | `foldSeam` diagrams drawn to scale, each with a "Flat: ... wide, ... tall" line: phone case, makeup pouch, gift card holder, laptop sleeve, mini shoulder bag, phone crossbody, card wallet | See the table below |

## CORRECT vs COMMON MISTAKE comparisons

`turn-first-stitch.svg` (first stitch after the turning chain), `join-round-slst.svg`
(join into the first real stitch), `increase-stagger.svg` (round circle vs
hexagon), `cat-wallet-turn.svg`, `granny-side-space.svg`, plus the comparisons
inside earlier batches (for example whipstitch through outer loops).

## Articles without step diagrams, and why

Charts and lookups (abbreviations, hook sizes, yarn weights), round-ups and
gear pages (gift ideas, free pattern sources, yarn for Christmas, what you
need, the Halloween wallet hub) have no steps to draw. Technique pages that
already had diagrams for every step (basic stitches, gauge, reading a
pattern, color change, weaving in ends, left-handed, flower, fall leaf,
snowflake) were left alone, and so were the ghost, pumpkin, spiderweb and witch
hat wallets, which carry four or five construction diagrams each.

## Per-article inventory

Published articles: 69. Step-diagram placements: 123. Distinct step diagrams: 80. Articles with at least one: 46.

| Article | Step diagrams (480 wide) | Older diagrams (640 wide) |
| --- | --- | --- |
| `/free-pattern-halloween-coasters/` | magic-ring (Magic ring, step by step); increase-stagger (Flat circle: stagger the increases); granny-round-1 (Granny square round 1); granny-round-2 (Granny square round 2); granny-side-space (Side clusters go into spaces) | 2 |
| `/how-to-crochet-a-granny-square-tote/` | granny-round-1 (Granny square round 1); granny-round-2 (Granny square round 2); granny-round-4 (Granny square round 4); granny-side-space (Side clusters go into spaces); sc-seam-two-layers (Joining two pieces with single crochet) | 2 |
| `/how-to-crochet-a-phone-case/` | phone-case-step-1 (Chain 17, then 16 sc); turn-first-stitch (After ch 1 and turn: where the first sc goes); phone-case-step-2 (Rows 2 to 70: 16 sc every row); phone-case-step-3 (Fold in half, seam both sides); whipstitch-outer-loops (Whipstitch seam: outer loops only) | 1 |
| `/crochet-santa-amigurumi-for-beginners/` | magic-ring (Magic ring, step by step); invisible-decrease (Invisible decrease for amigurumi); santa-profile (Santa body and head, round by round); santa-hat-profile (Santa hat, tip to brim) | 1 |
| `/how-to-crochet-a-chunky-beanie/` | beanie-step-1 (Brim: chain 9, then 8 sc); blo-rib (Back-loop-only rib); beanie-step-2 (Crown round 1: 50 to 45); beanie-step-3 (The crown by stitch count) | 1 |
| `/how-to-crochet-a-laptop-sleeve/` | laptop-step-1 (Chain 54, then 53 sc); laptop-step-2 (Rows 2 to 90: 53 sc); laptop-step-3 (Fold, then sc both sides); sc-seam-two-layers (Joining two pieces with single crochet) | 1 |
| `/how-to-crochet-a-makeup-pouch/` | makeup-pouch-step-1 (Chain 29, then 28 sc); turn-first-stitch (After ch 1 and turn: where the first sc goes); makeup-pouch-step-2 (Fold row 1 up to row 50); sc-seam-two-layers (Joining two pieces with single crochet) | 1 |
| `/how-to-crochet-a-market-bag/` | magic-ring (Magic ring, step by step); market-bag-step-1 (Base: rounds 1 to 17); increase-stagger (Flat circle: stagger the increases); market-bag-step-2 (Mesh round 1 on 96) | 1 |
| `/how-to-crochet-a-mini-shoulder-bag/` | shoulder-bag-step-1 (Chain 28, then 27 sc); turn-first-stitch (After ch 1 and turn: where the first sc goes); shoulder-bag-step-2 (Fold, seam, then the top round); shoulder-bag-step-3 (Strap: chain 5, then 4 sc) | 1 |
| `/how-to-crochet-a-wine-bottle-bag/` | magic-ring (Magic ring, step by step); wine-bag-step-1 (Base: rounds 1 to 7); wine-bag-step-2 (Eyelet round on 40); wine-bag-step-3 (The whole bag by stitch count) | 1 |
| `/how-to-crochet-an-earbud-pouch/` | magic-ring (Magic ring, step by step); earbud-step-1 (Base: rounds 1 to 5); earbud-step-2 (The whole pouch by stitch count); earbud-step-3 (Flap: 6 rows over 9 stitches) | 1 |
| `/how-to-crochet-fingerless-gloves/` | gloves-step-1 (Cuff: chain 9, then 8 sc); blo-rib (Back-loop-only rib); gloves-step-2 (Round 2: 24 to 28); join-round-slst (Joined rounds: keep the seam straight) | 2 |
| `/crochet-ghost-amigurumi-for-beginners/` | magic-ring (Magic ring, step by step); invisible-decrease (Invisible decrease for amigurumi); ghost-profile (Standing ghost, round by round) | 1 |
| `/crochet-in-the-round/` | magic-ring (Magic ring, step by step); join-round-slst (Joined rounds: keep the seam straight); flat-circle (A flat circle in single crochet) | 1 |
| `/crochet-increase-decrease/` | invisible-decrease (Invisible decrease for amigurumi); increase-stagger (Flat circle: stagger the increases); flat-circle (A flat circle in single crochet) | 1 |
| `/crochet-mug-cozy-for-beginners/` | mug-cozy-step-1 (Chain 13, then 12 sc); turn-first-stitch (After ch 1 and turn: where the first sc goes); mug-cozy-step-2 (Rows around the mug) | 2 |
| `/ghost-crochet-mini-wallet/` | mini-wallet-step-1 (Chain 17, then 16 sc); turn-first-stitch (After ch 1 and turn: where the first sc goes); mini-wallet-step-2 (Row 34: the button loop) | 1 |
| `/gothic-bat-earbuds-pouch/` | magic-ring (Magic ring, step by step); bat-pouch-step-1 (Body base: rounds 1 to 5); bat-pouch-step-2 (Flap: 6 rows over 10 stitches) | 1 |
| `/how-to-crochet-a-cable-organizer/` | cable-step-1 (Chain 9, then 8 sc); turn-first-stitch (After ch 1 and turn: where the first sc goes); cable-step-2 (Row 24: the buttonhole) | 1 |
| `/how-to-crochet-a-ghost-coin-pouch/` | magic-ring (Magic ring, step by step); coin-pouch-step-1 (Base: rounds 1 to 5); coin-pouch-step-2 (The whole pouch by stitch count) | 1 |
| `/how-to-crochet-a-gnome/` | magic-ring (Magic ring, step by step); gnome-body-profile (Gnome body, top down); gnome-hat-profile (Gnome hat, tip down) | 1 |
| `/how-to-crochet-a-lip-balm-holder/` | magic-ring (Magic ring, step by step); lip-balm-step-1 (Base: rounds 1 and 2); lip-balm-step-2 (The whole holder by stitch count) | 1 |
| `/how-to-crochet-a-phone-crossbody/` | crossbody-step-1 (Chain 16, then 15 sc); crossbody-step-2 (Fold in half and seam); crossbody-step-3 (Flap: stitches 5 to 11 of the back) | 1 |
| `/how-to-crochet-a-pumpkin-treat-bag/` | treat-bag-step-1 (Round 13: widen to 54); treat-bag-step-2 (Round 22: back to 48); treat-bag-step-3 (The bag by stitch count) | 1 |
| `/bat-amigurumi-wings-body-and-ears/` | magic-ring (Magic ring, step by step); invisible-decrease (Invisible decrease for amigurumi) | 1 |
| `/how-to-crochet-a-book-sleeve/` | book-sleeve-step-1 (Chain 23, then 22 sc); turn-first-stitch (After ch 1 and turn: where the first sc goes) | 2 |
| `/how-to-crochet-a-bowl-cozy/` | bowl-cozy-step-1 (Chain 49, then 48 sc); turn-first-stitch (After ch 1 and turn: where the first sc goes) | 3 |
| `/how-to-crochet-a-christmas-gift-card-holder/` | gift-card-step-1 (Chain 17, then 16 sc); gift-card-step-2 (Fold 9 rows up, not in half) | 1 |
| `/how-to-crochet-a-christmas-tree/` | magic-ring (Magic ring, step by step); tree-cone-profile (Tiered cone tree, round by round) | 1 |
| `/how-to-crochet-a-ghost-candy-bag/` | candy-bag-step-1 (Base: rounds 1 to 9); candy-bag-step-2 (Round 33: nine large eyelets) | 1 |
| `/how-to-crochet-a-lace-bandana/` | bandana-step-1 (Lace bandana row 1); bandana-step-2 (Lace bandana rows 1 to 4) | 2 |
| `/how-to-crochet-a-pumpkin-step-by-step/` | magic-ring (Magic ring, step by step); invisible-decrease (Invisible decrease for amigurumi) | 1 |
| `/how-to-crochet-a-pumpkin-zipper-pouch/` | zipper-pouch-step-1 (Base: rounds 1 to 8); zipper-pouch-step-2 (The pouch by stitch count) | 1 |
| `/how-to-crochet-a-scrunchie/` | turn-first-stitch (After ch 1 and turn: where the first sc goes); scrunchie-step-3 (Closing the strip around the elastic) | 1 |
| `/how-to-crochet-a-spider-and-web/` | magic-ring (Magic ring, step by step); invisible-decrease (Invisible decrease for amigurumi) | 1 |
| `/how-to-crochet-a-tumbler-sleeve/` | tumbler-step-1 (Chain 19, then 18 sc); tumbler-step-2 (Tumbler sleeve wedge: four short rows) | 1 |
| `/how-to-crochet-an-ear-warmer/` | ear-warmer-step-1 (Chain 13, then 12 sc); blo-rib (Back-loop-only rib) | 2 |
| `/how-to-crochet-slippers/` | slipper-step-1 (Three pieces per slipper); turn-first-stitch (After ch 1 and turn: where the first sc goes) | 1 |
| `/black-cat-crochet-wallet/` | cat-wallet-turn (Round 1: turning onto the chain's underside) | 5 |
| `/christmas-granny-square-variations/` | granny-side-space (Side clusters go into spaces) | 1 |
| `/crochet-turning-chain/` | turn-first-stitch (After ch 1 and turn: where the first sc goes) | 3 |
| `/halloween-crochet-card-wallet/` | card-wallet-fold (Measure flat, then fold 12 rows up) | 1 |
| `/halloween-granny-square-variations/` | granny-side-space (Side clusters go into spaces) | 1 |
| `/how-to-crochet-a-baby-blanket/` | blanket-step-1 (Chain 92, then 90 hdc) | 2 |
| `/how-to-crochet-a-beginner-scarf/` | hooded-scarf-step-1 (Chain 26, then 24 hdc) | 3 |
| `/how-to-crochet-a-hooded-scarf/` | hooded-scarf-step-1 (Chain 26, then 24 hdc) | 4 |
| `/basic-crochet-stitches/` | none | 8 |
| `/changing-yarn-color-crochet/` | none | 1 |
| `/crochet-abbreviations-chart/` | none | 2 |
| `/crochet-bag-charm-ideas/` | none | 1 |
| `/crochet-christmas-gift-ideas/` | none | 0 |
| `/crochet-gauge/` | none | 2 |
| `/crochet-hook-size-conversion-chart/` | none | 0 |
| `/easy-crochet-christmas-ornaments/` | none | 1 |
| `/ghost-crochet-wallet/` | none | 4 |
| `/halloween-crochet-wallets/` | none | 1 |
| `/how-to-crochet-a-fall-leaf/` | none | 1 |
| `/how-to-crochet-a-simple-flower/` | none | 2 |
| `/how-to-crochet-a-snowflake/` | none | 1 |
| `/how-to-read-a-crochet-pattern/` | none | 2 |
| `/left-handed-crochet/` | none | 1 |
| `/pumpkin-crochet-wallet/` | none | 5 |
| `/spiderweb-crochet-wallet/` | none | 4 |
| `/weaving-in-ends-and-blocking/` | none | 1 |
| `/what-you-need-to-start-crocheting/` | none | 2 |
| `/where-to-find-free-crochet-patterns/` | none | 0 |
| `/witch-hat-crochet-wallet/` | none | 4 |
| `/yarn-for-christmas-crochet/` | none | 1 |
| `/yarn-weight-chart/` | none | 1 |
