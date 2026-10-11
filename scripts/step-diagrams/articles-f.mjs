// Market bag, granny tote, fingerless gloves, slippers.
import { chainStart, roundChart, profile, sixInc, frame, heading, text, esc, colors as C } from "./lib.mjs";

const ringFrom = (label, count) => ({ label, seq: "sc", times: count, count, ring: true });

/**
 * Granny square round n: each side holds n three-dc clusters, counting the
 * half of each corner group that sits on that side. Corners are (3 dc, ch 2,
 * 3 dc); side spaces are ch 1. Total dc = 12n.
 */
export function grannyRound({ step, n, title, note }) {
  const h = heading(step, title ?? `Granny round ${n}: corners and sides`);
  let body = h.svg;
  const size = 300;
  const x0 = (480 - size) / 2;
  const y0 = h.y + 24;
  body += `<rect x="${x0}" y="${y0}" width="${size}" height="${size}" fill="${C.deep}" stroke="${C.grid}" stroke-dasharray="5 4"/>`;
  const cl = (cx, cy, angle) => {
    let s = `<g transform="rotate(${angle} ${cx} ${cy})">`;
    for (let k = -1; k <= 1; k++) s += `<path d="M${cx + k * 9} ${cy + 10} V${cy - 10} M${cx + k * 9 - 4} ${cy - 10} h8" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>`;
    return s + "</g>";
  };
  // Side order: top, right, bottom, left. Corners between them.
  const sides = [
    { a: [x0, y0], b: [x0 + size, y0], ang: 0 },
    { a: [x0 + size, y0], b: [x0 + size, y0 + size], ang: 90 },
    { a: [x0 + size, y0 + size], b: [x0, y0 + size], ang: 180 },
    { a: [x0, y0 + size], b: [x0, y0], ang: 270 },
  ];
  for (const s of sides) {
    const inset = 34;
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : (i + 0.5) / n;
      const len = size - 2 * inset;
      const dx = (s.b[0] - s.a[0]) / size;
      const dy = (s.b[1] - s.a[1]) / size;
      const cx = s.a[0] + dx * (inset + t * len);
      const cy = s.a[1] + dy * (inset + t * len);
      body += cl(cx, cy, s.ang);
      if (i < n - 1) {
        const t2 = (i + 1) / n;
        body += `<circle cx="${s.a[0] + dx * (inset + t2 * len)}" cy="${s.a[1] + dy * (inset + t2 * len)}" r="6" fill="${C.paper}" stroke="${C.sage}" stroke-width="3"/>`;
      }
    }
  }
  for (const [cx, cy] of [[x0, y0], [x0 + size, y0], [x0 + size, y0 + size], [x0, y0 + size]])
    body += `<circle cx="${cx}" cy="${cy}" r="10" fill="${C.paper}" stroke="${C.terra}" stroke-width="4"/>`;
  let y = y0 + size + 36;
  const side = n - 2;
  const sideText =
    n === 1
      ? "Round 1 has no side spaces: one cluster per side, all worked into the ring."
      : `Green rings: ch-1 spaces, ${n - 1} per side. ${side > 0 ? `${side} cluster${side > 1 ? "s" : ""} per side between the corners, each in a ch-1 space of the round below.` : "Round 3 puts a cluster in each."}`;
  const lines = [
    `Each side: ${n} cluster${n > 1 ? "s" : ""} of 3 dc${n > 1 ? ", counting the corner halves" : ""}. Round total: ${12 * n} dc.`,
    n === 1 ? "Terracotta rings: the 4 ch-2 corners, made between the clusters." : "Terracotta rings: the 4 corners, (3 dc, ch 2, 3 dc) in each.",
    sideText,
  ];
  lines.forEach((l, i) => {
    const t = text(20, y, l, { size: i === 0 ? 22 : 20, weight: i === 0 ? "bold" : "normal", fill: i === 1 ? C.terraDeep : i === 2 ? C.sage : C.ink });
    body += t.svg;
    y += t.height + 6;
  });
  if (note) {
    const t = text(20, y + 4, note, { size: 20, fill: C.soft });
    body += t.svg;
    y += t.height + 4;
  }
  return frame(
    `Granny square round ${n}`,
    n === 1
      ? "Granny square round 1. Four clusters of three double crochet worked into the ring, 12 double crochet in all, with a chain-2 corner between each pair. There are no side spaces yet."
      : `Granny square round ${n}. ${12 * n} double crochet in all. Each of the four corners holds 3 dc, ch 2, 3 dc. Each side has ${n - 1} chain-1 space${n > 2 ? "s" : ""}${side > 0 ? ` and ${side} cluster${side > 1 ? "s" : ""} worked into the chain-1 spaces of the round below` : ", still empty; round 3 fills them"}.`,
    body,
    y + 18,
  );
}

