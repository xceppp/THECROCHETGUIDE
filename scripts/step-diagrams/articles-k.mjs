// Course skills pages: mostly the generic diagrams, plus a flat circle.
import { roundChart } from "./lib.mjs";

export const placements = [
  { slug: "crochet-increase-decrease", file: "invisible-decrease.svg", after: "1. Insert the hook under the front loop only of the next stitch.", caption: "Front loops only. The back loops stay on the outside, so the decrease does not show." },
  { slug: "crochet-increase-decrease", file: "increase-stagger.svg", after: "**Spaced evenly** on circles and crowns.", caption: "Shifting where each round's increases fall keeps a circle round instead of hexagonal." },
  { slug: "crochet-increase-decrease", file: "flat-circle.svg", after: "The third round is the one worth counting out loud.", caption: "Six increases a round, and one more plain stitch between them each time." },
  { slug: "crochet-in-the-round", file: "magic-ring.svg", after: "**3. Work the first round over both strands,**", caption: "The round goes over the loop and the tail together. Pulling the tail closes the center." },
  { slug: "crochet-in-the-round", file: "join-round-slst.svg", after: "**Joined rounds.**", caption: "The join goes into the first real stitch of the round, not the chain that started it." },
  { slug: "crochet-in-the-round", file: "flat-circle.svg", after: "**Keep increasing**", caption: "The flat circle in single crochet. Each round adds the 6 stitches round 1 started with." },
  { slug: "crochet-turning-chain", file: "turn-first-stitch.svg", after: "**The first stitch is skipped when it should not be.**", caption: "In single crochet the ch 1 never counts, so the first stitch of the row goes into the first stitch, at the base of the chain." },
];

export default {
  "flat-circle.svg": roundChart({
    title: "A flat circle in single crochet",
    rounds: [
      { label: "Round 1", seq: "sc", times: 6, count: 6, ring: true, text: "6 sc in a magic ring" },
      { label: "Round 2", seq: "inc", times: 6, count: 12, text: "2 sc in each st" },
      { label: "Round 3", seq: "sc,inc", times: 6, count: 18, text: "(sc, 2 sc in next) 6 times" },
      { label: "Round 4", seq: "2sc,inc", times: 6, count: 24, text: "(sc 2, 2 sc in next) 6 times" },
      { label: "Round 5", seq: "3sc,inc", times: 6, count: 30, text: "(sc 3, 2 sc in next) 6 times" },
    ],
    current: 2,
    note: "Round 3 uses the 12 stitches of round 2: 6 plain and 6 increases make 18.",
  }),
};
