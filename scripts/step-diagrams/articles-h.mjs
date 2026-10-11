// Wallets and the gothic bat pouch.
import { compare, foldSeam, roundChart, flapPlan, chainLink, symbol, colors as C } from "./lib.mjs";

/** The slip-knot end of a foundation chain, with sc on top and underneath. */
function chainEnd({ underFrom }) {
  return (x, y) => {
    const links = 6;
    const gap = 48;
    const x0 = x + 150;
    const cy = y + 76;
    let s = `<circle cx="${x0 - 36}" cy="${cy}" r="8" fill="${C.yarn}"/>`;
    s += `<text x="${x0 - 112}" y="${cy + 7}" font-size="20" fill="${C.soft}">knot</text>`;
    for (let i = 0; i < links; i++) {
      const lx = x0 + i * gap;
      s += chainLink(lx, cy, 34, 14, i === 0 ? C.terra : C.yarn);
      s += symbol("sc", lx, cy - 36, 18, C.ink);
      if (i >= underFrom) s += symbol("sc", lx, cy + 36, 18, C.ink);
      else s += `<circle cx="${lx}" cy="${cy + 36}" r="9" fill="none" stroke="${C.terra}" stroke-width="3" stroke-dasharray="4 3"/>`;
    }
    s += `<text x="${x0 + links * gap - 10}" y="${cy + 6}" font-size="20" fill="${C.soft}">…</text>`;
    s += `<path d="M${x0 - 14} ${cy - 40} C${x0 - 60} ${cy - 30} ${x0 - 60} ${cy + 30} ${x0 + (underFrom ? gap : 0) - 14} ${cy + 40}" fill="none" stroke="${C.terra}" stroke-width="3" marker-end="url(#ah)"/>`;
    s += `<text x="${x + 20}" y="${y + 10}" font-size="20" fill="${C.soft}">top: 16 sc</text>`;
    s += `<text x="${x + 20}" y="${cy + 76}" font-size="20" fill="${C.soft}">underside: ${16 - underFrom} sc</text>`;
    return { svg: s, height: 156 };
  };
}

export const placements = [
  { slug: "black-cat-crochet-wallet", file: "cat-wallet-turn.svg", after: "**Rnd 1:** Ch 17.", caption: "The turn at the end of the chain. The last sc on top and the first sc underneath share one chain." },
  { slug: "halloween-crochet-card-wallet", file: "card-wallet-fold.svg", after: "Fold rows 1 to 12 up against rows 13 to 24.", caption: "Measure the rectangle flat before seaming. It should be about 4 inches wide at the example gauge, or the card will not fit." },
  { slug: "gothic-bat-earbuds-pouch", file: "magic-ring.svg", after: "**Round 1:** 6 sc in a magic ring. (6)", caption: "Round 1 starts in a magic ring. The ch 1 that closes the first loop is not a stitch." },
  { slug: "gothic-bat-earbuds-pouch", file: "bat-pouch-step-1.svg", after: "**Round 5:** (Sc 3, 2 sc in next) 6 times. (30)", caption: "Step 1. Six increases a round to 30, the example body for a small case. Your case may need round 6." },
  { slug: "gothic-bat-earbuds-pouch", file: "bat-pouch-step-2.svg", after: "**Row 6:** Ch 1, sc 4, ch 4, skip 2, sc 4.", caption: "Step 2. The flap uses 10 of the 30 stitches. The other 20 stay open as the mouth of the cup." },
];

export default {
  "cat-wallet-turn.svg": compare({
    title: "Round 1: turning onto the chain's underside",
    desc:
      "The slip-knot end of the chain of 17, with single crochet on top and underneath. Correct: the last single crochet on top and the first one underneath go into the same chain, the one next to the slip knot, giving 16 on each side and 32 in the round. Common mistake: the first underside stitch goes into the next chain instead, leaving 15 underneath and 31 in the round. Working the skipped chain next to the hook gives the opposite error, 33.",
    good: {
      label: "16 + 16 = 32",
      caption: "The chain next to the knot gets two sc, one on top and one underneath.",
      draw: chainEnd({ underFrom: 0 }),
    },
    bad: {
      label: "16 + 15 = 31",
      caption: "Skipping that chain after the turn loses a stitch. Working the chain next to the hook adds one, for 33.",
      draw: chainEnd({ underFrom: 1 }),
    },
  }),
  "card-wallet-fold.svg": foldSeam({
    step: 4,
    title: "Measure flat, then fold 12 rows up",
    wIn: 4,
    hIn: 6.2,
    foldAt: 12 / 31,
    flapIn: 1.4,
    widthLabel: "16 sc, about 4 in",
    heightLabel: "31 rows, 6.2 in",
    seamLabel: "Whipstitch both sides from the fold to the opening. Stop there.",
    note: "Front: rows 1 to 12. Back: rows 13 to 24. Flap: rows 25 to 31, about 1.4 in. The width includes about 0.25 in for the seams.",
  }),
  "bat-pouch-step-1.svg": roundChart({
    step: 1,
    title: "Body base: rounds 1 to 5",
    rounds: [
      { label: "Round 1", seq: "sc", times: 6, count: 6, ring: true, text: "6 sc in a magic ring" },
      { label: "Round 2", seq: "inc", times: 6, count: 12, text: "2 sc in each st" },
      { label: "Round 3", seq: "sc,inc", times: 6, count: 18, text: "(sc, 2 sc in next) 6 times" },
      { label: "Round 4", seq: "2sc,inc", times: 6, count: 24, text: "(sc 2, 2 sc in next) 6 times" },
      { label: "Round 5", seq: "3sc,inc", times: 6, count: 30, text: "(sc 3, 2 sc in next) 6 times" },
    ],
    current: 4,
    note: "Each round adds 6. A 36-stitch body adds round 6: (sc 4, 2 sc in next) 6 times.",
  }),
  "bat-pouch-step-2.svg": flapPlan({
    step: 2,
    title: "Flap: 6 rows over 10 stitches",
    cols: 30,
    flapCols: 10,
    flapRows: 6,
    loop: [5, 2],
    note: "Rows 1 to 5: 10 sc. Row 6: sc 4, ch 4, skip 2, sc 4. For a 36-stitch body the flap is 12 wide: sc 5, ch 4, skip 2, sc 5.",
  }),
};
