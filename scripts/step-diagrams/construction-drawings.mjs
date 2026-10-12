/**
 * Labeled construction drawings for the priority projects.
 * Canvas is 480 wide. Essential labels are 22 units, which renders
 * at about 14 px on a 360 px screen after the article's side padding.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const W = 480;
const ink = "#2f2a26";
const soft = "#6d635a";
const paper = "#fdfaf6";
const deep = "#f6efe6";
const terra = "#b0604a";
const sage = "#7d8b72";
const rule = "#e6ddd1";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function text(x, y, s, { size = 22, fill = ink, weight = "normal", anchor = "start" } = {}) {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}"${weight === "bold" ? ' font-weight="bold"' : ""}>${esc(s)}</text>`;
}

function frame(title, desc, height, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}" role="img">
<title>${esc(title)}</title>
<desc>${esc(desc)}</desc>
<rect width="${W}" height="${height}" fill="${paper}"/>
<style>text{font-family:Georgia,"Times New Roman",serif}</style>
<defs>
<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${terra}"/></marker>
<pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8L8 0" stroke="${sage}" stroke-width="1.5"/></pattern>
</defs>
${body}
</svg>
`;
}

const out = [];
function save(file, title, desc, height, body) {
  writeFileSync(join("public/diagrams", file), frame(title, desc, height, body));
  out.push({ file, height, title, desc });
}

save(
  "spiderweb-wallet-closure.svg",
  "Spiderweb wallet: mark the button where the loop lands",
  "The flap ends in a chain-8 loop. With cards inside, close the flap without stretching it and mark where the loop lands on the front wall. Remove the cards and sew the button through the front wall only.",
  1240,
  `
${text(16, 36, "Mark the button where the loop lands", { size: 24, weight: "bold" })}
<rect x="12" y="52" width="456" height="300" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 84, "1. Flap and loop", { weight: "bold" })}
<polygon points="150,110 330,110 270,250 210,250" fill="${ink}"/>
${text(240, 175, "flap", { fill: paper, anchor: "middle", weight: "bold" })}
<ellipse cx="240" cy="286" rx="26" ry="18" fill="none" stroke="${terra}" stroke-width="4"/>
${text(280, 292, "ch-8 loop", { fill: terra, weight: "bold" })}
${text(28, 330, "The loop returns to the point stitch.", { size: 20 })}
<rect x="12" y="368" width="456" height="390" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 400, "2. Close it on the cards", { weight: "bold" })}
<rect x="70" y="430" width="220" height="250" fill="#efe6da" stroke="${ink}" stroke-width="3"/>
${text(180, 560, "front wall", { anchor: "middle", weight: "bold" })}
<polygon points="90,430 270,430 230,560 130,560" fill="${ink}" opacity="0.92"/>
${text(180, 490, "flap", { fill: paper, anchor: "middle", weight: "bold" })}
<ellipse cx="180" cy="590" rx="22" ry="14" fill="none" stroke="${terra}" stroke-width="4"/>
<circle cx="180" cy="640" r="10" fill="none" stroke="${terra}" stroke-width="3"/>
<line x1="172" y1="632" x2="188" y2="648" stroke="${terra}" stroke-width="3"/>
<line x1="188" y1="632" x2="172" y2="648" stroke="${terra}" stroke-width="3"/>
${text(200, 646, "mark", { fill: terra, weight: "bold" })}
<rect x="100" y="500" width="160" height="90" fill="none" stroke="${sage}" stroke-width="2" stroke-dasharray="6 4"/>
${text(180, 548, "cards inside", { anchor: "middle", fill: sage, size: 20 })}
${text(310, 470, "Do not stretch", { weight: "bold" })}
${text(310, 500, "the flap.", { weight: "bold" })}
${text(310, 540, "Mark the loop.", { weight: "bold" })}
${text(310, 580, "Then take the", { weight: "bold" })}
${text(310, 610, "cards out.", { weight: "bold" })}
<rect x="12" y="774" width="456" height="360" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 806, "3. Sew the front wall only", { weight: "bold" })}
<rect x="40" y="840" width="180" height="220" fill="#efe6da" stroke="${ink}" stroke-width="3"/>
${text(48, 1040, "front wall", { weight: "bold" })}
<rect x="250" y="840" width="180" height="220" fill="url(#hatch)" stroke="${ink}" stroke-width="3"/>
${text(340, 960, "back wall", { anchor: "middle", weight: "bold" })}
<path d="M130 880 v70" stroke="${terra}" stroke-width="4" marker-end="url(#ah)"/>
<circle cx="130" cy="970" r="12" fill="${terra}"/>
${text(40, 1090, "Needle stops in the front.", { size: 20 })}
${text(40, 1120, "Leave the back wall free.", { size: 20 })}
${text(16, 1188, "Legend: solid = front. Hatch = back.", { size: 20, fill: soft })}
${text(16, 1216, "X = button mark.", { size: 20, fill: soft })}
`,
);

save(
  "pumpkin-wallet-stem-tab.svg",
  "Pumpkin stem: roll the six-stitch width, sew it on the back rim",
  "A stem of 6 stitches by 3 rows. Roll the six-stitch width so the two three-row edges meet. The three-row direction is the cylinder height. Sew the stem upright on the back rim over the tab base. The tab folds over the opening on its own.",
  1480,
  `
${text(16, 36, "Roll the width. Keep the height.", { size: 24, weight: "bold" })}
<rect x="12" y="52" width="456" height="420" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 84, "1. Flat stem: 6 stitches by 3 rows", { weight: "bold" })}
<rect x="70" y="140" width="300" height="120" fill="#6f8f62" stroke="${ink}" stroke-width="3"/>
<line x1="120" y1="140" x2="120" y2="260" stroke="${ink}" stroke-width="1.5"/>
<line x1="170" y1="140" x2="170" y2="260" stroke="${ink}" stroke-width="1.5"/>
<line x1="220" y1="140" x2="220" y2="260" stroke="${ink}" stroke-width="1.5"/>
<line x1="270" y1="140" x2="270" y2="260" stroke="${ink}" stroke-width="1.5"/>
<line x1="320" y1="140" x2="320" y2="260" stroke="${ink}" stroke-width="1.5"/>
${text(220, 210, "6 stitches", { anchor: "middle", fill: paper, weight: "bold" })}
${text(40, 210, "3", { weight: "bold" })}
${text(40, 236, "rows", { size: 20 })}
<path d="M80 300 C140 360, 280 360, 340 300" fill="none" stroke="${terra}" stroke-width="4" marker-end="url(#ah)"/>
${text(70, 400, "Roll this width into the circumference.", { size: 20 })}
${text(70, 430, "Bring the two 3-row edges together.", { size: 20 })}
${text(70, 456, "Those edges are the left and right sides.", { size: 20 })}
<rect x="12" y="488" width="456" height="340" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 520, "2. Finished stem, standing up", { weight: "bold" })}
<ellipse cx="160" cy="580" rx="50" ry="16" fill="#5f7d54" stroke="${ink}" stroke-width="3"/>
<rect x="110" y="580" width="100" height="140" fill="#6f8f62" stroke="${ink}" stroke-width="3"/>
<ellipse cx="160" cy="720" rx="50" ry="16" fill="#6f8f62" stroke="${ink}" stroke-width="3"/>
<line x1="210" y1="580" x2="210" y2="720" stroke="${terra}" stroke-width="3" stroke-dasharray="6 4"/>
${text(230, 650, "seam:", { weight: "bold" })}
${text(230, 678, "the two", { weight: "bold" })}
${text(230, 706, "3-row edges", { weight: "bold" })}
${text(28, 780, "Height is the 3-row direction.", { size: 20 })}
<rect x="12" y="844" width="456" height="560" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 876, "3. Stem on the back rim", { weight: "bold" })}
<rect x="170" y="910" width="36" height="60" fill="#6f8f62" stroke="${ink}" stroke-width="3"/>
${text(220, 948, "stem", { weight: "bold" })}
<rect x="40" y="980" width="200" height="160" fill="#e7a15a" stroke="${ink}" stroke-width="3"/>
${text(140, 1080, "front", { anchor: "middle", weight: "bold" })}
<rect x="40" y="960" width="200" height="50" fill="#d4893c" stroke="${ink}" stroke-width="3"/>
${text(56, 992, "back rim", { weight: "bold" })}
<path d="M150 970 v30 h80 v140" fill="none" stroke="#3f6b45" stroke-width="8"/>
${text(250, 1080, "tab", { weight: "bold", fill: "#3f6b45" })}
${text(250, 1110, "folds over", { size: 20 })}
${text(250, 1136, "the opening", { size: 20 })}
${text(28, 1180, "Stem sits on the back rim,", { size: 20 })}
${text(28, 1208, "over the tab's base.", { size: 20 })}
${text(28, 1248, "The tab still folds on its own.", { size: 20, weight: "bold" })}
${text(28, 1288, "The stem is not the closure.", { size: 20, weight: "bold" })}
${text(16, 1450, "Legend: orange = wallet. Green = stem and tab.", { size: 20, fill: soft })}
`,
);

save(
  "pumpkin-wallet-sideways.svg",
  "Pumpkin wallet: sideways ribs and the fold",
  "Stitches run from the front rim at stitch 1 to the back rim at stitch 20. Rows run from row 1 to the last row. The fold is between stitch positions 10 and 11. Both long edges are rims and stay open.",
  980,
  `
${text(16, 36, "Sideways fabric and the fold", { size: 24, weight: "bold" })}
<rect x="80" y="160" width="320" height="520" fill="#e7a15a" stroke="${ink}" stroke-width="3"/>
${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => `<line x1="${112 + i * 28}" y1="160" x2="${112 + i * 28}" y2="680" stroke="#c47a32" stroke-width="2"/>`).join("")}
<line x1="80" y1="420" x2="400" y2="420" stroke="${terra}" stroke-width="3" stroke-dasharray="8 6"/>
${text(16, 150, "front rim", { size: 20, weight: "bold" })}
${text(16, 178, "stitch 1", { size: 20 })}
${text(16, 700, "back rim", { size: 20, weight: "bold" })}
${text(16, 728, "stitch 20", { size: 20 })}
${text(90, 410, "fold", { fill: paper, weight: "bold" })}
${text(250, 448, "between 10 and 11", { fill: paper, weight: "bold" })}
${text(90, 760, "row 1", { weight: "bold" })}
${text(330, 760, "last row", { weight: "bold" })}
<path d="M240 80 v50" stroke="${terra}" stroke-width="4" marker-end="url(#ah)"/>
${text(250, 100, "stitches", { weight: "bold" })}
<path d="M40 400 h30" stroke="${sage}" stroke-width="4" marker-end="url(#ah)"/>
${text(16, 860, "Rows run left to right.", { size: 20 })}
${text(16, 892, "Ribs run with the stitches.", { size: 20 })}
${text(16, 940, "Arrow: stitch direction. Dashed line: fold.", { size: 20, fill: soft })}
`,
);

save(
  "pumpkin-wallet-fold.svg",
  "Pumpkin wallet: which edges are seamed",
  "Seam the foundation edge and the last-row edge. The two rims meet at the top and stay open. Fold right side out between stitch positions 10 and 11.",
  860,
  `
${text(16, 36, "Seam the short edges. Leave the rims open.", { size: 22, weight: "bold" })}
<rect x="40" y="80" width="160" height="280" fill="#e7a15a" stroke="${ink}" stroke-width="3"/>
${text(48, 70, "flat", { weight: "bold" })}
<line x1="40" y1="220" x2="200" y2="220" stroke="${terra}" stroke-width="3" stroke-dasharray="6 4"/>
${text(48, 120, "front rim", { size: 20, weight: "bold" })}
${text(48, 150, "open", { size: 20 })}
${text(48, 320, "back rim", { size: 20, weight: "bold" })}
${text(48, 348, "open", { size: 20 })}
${text(8, 230, "seam", { size: 20, fill: terra })}
${text(168, 250, "seam", { size: 20, fill: terra })}
<path d="M220 220 h40" stroke="${terra}" stroke-width="4" marker-end="url(#ah)"/>
<rect x="280" y="140" width="160" height="160" fill="#e7a15a" stroke="${ink}" stroke-width="3"/>
${text(288, 130, "folded", { weight: "bold" })}
${text(300, 200, "opening", { weight: "bold" })}
${text(300, 228, "two rims", { size: 20 })}
<line x1="280" y1="140" x2="280" y2="300" stroke="${terra}" stroke-width="5"/>
<line x1="440" y1="140" x2="440" y2="300" stroke="${terra}" stroke-width="5"/>
${text(280, 340, "left seam", { size: 20, fill: terra })}
${text(360, 340, "right seam", { size: 20, fill: terra })}
${text(16, 460, "Pair stitches 10 with 11, 9 with 12,", { size: 20 })}
${text(16, 490, "and so on, up to 1 with 20.", { size: 20 })}
${text(16, 540, "Fold right side out so the face stays outside.", { size: 20 })}
${text(16, 590, "Slide a card in before you tighten the seams.", { size: 20, weight: "bold" })}
${text(16, 820, "Legend: dashed line = fold. Thick sides = seams.", { size: 20, fill: soft })}
`,
);

save(
  "ghost-wallet-panels.svg",
  "Ghost wallet: wide hem at the bottom, decreases at the top",
  "The back is 17 stitches wide for rows 1 to 18. The foundation hem is the straight bottom. Rows 19 to 22 decrease at the top to 15, 13, 11, and 9. The front is a separate panel, 17 stitches by 14 rows. Its row-14 edge is the opening, below the face.",
  980,
  `
${text(16, 34, "Wide hem at the bottom", { size: 24, weight: "bold" })}
${text(16, 64, "TOP: row 22", { size: 20, weight: "bold" })}
<rect x="78" y="78" width="84" height="28" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
${text(168, 98, "9", { size: 20 })}
<rect x="66" y="106" width="108" height="28" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
${text(180, 126, "11", { size: 20 })}
<rect x="54" y="134" width="132" height="28" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
${text(192, 154, "13", { size: 20 })}
<rect x="42" y="162" width="156" height="28" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
${text(204, 182, "15", { size: 20 })}
<rect x="24" y="190" width="192" height="420" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
${text(36, 220, "rows 1-18", { size: 20, weight: "bold" })}
${text(36, 248, "17 sts wide", { size: 20 })}
<circle cx="80" cy="290" r="8" fill="${ink}"/>
<circle cx="150" cy="290" r="8" fill="${ink}"/>
${text(36, 330, "face", { size: 20 })}
<line x1="24" y1="360" x2="216" y2="360" stroke="${terra}" stroke-width="5"/>
${text(36, 392, "row 14 opening", { size: 20, fill: terra, weight: "bold" })}
${text(36, 420, "below the face", { size: 20, fill: terra })}
${text(16, 640, "BOTTOM: foundation / row 1", { size: 20, weight: "bold" })}
<rect x="268" y="360" width="190" height="250" fill="#fff" stroke="${ink}" stroke-width="3"/>
${text(280, 392, "FRONT", { weight: "bold" })}
${text(280, 424, "17 by 14 rows", { size: 20 })}
${text(280, 470, "top: row 14", { size: 20, weight: "bold" })}
${text(280, 500, "opening", { size: 20 })}
${text(280, 560, "bottom: row 1", { size: 20, weight: "bold" })}
${text(280, 590, "foundation hem", { size: 20 })}
${text(16, 700, "Row 19 = 15. Row 20 = 13.", { size: 20 })}
${text(16, 730, "Row 21 = 11. Row 22 = 9.", { size: 20 })}
${text(16, 770, "RS of the back is the face side.", { size: 20 })}
${text(16, 800, "WS of the front faces the pocket.", { size: 20 })}
${text(16, 840, "Match the foundation hems.", { size: 20 })}
${text(16, 880, "Eight back rows stay above the front.", { size: 20 })}
${text(16, 940, "Numbers are stitch counts at the top.", { size: 20, fill: soft })}
`,
);

save(
  "ghost-pocket-orientation.svg",
  "Ghost wallet: front on the lower back, face above the opening",
  "The wide foundation hem is at the bottom. Rows 19 to 22 narrow at the top. Place the front on the lower back, covering rows 1 to 14. The face sits above that opening. Leave the front's row-14 edge unworked.",
  860,
  `
${text(16, 34, "Front covers the lower back", { size: 24, weight: "bold" })}
${text(16, 64, "TOP: row 22", { size: 20, weight: "bold" })}
<rect x="150" y="78" width="100" height="24" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
<rect x="130" y="102" width="140" height="24" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
<rect x="114" y="126" width="172" height="24" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
<rect x="100" y="150" width="200" height="24" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
<rect x="80" y="174" width="240" height="460" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
<circle cx="160" cy="230" r="10" fill="${ink}"/>
<circle cx="240" cy="230" r="10" fill="${ink}"/>
${text(96, 270, "face, above the opening", { size: 20, weight: "bold" })}
<rect x="100" y="316" width="200" height="318" fill="#fff" stroke="${ink}" stroke-width="3"/>
<line x1="100" y1="316" x2="300" y2="316" stroke="${terra}" stroke-width="6"/>
${text(320, 308, "row 14", { fill: terra, size: 20, weight: "bold" })}
${text(320, 336, "unworked", { fill: terra, size: 20 })}
${text(112, 400, "front", { weight: "bold" })}
${text(112, 430, "rows 1-14", { size: 20 })}
${text(80, 670, "BOTTOM: foundation hem", { size: 20, weight: "bold" })}
${text(16, 720, "Wrong side of the front faces the back.", { size: 20 })}
${text(16, 760, "The head narrows only at the top.", { size: 20 })}
${text(16, 810, "Thick line: leave this edge unsewn.", { size: 20, fill: soft })}
`,
);

save(
  "ghost-wallet-join.svg",
  "Ghost wallet: joining path and the row-14 change",
  "Join the hem through both layers. Up each side, 14 single crochet go through both layers. At front row 14, continue through the back alone. Do not cross the front's top edge.",
  1280,
  `
${text(16, 36, "Where the hook goes", { size: 24, weight: "bold" })}
<rect x="12" y="52" width="456" height="360" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 84, "1. Through both layers", { weight: "bold" })}
<rect x="40" y="130" width="200" height="36" fill="#fff" stroke="${ink}" stroke-width="3"/>
<rect x="40" y="174" width="200" height="36" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
<path d="M110 108 v120" stroke="${terra}" stroke-width="4" marker-end="url(#ah)"/>
${text(250, 156, "front row end", { size: 20 })}
${text(250, 200, "back row end", { size: 20 })}
${text(130, 124, "hook", { fill: terra, weight: "bold" })}
${text(28, 250, "Use this for the hem and for", { size: 20 })}
${text(28, 278, "side stitches 1 through 14.", { size: 20 })}
${text(28, 320, "A row end is the side of the row,", { size: 20 })}
${text(28, 348, "not the turning chain.", { size: 20 })}
<rect x="12" y="428" width="456" height="300" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 460, "2. Change at front row 14", { weight: "bold" })}
<rect x="40" y="500" width="200" height="36" fill="#fff" stroke="${ink}" stroke-width="3"/>
${text(48, 526, "front stops here", { size: 20, weight: "bold" })}
<rect x="40" y="544" width="280" height="36" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
${text(48, 570, "back continues", { size: 20, weight: "bold" })}
<path d="M250 480 v80" stroke="${terra}" stroke-width="4" marker-end="url(#ah)"/>
${text(28, 640, "Stitch 14 is the last one through both.", { size: 20 })}
${text(28, 668, "The next 4 are back only.", { size: 20 })}
${text(28, 696, "Then 5 along the head slope.", { size: 20 })}
<rect x="12" y="744" width="456" height="480" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 776, "3. Path, opening left open", { weight: "bold" })}
<rect x="80" y="820" width="200" height="280" fill="none" stroke="${ink}" stroke-width="3"/>
<line x1="80" y1="980" x2="280" y2="980" stroke="${terra}" stroke-width="6"/>
${text(300, 986, "do not", { fill: terra, weight: "bold" })}
${text(300, 1014, "cross", { fill: terra, weight: "bold" })}
<path d="M80 1100 h200 v-280 h-200" fill="none" stroke="${sage}" stroke-width="4" marker-end="url(#ah)"/>
${text(28, 1140, "Start at the hem, both layers.", { size: 20 })}
${text(28, 1168, "14 up the side, both layers.", { size: 20 })}
${text(28, 1196, "Then back only, around the head.", { size: 20 })}
${text(16, 1240, "Legend: arrow = hook.", { size: 20, fill: soft })}
${text(16, 1268, "Thick line = unworked opening.", { size: 20, fill: soft })}
`,
);

save(
  "ghost-wallet-snap.svg",
  "Ghost wallet: snap halves face each other inside the pocket",
  "Socket on the back's right side at row 13, stitch 9. Ball on the front's wrong side at the same place. Both face into the pocket. Test with a card before joining.",
  720,
  `
${text(16, 36, "Snap halves face inside", { size: 24, weight: "bold" })}
<rect x="40" y="80" width="160" height="420" fill="#f4efe6" stroke="${ink}" stroke-width="3"/>
${text(52, 110, "back RS", { weight: "bold" })}
<circle cx="120" cy="280" r="22" fill="none" stroke="${terra}" stroke-width="4"/>
${text(52, 340, "socket", { weight: "bold" })}
${text(52, 368, "row 13", { size: 20 })}
${text(52, 396, "stitch 9", { size: 20 })}
<rect x="260" y="200" width="160" height="300" fill="#fff" stroke="${ink}" stroke-width="3"/>
${text(272, 230, "front WS", { weight: "bold" })}
<circle cx="340" cy="360" r="16" fill="${terra}"/>
${text(272, 410, "ball", { weight: "bold" })}
${text(272, 438, "row 13", { size: 20 })}
${text(272, 466, "stitch 9", { size: 20 })}
<path d="M142 280 h100" stroke="${sage}" stroke-width="3" marker-end="url(#ah)"/>
${text(16, 560, "They meet inside the pocket.", { size: 20 })}
${text(16, 592, "Move both up together if a card hits them.", { size: 20 })}
${text(16, 640, "Sew each half through its own panel only.", { size: 20, weight: "bold" })}
${text(16, 690, "Legend: ring = socket. Dot = ball.", { size: 20, fill: soft })}
`,
);

save(
  "witch-wallet-divider.svg",
  "Witch-hat wallet: stitch 12 is at the top opening",
  "Front, divider, and back meet at the bottom fold. Count side stitches upward. Positions 1 to 11 pass through all three layers. Position 12 is at the top, above the shorter divider, and passes through front and back only. Both pocket openings and the flap stay free. The hat stays above the buttonhole.",
  1320,
  `
${text(16, 34, "Count the side seam upward", { size: 24, weight: "bold" })}
${text(16, 68, "TOP: pocket opening", { size: 20, weight: "bold" })}
<rect x="36" y="90" width="80" height="250" fill="#c4b6e0" stroke="${ink}" stroke-width="3"/>
<rect x="140" y="150" width="80" height="190" fill="url(#hatch)" stroke="${ink}" stroke-width="3"/>
<rect x="244" y="90" width="80" height="250" fill="#8d6bb5" stroke="${ink}" stroke-width="3"/>
${text(48, 220, "back", { size: 20, weight: "bold" })}
${text(148, 250, "divider", { size: 20, weight: "bold" })}
${text(256, 220, "front", { fill: paper, size: 20, weight: "bold" })}
<line x1="150" y1="150" x2="230" y2="150" stroke="${terra}" stroke-width="4"/>
${text(336, 130, "12", { fill: terra, weight: "bold" })}
${text(336, 158, "front +", { fill: terra, size: 20 })}
${text(336, 184, "back only", { fill: terra, size: 20 })}
<line x1="36" y1="340" x2="324" y2="340" stroke="${terra}" stroke-width="5"/>
${text(16, 376, "BOTTOM: fold", { size: 20, weight: "bold" })}
${text(16, 408, "Divider chains sewn along this fold.", { size: 20 })}
<rect x="12" y="440" width="456" height="460" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 472, "1 at the fold, 12 at the top", { weight: "bold" })}
<line x1="48" y1="510" x2="130" y2="510" stroke="${terra}" stroke-width="4"/>
${text(146, 518, "12 front + back", { fill: terra, weight: "bold" })}
${Array.from({ length: 11 }, (_, i) => {
  const n = 11 - i;
  const y = 560 + i * 24;
  return `<line x1="48" y1="${y}" x2="180" y2="${y}" stroke="${ink}" stroke-width="3"/>${text(196, y + 8, String(n), { size: 20, weight: "bold" })}`;
}).join("")}
${text(28, 860, "1-11: front, divider, and back", { size: 20 })}
${text(28, 888, "BOTTOM of this list is the fold.", { size: 20 })}
<rect x="12" y="920" width="456" height="340" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 952, "Leave these free", { weight: "bold" })}
<rect x="40" y="980" width="200" height="36" fill="none" stroke="${terra}" stroke-width="4"/>
${text(250, 1006, "front opening", { size: 20 })}
<rect x="40" y="1030" width="170" height="32" fill="none" stroke="${sage}" stroke-width="4"/>
${text(220, 1054, "divider opening", { size: 20 })}
${text(40, 1110, "flap stays outside the seams", { size: 20, weight: "bold" })}
<polygon points="80,1140 200,1140 176,1220 104,1220" fill="${ink}"/>
<rect x="124" y="1210" width="32" height="14" fill="${terra}"/>
${text(220, 1180, "hat above", { size: 20 })}
${text(220, 1208, "the buttonhole", { size: 20 })}
${text(16, 1288, "Legend: hatch = divider. 12 is the top stitch.", { size: 20, fill: soft })}
`,
);

save(
  "witch-wallet-zones.svg",
  "Witch-hat wallet: front, back, and flap",
  "One rectangle, 17 stitches wide. Rows 1 to 12 are the front, 13 to 24 the back, 25 to 33 the flap. Row 31 holds the buttonhole. The hat stays on the flap and clear of that hole.",
  780,
  `
${text(16, 36, "One rectangle, three zones", { size: 24, weight: "bold" })}
<rect x="80" y="70" width="220" height="140" fill="#8d6bb5" stroke="${ink}" stroke-width="3"/>
${text(96, 140, "front 1-12", { fill: paper, weight: "bold" })}
<rect x="80" y="210" width="220" height="140" fill="#c4b6e0" stroke="${ink}" stroke-width="3"/>
${text(96, 280, "back 13-24", { weight: "bold" })}
<rect x="80" y="350" width="220" height="160" fill="#6d4f96" stroke="${ink}" stroke-width="3"/>
${text(96, 400, "flap 25-33", { fill: paper, weight: "bold" })}
<rect x="150" y="450" width="80" height="22" fill="${paper}" stroke="${terra}" stroke-width="3"/>
${text(320, 150, "fold after 12", { size: 20 })}
${text(320, 280, "fold after 24", { size: 20 })}
${text(320, 468, "row 31 hole", { size: 20, weight: "bold" })}
${text(16, 560, "Row 31: sc 7, ch 3, skip 3, sc 7.", { size: 20 })}
${text(16, 600, "Row 32 puts 3 sc in the chain space.", { size: 20 })}
${text(16, 650, "Pin the hat on the flap only.", { size: 20, weight: "bold" })}
${text(16, 690, "Do not cover row 31.", { size: 20, weight: "bold" })}
${text(16, 750, "Legend: white slot = buttonhole.", { size: 20, fill: soft })}
`,
);

save(
  "tote-assembly.svg",
  "Granny tote: two flat panels, no base",
  "Eight 4-round squares make two panels of two by two. Join each pair of squares. Join the panels on both sides and the bottom. Leave the top open. A square seam is 19 positions, a panel seam is 38, and one panel top is 34. Strap placement on that 34 is 8, sew 5, 8, sew 5, 8.",
  1500,
  `
${text(16, 36, "Two panels. No base.", { size: 24, weight: "bold" })}
${[0, 1].map((col) => [0, 1].map((row) => `<rect x="${40 + col * 90}" y="${80 + row * 90}" width="80" height="80" fill="#f6efe6" stroke="${ink}" stroke-width="3"/>`).join("")).join("")}
<line x1="120" y1="80" x2="120" y2="250" stroke="${terra}" stroke-width="4"/>
<line x1="40" y1="160" x2="210" y2="160" stroke="${terra}" stroke-width="4"/>
${text(40, 70, "front 2 x 2", { weight: "bold" })}
${[0, 1].map((col) => [0, 1].map((row) => `<rect x="${260 + col * 90}" y="${80 + row * 90}" width="80" height="80" fill="#fff" stroke="${ink}" stroke-width="3"/>`).join("")).join("")}
<line x1="340" y1="80" x2="340" y2="250" stroke="${sage}" stroke-width="4"/>
<line x1="260" y1="160" x2="430" y2="160" stroke="${sage}" stroke-width="4"/>
${text(260, 70, "back 2 x 2", { weight: "bold" })}
${text(16, 290, "Colored lines: square-to-square joins.", { size: 20 })}
${text(16, 320, "One square edge = 19 positions.", { size: 20, weight: "bold" })}
<rect x="90" y="370" width="280" height="220" fill="#f6efe6" stroke="${ink}" stroke-width="3"/>
<line x1="90" y1="370" x2="90" y2="590" stroke="${terra}" stroke-width="6"/>
<line x1="370" y1="370" x2="370" y2="590" stroke="${terra}" stroke-width="6"/>
<line x1="90" y1="590" x2="370" y2="590" stroke="${terra}" stroke-width="6"/>
${text(180, 480, "flat bag", { weight: "bold" })}
${text(150, 516, "front against back", { size: 20 })}
${text(16, 640, "Join both sides and the bottom.", { size: 20, weight: "bold" })}
${text(16, 670, "Leave the top open. No base strip.", { size: 20, weight: "bold" })}
${text(16, 710, "A panel side is 19 + 19 = 38.", { size: 20 })}
${text(16, 750, "One panel top is 34.", { size: 20 })}
<rect x="12" y="790" width="456" height="280" rx="10" fill="${deep}" stroke="${rule}"/>
${text(28, 822, "Strap places on one 34-stitch top", { weight: "bold" })}
<rect x="30" y="860" width="80" height="40" fill="#fff" stroke="${ink}"/>
<rect x="110" y="850" width="60" height="60" fill="${terra}"/>
<rect x="170" y="860" width="80" height="40" fill="#fff" stroke="${ink}"/>
<rect x="250" y="850" width="60" height="60" fill="${terra}"/>
<rect x="310" y="860" width="80" height="40" fill="#fff" stroke="${ink}"/>
${text(50, 888, "8", { weight: "bold" })}
${text(128, 888, "5", { fill: paper, weight: "bold" })}
${text(190, 888, "8", { weight: "bold" })}
${text(268, 888, "5", { fill: paper, weight: "bold" })}
${text(330, 888, "8", { weight: "bold" })}
${text(28, 960, "Skip 8, sew 5, skip 8, sew 5, skip 8.", { size: 20 })}
${text(28, 1000, "Sew through both edge rounds.", { size: 20 })}
${text(16, 1120, "8 + 5 + 8 + 5 + 8 = 34.", { size: 22, weight: "bold" })}
${text(16, 1180, "Do the same count on the other panel.", { size: 20 })}
${text(16, 1240, "Legend: terra blocks = strap ends.", { size: 20, fill: soft })}
${text(16, 1270, "White blocks = skipped stitches.", { size: 20, fill: soft })}
`,
);

const posts = readdirSync("src/content/posts").filter((n) => n.endsWith(".md"));
for (const name of posts) {
  const path = join("src/content/posts", name);
  let text = readFileSync(path, "utf8");
  let changed = false;
  for (const d of out) {
    const re = new RegExp(`(src="/diagrams/${d.file}"[^>]*?)\\swidth="\\d+"\\sheight="\\d+"`);
    if (!re.test(text)) continue;
    text = text.replace(re, `$1 width="480" height="${d.height}"`);
    changed = true;
  }
  if (changed) writeFileSync(path, text);
}
console.log(out.map((d) => `${d.file} ${d.height}`).join("\n"));
