// Small pouches worked in the round, and the makeup pouch.
import { chainStart, roundChart, profile, flapPlan, foldSeam } from "./lib.mjs";

const base6 = [
  { label: "Round 1", seq: "sc", times: 6, count: 6, ring: true, text: "6 sc in a magic ring" },
  { label: "Round 2", seq: "inc", times: 6, count: 12, text: "2 sc in each st" },
  { label: "Round 3", seq: "sc,inc", times: 6, count: 18, text: "(sc, 2 sc in next) 6 times" },
  { label: "Round 4", seq: "2sc,inc", times: 6, count: 24, text: "(sc 2, 2 sc in next) 6 times" },
];
const runs = (from, to, count, extra = {}) => Array.from({ length: to - from + 1 }, (_, i) => ({ n: from + i, count, ...extra }));

export const placements = [
  // Earbud pouch
  { slug: "how-to-crochet-an-earbud-pouch", file: "magic-ring.svg", after: "**Round 1:** 6 sc in a magic ring. (6)", caption: "Round 1 starts in a magic ring. The ch 1 that closes the first loop is not a stitch." },
  { slug: "how-to-crochet-an-earbud-pouch", file: "earbud-step-1.svg", after: "**Round 5, for 27:**", caption: "Step 1. Round 5 adds only 3 stitches, one in every eighth, to land on 27." },
  { slug: "how-to-crochet-an-earbud-pouch", file: "earbud-step-2.svg", after: "**Rounds 6–18:**", caption: "Step 2. Rounds 1 to 5 lie flat as the base. With no more increases, rounds 6 to 18 turn up into the wall." },
  { slug: "how-to-crochet-an-earbud-pouch", file: "earbud-step-3.svg", after: "**Row 6:** Sc 3, ch 4, skip 3, sc 3.", caption: "Step 3. The flap is 9 of the 27 stitches. On row 6 the ch 4 replaces 3 skipped stitches and becomes the button loop." },
  // Ghost coin pouch
  { slug: "how-to-crochet-a-ghost-coin-pouch", file: "magic-ring.svg", after: "**Round 1:** 6 sc in a magic ring. (6)", caption: "Round 1 starts in a magic ring. Pull the tail tight before Round 2." },
  { slug: "how-to-crochet-a-ghost-coin-pouch", file: "coin-pouch-step-1.svg", after: "**Round 5:** (Sc 3, 2 sc in next) 6 times. (30)", caption: "Step 1. Six increases a round. Round 5 ends on 30, an even count, which the eyelet round needs." },
  { slug: "how-to-crochet-a-ghost-coin-pouch", file: "coin-pouch-step-2.svg", after: "**Round 18:** Sc in each stitch. (30)", caption: "Step 2. The whole pouch by stitch count. The eyelet round, 16, keeps 30 stitches: 15 sc and 15 chains." },
  // Lip balm holder
  { slug: "how-to-crochet-a-lip-balm-holder", file: "magic-ring.svg", after: "**Round 1:** 6 sc in a magic ring. Pull the ring tight. (6)", caption: "The magic ring closes completely, so the base has no hole for the tube to push through." },
  { slug: "how-to-crochet-a-lip-balm-holder", file: "lip-balm-step-1.svg", after: "**Round 2, for 9:**", caption: "Step 1. Only 3 increases: the base cups on purpose and starts the tube." },
  { slug: "how-to-crochet-a-lip-balm-holder", file: "lip-balm-step-2.svg", after: "**Rounds 3–12:**", caption: "Step 2. Nine stitches on every round from Round 2 to Round 12. The tube is about 2.25 inches around at 4 sc per inch." },
  // Makeup pouch
  { slug: "how-to-crochet-a-makeup-pouch", file: "makeup-pouch-step-1.svg", after: "**Row 1:** Sc in the second chain from the hook", caption: "Step 1. Chain 29 for 28 sc. The foundation edge becomes half of the opening, so keep it loose." },
  { slug: "how-to-crochet-a-makeup-pouch", file: "turn-first-stitch.svg", after: "**Rows 2–50:**", caption: "The first sc of each row goes into the edge stitch, not the ch 1. That keeps 28 stitches, and the opening count of 56." },
  { slug: "how-to-crochet-a-makeup-pouch", file: "makeup-pouch-step-2.svg", after: "Fold so row 1 meets row 50", caption: "Step 2. Drawn to scale: a 7 by 10 inch rectangle folds into a 7 by 5 inch pouch. Row 1 and row 50 together make the 56-stitch opening." },
  { slug: "how-to-crochet-a-makeup-pouch", file: "sc-seam-two-layers.svg", after: "Join yarn at one side seam at the opening.", caption: "Each side seam is one sc in each row end, through both layers, starting in the fold itself." },
];

