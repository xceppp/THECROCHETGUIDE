/**
 * Generates the teaching SVG diagrams for the Halloween Black Cat AirPods Case
 * tutorial. Output: public/diagrams/airpods-*.svg
 *
 * Every diagram is 480 wide with text of at least 20 units so it reads on a
 * 320px phone, matching scripts/validate-diagrams.mjs. Drawings are schematic
 * and depict the written construction and stitch counts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/diagrams",
);

const INK = "#2f2a26";
const SOFT = "#6d635a";
const FAINT = "#9a9088";
const TER = "#b0604a";
const RULE = "#c9bfb3";
const ORANGE = "#d9731f";
const CATBODY = "#322d2a";
const CATDARK = "#241f1d";
const PAPER = "#fdfaf6";

function head(n, title, h) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 ${h}" role="img">
<title>${title}</title>
<desc>__DESC__</desc>
<rect width="480" height="${h}" fill="${PAPER}"/>
<style>text{font-family:Georgia,"Times New Roman",serif}</style>
<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${TER}"/></marker></defs>
<circle cx="36" cy="36" r="20" fill="${TER}"/><text x="36" y="44" font-size="22" fill="#fff" text-anchor="middle" font-weight="bold">${n}</text><text x="66" y="44" font-size="24" fill="${INK}" font-weight="bold">${title}</text>`;
}

/** Caption lines at the foot, all font-size 20. */
function caption(lines, y) {
  return lines
    .map(
      (l, i) =>
        `<text x="20" y="${y + i * 26}" font-size="20" fill="${SOFT}">${l}</text>`,
    )
    .join("");
}

