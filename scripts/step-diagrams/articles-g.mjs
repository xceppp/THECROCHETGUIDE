// Hooded scarf, lace bandana, bowl cozy, mug cozy, scrunchie.
import { chainStart, rowGrid, stack, frame, heading, text, colors as C } from "./lib.mjs";

/** Granny triangle: row n is a V with n shells on each arm and one corner. */
function bandanaRows() {
  const h = heading(2, "Rows 1 to 4: the triangle grows from the corner");
  let body = h.svg;
  const cx = 240;
  const top = h.y + 30;
  const dy = 46;
  body += `<line x1="40" y1="${top}" x2="440" y2="${top}" stroke="${C.yarn}" stroke-width="3"/>`;
  body += `<text x="40" y="${top - 10}" font-size="20" fill="${C.soft}">long edge (row ends)</text>`;
  const shell = (x, y, ang) => {
    let s = `<g transform="rotate(${ang} ${x} ${y})">`;
    for (let k = -1; k <= 1; k++) s += `<path d="M${x + k * 7} ${y + 8} V${y - 8}" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>`;
    return s + "</g>";
  };
  for (let n = 1; n <= 4; n++) {
    const ay = top + n * dy;
    const color = n === 4 ? C.terra : C.grid;
    body += `<path d="M${cx - n * dy} ${top} L${cx} ${ay} L${cx + n * dy} ${top}" fill="none" stroke="${color}" stroke-width="${n === 4 ? 2.5 : 1.5}"/>`;
    if (n === 4) {
      for (const side of [-1, 1]) {
        for (let i = 0; i < n; i++) {
          const t = (i + 0.5) / n;
          const x = cx + side * n * dy * (1 - t);
          const y = top + (ay - top) * t;
          body += shell(x, y, side * -45);
          if (i < n - 1) {
            const t2 = (i + 1) / n;
            body += `<circle cx="${cx + side * n * dy * (1 - t2)}" cy="${top + (ay - top) * t2}" r="5" fill="${C.paper}" stroke="${C.sage}" stroke-width="3"/>`;
          }
        }
      }
      body += `<circle cx="${cx}" cy="${ay}" r="9" fill="${C.paper}" stroke="${C.terra}" stroke-width="4"/>`;
    }
    body += `<text x="${cx + 14}" y="${ay + 2}" font-size="20" fill="${n === 4 ? C.terraDeep : C.soft}">${6 * n}</text>`;
  }
  body += `<text x="440" y="${top + 4 * dy + 6}" font-size="20" fill="${C.soft}" text-anchor="end">dc per row</text>`;
  let y = top + 4 * dy + 40;
  for (const [str, fill, bold] of [
    ["Row n: n shells on each arm, 6n dc.", C.ink, true],
    ["Terracotta ring: the one ch-2 corner, (3 dc, ch 2, 3 dc) every row.", C.terraDeep],
    ["Green rings: ch-1 spaces, 2(n − 1) of them. Row 4 has 6.", C.sage],
  ]) {
    const t = text(20, y, str, { size: bold ? 22 : 20, fill, weight: bold ? "bold" : "normal" });
    body += t.svg;
    y += t.height + 6;
  }
  return frame(
    "Lace bandana rows 1 to 4",
    "The bandana drawn as nested V shapes hanging from the long edge. Each row is a V with its corner at the point. Row 4 is drawn in full: four shells of three double crochet on each arm, counting the corner halves, one ch-2 corner at the point, and six ch-1 spaces. Row n has 6n double crochet: 6, 12, 18, 24.",
    body,
    y + 16,
  );
}