export default {
  "earbud-step-1.svg": roundChart({
    step: 1,
    title: "Base: rounds 1 to 5",
    rounds: [...base6, { label: "Round 5", seq: "7sc,inc", times: 3, count: 27, text: "(sc 7, 2 sc in next) 3 times" }],
    current: 4,
    note: "Rounds 1 to 4 add 6 each. Round 5 adds 3, for the 27 the case needs.",
  }),
  "earbud-step-2.svg": profile({
    step: 2,
    title: "The whole pouch by stitch count",
    rounds: [{ n: 1, count: 6 }, { n: 2, count: 12 }, { n: 3, count: 18 }, { n: 4, count: 24 }, { n: 5, count: 27 }, { n: 6, count: 27, break: true }, ...runs(7, 18, 27)],
    highlight: [6],
    note: "Base: rounds 1 to 5. Wall: 13 even rounds of 27, about 2.6 in tall at 5 rounds per inch.",
  }),
  "earbud-step-3.svg": flapPlan({
    step: 3,
    title: "Flap: 6 rows over 9 stitches",
    cols: 27,
    flapCols: 9,
    flapRows: 6,
    loop: [4, 3],
    note: "Rows 1 to 5: 9 sc, ch 1 and turn. Row 6: sc 3, ch 4, skip 3, sc 3. The other 18 stitches stay open.",
  }),
  "coin-pouch-step-1.svg": roundChart({
    step: 1,
    title: "Base: rounds 1 to 5",
    rounds: [...base6, { label: "Round 5", seq: "3sc,inc", times: 6, count: 30, text: "(sc 3, 2 sc in next) 6 times" }],
    current: 4,
  }),
  "coin-pouch-step-2.svg": profile({
    step: 2,
    title: "The whole pouch by stitch count",
    rounds: [{ n: 1, count: 6 }, { n: 2, count: 12 }, { n: 3, count: 18 }, { n: 4, count: 24 }, ...runs(5, 15, 30), { n: 16, count: 30, shown: "15+15" }, { n: 17, count: 30, break: true }, { n: 18, count: 30, break: true }],
    highlight: [16],
    note: "Round 16 is the eyelet round: (sc, ch 1, skip 1) 15 times. Round 17 puts 1 sc in each sc and each space, back to 30.",
  }),
  "lip-balm-step-1.svg": roundChart({
    step: 1,
    title: "Base: rounds 1 and 2",
    rounds: [
      { label: "Round 1", seq: "sc", times: 6, count: 6, ring: true, text: "6 sc in a magic ring" },
      { label: "Round 2", seq: "sc,inc", times: 3, count: 9, text: "(sc, 2 sc in next) 3 times" },
    ],
    current: 1,
  }),
  "lip-balm-step-2.svg": profile({
    step: 2,
    title: "The whole holder by stitch count",
    rounds: [{ n: 1, count: 6 }, { n: 2, count: 9 }, { n: 3, count: 9, break: true }, ...runs(4, 12, 9)],
    highlight: [3],
    note: "Rounds 3 to 12 are even, so the fabric turns straight up into a tube.",
  }),
  "makeup-pouch-step-1.svg": chainStart({ step: 1, title: "Chain 29, then 28 sc", n: 29, skip: 1, rowLabel: "Row 1: 28 sc, about 7 in at 4 sc per inch." }),
  "makeup-pouch-step-2.svg": foldSeam({
    step: 2,
    title: "Fold row 1 up to row 50",
    wIn: 7,
    hIn: 10,
    widthLabel: "28 sc, 7 in",
    heightLabel: "50 rows, 10 in",
    openLabel: "56-st opening",
    seamLabel: "Right sides together. Sc through both layers up each side, one sc per row end.",
  }),
};