/** Pieces of a project drawn to one scale. items: [{ name, wIn, hIn, label }] */
export function pieces({ step, title, items, note, desc }) {
  const h = heading(step, title);
  let body = h.svg;
  const maxH = Math.max(...items.map((i) => i.hIn));
  const totalW = items.reduce((a, i) => a + i.wIn, 0);
  const s = Math.min(300 / maxH, (480 - 40 - (items.length - 1) * 24) / totalW);
  let x = (480 - (totalW * s + (items.length - 1) * 24)) / 2;
  const top = h.y + 20;
  let bottom = top;
  for (const it of items) {
    const w = it.wIn * s;
    const hh = it.hIn * s;
    body += `<rect x="${x}" y="${top}" width="${w}" height="${hh}" fill="${C.deep}" stroke="${C.yarn}" stroke-width="3"/>`;
    body += `<text x="${x + w / 2}" y="${top + hh + 26}" font-size="20" fill="${C.ink}" text-anchor="middle" font-weight="bold">${esc(it.name)}</text>`;
    const lines = String(it.label).split("\n");
    lines.forEach((l, i) => (body += `<text x="${x + w / 2}" y="${top + hh + 50 + i * 24}" font-size="20" fill="${C.soft}" text-anchor="middle">${esc(l)}</text>`));
    bottom = Math.max(bottom, top + hh + 50 + (lines.length - 1) * 24);
    x += w + 24;
  }
  let y = bottom + 30;
  if (note) {
    const t = text(20, y, note, { size: 20, fill: C.soft });
    body += t.svg;
    y += t.height;
  }
  return frame(title, desc ?? items.map((i) => `${i.name}: ${i.label.replace(/\n/g, ", ")}`).join(". ") + ".", body, y + 16);
}