/** Bandana row 1: a fan of 2 dc, ch 2, 3 dc in one chain, plus the ch 3. */
function bandanaRowOne() {
  const h = heading(1, "Row 1: everything in one chain");
  let body = h.svg;
  const y = h.y + 190;
  const base = 150;
  // Chain of 4, slip knot at left; the 4th chain from the hook is the leftmost.
  body += `<circle cx="${base - 30}" cy="${y}" r="8" fill="${C.yarn}"/>`;
  for (let i = 0; i < 4; i++)
    body += `<ellipse cx="${base + i * 44}" cy="${y}" rx="19" ry="9" fill="none" stroke="${i === 0 ? C.terra : C.sage}" stroke-width="4"${i === 0 ? "" : ' stroke-dasharray="5 3"'}/>`;
  // Fan from the first chain: 2 dc, ch 2, 3 dc.
  // Worked right to left after the turning chain: 2 dc, ch 2, then 3 dc.
  const L = 120;
  const tip = (a, len = L) => [base + len * Math.sin((a * Math.PI) / 180), y - len * Math.cos((a * Math.PI) / 180)];
  for (const a of [-70, -45, -20, 30, 55]) {
    const [ex, ey] = tip(a);
    body += `<line x1="${base}" y1="${y - 8}" x2="${ex}" y2="${ey}" stroke="${C.ink}" stroke-width="3"/>`;
    body += `<line x1="${ex - 7}" y1="${ey}" x2="${ex + 7}" y2="${ey}" stroke="${C.ink}" stroke-width="3" transform="rotate(${a} ${ex} ${ey})"/>`;
  }
  const [ax, ay] = tip(-20);
  const [qx, qy] = tip(5, 150);
  const [bx, by] = tip(30);
  body += `<path d="M${ax} ${ay} Q${qx} ${qy} ${bx} ${by}" fill="none" stroke="${C.terra}" stroke-width="4"/>`;
  body += `<text x="${qx}" y="${qy - 12}" font-size="20" fill="${C.terraDeep}" text-anchor="middle">ch-2 corner</text>`;
  // The skipped 3 chains rise as the turning chain, counting as the first dc.
  body += `<path d="M${base + 132} ${y - 8} q-10 -40 -80 -100" fill="none" stroke="${C.sage}" stroke-width="4" stroke-dasharray="6 4"/>`;
  let ty = y + 52;
  for (const [str, fill, bold] of [
    ["Ch 4. Work 2 dc, ch 2, 3 dc all in the 4th chain from the hook (terracotta).", C.ink, true],
    ["The 3 skipped chains (green, dashed) stand up as the first dc. Row 1: 6 dc and one ch-2 corner.", C.sage],
  ]) {
    const t = text(20, ty, str, { size: bold ? 22 : 20, fill, weight: bold ? "bold" : "normal" });
    body += t.svg;
    ty += t.height + 6;
  }
  return frame(
    "Lace bandana row 1",
    "A chain of 4. Every stitch of row 1 goes into the 4th chain from the hook: 2 double crochet, a chain-2 corner, then 3 double crochet. The 3 skipped chains stand up as the first double crochet, so the row has 6 double crochet and one corner.",
    body,
    ty + 14,
  );
}

const elastic = stack({
  title: "Closing the strip around the elastic",
  desc:
    "Three cross-section steps. 1: lay the elastic along the middle of the strip's wrong side. 2: fold both long edges up over it so they meet. 3: whipstitch the two long edges together along the full length, catching only the crochet and never the elastic, pushing the fabric along as you go because the strip is twice as long as the elastic.",
  steps: [
    {
      title: "Elastic on the wrong side",
      caption: "Lay it along the middle of the strip.",
      draw: (x, y) => ({ svg: `<rect x="${x + 50}" y="${y + 10}" width="340" height="40" rx="4" fill="${C.deep}" stroke="${C.yarn}" stroke-width="3"/><line x1="${x + 60}" y1="${y + 30}" x2="${x + 380}" y2="${y + 30}" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>`, height: 60 }),
    },
    {
      title: "Fold the long edges up",
      caption: "Seen from the end: the strip wraps the elastic and the long edges meet on top.",
      draw: (x, y) => ({ svg: `<circle cx="${x + 220}" cy="${y + 40}" r="10" fill="${C.ink}"/><path d="M${x + 200} ${y + 12} C${x + 160} ${y + 20} ${x + 160} ${y + 72} ${x + 220} ${y + 72} C${x + 280} ${y + 72} ${x + 280} ${y + 20} ${x + 240} ${y + 12}" fill="none" stroke="${C.yarn}" stroke-width="6" stroke-linecap="round"/>`, height: 84 }),
    },
    {
      title: "Whipstitch, not through the elastic",
      caption: "Catch both long edges, skip the elastic, and slide the fabric along as you sew.",
      draw: (x, y) => {
        let s = `<rect x="${x + 50}" y="${y + 16}" width="340" height="30" rx="15" fill="${C.deep}" stroke="${C.yarn}" stroke-width="3"/>`;
        for (let k = 0; k < 10; k++) s += `<path d="M${x + 70 + k * 32} ${y + 8} l14 14" stroke="${C.terra}" stroke-width="3"/>`;
        return { svg: s, height: 56 };
      },
    },
  ],
});

