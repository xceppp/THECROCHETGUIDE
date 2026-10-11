// Shoulder bag, crossbody, beanie, ear warmer, and the back-loop rib.
import { chainStart, foldSeam, flapPlan, roundChart, profile, stack, colors as C } from "./lib.mjs";

const crown = [
  { label: "Body", seq: "sc", times: 50, count: 50, ring: true },
  ...[8, 7, 6, 5, 4, 3, 2, 1].map((n, i) => ({ label: `Crown ${i + 1}`, seq: `${n}sc,sc2tog`, times: 5, count: 45 - i * 5, text: `(sc ${n}, sc2tog) 5 times` })),
  { label: "Crown 9", seq: "sc2tog", times: 5, count: 5, text: "sc2tog 5 times" },
];
// Validate the full crown sequence once, even though only part is drawn.
roundChart({ title: "check", rounds: crown, current: 9 });

export const placements = [
  { slug: "how-to-crochet-a-mini-shoulder-bag", file: "shoulder-bag-step-1.svg", after: "**Row 1:** Sc in the second chain from the hook and in each chain across. Ch 1, turn. (27)", caption: "Step 1. Chain 28 for 27 sc, 6.75 inches at 4 sc per inch." },
  { slug: "how-to-crochet-a-mini-shoulder-bag", file: "turn-first-stitch.svg", after: "**Rows 2–65:**", caption: "Each row starts in the edge stitch. A gained stitch here shows up as a crooked side seam." },
  { slug: "how-to-crochet-a-mini-shoulder-bag", file: "shoulder-bag-step-2.svg", after: "Join yarn at one side seam on the opening.", caption: "Step 2. Drawn to scale. The 65 rows fold in half to about 6.5 inches a side, and the top round joins both edges: 54 sc." },
  { slug: "how-to-crochet-a-mini-shoulder-bag", file: "shoulder-bag-step-3.svg", after: "**Row 1:** Sc in the second chain from the hook and across. Ch 1, turn. (4)", caption: "Step 3. The strap is a narrow strip: chain 5 for 4 sc." },
  { slug: "how-to-crochet-a-phone-crossbody", file: "crossbody-step-1.svg", after: "**Row 1:** Sc in the second chain from the hook and in each chain across. Ch 1, turn. (15)", caption: "Step 1. Chain 16 for 15 sc, 3.75 inches: the phone's width plus its thickness, seams, and ease." },
  { slug: "how-to-crochet-a-phone-crossbody", file: "crossbody-step-2.svg", after: "**Rows 2–67:**", caption: "Step 2. To scale: 67 rows, about 13.4 inches, fold to a sleeve about 6.7 inches deep." },
  { slug: "how-to-crochet-a-phone-crossbody", file: "crossbody-step-3.svg", after: "Fasten off. Two, three skipped, and two is seven", caption: "Step 3. The flap covers the middle 7 of the 15 back stitches. On row 7 the ch 4 spans 3 skipped stitches." },
  { slug: "how-to-crochet-a-chunky-beanie", file: "beanie-step-1.svg", after: "**Row 1:** Sc in the 2nd chain from the hook and across. Ch 1, turn. (8)", caption: "Step 1. Chain 9 for an 8-stitch brim. The chain is the brim's height, not the hat's width." },
  { slug: "how-to-crochet-a-chunky-beanie", file: "blo-rib.svg", after: "**Row 2:** Sc in the back loop only of each stitch.", caption: "Back loop only on every row from row 2 makes the stretchy rib." },
  { slug: "how-to-crochet-a-chunky-beanie", file: "beanie-step-2.svg", after: "**Round 1:** (Sc 8, sc2tog) 5 times. (45)", caption: "Step 3. Five decreases a round, spaced evenly, keep the crown flat." },
  { slug: "how-to-crochet-a-chunky-beanie", file: "beanie-step-3.svg", after: "**Round 9:** Sc2tog 5 times. (5)", caption: "Step 4. The crown by stitch count: 50 down to 5 in nine rounds, then the gap is closed with the tail." },
  { slug: "how-to-crochet-an-ear-warmer", file: "ear-warmer-step-1.svg", after: "**Row 1:** Single crochet in the second chain from the hook and across.", caption: "Chain 13 for 12 sc. The chain is the band's width, about 3.4 inches at 3.5 per inch." },
  { slug: "how-to-crochet-an-ear-warmer", file: "blo-rib.svg", after: "**Row 2:** Single crochet in the back loop only across.", caption: "Every row from row 2 goes into the back loop only. The unworked front loops become the ribs." },
];