export const placements = [
  { slug: "how-to-crochet-a-market-bag", file: "magic-ring.svg", after: "**Round 1:** 6 sc in a magic ring. (6)", caption: "The base starts in a magic ring." },
  { slug: "how-to-crochet-a-market-bag", file: "market-bag-step-1.svg", after: "Keep going, with one more plain stitch between increases each round.", caption: "Step 1. Sixteen rounds of six increases each. Round 16 is 96." },
  { slug: "how-to-crochet-a-market-bag", file: "increase-stagger.svg", after: "To keep the edge round rather than hexagonal", caption: "Sixteen rounds of stacked increases make a clear hexagon. Moving them keeps the base round." },
  { slug: "how-to-crochet-a-market-bag", file: "market-bag-step-2.svg", after: "**Mesh round 1:**", caption: "Step 3. The mesh: 48 dc with a chain space over every skipped stitch. The ch 3 counts as the first dc." },
  { slug: "how-to-crochet-a-granny-square-tote", file: "granny-round-1.svg", after: "**Round 1:** Ch 4, slip stitch in the first chain", caption: "Round 1: four clusters with a ch-2 corner between each. The ch 3 counts as the first dc." },
  { slug: "how-to-crochet-a-granny-square-tote", file: "granny-round-2.svg", after: "**Round 2:** Slip stitch in the next 2 dc", caption: "Round 2: each corner space gets two clusters, and a ch 1 sits between corners." },
  { slug: "how-to-crochet-a-granny-square-tote", file: "granny-round-4.svg", after: "**Round 4:** Slip stitch into the next corner space.", caption: "Round 4: the corner spaces (ch 2) and the side spaces (ch 1) are worked differently. Mixing them up is the usual reason a square twists." },
  { slug: "how-to-crochet-a-granny-square-tote", file: "sc-seam-two-layers.svg", after: "**Panels.** Join square A to square B", caption: "Squares are joined right sides together with one sc in each stitch and space along the edge, 19 per square." },
  { slug: "how-to-crochet-fingerless-gloves", file: "gloves-step-1.svg", after: "**Row 1:** Sc in the second chain from the hook and in each chain across. Ch 1, turn. (8)", caption: "Step 1. Chain 9 for an 8-stitch cuff, about 2 inches deep. The cuff is worked sideways." },
  { slug: "how-to-crochet-fingerless-gloves", file: "blo-rib.svg", after: "**Row 2:** Sc in the back loop only of each stitch across.", caption: "Back loop only from row 2 gives the cuff its stretch around the wrist." },
  { slug: "how-to-crochet-fingerless-gloves", file: "gloves-step-2.svg", after: "**Round 2:** Ch 1. (Sc in the next 5 stitches, 2 sc in the next) 4 times.", caption: "Step 2. Four increases take the hand from the wrist's 24 stitches to the knuckles' 28." },
  { slug: "how-to-crochet-fingerless-gloves", file: "join-round-slst.svg", after: "**Rounds 3–7:**", caption: "These rounds are joined. Starting each round in the same stitch as the join keeps the seam straight and the count at 28." },
  { slug: "how-to-crochet-slippers", file: "slipper-step-1.svg", after: "Ch 1 does not count as a stitch.", caption: "The three pieces of one slipper, drawn to the same scale from the example counts." },
  { slug: "how-to-crochet-slippers", file: "turn-first-stitch.svg", after: "**Rows 2–48:**", caption: "All three pieces are plain sc rows. Start each row in the edge stitch so the widths stay at 14, 24, and 26." },
];

export default {
  "market-bag-step-1.svg": profile({
    step: 1,
    title: "Base: rounds 1 to 17",
    rounds: [...sixInc(16, { incFirst: true }).map((r, i) => ({ n: i + 1, count: r.count })), { n: 17, count: 96, break: true }],
    highlight: [16],
    note: "Round 16 is 96, about 7.6 in across. Round 17 is even and starts the turn.",
  }),
  "market-bag-step-2.svg": roundChart({
    step: 3,
    title: "Mesh round 1 on 96",
    rounds: [ringFrom("Round 17", 96), { label: "Mesh round 1", seq: "dc,ch,skip", times: 48, count: 48, text: "(dc in next, ch 1, skip 1) around: 48 dc" }],
    current: 1,
    note: "Count the dc every few rounds. 47 or 49 means a unit was lost or added.",
  }),
  "granny-round-1.svg": grannyRound({ step: 1, n: 1 }),
  "granny-round-2.svg": grannyRound({ step: 2, n: 2 }),
  "granny-round-4.svg": grannyRound({ step: 4, n: 4, note: "Along one finished edge you sc into 12 dc, 3 side spaces, and both corners." }),
  "gloves-step-1.svg": chainStart({ step: 1, title: "Cuff: chain 9, then 8 sc", n: 9, skip: 1, rowLabel: "Row 1: 8 sc. Rows 2 to 30: back loop only." }),
  "gloves-step-2.svg": roundChart({
    step: 2,
    title: "Round 2: 24 to 28",
    rounds: [ringFrom("Round 1", 24), { label: "Round 2", seq: "5sc,inc", times: 4, count: 28, text: "(sc 5, 2 sc in next) 4 times" }],
    current: 1,
  }),
  "slipper-step-1.svg": pieces({
    step: 1,
    title: "Three pieces per slipper",
    items: [
      { name: "Sole", wIn: 3.5, hIn: 9.6, label: "14 sc\n48 rows" },
      { name: "Toe cap", wIn: 6, hIn: 3.2, label: "24 sc\n16 rows" },
      { name: "Heel wall", wIn: 6.5, hIn: 1.6, label: "26 sc\n8 rows" },
    ],
    note: "Chain one more than the stitch count for each: 15, 25, and 27.",
  }),
};
