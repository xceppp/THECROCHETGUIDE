// Round bags and the tumbler sleeve.
import { chainStart, roundChart, profile, sixInc, frame, heading, text, colors as C } from "./lib.mjs";

const runs = (from, to, count) => Array.from({ length: to - from + 1 }, (_, i) => ({ n: from + i, count }));
const ringFrom = (label, count) => ({ label, seq: "sc", times: count, count, ring: true });

/** Tumbler wedge: the strip seen with rows as columns and the top edge up. */
function tumblerWedge() {
  const h = heading(2, "The wedge: 4 short rows from the top edge");
  let body = h.svg;
  const cols = [
    { label: "16", n: 18 },
    { label: "17", n: 18 },
    { label: "s1", n: 12, hot: true },
    { label: "s2", n: 12, hot: true },
    { label: "s3", n: 6, hot: true },
    { label: "s4", n: 6, hot: true },
    { label: "18", n: 18 },
    { label: "19", n: 18 },
  ];
  const cw = 44;
  const ch = 14;
  const x0 = 92;
  const top = h.y + 40;
  body += `<text x="20" y="${top - 12}" font-size="20" fill="${C.ink}">top edge</text>`;
  cols.forEach((c, i) => {
    const x = x0 + i * cw;
    for (let s = 0; s < c.n; s++)
      body += `<rect x="${x + 3}" y="${top + s * ch}" width="${cw - 6}" height="${ch - 2}" rx="2" fill="${c.hot ? "#f3dfd6" : C.deep}" stroke="${c.hot ? C.terra : C.grid}"/>`;
    body += `<text x="${x + cw / 2}" y="${top + 18 * ch + 26}" font-size="20" fill="${c.hot ? C.terraDeep : C.soft}" text-anchor="middle">${c.label}</text>`;
  });
  body += `<text x="20" y="${top + 18 * ch + 4}" font-size="20" fill="${C.ink}">bottom</text>`;
  let y = top + 18 * ch + 60;
  const t = text(20, y, "Each column is one row of the strip, 18 sc tall. Short rows s1 and s2 work 12 stitches from the top edge; s3 and s4 work 6. The top edge gains 4 rows, the bottom none.", { size: 20, fill: C.ink });
  body += t.svg;
  y += t.height;
  return frame(
    "Tumbler sleeve wedge: four short rows",
    "The sleeve strip drawn with each row as a column 18 stitches tall and the top edge at the top. Between rows 17 and 18 sit four short rows worked from the top edge: two of 12 stitches and two of 6. The top edge gains four rows and the bottom edge none, which is what makes the top 39 rows long and the bottom 35.",
    body,
    y + 20,
  );
}

export const placements = [
  { slug: "how-to-crochet-a-tumbler-sleeve", file: "tumbler-step-1.svg", after: "**Row 1:** Sc in the second chain from the hook", caption: "Step 1. The chain is the height of the sleeve, 18 sc for a 4.5 inch cup. Rows run around the cup." },
  { slug: "how-to-crochet-a-tumbler-sleeve", file: "tumbler-step-2.svg", after: "You are at the top edge again, ready for a full row.", caption: "Step 2. The short rows add length only to the top edge, which is what lets a straight strip follow a wider rim." },
  { slug: "how-to-crochet-a-wine-bottle-bag", file: "magic-ring.svg", after: "**Round 1:** 6 sc in a magic ring. (6)", caption: "The base starts in a magic ring, closed tight so the bottle cannot push through." },
  { slug: "how-to-crochet-a-wine-bottle-bag", file: "wine-bag-step-1.svg", after: "Round 7 adds only four stitches", caption: "Step 1. Rounds 2 to 6 add 6 each. Round 7 adds 4 to land on 40, an even count for the eyelets." },
  { slug: "how-to-crochet-a-wine-bottle-bag", file: "wine-bag-step-2.svg", after: "**Eyelet round:** (Sc in next, ch 1, skip 1) 20 times.", caption: "Step 2. The eyelet round keeps the stitch positions: 20 sc and 20 chain spaces, back to 40 sc on the next round." },
  { slug: "how-to-crochet-a-wine-bottle-bag", file: "wine-bag-step-3.svg", after: "**Last round:** Sc in each stitch. (40) Fasten off.", caption: "Step 3. The whole bag by stitch count. The 7 base rounds lie flat and add no height." },
  { slug: "how-to-crochet-a-pumpkin-zipper-pouch", file: "zipper-pouch-step-1.svg", after: "**Round 8:** (Sc 6, 2 sc in next) 6 times. (48)", caption: "Step 1. Round 8 ends on 48 stitches, 12 inches around at 4 sc per inch." },
  { slug: "how-to-crochet-a-pumpkin-zipper-pouch", file: "zipper-pouch-step-2.svg", after: "**Rounds 9–23:**", caption: "Step 2. Fifteen even rounds turn the flat base up into a 3 inch wall." },
  { slug: "how-to-crochet-a-pumpkin-treat-bag", file: "treat-bag-step-1.svg", after: "**Round 13:** (Sc 7, 2 sc in next) 6 times. (54)", caption: "Step 1. Six spaced increases widen the belly from 48 to 54." },
  { slug: "how-to-crochet-a-pumpkin-treat-bag", file: "treat-bag-step-2.svg", after: "**Round 22:** (Sc 7, sc2tog) 6 times. (48)", caption: "Step 2. Six decreases in the same rhythm take it back to 48 for the neck." },
  { slug: "how-to-crochet-a-pumpkin-treat-bag", file: "treat-bag-step-3.svg", after: "**Rounds 30–31:**", caption: "Step 3. The bag by stitch count: flat base, the belly from round 13 to 21, then the neck and the eyelet round." },
  { slug: "how-to-crochet-a-ghost-candy-bag", file: "candy-bag-step-1.svg", after: "**Round 9:** (Sc 7, 2 sc in next) 6 times. (54)", caption: "Step 1. Nine rounds of 6 increases give a 54-stitch base, about 4.3 inches across." },
  { slug: "how-to-crochet-a-ghost-candy-bag", file: "candy-bag-step-2.svg", after: "**Round 34:** Sc in each sc and 2 sc in each ch-2 space. (54)", caption: "Step 2. Nine ch-2 spaces, 6 stitches apart. Round 34 puts 2 sc in each space to restore 54." },
];