function dimLine(x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${TER}" stroke-width="2" marker-start="url(#ah)" marker-end="url(#ah)"/>`;
}

const diagrams = {};

/* 1 — Device measurement map ------------------------------------------------ */
{
  const h = 520;
  const cx = 150,
    cy = 120,
    cw = 180,
    chh = 130; // front view box
  const seam = cy + 34; // lid seam line
  diagrams["airpods-measure-map"] = {
    desc:
      "Front and side view of the AirPods Pro 2 charging case. Width 2.39 inches / 60.6 mm, height 1.78 inches / 45.2 mm, depth 0.85 inches / 21.7 mm. The lid seam runs across the upper third; the charging port is centered on the bottom.",
    svg:
      head(1, "Measure the case", h) +
      // front view
      `<rect x="${cx}" y="${cy}" width="${cw}" height="${chh}" rx="20" fill="${CATBODY}"/>` +
      `<line x1="${cx}" y1="${seam}" x2="${cx + cw}" y2="${seam}" stroke="${PAPER}" stroke-width="3"/>` +
      `<circle cx="${cx + cw / 2}" cy="${cy + chh - 10}" r="7" fill="${ORANGE}"/>` +
      `<text x="${cx + cw / 2}" y="${cy - 14}" font-size="20" fill="${SOFT}" text-anchor="middle">Front</text>` +
      // width dim
      dimLine(cx, cy + chh + 26, cx + cw, cy + chh + 26) +
      `<text x="${cx + cw / 2}" y="${cy + chh + 50}" font-size="20" fill="${INK}" text-anchor="middle" font-weight="bold">2.39 in / 60.6 mm</text>` +
      // height dim
      dimLine(cx - 24, cy, cx - 24, cy + chh) +
      `<text x="${cx - 34}" y="${cy + chh / 2}" font-size="20" fill="${INK}" text-anchor="middle" font-weight="bold" transform="rotate(-90 ${cx - 34} ${cy + chh / 2})">1.78 in / 45.2 mm</text>` +
      // side view
      `<rect x="370" y="${cy}" width="46" height="${chh}" rx="16" fill="${CATDARK}"/>` +
      `<text x="393" y="${cy - 14}" font-size="20" fill="${SOFT}" text-anchor="middle">Side</text>` +
      dimLine(370, cy + chh + 26, 416, cy + chh + 26) +
      `<text x="393" y="${cy + chh + 50}" font-size="20" fill="${INK}" text-anchor="middle" font-weight="bold">0.85 in</text>` +
      `<text x="${cx + cw / 2}" y="${seam - 8}" font-size="20" fill="${PAPER}" text-anchor="middle">lid seam</text>` +
      `<text x="${cx + cw / 2 + 16}" y="${cy + chh - 6}" font-size="20" fill="${PAPER}" text-anchor="start">port</text>` +
      caption(
        [
          "Apple's own case size. The sleeve wraps",
          "the footprint: width + depth, all sides.",
          "Perimeter = 2 x (2.39 + 0.85) = 6.48 in.",
        ],
        cy + chh + 96,
      ),
  };
}

/* 2 — Oval base ------------------------------------------------------------- */
{
  const h = 540;
  const cxp = 240,
    cyp = 150;
  // draw two concentric ovals (rnd1 inner, rnd2 outer) + end-increase dots
  function oval(rx, ry, stroke, sw) {
    return `<ellipse cx="${cxp}" cy="${cyp}" rx="${rx}" ry="${ry}" fill="none" stroke="${stroke}" stroke-width="${sw}"/>`;
  }
  diagrams["airpods-base-oval"] = {
    desc:
      "Oval base worked around a foundation chain of 9. Round 1: single crochet 7 along one side, 3 in the end, 7 along the opposite side, 3 in the other end, total 20 stitches. Round 2: double the 3-stitch ends to 6 each and leave the two straight sides of 7 unworked for 26 stitches. The increases fall only at the two rounded ends.",
    svg:
      head(2, "Oval base: 20, then 26", h) +
      oval(150, 70, TER, 2) +
      oval(120, 44, RULE, 2) +
      // foundation chain hint (center line)
      `<line x1="${cxp - 70}" y1="${cyp}" x2="${cxp + 70}" y2="${cyp}" stroke="${FAINT}" stroke-width="2" stroke-dasharray="5 5"/>` +
      `<text x="${cxp}" y="${cyp + 6}" font-size="20" fill="${SOFT}" text-anchor="middle">ch 9</text>` +
      // end-increase dots (orange) at the two ends of the outer oval
      `<circle cx="${cxp - 150}" cy="${cyp}" r="6" fill="${ORANGE}"/><circle cx="${cxp - 142}" cy="${cyp - 26}" r="6" fill="${ORANGE}"/><circle cx="${cxp - 142}" cy="${cyp + 26}" r="6" fill="${ORANGE}"/>` +
      `<circle cx="${cxp + 150}" cy="${cyp}" r="6" fill="${ORANGE}"/><circle cx="${cxp + 142}" cy="${cyp - 26}" r="6" fill="${ORANGE}"/><circle cx="${cxp + 142}" cy="${cyp + 26}" r="6" fill="${ORANGE}"/>` +
      `<text x="${cxp}" y="${cyp - 80}" font-size="22" fill="${INK}" text-anchor="middle" font-weight="bold">Round 2 (26)</text>` +
      `<text x="${cxp}" y="${cyp + 96}" font-size="20" fill="${SOFT}" text-anchor="middle">Round 1 (20)</text>` +
      caption(
        [
          "Rnd 1: sc 7, 3 in end, sc 7, 3 in end = 20.",
          "Rnd 2: double each end 3 to 6; sides stay",
          "= 26. Orange dots = the increases.",
          "A flat oval grows only at the ends.",
        ],
        cyp + 150,
      ),
  };
}

/* 3 — Walls rise from the base ---------------------------------------------- */
{
  const h = 470;
  const bx = 120,
    by = 150,
    bw = 240,
    bh = 150;
  diagrams["airpods-body-rise"] = {
    desc:
      "Side view of the sleeve. The 26-stitch oval base sits flat; once the increases stop, rounds 3 to 8 work even in 26 stitches and the fabric turns up into a straight wall. No stitches are added or removed in the wall.",
    svg:
      head(3, "Walls: even rounds of 26", h) +
      // base oval (perspective ellipse) at bottom
      `<ellipse cx="${bx + bw / 2}" cy="${by + bh}" rx="${bw / 2}" ry="22" fill="none" stroke="${TER}" stroke-width="2"/>` +
      // wall
      `<path d="M${bx} ${by + bh} L${bx} ${by} " stroke="${CATBODY}" stroke-width="3" fill="none"/>` +
      `<path d="M${bx + bw} ${by + bh} L${bx + bw} ${by}" stroke="${CATBODY}" stroke-width="3" fill="none"/>` +
      `<ellipse cx="${bx + bw / 2}" cy="${by}" rx="${bw / 2}" ry="22" fill="none" stroke="${CATBODY}" stroke-width="3"/>` +
      `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="${CATBODY}" fill-opacity="0.08"/>` +
      // even round lines
      [0, 1, 2, 3, 4].map(
        (i) =>
          `<ellipse cx="${bx + bw / 2}" cy="${by + 24 + i * 24}" rx="${bw / 2}" ry="20" fill="none" stroke="${RULE}" stroke-width="1.5"/>`,
      ).join("") +
      `<text x="${bx + bw + 10}" y="${by + 8}" font-size="20" fill="${SOFT}">rim</text>` +
      `<text x="${bx + bw + 10}" y="${by + bh}" font-size="20" fill="${SOFT}">base</text>` +
      caption(
        [
          "Rnds 3-8: 26 sc each round, no increases.",
          "No increases, so the tube stands up.",
          "Stop at the lid seam.",
        ],
        by + bh + 56,
      ),
  };
}

/* 4 — Gauge and fit --------------------------------------------------------- */
{
  const h = 500;
  const rows = [
    ["24 sts", "6.0 in", "snug, grips"],
    ["26 sts", "6.5 in", "the example"],
    ["28 sts", "7.0 in", "roomy"],
  ];
  const ty = 150;
  diagrams["airpods-gauge-fit"] = {
    desc:
      "Gauge and fit. At an example 4 single crochet per inch, 24 stitches measure 6.0 inches around and grip, 26 stitches measure 6.5 inches and is the worked example, 28 stitches measure 7.0 inches and is roomy. The case footprint perimeter is 6.48 inches, so 26 stitches sits closest.",
    svg:
      head(4, "Gauge sets the stitch count", h) +
      `<text x="20" y="110" font-size="20" fill="${SOFT}">Example gauge: 4 sc = 1 in. Perimeter 6.48 in.</text>` +
      // table
      rows
        .map((r, i) => {
          const y = ty + i * 56;
          const hl = r[2] === "the example";
          return (
            `<rect x="20" y="${y - 28}" width="440" height="48" fill="${hl ? "#f6e7df" : PAPER}" stroke="${RULE}" stroke-width="1.5"/>` +
            `<text x="40" y="${y}" font-size="22" fill="${INK}" font-weight="bold">${r[0]}</text>` +
            `<text x="190" y="${y}" font-size="22" fill="${INK}">${r[1]}</text>` +
            `<text x="320" y="${y}" font-size="20" fill="${SOFT}">${r[2]}</text>`
          );
        })
        .join("") +
      caption(
        [
          "Count stitches across 1 in of your base,",
          "then pick the row nearest your perimeter.",
          "Crochet stretches: 26 drops in and holds.",
        ],
        ty + rows.length * 56 + 20,
      ),
  };
}

/* 5 — Lid clearance --------------------------------------------------------- */
{
  const h = 470;
  const cx = 130,
    cy = 110,
    cw = 220,
    chh = 150;
  const rim = cy + 96; // sleeve rim below lid seam
  diagrams["airpods-lid-clearance"] = {
    desc:
      "Side view showing lid clearance. The sleeve rim ends just below the lid seam, so the case lid is above the rim and still flips open. The flap folds over the top for carrying and folds back to open the lid. The case is removed to reach the charging port.",
    svg:
      head(5, "Leave the lid free", h) +
      `<rect x="${cx}" y="${cy}" width="${cw}" height="${chh}" rx="18" fill="${CATDARK}"/>` +
      // sleeve covering lower part
      `<path d="M${cx - 6} ${rim} h${cw + 12} v${chh - (rim - cy) + 6} a18 18 0 0 1 -18 18 h${-(cw - 24)} a18 18 0 0 1 -18 -18 Z" fill="${CATBODY}"/>` +
      `<line x1="${cx}" y1="${rim}" x2="${cx + cw}" y2="${rim}" stroke="${PAPER}" stroke-width="2"/>` +
      `<text x="${cx + cw + 10}" y="${rim + 6}" font-size="20" fill="${SOFT}">rim</text>` +
      // open lid (rotated top)
      `<path d="M${cx} ${cy} q${cw / 2} -60 ${cw} 0" fill="none" stroke="${FAINT}" stroke-width="2" stroke-dasharray="5 5"/>` +
      `<text x="${cx + cw / 2}" y="${cy - 40}" font-size="20" fill="${SOFT}" text-anchor="middle">lid opens</text>` +
      `<line x1="${cx + cw / 2}" y1="${cy - 30}" x2="${cx + cw / 2}" y2="${cy}" stroke="${FAINT}" stroke-width="2" marker-start="url(#ah)"/>` +
      caption(
        [
          "End the wall below the lid seam.",
          "Flap folds over to carry, back to open.",
          "Take the case out to charge.",
        ],
        cy + chh + 60,
      ),
  };
}

/* 6 — Cat ear --------------------------------------------------------------- */
{
  const h = 470;
  const rows = [
    ["Row 1", "6 sc", 6],
    ["Row 2", "sc2tog, sc 2, sc2tog", 4],
    ["Row 3", "sc2tog, sc2tog", 2],
    ["Row 4", "sc2tog", 1],
  ];
  const bx = 300,
    by = 110,
    unit = 22;
  diagrams["airpods-ear"] = {
    desc:
      "Cat ear worked flat as a triangle. Row 1 has 6 single crochet. Row 2 decreases one stitch at each edge to 4. Row 3 decreases to 2. Row 4 is a single decrease to 1, the point. Make two.",
    svg:
      head(6, "Cat ear: 6, 4, 2, 1", h) +
      rows
        .map((r, i) => {
          const y = by + i * 60;
          const w = r[2] * unit;
          return (
            `<text x="20" y="${y + 20}" font-size="20" fill="${INK}" font-weight="bold">${r[0]}: ${r[1]}</text>` +
            `<rect x="${bx + (6 * unit - w) / 2}" y="${y}" width="${w}" height="26" fill="${CATBODY}"/>` +
            `<text x="${bx + 6 * unit + 16}" y="${y + 20}" font-size="20" fill="${SOFT}">${r[2]}</text>`
          );
        })
        .join("") +
      // triangle outline
      `<polygon points="${bx},${by} ${bx + 6 * unit},${by} ${bx + 3 * unit},${by + 4 * 60 - 20}" fill="none" stroke="${TER}" stroke-width="2"/>` +
      caption(
        [
          "Each middle row loses 1 st each edge,",
          "so it slopes to a point. Make two.",
          "Leave a long tail to sew it on.",
        ],
        by + 4 * 60 + 20,
      ),
  };
}

/* 7 — Assembly: ears, flap, charging --------------------------------------- */
{
  const h = 500;
  const cx = 150,
    cy = 150,
    cw = 180,
    chh = 120;
  diagrams["airpods-assembly"] = {
    desc:
      "Assembly. Two ears sit on the top front, one near each end of the oval. The flap rises from the back, folds over the top, and buttons to the front; a buttonhole on its last row drops over a sewn button. The optional carrying loop sits at the back. To charge, the case comes out.",
    svg:
      head(7, "Ears, flap, and button", h) +
      // body
      `<rect x="${cx}" y="${cy}" width="${cw}" height="${chh}" rx="16" fill="${CATBODY}"/>` +
      // ears
      `<polygon points="${cx + 20},${cy} ${cx + 44},${cy - 34} ${cx + 68},${cy}" fill="${CATDARK}"/>` +
      `<polygon points="${cx + cw - 68},${cy} ${cx + cw - 44},${cy - 34} ${cx + cw - 20},${cy}" fill="${CATDARK}"/>` +
      // nose (orange)
      `<polygon points="${cx + cw / 2},${cy + 74} ${cx + cw / 2 - 12},${cy + 56} ${cx + cw / 2 + 12},${cy + 56}" fill="${ORANGE}"/>` +
      // eyes
      `<circle cx="${cx + cw / 2 - 34}" cy="${cy + 44}" r="7" fill="${ORANGE}"/><circle cx="${cx + cw / 2 + 34}" cy="${cy + 44}" r="7" fill="${ORANGE}"/>` +
      // flap folding over top (from back)
      `<path d="M${cx + 30} ${cy} q${cw / 2 - 30} -52 ${cw - 60} 0" fill="none" stroke="${TER}" stroke-width="3" stroke-dasharray="6 5"/>` +
      `<circle cx="${cx + cw / 2}" cy="${cy + 20}" r="8" fill="none" stroke="${PAPER}" stroke-width="3"/>` +
      `<text x="${cx + cw / 2}" y="${cy - 40}" font-size="20" fill="${SOFT}" text-anchor="middle">flap folds over</text>` +
      `<text x="${cx + cw + 12}" y="${cy + 24}" font-size="20" fill="${SOFT}">button</text>` +
      caption(
        [
          "Ears near the ends; face embroidered,",
          "not plastic, so nothing pulls off.",
          "Flap buttons on the front. The back loop",
          "is for a bag clip. Remove case to charge.",
        ],
        cy + chh + 70,
      ),
  };
}

/* 8 — Mistake prevention ---------------------------------------------------- */
{
  const h = 470;
  const items = [
    ["Twisted first round", "Keep all stitches facing out before you join."],
    ["Ruffled, wavy base", "Too many increases; add 6, ends only."],
    ["Flap jams the lid", "Fold the flap back before opening."],
    ["Port covered", "Slide the case out to charge."],
  ];
  diagrams["airpods-mistakes"] = {
    desc:
      "Four common mistakes. A twisted first round, a ruffled base from too many increases, a flap that blocks the lid unless folded back, and a covered charging port that needs the case removed to charge.",
    svg:
      head(8, "What goes wrong", h) +
      items
        .map((it, i) => {
          const y = 100 + i * 82;
          return (
            `<circle cx="34" cy="${y}" r="9" fill="${TER}"/>` +
            `<text x="56" y="${y + 6}" font-size="22" fill="${INK}" font-weight="bold">${it[0]}</text>` +
            `<text x="56" y="${y + 32}" font-size="20" fill="${SOFT}">${it[1]}</text>`
          );
        })
        .join(""),
  };
}

let count = 0;
for (const [name, { svg, desc }] of Object.entries(diagrams)) {
  const out = svg.replace("__DESC__", desc) + "\n</svg>\n";
  fs.writeFileSync(path.join(dir, `${name}.svg`), out, "utf8");
  count++;
  console.log("wrote", `${name}.svg`);
}
console.log(`\n${count} diagrams written`);