export default {
  "shoulder-bag-step-1.svg": chainStart({ step: 1, title: "Chain 28, then 27 sc", n: 28, skip: 1, rowLabel: "Row 1: 27 sc, about 6.75 in wide." }),
  "shoulder-bag-step-2.svg": foldSeam({
    step: 2,
    title: "Fold, seam, then the top round",
    wIn: 6.75,
    hIn: 13,
    widthLabel: "27 sc, 6.75 in",
    heightLabel: "65 rows, 13 in",
    openLabel: "54-sc top",
    seamLabel: "Seam both sides, then work 27 sc along row 65 and 27 along the foundation chain.",
  }),
  "shoulder-bag-step-3.svg": chainStart({ step: 3, title: "Strap: chain 5, then 4 sc", n: 5, skip: 1, rowLabel: "Strap rows: 4 sc. Work to the length that fits you." }),
  "crossbody-step-1.svg": chainStart({ step: 1, title: "Chain 16, then 15 sc", n: 16, skip: 1, rowLabel: "Row 1: 15 sc, about 3.75 in wide." }),
  "crossbody-step-2.svg": foldSeam({
    step: 2,
    title: "Fold in half and seam",
    wIn: 3.75,
    hIn: 13.4,
    widthLabel: "15 sc, 3.75 in",
    heightLabel: "67 rows, 13.4 in",
    seamLabel: "Fold so row 1 meets row 67. Seam both sides. The top stays open.",
  }),
  "crossbody-step-3.svg": flapPlan({
    step: 3,
    title: "Flap: stitches 5 to 11 of the back",
    cols: 15,
    flapCols: 7,
    flapRows: 7,
    loop: [3, 3],
    wallLabel: "Back opening: 15 sts. The flap uses the middle 7, with 4 free on each side.",
    note: "Rows 1 to 6: 7 sc. Row 7: sc 2, ch 4, skip 3, sc 2.",
  }),
  "beanie-step-1.svg": chainStart({ step: 1, title: "Brim: chain 9, then 8 sc", n: 9, skip: 1, rowLabel: "Row 1: 8 sc. From row 2, back loop only." }),
  "beanie-step-2.svg": roundChart({ step: 3, title: "Crown round 1: 50 to 45", rounds: crown.slice(0, 2), current: 1 }),
  "beanie-step-3.svg": profile({
    step: 4,
    title: "The crown by stitch count",
    rounds: [{ n: 0, count: 50, shown: "50" }, ...crown.slice(1).map((r, i) => ({ n: i + 1, count: r.count }))],
    highlight: [9],
    note: "R0 is the last even body round. Each crown round removes 5.",
  }),
  "ear-warmer-step-1.svg": chainStart({ step: null, title: "Chain 13, then 12 sc", n: 13, skip: 1, rowLabel: "Row 1: 12 sc. From row 2, back loop only." }),
  "blo-rib.svg": stack({
    title: "Back-loop-only rib",
    desc:
      "Two steps. 1: the top of each stitch has a front loop, nearer you, and a back loop, farther away. For the rib, insert the hook under the back loop only. 2: the front loops left behind form a raised ridge on every row. The fabric stretches across the ridges, in the direction the rows stack up, so a band worked sideways stretches around the head.",
    steps: [
      {
        title: "Back loop only",
        caption: "Hook under the far loop. The near loop stays unworked.",
        draw: (x, y) => ({
          svg: `<path d="M${x + 60} ${y + 26} h300" stroke="${C.grid}" stroke-width="7" stroke-linecap="round"/><path d="M${x + 60} ${y + 52} h300" stroke="${C.yarn}" stroke-width="7" stroke-linecap="round"/><text x="${x + 370}" y="${y + 33}" font-size="20" fill="${C.soft}">back</text><text x="${x + 370}" y="${y + 59}" font-size="20" fill="${C.soft}">front</text><path d="M${x + 150} ${y + 72} L${x + 200} ${y + 20}" stroke="${C.terra}" stroke-width="5" stroke-linecap="round"/>`,
          height: 84,
        }),
      },
      {
        title: "Ridges",
        caption: "The leftover front loops make a ridge on every row. The rib stretches across the ridges, the way the rows stack up, which is why bands are worked sideways.",
        draw: (x, y) => {
          let s = "";
          for (let r = 0; r < 5; r++) {
            const yy = y + 12 + r * 16;
            s += `<rect x="${x + 60}" y="${yy}" width="300" height="10" rx="5" fill="${r % 2 ? C.deep : "#e9d6c3"}" stroke="${C.grid}"/>`;
          }
          s += `<path d="M${x + 390} ${y + 6} V${y + 96}" stroke="${C.terra}" stroke-width="3" marker-start="url(#ah)" marker-end="url(#ah)"/>`;
          s += `<text x="${x + 40}" y="${y + 110}" font-size="20" fill="${C.terraDeep}">stretch runs across the ridges</text>`;
          return { svg: s, height: 118 };
        },
      },
    ],
  }),
};
