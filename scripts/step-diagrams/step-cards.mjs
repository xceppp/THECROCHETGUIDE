/**
 * One labeled diagram for a pattern step that did not already have one.
 * 480 wide, text at least 22 units.
 */
import { writeFileSync } from "node:fs";
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

function card(title, desc, rows) {
  const height = 88 + rows.length * 78;
  const body = rows
    .map((row, i) => {
      const y = 72 + i * 78;
      return `<rect x="16" y="${y}" width="448" height="66" rx="8" fill="${deep}" stroke="${rule}"/>
${text(32, y + 28, row[0], { weight: "bold" })}
${text(32, y + 54, row[1], { fill: soft, size: 20 })}`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}" role="img">
<title>${esc(title)}</title>
<desc>${esc(desc)}</desc>
<rect width="${W}" height="${height}" fill="${paper}"/>
<style>text{font-family:Georgia,"Times New Roman",serif}</style>
${text(16, 40, title, { size: 24, weight: "bold" })}
${body}
</svg>
`;
}

const cards = [
  ["ghost-step-straight-rows.svg", "Ghost wallet: rows 2 to 18", "Each straight row is chain 1, turn, 17 single crochet. The chain 1 is not a stitch. Stop at row 18, still a rectangle.", [["Chain 1, then turn", "The chain does not count."], ["Single crochet in every stitch", "Include the first and the last."], ["Count 17, then start the next row", "Stop when the side shows 18 ridges."]]],
  ["ghost-step-decreases.svg", "Ghost wallet: rows 19 to 22", "Each row decreases at both ends. Counts are 15, then 13, then 11, then 9. The wide hem stays at the bottom.", [["Row 19 ends at 15", "Decrease, 13 single crochet, decrease."], ["Row 20 ends at 13", "Decrease, 11 single crochet, decrease."], ["Row 21 ends at 11", "Decrease, 9 single crochet, decrease."], ["Row 22 ends at 9", "Decrease, 7 single crochet, decrease."]]],
  ["ghost-step-front.svg", "Ghost wallet: the front panel", "The front is 17 stitches by 14 rows. Its top edge is the pocket opening and stays unworked.", [["Same chain as the back", "18 chains, 17 single crochet."], ["Stop at row 14", "Do not add a 15th row."], ["Eight back rows show above it", "Rows 15 to 22 stay uncovered."]]],
  ["ghost-step-match.svg", "Ghost wallet: match the panels", "Hems together, 17 stitches on both, eight back rows showing above the front. Remake a panel that is a different width.", [["Hems at the bottom", "Chain edges touch, stitch for stitch."], ["Count both widths", "Both must be 17."], ["Do not stretch a short panel", "Remake it if the ruler disagrees."]]],
  ["ghost-step-scallops.svg", "Ghost wallet: four hem scallops", "Slip stitch in stitch 1, then four repeats of skip 1, 5 half double crochet, skip 1, slip stitch. That uses all 17 hem stitches.", [["Stitch 1 is a slip stitch", "Through both layers."], ["Each scallop uses 4 stitches", "Skip, fan of 5, skip, slip stitch."], ["Four scallops, then stop", "1 + 16 = 17 hem stitches."]]],
  ["ghost-step-first-side.svg", "Ghost wallet: first side of the join", "14 single crochet through both layers, then 4 through the back only, then 5 along the slope. Do not cross the front's top.", [["Rows 1 to 14, both layers", "One single crochet in each row end."], ["Stop at the opening", "The front's top edge stays bare."], ["Then 4, then 5", "Back only, then the slope. Side total 23."]]],
  ["ghost-step-top.svg", "Ghost wallet: top of the head", "Nine single crochet across row 22. Do not reuse the corner stitch the slope already used.", [["Nine top stitches", "The Vs of row 22, not the side."], ["Count them before the turn", "The side slope is a separate 5."]]],
  ["ghost-step-return.svg", "Ghost wallet: second side of the join", "Mirror the first side: 5 down the slope, 4 through the back only, 14 through both layers. Then slip stitch to the hem.", [["Switch at the other row 14", "Both layers again below the marker."], ["Count 23 on this side", "Then join to the first slip stitch."], ["Test with a card", "The opening must still take it."]]],
  ["pumpkin-step-blo.svg", "Pumpkin wallet: back loop only", "After row 1, every row is worked under the back loop. The front loop stays on the surface and makes the rib.", [["See the two strands of the V", "The near strand is the front loop."], ["Hook under the far strand only", "That is the back loop."], ["Count 20 every row", "Stop at 4.25 inches on an even row."]]],
  ["pumpkin-step-rims.svg", "Pumpkin wallet: the two rims", "Each long edge gets one single crochet in each row-end bump. The stitch count matches the row count.", [["Count the bumps first", "Write the number down."], ["One single crochet in each", "Two in one bump makes a ripple."], ["Both rims, then fasten off", "These edges become the opening."]]],
  ["pumpkin-step-tab.svg", "Pumpkin wallet: the leaf tab", "Chain 4 for 3 stitches, work rows 2 to 6 even, then single crochet three together on row 7.", [["Rows 1 to 6 are 3 stitches", "Count at the end of each row."], ["Row 7 is one stitch", "A loop in each stitch, yarn over, pull through."]]],
  ["pumpkin-step-close.svg", "Pumpkin wallet: tab, snap, stem", "Sew the tab inside the back rim, mark the snap with a card inside, then stand the stem on the tab's base.", [["Tab base on the middle 3 rim stitches", "Inside the back rim."], ["Mark the snap with a card in", "Ball under the tab, socket on the front."], ["Stem stands on the base", "The tab still folds by itself."]]],
  ["spider-step-point.svg", "Spiderweb wallet: the pointed flap", "Rows 27 to 34 each lose one stitch at both ends: 15, 13, 11, 9, 7, 5, 3, then 1.", [["Decrease at both ends", "An even count means one end was missed."], ["Row 34 is 3 together", "One stitch is left for the loop."]]],
  ["spider-step-loop.svg", "Spiderweb wallet: the chain loop", "Chain from the point and slip stitch back into the same stitch. The button should pass with a little push.", [["Start with 8 chains", "Slip stitch into the point stitch."], ["Test the real button", "Use 7 to 10 chains, then fasten off."]]],
  ["witch-step-divider.svg", "Witch hat wallet: the divider", "The divider is 17 stitches and 11 rows, one row shorter than the 12-row front, so it hides under the rim.", [["Same width as the body", "18 chains, 17 single crochet."], ["Stop at row 11", "A 12th row would show above the rim."]]],
  ["cat-step-rounds.svg", "Black cat wallet: rounds 2 to 12", "Each round is chain 1, 32 single crochet, slip stitch to the first stitch. Do not turn. Test a card at round 10.", [["Chain 1 does not count", "First stitch goes in the join."], ["Count 32 every round", "31 or 33 started at the chain ends."], ["Card test at round 10", "Flat, with a little room at each side."]]],
  ["cat-step-ears-on.svg", "Black cat wallet: ears on the fold", "Skip 1 stitch, ear over 5, gap of 4, ear over 5, skip 1. The bases must not bridge the opening.", [["1 + 5 + 4 + 5 + 1 = 16", "That uses the whole fold."], ["Tack, then open the flap", "Sew the base twice after the check."]]],
  ["cat-step-snap.svg", "Black cat wallet: the snap", "Mark with a card inside. Ball under flap row 8 at its middle. Socket on the front at the mark, through the front only.", [["Row 8 has 14 stitches", "Middle is local stitches 7 and 8."], ["Do not sew into the pocket", "The needle stays in the front wall."]]],
  ["cat-step-tails.svg", "Black cat wallet: weave the tails", "Run each tail inside the tube along a fold, then change direction once before you cut it.", [["Inside the tube", "Not across the opening."], ["Change direction once", "A straight tail pulls out."]]],
  ["tote-step-bag-seams.svg", "Granny tote: three seams", "Front and back right sides together. 38 down one side, 38 across the bottom, 38 up the other side. Leave the top open.", [["Count 38 on each edge", "A different count puckers."], ["Four stitches turn a bottom corner", "The two corner spaces already provide them."], ["Turn right side out", "The ridges stay inside."]]],
  ["tote-step-top-edge.svg", "Granny tote: the top edge", "Each square's top takes 17 single crochet. Four tops make 68. Work that count twice.", [["1 in each stitch and space", "Including one in each corner space."], ["68, then 68 again", "More ruffles. Fewer draws the opening in."]]],
  ["tote-step-straps.svg", "Granny tote: straps and placement", "Straps are 5 stitches wide. On each panel of 34, skip 8, sew 5, skip 8, sew 5, skip 8. Sew through both edge rounds.", [["Match the second strap by rows", "Do not stretch it to the tape."], ["One inch of overlap inside", "Catch the clusters under the edge."]]],
];

for (const [file, title, desc, rows] of cards) {
  writeFileSync(join("public/diagrams", file), card(title, desc, rows));
  console.log(file, 88 + rows.length * 78);
}
