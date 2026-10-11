// Step diagrams for flat sleeves and pouches. Counts come from each article.
import { chainStart, rowGrid, foldSeam } from "./lib.mjs";

export const placements = [
  { slug: "how-to-crochet-a-phone-case", file: "phone-case-step-1.svg", after: "Chain 17. Single crochet in the second chain", caption: "Step 1. The chain next to the hook is skipped and does not count, so 17 chains give 16 sc." },
  { slug: "how-to-crochet-a-phone-case", file: "turn-first-stitch.svg", after: "Single crochet in each stitch across. Ch 1, turn.", caption: "Where the first stitch of each row goes. Working into the ch 1 is the usual reason a 16-stitch sleeve grows to 17." },
  { slug: "how-to-crochet-a-phone-case", file: "phone-case-step-2.svg", after: "Stop at about 70 rows", caption: "Step 2. The same 16 stitches on every row. The two halves of the sleeve meet at the middle row." },
  { slug: "how-to-crochet-a-phone-case", file: "phone-case-step-3.svg", after: "Fold the rectangle in half with the right side inside.", caption: "Step 3. Drawn to scale: a 3.9 by 14 inch strip folds into a 3.9 by 7 inch pocket." },
  { slug: "how-to-crochet-a-phone-case", file: "whipstitch-outer-loops.svg", after: "Slide the phone in before you weave the tails.", caption: "A seam through the outer loops keeps the inside width the sleeve was sized for." },
];

export default {
  // how-to-crochet-a-phone-case: ch 17, 16 sc, 70 rows, fold at row 35.
  "phone-case-step-1.svg": chainStart({
    step: 1,
    title: "Chain 17, then 16 sc",
    n: 17,
    skip: 1,
    rowLabel: "Row 1: 16 sc, about 3.9 in at 4 sc per inch.",
    note: "Checkpoint: the first row lying flat measures about 3.9 in.",
  }),
  "phone-case-step-2.svg": rowGrid({
    step: 2,
    title: "Rows 2 to 70: 16 sc every row",
    cols: 16,
    rows: [1, 2, 3, "…", 35, 36],
    current: 36,
    countLabel: "Every row: 16 sc. Count every 10 rows.",
    note: "Row 35 is the middle. With 70 rows, the fold lands between rows 35 and 36.",
  }),
  "phone-case-step-3.svg": foldSeam({
    step: 3,
    title: "Fold in half, seam both sides",
    wIn: 3.9,
    hIn: 14,
    widthLabel: "16 sc, 3.9 in",
    heightLabel: "70 rows, 14 in",
    foldLabel: "fold",
    seamLabel: "Right side in. Whipstitch each side from the fold up, through the outer loops only. Top stays open.",
    note: "Each side ends up about 7 in deep: the phone's 6.43 in plus the fold and a collar.",
  }),
};
