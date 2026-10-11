# Consolidation recommendations

Date: 2026-10-11. **Recommendations only.** No article was deleted, merged or
redirected. Each item needs the owner's approval before anything changes, and
any merge needs a 301 in `vercel.json` from the retired URL to the kept one.

The test applied: would a reader who lands on one page be better served by
the other? Two pages that teach different constructions are not duplicates,
even if they make similar objects.

## Recommended for a decision

### 1. Ghost mini wallet vs Halloween card wallet

- `/ghost-crochet-mini-wallet/`: fixed counts, 16 sc, pocket for a card and a
  folded bill, tapered flap, ch-5 loop.
- `/halloween-crochet-card-wallet/`: teaches sizing a pocket from your own
  cards, 16 sc, flat ghost appliqué, ch-4 loop.
- Overlap: same width, same fold, same button loop idea, both Halloween.
  Each page already links to the other and explains the difference.
- **Option A (recommended):** keep both. They now differ in purpose (fixed
  pattern vs sizing method) and the cross-links say so.
- **Option B:** fold the mini wallet's bill-depth pocket into the card wallet
  as a variation and redirect `/ghost-crochet-mini-wallet/` to it.

### 2. Ghost crochet wallet vs ghost mini wallet

- `/ghost-crochet-wallet/` is a ghost-shaped two-panel wallet with an edging
  round and hidden snap. `/ghost-crochet-mini-wallet/` is a rectangle with a
  face embroidered on the flap.
- The names are close enough to compete for "ghost crochet wallet" searches.
- **Recommendation:** keep both, but retitle the mini wallet around what makes
  it different, for example "Ghost Flap Wallet for a Card and a Folded Bill".
  A title change keeps the URL, so no redirect is needed.

### 3. Earbud pouch vs gothic bat earbuds pouch

- `/how-to-crochet-an-earbud-pouch/`: sizing from the case perimeter, 27-stitch
  example.
- `/gothic-bat-earbuds-pouch/`: the same cup in a 30-stitch example, plus
  shaped and sewn-on parts (ears, wings).
- The bat page already defers sizing to the earbud page.
- **Recommendation:** keep both. Consider making the bat page explicitly
  "a variation on the earbud pouch" in its opening sentence.

### 4. Ghost coin pouch, ghost candy bag, pumpkin treat bag

- After the earlier library pass these teach different things: an eyelet
  round (coin pouch), large eyelets and a twisted cord (candy bag), and an
  increase-then-decrease bulge (treat bag).
- **Recommendation:** keep all three. Re-review only if search data later
  shows them competing for the same queries.

### 5. Halloween and Christmas granny square variations

- Same stitch, different color problems (candy-corn order and dark joins vs
  red against green). Each links to the other.
- **Recommendation:** keep both. Seasonal searches are distinct.

### 6. Beginner scarf vs hooded scarf

- Both start with chain 26 and 24 hdc at the same example gauge. The hooded
  scarf adds a folded hood panel and spends much of its length explaining why
  the old hood size was wrong.
- **Recommendation:** keep both. Consider moving the hood-sizing correction
  into a shorter "Mistakes" entry once a hood has been made and measured; at
  3,000 words the page is well over the 1,800-word guideline.

## Not recommended

- Merging the five Halloween wallets into the hub. Each is a distinct
  construction (both sides of a chain, two-panel edging, sideways back-loop
  ribs, buttonhole and divider, pointed flap with embroidery). The hub
  `/halloween-crochet-wallets/` already compares them.
- Merging any course step. `LEARNING_PATH` depends on each slug.

## Length outliers to review (not merges)

20 published articles exceed 1,800 words (see `ARTICLE_QUALITY_MATRIX.csv`,
column `in_length_range`). Most are patterns whose length comes from
counts, checkpoints and tables, which readers need. The ones carrying the
most explanation of past mistakes, and so the best candidates for trimming,
are the hooded scarf (about 3,000 words), bowl cozy (about 3,000) and lace
bandana (about 2,500).