export const placements = [
  { slug: "how-to-crochet-a-hooded-scarf", file: "hooded-scarf-step-1.svg", after: "**Row 1:** Half double in the third chain from the hook and across.", caption: "Chain 26 for 24 hdc. On this page the 2 skipped chains do not count, so the row is 24, not 26." },
  { slug: "how-to-crochet-a-lace-bandana", file: "bandana-step-1.svg", after: "**Row 1:** Ch 4. In the 4th chain from the hook", caption: "Step 1. All of row 1 goes into one chain. The 3 skipped chains count as the first dc on this page." },
  { slug: "how-to-crochet-a-lace-bandana", file: "bandana-step-2.svg", after: "Row n has n shells on each side of the corner", caption: "Step 2. Every row adds one shell to each arm and keeps one corner, so the counts go 6, 12, 18, 24." },
  { slug: "how-to-crochet-a-bowl-cozy", file: "bowl-cozy-step-1.svg", after: "**Row 1:** Single crochet in the second chain from the hook and in each chain across. Chain 1, turn. (48)", caption: "Chain 49 for 48 sc, 12 inches at 4 sc per inch. Make two squares from the same count." },
  { slug: "how-to-crochet-a-bowl-cozy", file: "turn-first-stitch.svg", after: "**Rows 2–60:**", caption: "Two squares only match if both keep 48. The first stitch of each row goes in the edge stitch." },
  { slug: "crochet-mug-cozy-for-beginners", file: "mug-cozy-step-1.svg", after: "**Row 1:** Sc in the second chain from the hook and in each chain across. Ch 1, turn. (12)", caption: "Step 1. The chain sets the cozy's height: chain 13 for 12 sc, 3 inches at 4 sc per inch." },
  { slug: "crochet-mug-cozy-for-beginners", file: "mug-cozy-step-2.svg", after: "**Row 2 and on:**", caption: "Step 2. Rows build the length around the mug. Each row is 12 sc, and the ch 1 is not a stitch." },
  { slug: "crochet-mug-cozy-for-beginners", file: "turn-first-stitch.svg", after: "**Row 2 and on:**", caption: "The usual way a 12-stitch cozy grows: a stitch worked into the ch 1." },
  { slug: "how-to-crochet-a-scrunchie", file: "turn-first-stitch.svg", after: "Ch 1 and turn at the end of each row.", caption: "Keeping the count identical means starting each row in the edge stitch, not the ch 1." },
  { slug: "how-to-crochet-a-scrunchie", file: "scrunchie-step-3.svg", after: "Lay the elastic along the middle of the wrong side.", caption: "Step 3 in cross-section. The seam closes the fabric around the elastic without piercing it." },
];

export default {
  "hooded-scarf-step-1.svg": chainStart({
    step: null,
    title: "Chain 26, then 24 hdc",
    n: 26,
    skip: 2,
    stitch: "hdc",
    rowLabel: "Row 1: 24 hdc, worked back toward the slip knot.",
  }),
  "bandana-step-1.svg": bandanaRowOne(),
  "bandana-step-2.svg": bandanaRows(),
  "bowl-cozy-step-1.svg": chainStart({ step: null, title: "Chain 49, then 48 sc", n: 49, skip: 1, rowLabel: "Row 1: 48 sc, about 12 in wide." }),
  "mug-cozy-step-1.svg": chainStart({ step: 1, title: "Chain 13, then 12 sc", n: 13, skip: 1, rowLabel: "Row 1: 12 sc. This is the cozy's height." }),
  "mug-cozy-step-2.svg": rowGrid({
    step: 2,
    title: "Rows around the mug",
    cols: 12,
    rows: [1, 2, 3, 4, "…", 44, 45],
    current: 45,
    countLabel: "Every row: 12 sc. About 45 rows in the example.",
    note: "Stop when the strip reaches from one side of the handle to the other, relaxed.",
  }),
  "scrunchie-step-3.svg": elastic,
};