export default {
  "tumbler-step-1.svg": chainStart({ step: 1, title: "Chain 19, then 18 sc", n: 19, skip: 1, rowLabel: "Row 1: 18 sc. This is the sleeve's height, 4.5 in." }),
  "tumbler-step-2.svg": tumblerWedge(),
  "wine-bag-step-1.svg": roundChart({
    step: 1,
    title: "Base: rounds 1 to 7",
    rounds: [...sixInc(6, { incFirst: true }), { label: "Round 7", seq: "inc,8sc", times: 4, count: 40, text: "(2 sc in next, sc 8) 4 times" }],
    current: 6,
  }),
  "wine-bag-step-2.svg": roundChart({
    step: 2,
    title: "Eyelet round on 40",
    rounds: [ringFrom("Round 52", 40), { label: "Eyelet round", seq: "sc,ch,skip", times: 20, count: 20, text: "(sc in next, ch 1, skip 1) 20 times: 20 sc" }],
    current: 1,
  }),
  "wine-bag-step-3.svg": profile({
    step: 3,
    title: "The whole bag by stitch count",
    rounds: [...sixInc(6).map((r, i) => ({ n: i + 1, count: r.count })), { n: 7, count: 40 }, { n: 8, count: 40, break: true }, ...runs(9, 52, 40), { n: 53, count: 40, shown: "20+20" }, { n: 54, count: 40, break: true }, { n: 55, count: 40, break: true }],
    highlight: [53],
    note: "R53 to R55 are the pattern's eyelet round (20 sc and 20 chain spaces), next round, and last round.",
  }),
  "zipper-pouch-step-1.svg": roundChart({ step: 1, title: "Base: rounds 1 to 8", rounds: sixInc(8), current: 7 }),
  "zipper-pouch-step-2.svg": profile({
    step: 2,
    title: "The pouch by stitch count",
    rounds: [...sixInc(8).map((r, i) => ({ n: i + 1, count: r.count })), { n: 9, count: 48, break: true }, ...runs(10, 23, 48)],
    highlight: [9],
    note: "The zipper is sewn behind the top of round 23. Flattened, 48 stitches make a 6 in opening.",
  }),
  "treat-bag-step-1.svg": roundChart({
    step: 1,
    title: "Round 13: widen to 54",
    rounds: [ringFrom("Round 12", 48), { label: "Round 13", seq: "7sc,inc", times: 6, count: 54, text: "(sc 7, 2 sc in next) 6 times" }],
    current: 1,
  }),
  "treat-bag-step-2.svg": roundChart({
    step: 2,
    title: "Round 22: back to 48",
    rounds: [ringFrom("Round 21", 54), { label: "Round 22", seq: "7sc,sc2tog", times: 6, count: 48, text: "(sc 7, sc2tog) 6 times" }],
    current: 1,
  }),
  "treat-bag-step-3.svg": profile({
    step: 3,
    title: "The bag by stitch count",
    rounds: [...sixInc(8).map((r, i) => ({ n: i + 1, count: r.count })), { n: 9, count: 48, break: true }, ...runs(10, 12, 48), { n: 13, count: 54 }, { n: 14, count: 54, break: true }, ...runs(15, 21, 54), { n: 22, count: 48 }, { n: 23, count: 48, break: true }, ...runs(24, 28, 48), { n: 29, count: 48, shown: "24+24" }, { n: 30, count: 48 }, { n: 31, count: 48 }],
    highlight: [13, 22, 29],
    note: "Round 29 is the eyelet round: 24 sc and 24 chain spaces.",
  }),
  "candy-bag-step-1.svg": roundChart({ step: 1, title: "Base: rounds 1 to 9", rounds: sixInc(9), current: 8 }),
  "candy-bag-step-2.svg": roundChart({
    step: 2,
    title: "Round 33: nine large eyelets",
    rounds: [ringFrom("Round 32", 54), { label: "Round 33", seq: "4sc,ch,2skip", times: 9, count: 36, text: "(sc 4, ch 2, skip 2) 9 times: 36 sc" }],
    current: 1,
    note: "Each open circle is one ch-2 space over 2 skipped stitches.",
  }),
};
