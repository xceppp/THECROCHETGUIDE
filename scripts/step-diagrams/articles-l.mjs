// Halloween coasters (shared diagrams) and the ghost mini wallet.
import { chainStart, buttonholeRow } from "./lib.mjs";

export const placements = [
  { slug: "free-pattern-halloween-coasters", file: "magic-ring.svg", after: "**Rnd 1.** Magic ring, 6 sc in the ring.", caption: "Pull the tail until the center closes. An open center is the first thing a mug finds." },
  { slug: "free-pattern-halloween-coasters", file: "increase-stagger.svg", after: "### Keeping it round instead of six-sided", caption: "Move where the increases fall from round to round, and the six corners never form." },
  { slug: "free-pattern-halloween-coasters", file: "granny-round-1.svg", after: "**Rnd 1.** With the first color, ch 4, join to form a ring.", caption: "Round 1: four clusters in the ring, with a ch-2 corner between each pair." },
  { slug: "free-pattern-halloween-coasters", file: "granny-round-2.svg", after: "**Rnd 2.** Join the next color in any ch-2 corner.", caption: "Round 2: every cluster goes into a corner, and the ch 1 between corners makes the first side spaces." },
  { slug: "free-pattern-halloween-coasters", file: "granny-side-space.svg", after: "**Rnd 3.** Join the next color in any corner.", caption: "From round 3 on, side clusters go into those ch-1 spaces, never into a stitch top." },
  { slug: "ghost-crochet-mini-wallet", file: "mini-wallet-step-1.svg", after: "**Row 1:** Ch 17. Sc in the second chain from the hook", caption: "Step 1. Chain 17 for 16 sc, about 4 inches at the example gauge." },
  { slug: "ghost-crochet-mini-wallet", file: "turn-first-stitch.svg", after: "The ch 1 does not count as a stitch.", caption: "The gained stitch this page warns about. The first sc of each row goes into the edge stitch, not the ch 1." },
  { slug: "ghost-crochet-mini-wallet", file: "mini-wallet-step-2.svg", after: "**Row 34:** Ch 1, sc in the next 3 stitches, ch 5", caption: "Step 2. The loop row works over the 10 stitches left after the three decrease rows." },
];

export default {
  "mini-wallet-step-1.svg": chainStart({ step: 1, title: "Chain 17, then 16 sc", n: 17, skip: 1, rowLabel: "Row 1: 16 sc. Rows 2 to 30 the same." }),
  "mini-wallet-step-2.svg": buttonholeRow({
    step: 2,
    title: "Row 34: the button loop",
    before: 3,
    chain: 5,
    skip: 4,
    after: 3,
    rowLabel: "6 sc and a ch-5 loop.",
    note: "Row 33 has 10 stitches: 3 + 4 skipped + 3. If the loop misses your button, redo this row with ch 6 or ch 7 over the same 4 stitches.",
  }),
};
