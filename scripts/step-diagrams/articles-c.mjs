// Flat sc rectangles: cable strap, gift card holder, book and laptop sleeves.
import { chainStart, rowGrid, foldSeam, buttonholeRow } from "./lib.mjs";

export const placements = [
  { slug: "how-to-crochet-a-cable-organizer", file: "cable-step-1.svg", after: "**Row 1:** Sc in the second chain from the hook", caption: "Step 1. Chain 9 for an 8-stitch strap, about 2 inches wide at 4 sc per inch." },
  { slug: "how-to-crochet-a-cable-organizer", file: "turn-first-stitch.svg", after: "**Rows 2–23:**", caption: "A narrow strap shows a gained stitch at once. Start each row in the edge stitch, not the ch 1." },
  { slug: "how-to-crochet-a-cable-organizer", file: "cable-step-2.svg", after: "**Row 24:** Sc 3, ch 3, skip 2, sc 3.", caption: "Step 2. The ch 3 spans 2 skipped stitches. One extra chain keeps the hole from pinching the button." },
  { slug: "how-to-crochet-a-christmas-gift-card-holder", file: "gift-card-step-1.svg", after: "**Row 1:** Sc in the second chain from the hook", caption: "Step 1. Chain 17 for 16 sc, about 4 inches wide." },
  { slug: "how-to-crochet-a-christmas-gift-card-holder", file: "gift-card-step-2.svg", after: "Fold the rectangle so the foundation edge sits 9 rows up", caption: "Step 2. Drawn to scale. The fold is off center: 9 rows in front, 15 behind, so the card shows above the front." },
  { slug: "how-to-crochet-a-book-sleeve", file: "book-sleeve-step-1.svg", after: "**Row 1:** Single crochet in the second chain from the hook and across.", caption: "Chain 23 for 22 sc, 5.5 inches at 4 sc per inch." },
  { slug: "how-to-crochet-a-book-sleeve", file: "turn-first-stitch.svg", after: "**Rows 2–60:**", caption: "Sixty rows is a lot of edges. Starting every row in the edge stitch is what keeps the sleeve 22 wide." },
  { slug: "how-to-crochet-a-laptop-sleeve", file: "laptop-step-1.svg", after: "**Row 1:** Sc in the second chain from the hook", caption: "Step 1. Chain 54 for 53 sc. A larger hook for the chain keeps the bottom edge from pulling in." },
  { slug: "how-to-crochet-a-laptop-sleeve", file: "laptop-step-2.svg", after: "**Rows 2–90:**", caption: "Step 2. 53 sc on every row. Counting every 10 rows catches a gained stitch before it costs width." },
  { slug: "how-to-crochet-a-laptop-sleeve", file: "laptop-step-3.svg", after: "Fold so row 1 meets row 90", caption: "Step 3. Drawn to scale: 13.1 by 18 inches folds into a 13.1 by 9 inch sleeve." },
  { slug: "how-to-crochet-a-laptop-sleeve", file: "sc-seam-two-layers.svg", after: "Single crochet seams hold better", caption: "One sc per row end through both layers, from the fold to the top." },
];

export default {
  "cable-step-1.svg": chainStart({ step: 1, title: "Chain 9, then 8 sc", n: 9, skip: 1, rowLabel: "Row 1: 8 sc, about 2 in wide." }),
  "cable-step-2.svg": buttonholeRow({ step: 2, title: "Row 24: the buttonhole", before: 3, chain: 3, skip: 2, after: 3, note: "Rows 1 to 23 are 8 sc. The button goes on row 3, centered." }),
  "gift-card-step-1.svg": chainStart({ step: 1, title: "Chain 17, then 16 sc", n: 17, skip: 1, rowLabel: "Row 1: 16 sc. Rows 2 to 24 the same." }),
  "gift-card-step-2.svg": foldSeam({
    step: 2,
    title: "Fold 9 rows up, not in half",
    wIn: 4,
    hIn: 4.8,
    foldAt: 9 / 24,
    widthLabel: "16 sc, 4 in",
    heightLabel: "24 rows, 4.8 in",
    openLabel: "card here",
    seamLabel: "Right sides out. Seam both sides through both layers for the 9 front rows.",
    note: "Front: rows 1 to 9, 1.8 in. Back: rows 10 to 24, 3.0 in. A 2.125 in card shows about 0.33 in above the front.",
  }),
  "book-sleeve-step-1.svg": chainStart({ step: null, title: "Chain 23, then 22 sc", n: 23, skip: 1, rowLabel: "Row 1: 22 sc, about 5.5 in wide." }),
  "laptop-step-1.svg": chainStart({ step: 1, title: "Chain 54, then 53 sc", n: 54, skip: 1, rowLabel: "Row 1: 53 sc, about 13.1 in at 4 sc per inch." }),
  "laptop-step-2.svg": rowGrid({
    step: 2,
    title: "Rows 2 to 90: 53 sc",
    cols: 53,
    rows: [1, 2, "…", 44, 45, 46],
    current: 46,
    countLabel: "Every row: 53 sc. Count every 10 rows.",
    note: "The fold falls between rows 45 and 46.",
  }),
  "laptop-step-3.svg": foldSeam({
    step: 3,
    title: "Fold, then sc both sides",
    wIn: 13.1,
    hIn: 18,
    widthLabel: "53 sc, 13.1 in",
    heightLabel: "90 rows, 18 in",
    seamLabel: "Right sides together. Sc through both layers, one per row end. Reinforce the bottom corners.",
  }),
};
