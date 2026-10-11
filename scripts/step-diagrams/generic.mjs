// Technique diagrams shared by several articles.
import { compare, stack, symbol, colors as C, text } from "./lib.mjs";

const X = (x, y, s = 14, c = C.ink) => symbol("sc", x, y, s, c);

/** A row of n sc symbols from x, spacing d. */
const row = (x, y, n, d, color = C.ink, skipIdx = -1) =>
  Array.from({ length: n }, (_, i) => (i === skipIdx ? "" : X(x + i * d, y, 14, color))).join("");

export const generic = {
  "turn-first-stitch.svg": compare({
    title: "After ch 1 and turn: where the first sc goes",
    desc:
      "Two rows of single crochet. Correct: the turning ch 1 sits beside the edge and the first sc of the new row goes into the first stitch, the last one made on the row below, so the count stays the same. Mistake: the first sc goes into the ch 1, outside the edge, which adds a stitch and makes the edge flare.",
    good: {
      label: "count stays 8",
      draw: (x, y) => {
        const d = 40;
        let s = row(x + 70, y + 60, 8, d) + row(x + 70, y + 24, 8, d, C.terraDeep);
        s += `<ellipse cx="${x + 40}" cy="${y + 4}" rx="11" ry="7" fill="none" stroke="${C.sage}" stroke-width="3"/>`;
        s += `<path d="M${x + 70} ${y - 4} q0 -20 0 0" stroke="${C.terra}"/>`;
        s += `<path d="M${x + 70} ${y - 10} V${y + 10}" stroke="${C.terra}" stroke-width="3" marker-end="url(#ah)"/>`;
        return { svg: s, height: 76 };
      },
      caption: "Ch 1 does not count. The first sc goes into the very first stitch at the edge.",
    },
    bad: {
      label: "count grows to 9",
      draw: (x, y) => {
        const d = 40;
        let s = row(x + 70, y + 60, 8, d) + X(x + 30, y + 24, 14, C.terra) + row(x + 70, y + 24, 8, d, C.terraDeep);
        s += `<path d="M${x + 30} ${y - 10} V${y + 10}" stroke="${C.terra}" stroke-width="3" marker-end="url(#ah)"/>`;
        return { svg: s, height: 76 };
      },
      caption: "An sc worked into the ch 1 sits past the edge. Each one adds a stitch and the edge leans out.",
    },
  }),

  "join-round-slst.svg": compare({
    title: "Joined rounds: keep the seam straight",
    desc:
      "Rounds shown unrolled as strips, with the join of each round marked. Correct: slip stitch into the top of the first sc, ch 1, and work the first sc of the next round into that same stitch; the joins stack in a straight line. Mistake: the first sc goes into the next stitch instead, so every join moves one stitch sideways and the seam slants.",
    good: {
      label: "joins stack",
      draw: (x, y, w) => {
        let s = "";
        for (let r = 0; r < 4; r++) {
          const yy = y + 66 - r * 22;
          s += `<rect x="${x + 20}" y="${yy - 9}" width="${w - 40}" height="18" rx="4" fill="${C.deep}" stroke="${C.grid}"/>`;
          s += `<circle cx="${x + 150}" cy="${yy}" r="6" fill="${C.terra}"/>`;
        }
        return { svg: s, height: 80 };
      },
      caption: "Sl st to the first sc, ch 1, then the first sc of the next round goes in the same stitch as the join.",
    },
    bad: {
      label: "joins walk sideways",
      draw: (x, y, w) => {
        let s = "";
        for (let r = 0; r < 4; r++) {
          const yy = y + 66 - r * 22;
          s += `<rect x="${x + 20}" y="${yy - 9}" width="${w - 40}" height="18" rx="4" fill="${C.deep}" stroke="${C.grid}"/>`;
          s += `<circle cx="${x + 150 + r * 34}" cy="${yy}" r="6" fill="${C.terra}"/>`;
        }
        return { svg: s, height: 80 };
      },
      caption: "Starting in the next stitch skips one. The seam slants and the round comes up one short.",
    },
  }),

  "increase-stagger.svg": compare({
    title: "Flat circle: stagger the increases",
    desc:
      "Correct: the increase in each round is moved, for example by working half the plain stitches before the first increase on alternate rounds, so the edge stays round. Mistake: every increase lands directly above the last one, which builds six corners and the circle becomes a hexagon.",
    good: {
      label: "round",
      draw: (x, y) => {
        const cx = x + 220;
        const cy = y + 70;
        let s = `<circle cx="${cx}" cy="${cy}" r="64" fill="${C.deep}" stroke="${C.yarn}" stroke-width="3"/>`;
        for (let r = 1; r <= 3; r++)
          for (let k = 0; k < 6; k++) {
            const a = -Math.PI / 2 + (k * Math.PI) / 3 + (r % 2 ? 0 : Math.PI / 6);
            s += `<circle cx="${(cx + r * 20 * Math.cos(a)).toFixed(1)}" cy="${(cy + r * 20 * Math.sin(a)).toFixed(1)}" r="4.5" fill="${C.terra}"/>`;
          }
        return { svg: s, height: 140 };
      },
      caption: "Increases (dots) shift position every other round, so the edge stays a circle.",
    },
    bad: {
      label: "hexagon",
      draw: (x, y) => {
        const cx = x + 220;
        const cy = y + 70;
        const pts = Array.from({ length: 6 }, (_, k) => {
          const a = -Math.PI / 2 + (k * Math.PI) / 3;
          return `${(cx + 70 * Math.cos(a)).toFixed(1)},${(cy + 70 * Math.sin(a)).toFixed(1)}`;
        }).join(" ");
        let s = `<polygon points="${pts}" fill="${C.deep}" stroke="${C.yarn}" stroke-width="3"/>`;
        for (let r = 1; r <= 3; r++)
          for (let k = 0; k < 6; k++) {
            const a = -Math.PI / 2 + (k * Math.PI) / 3;
            s += `<circle cx="${(cx + r * 20 * Math.cos(a)).toFixed(1)}" cy="${(cy + r * 20 * Math.sin(a)).toFixed(1)}" r="4.5" fill="${C.terra}"/>`;
          }
        return { svg: s, height: 140 };
      },
      caption: "Increases stacked in the same six places push out six corners.",
    },
  }),

  "whipstitch-outer-loops.svg": compare({
    title: "Whipstitch seam: outer loops only",
    desc:
      "Two edges laid side by side, right sides together. Correct: the needle passes through the outer loop of each edge stitch only, so the seam is flat and takes almost no width. Mistake: the needle goes through the whole stitch on both sides, which builds a thick ridge and takes width from the inside.",
    good: {
      label: "flat seam",
      draw: (x, y) => {
        let s = "";
        for (let k = 0; k < 6; k++) {
          const xx = x + 60 + k * 58;
          s += `<ellipse cx="${xx}" cy="${y + 20}" rx="22" ry="9" fill="none" stroke="${C.yarn}" stroke-width="3"/>`;
          s += `<ellipse cx="${xx}" cy="${y + 56}" rx="22" ry="9" fill="none" stroke="${C.yarn}" stroke-width="3"/>`;
          s += `<path d="M${xx + 14} ${y + 14} C${xx + 30} ${y + 36}, ${xx + 30} ${y + 40}, ${xx + 14} ${y + 62}" fill="none" stroke="${C.terra}" stroke-width="3"/>`;
        }
        return { svg: s, height: 76 };
      },
      caption: "Through the outer loop of each edge stitch. The seam lies flat and the inside keeps its width.",
    },
    bad: {
      label: "bulky ridge",
      draw: (x, y) => {
        let s = "";
        for (let k = 0; k < 6; k++) {
          const xx = x + 60 + k * 58;
          s += `<ellipse cx="${xx}" cy="${y + 20}" rx="22" ry="9" fill="none" stroke="${C.yarn}" stroke-width="3"/>`;
          s += `<ellipse cx="${xx}" cy="${y + 56}" rx="22" ry="9" fill="none" stroke="${C.yarn}" stroke-width="3"/>`;
          s += `<path d="M${xx} ${y + 4} C${xx + 40} ${y + 30}, ${xx + 40} ${y + 46}, ${xx} ${y + 72}" fill="none" stroke="${C.terra}" stroke-width="4"/>`;
        }
        return { svg: s, height: 80 };
      },
      caption: "Through whole stitches. The seam stands up as a ridge and a snug piece loses width.",
    },
  }),

  "magic-ring.svg": stack({
    title: "Magic ring, step by step",
    desc:
      "Four steps. 1: wrap the yarn around two fingers so the tail crosses over the working yarn. 2: insert the hook under the ring, catch the working yarn, and pull up a loop, then ch 1; the ch 1 is not a stitch. 3: work the stated number of sc into the ring, over both strands of the ring and the tail. 4: pull the tail to close the center, then count the stitches.",
    steps: [
      {
        title: "Wrap",
        caption: "Loop the yarn so the tail crosses over the working yarn.",
        draw: (x, y) => ({
          svg: `<circle cx="${x + 200}" cy="${y + 40}" r="34" fill="none" stroke="${C.yarn}" stroke-width="5"/><path d="M${x + 170} ${y + 56} L${x + 120} ${y + 86}" stroke="${C.yarn}" stroke-width="5" stroke-linecap="round"/><path d="M${x + 228} ${y + 58} L${x + 290} ${y + 90}" stroke="${C.yarn}" stroke-width="5" stroke-linecap="round"/><text x="${x + 96}" y="${y + 80}" font-size="20" fill="${C.soft}" text-anchor="end">tail</text><text x="${x + 300}" y="${y + 92}" font-size="20" fill="${C.soft}">to ball</text>`,
          height: 96,
        }),
      },
      {
        title: "Pull up a loop, ch 1",
        caption: "Hook under the ring, catch the working yarn, pull up a loop, ch 1. The ch 1 is not a stitch.",
        draw: (x, y) => ({
          svg: `<circle cx="${x + 160}" cy="${y + 40}" r="34" fill="none" stroke="${C.yarn}" stroke-width="5"/><path d="M${x + 196} ${y + 30} H${x + 330} q12 0 12 -12" fill="none" stroke="${C.terra}" stroke-width="5" stroke-linecap="round"/><ellipse cx="${x + 230}" cy="${y + 30}" rx="12" ry="8" fill="none" stroke="${C.sage}" stroke-width="3"/>`,
          height: 84,
        }),
      },
      {
        title: "Stitches into the ring",
        caption: "Work each sc over both the ring and the tail. Six is the usual first round.",
        draw: (x, y) => {
          let s = `<circle cx="${x + 200}" cy="${y + 50}" r="34" fill="none" stroke="${C.yarn}" stroke-width="5"/>`;
          for (let k = 0; k < 6; k++) {
            const a = -Math.PI / 2 + (k * Math.PI) / 3;
            s += X(x + 200 + 50 * Math.cos(a), y + 50 + 50 * Math.sin(a), 14, C.terraDeep);
          }
          return { svg: s, height: 104 };
        },
      },
      {
        title: "Pull the tail tight",
        caption: "The center closes. Count the stitches before you start the next round.",
        draw: (x, y) => {
          let s = `<circle cx="${x + 200}" cy="${y + 44}" r="5" fill="${C.yarn}"/><path d="M${x + 200} ${y + 49} V${y + 86}" stroke="${C.yarn}" stroke-width="4"/>`;
          for (let k = 0; k < 6; k++) {
            const a = -Math.PI / 2 + (k * Math.PI) / 3;
            s += X(x + 200 + 26 * Math.cos(a), y + 44 + 26 * Math.sin(a), 14, C.terraDeep);
          }
          return { svg: s, height: 92 };
        },
      },
    ],
  }),

  "invisible-decrease.svg": stack({
    title: "Invisible decrease for amigurumi",
    desc:
      "Three steps. 1: insert the hook into the front loop only of the next stitch. 2: without pulling through, insert into the front loop of the stitch after it, so three loops are on the hook. 3: yarn over and pull through the two front loops, then yarn over and pull through the two loops on the hook. Two stitches become one.",
    steps: [
      {
        title: "Front loop of the next stitch",
        caption: "Insert under the front loop only. Do not yarn over yet.",
        draw: (x, y) => ({
          svg: `<path d="M${x + 80} ${y + 30} h120 M${x + 220} ${y + 30} h120" stroke="${C.yarn}" stroke-width="6" stroke-linecap="round"/><path d="M${x + 80} ${y + 52} h120 M${x + 220} ${y + 52} h120" stroke="${C.grid}" stroke-width="6" stroke-linecap="round"/><path d="M${x + 110} ${y + 74} L${x + 150} ${y + 26}" stroke="${C.terra}" stroke-width="5" stroke-linecap="round"/><text x="${x + 80}" y="${y + 96}" font-size="20" fill="${C.soft}">front loops dark, back loops pale</text>`,
          height: 102,
        }),
      },
      {
        title: "Front loop of the stitch after it",
        caption: "Now three loops are on the hook.",
        draw: (x, y) => ({
          svg: `<path d="M${x + 80} ${y + 30} h120 M${x + 220} ${y + 30} h120" stroke="${C.yarn}" stroke-width="6" stroke-linecap="round"/><path d="M${x + 110} ${y + 60} L${x + 290} ${y + 26}" stroke="${C.terra}" stroke-width="5" stroke-linecap="round"/>`,
          height: 70,
        }),
      },
      {
        title: "Close it",
        caption: "Yarn over, pull through the two front loops, yarn over, pull through both loops on the hook. Two stitches become one.",
        draw: (x, y) => ({ svg: X(x + 200, y + 30, 18, C.sage) + `<text x="${x + 228}" y="${y + 38}" font-size="20" fill="${C.soft}">2 sts → 1</text>`, height: 52 }),
      },
    ],
  }),

  "sc-seam-two-layers.svg": stack({
    title: "Joining two pieces with single crochet",
    desc:
      "Two steps. 1: hold the pieces wrong sides together with the edges lined up stitch for stitch. 2: insert the hook through both layers at once, matching stitch to stitch, and work one sc in each pair; work 3 sc in a corner stitch to turn a corner flat.",
    steps: [
      {
        title: "Line up the edges",
        caption: "Wrong sides together. Match the stitches pair by pair, and count both edges first.",
        draw: (x, y) => ({
          svg: `<rect x="${x + 60}" y="${y + 6}" width="300" height="60" fill="${C.deep}" stroke="${C.yarn}" stroke-width="3"/><rect x="${x + 72}" y="${y + 16}" width="300" height="60" fill="none" stroke="${C.sage}" stroke-width="3" stroke-dasharray="6 4"/>`,
          height: 84,
        }),
      },
      {
        title: "One sc through both layers",
        caption: "Hook through both edge stitches at once, then sc. In a corner, 3 sc in the corner stitch keeps it flat.",
        draw: (x, y) => {
          let s = `<path d="M${x + 60} ${y + 40} H${x + 360}" stroke="${C.yarn}" stroke-width="5"/>`;
          for (let k = 0; k < 8; k++) s += X(x + 80 + k * 38, y + 20, 14, C.terraDeep);
          return { svg: s, height: 56 };
        },
      },
    ],
  }),
};
