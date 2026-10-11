// Granny side spaces, baby blanket, beginner scarf.
import { compare, chainStart, colors as C } from "./lib.mjs";

const cluster = (cx, base, color = C.ink) => {
  let s = "";
  for (let k = -1; k <= 1; k++) s += `<path d="M${cx + k * 10} ${base} V${base - 26} M${cx + k * 10 - 5} ${base - 26} h10" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
  return s;
};
const space = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="7" fill="${C.paper}" stroke="${C.sage}" stroke-width="3"/>`;

/** One side of round 3 over round 2. inSpace: where the middle cluster goes. */
function grannySide({ inSpace }) {
  return (x, y) => {
    const low = y + 132;
    const up = y + 70;
    let s = `<text x="${x + 20}" y="${low + 2}" font-size="20" fill="${C.soft}">R2</text><text x="${x + 20}" y="${up - 6}" font-size="20" fill="${C.soft}">R3</text>`;
    // Round 2 along this side: corner half, ch-1 space, corner half.
    s += cluster(x + 140, low) + space(x + 220, low - 14) + cluster(x + 300, low);
    // Round 3: corner halves at the ends.
    s += cluster(x + 90, up) + cluster(x + 350, up);
    if (inSpace) {
      s += space(x + 150, up - 14) + cluster(x + 220, up, C.sage) + space(x + 290, up - 14);
      s += `<path d="M${x + 220} ${up + 4} V${low - 26}" stroke="${C.sage}" stroke-width="3" marker-end="url(#ah)"/>`;
    } else {
      s += cluster(x + 150, up, C.terra);
      s += `<path d="M${x + 150} ${up + 4} V${low - 30}" stroke="${C.terra}" stroke-width="3" marker-end="url(#ah)"/>`;
      s += `<text x="${x + 240}" y="${up - 10}" font-size="20" fill="${C.terraDeep}">no space</text>`;
    }
    return { svg: s, height: 150 };
  };
}

const sideCompare = compare({
  title: "Side clusters go into spaces",
  desc:
    "One side of a granny square, round 3 worked over round 2. Correct: the side cluster of round 3 sits in the chain-1 space between round 2's two corner halves, with a chain-1 on each side of it. Common mistake: the cluster goes into the top of a double crochet instead. The gap closes, the side goes stiff, and the square starts to cup.",
  good: {
    label: "in the ch-1 space",
    caption: "The hook goes into the gap. Round n then has n clusters per side, counting the corner halves.",
    draw: grannySide({ inSpace: true }),
  },
  bad: {
    label: "into a stitch top",
    caption: "Worked into the top of a dc, the hole closes and the square stiffens and cups. The side also stops lining up with the round below.",
    draw: grannySide({ inSpace: false }),
  },
});

export const placements = [
  { slug: "halloween-granny-square-variations", file: "granny-side-space.svg", after: "**Later rounds.**", caption: "The one rule every variation on this page keeps: clusters go into spaces, never into stitch tops." },
  { slug: "christmas-granny-square-variations", file: "granny-side-space.svg", after: "**Work into the spaces, not the stitches.**", caption: "A side cluster in the chain-1 space, and the same cluster pushed into a stitch top." },
  { slug: "how-to-crochet-a-granny-square-tote", file: "granny-side-space.svg", after: "**Checkpoint each round:**", caption: "Clusters go in the gaps between the clusters below, never on top of them." },
  { slug: "how-to-crochet-a-baby-blanket", file: "blanket-step-1.svg", after: "**Row 1.** Chain 92.", caption: "Chain 92 for 90 hdc at the example washed gauge. The 2 skipped chains do not count." },
  { slug: "how-to-crochet-a-baby-blanket", file: "scarf-first-stitch.svg", after: "**Row 2.** Chain 2, turn.", caption: "On 90 stitches a single gained stitch per row is easy to miss. The first hdc goes into the first real stitch." },
  { slug: "how-to-crochet-a-beginner-scarf", file: "hooded-scarf-step-1.svg", after: "**Row 1.** Chain 26.", caption: "Chain 26 for 24 hdc. The 2 skipped chains next to the hook are the turning chain, not a stitch." },
];

export default {
  "granny-side-space.svg": sideCompare,
  "blanket-step-1.svg": chainStart({
    step: 3,
    title: "Chain 92, then 90 hdc",
    n: 92,
    skip: 2,
    stitch: "hdc",
    rowLabel: "Row 1: 90 hdc, about 30 in at 3 hdc per inch, washed.",
  }),
};
