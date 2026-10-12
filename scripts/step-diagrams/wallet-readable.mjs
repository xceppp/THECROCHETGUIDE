// Readable wallet diagrams. viewBox width is 480 and type is 22
// so a 360px phone, after the article's 24px side padding, renders
// the type at about 14px.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const W = 480;
const FS = 22;
const LH = 32;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrap(text) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > 36 && cur) {
      lines.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

function svg(file, title, desc, paragraphs) {
  const rows = [];
  for (const p of paragraphs) {
    const lines = wrap(p);
    lines.forEach((line, i) => rows.push({ line, bold: i === 0 && p.endsWith(":") }));
    rows.push({ gap: true });
  }
  if (rows.at(-1)?.gap) rows.pop();
  const height = 28 + rows.length * LH + 16;
  const body = rows
    .map((row, i) => {
      if (row.gap) return "";
      const y = 36 + i * LH;
      const weight = row.bold ? ' font-weight="bold"' : "";
      return `<text x="16" y="${y}" font-size="${FS}" fill="#2f2a26"${weight}>${esc(row.line)}</text>`;
    })
    .filter(Boolean)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}" role="img">
<title>${esc(title)}</title>
<desc>${esc(desc)}</desc>
<rect width="${W}" height="${height}" fill="#fdfaf6"/>
<g font-family="Georgia, Times New Roman, serif">
${body}
</g>
</svg>
`;
  writeFileSync(join("public/diagrams", file), xml);
  return { file, height };
}

const diagrams = [
  svg(
    "cat-wallet-ears.svg",
    "Black cat wallet: ear triangles and where they go",
    "Each ear is three rows: 5, then 3, then 1. On the 16-stitch fold the ears cover 5 stitches each, with 1 outside and 4 between.",
    [
      "One ear, three rows:",
      "Row 1: chain 6, sc in the 2nd chain and across. (5)",
      "Row 2: ch 1, turn, sc2tog, sc, sc2tog. (3)",
      "Row 3: ch 1, turn, sc3tog. (1)",
      "About 1.25 in wide and 0.6 in tall at the example gauge.",
      "Placement on the 16-stitch fold:",
      "1 stitch, ear over 5, gap of 4, ear over 5, 1 stitch.",
      "1 + 5 + 4 + 5 + 1 = 16.",
      "Sew each ear's row-1 edge along the fold so the ear stands above the closed wallet.",
    ],
  ),
  svg(
    "cat-wallet-face.svg",
    "Black cat wallet: face embroidery map on the flap",
    "Closed flap, 16 stitches across, row 1 at the fold. Eyes on rows 3-4, nose on rows 5-6, whiskers on rows 5-7, snap under row 8.",
    [
      "Flap seen closed. Row 1 is the top fold.",
      "Eyes, gold: rows 3-4, stitches 4-5 and 12-13. Add a black vertical pupil.",
      "Nose, pink: rows 5-6, stitches 8 and 9.",
      "Whiskers, white: three on each side, rows 5-7.",
      "Stitch k on the left matches stitch 17 minus k. So 4 matches 13 and 5 matches 12.",
      "Embroider with the flap folded shut. Upright on an open flap, the face ends upside down.",
      "The snap sits under row 8 at the center, on the underside.",
    ],
  ),
  svg(
    "cat-wallet-flap.svg",
    "Black cat wallet: the flap and the snap",
    "The flap rises from the back half of round 12. Rows 1-7 are 16 stitches, row 8 is 14, row 9 is 12. Snap on the flap underside at row 8.",
    [
      "The flap starts on the back 16 stitches of round 12 and folds forward over the opening.",
      "Rows 1-7: 16 sc.",
      "Row 8: sc2tog at both ends. (14)",
      "Row 9: sc2tog at both ends. (12)",
      "Sew the ball half of the snap to the underside of the flap at row 8.",
      "Close the flap and mark the front about round 5 before sewing the socket.",
    ],
  ),
  svg(
    "cat-wallet-tube.svg",
    "Black cat wallet: a seamless pocket from both sides of a chain",
    "Chain 17. Round 1 is 16 sc along the top and 16 along the underside, 32 stitches. Rounds 2-12 continue without turning.",
    [
      "Chain 17. Skip the chain nearest the hook.",
      "Round 1: 16 sc along the top, then rotate and work 16 sc along the unused loops. (32)",
      "The last top stitch and the first underside stitch share the chain next to the slip knot.",
      "Join with a slip stitch in the first sc. Ch 1 does not count. Do not turn.",
      "Rounds 2-12: sc in each stitch. (32)",
      "The chain is the bottom fold. Front 16, back 16. No side seams.",
      "About 4.0 in wide and 2.4 in deep at the example gauge. Check a card before the flap.",
    ],
  ),
  svg(
    "ghost-wallet-face.svg",
    "Ghost wallet: face placement on the head",
    "Back panel rows 14-22, 17 stitches, stitch 9 at center. Eyes on rows 17-18 at stitches 6 and 12. Mouth and cheeks on row 16.",
    [
      "Back panel only, before joining. Row 14 is the pocket opening.",
      "Eyes, black: rows 17-18, stitches 6 and 12.",
      "Mouth: row 16, stitch 9.",
      "Cheeks, pink: row 16, stitches 5 and 13.",
      "Stitch k matches stitch 18 minus k. So 6 matches 12 and 5 matches 13.",
      "Do not stitch through the front panel. Row 14 stays the opening.",
    ],
  ),
  svg(
    "ghost-wallet-join.svg",
    "Ghost wallet: joining edging and scalloped hem",
    "Hem uses all 17 stitches: slip stitch in stitch 1, then the 4-stitch scallop four times. Each side is 23 sc. Top is 9. Do not close the front opening.",
    [
      "Start in stitch 1 of the hem, through both layers.",
      "Hem: sl st in st 1, then (skip 1, 5 hdc in the next, skip 1, sl st in the next) 4 times.",
      "1 + 4 times 4 = 17 hem stitches.",
      "Right side: 14 sc through both layers, 4 sc in the back only, 5 sc along the slope. (23)",
      "Top: 9 sc across the head.",
      "Left side: 5 + 4 + 14. (23)",
      "Slip stitch to the first slip stitch. Do not edge the front panel's top. That is the opening.",
    ],
  ),
  svg(
    "ghost-wallet-panels.svg",
    "Ghost wallet: back and front panels, row by row",
    "Both panels start chain 18 and are 17 sc wide. Back is 18 even rows then decreases to 15, 13, 11, 9. Front is 14 even rows.",
    [
      "Both panels: chain 18. Sc in the 2nd chain and across. (17)",
      "Ch 1 turns. It is not a stitch.",
      "Back, rows 2-18: sc in each stitch. (17)",
      "Back rows 19-22: sc2tog at both ends. Counts 15, 13, 11, 9.",
      "Front, rows 2-14: sc in each stitch. (17)",
      "The top of front row 14 is the pocket opening. Leave it unjoined.",
      "About 4.25 in wide at the example gauge. Slide a card in before the edging.",
    ],
  ),
  svg(
    "ghost-wallet-snap.svg",
    "Ghost wallet: snap placement and card fit",
    "Socket on the back right side at row 13 stitch 9. Ball on the front wrong side at the same place. On paper the pocket is about 3.9 by 2.7 inches.",
    [
      "Sew both halves before joining, while the panels are flat.",
      "Socket: right side of the back, row 13, stitch 9. This face is inside the pocket.",
      "Ball: wrong side of the front, row 13, stitch 9.",
      "Press the panels together. The halves should meet. Move one now if they miss.",
      "On paper the pocket is about 3.9 in wide and 2.7 in deep. An ID-1 card is 3.37 by 2.125 in.",
      "The snap should sit above the card. These sizes are from gauge, not a measured sample.",
    ],
  ),
  svg(
    "halloween-wallets-compare.svg",
    "Five Halloween crochet wallets, five constructions",
    "Cat is a tube. Ghost is two panels. Pumpkin is sideways ribbing. Witch hat has a divider. Spiderweb has a pointed flap.",
    [
      "Black cat: a tube from both sides of a chain. Snap. No side seams.",
      "Ghost: two shaped panels and one edging round. Snap. Scalloped hem.",
      "Pumpkin: sideways back-loop ribs, folded once. Leaf tab and snap.",
      "Witch hat: one rectangle in three zones, an inner divider, and a buttonhole.",
      "Spiderweb: one rectangle, a pointed flap, an embroidered web, and a loop.",
      "Each pattern is a separate page. Counts do not carry from one wallet to another.",
    ],
  ),
  svg(
    "pumpkin-wallet-face.svg",
    "Pumpkin wallet: jack-o-lantern embroidery map",
    "Front half only. Rows run sideways. Stitch 1 is the rim. Tab covers rows 10-13. Eyes, nose, and mouth stay clear of the tab.",
    [
      "Embroider the front half before folding. Rows run left to right.",
      "Stitch 1 is the rim. Stitch 10 is the fold.",
      "Leaf tab: rows 10-13, stitches 1-5. Sew it on later. Keep the face clear of it.",
      "Eyes: rows 5-7 and 16-18, stitches 3-5.",
      "Nose: rows 11-12, stitches 6-7.",
      "Mouth: rows 6-17, stitches 8-9.",
      "Row k matches row 23 minus k, so row 5 matches row 18.",
    ],
  ),
  svg(
    "pumpkin-wallet-fold.svg",
    "Pumpkin wallet: rims, fold, side seams, and card fit",
    "Rim each long edge with 22 sc. Fold between stitches 10 and 11, right side out. Seam each short edge 10 to 10.",
    [
      "1. On each row-end edge, work 22 sc, one in each row end.",
      "2. Embroider the face on the front half.",
      "3. Fold between stitches 10 and 11, right side out.",
      "4. Seam the foundation edge to itself, 10 stitches to 10. Repeat on the last row.",
      "The top stays open.",
      "Outside about 4.25 by 2.5 in. Inside on paper about 3.9 by 2.4 in.",
      "Put a card in before you finish the seams. Sizes are from gauge.",
    ],
  ),
  svg(
    "pumpkin-wallet-ribbing.svg",
    "Pumpkin wallet: how back-loop ribbing makes pumpkin ribs",
    "The hook goes through the back loop. The front loop is left as a ridge. One rib shows for every two turned rows.",
    [
      "Each single crochet has a front loop and a back loop.",
      "Work into the back loop only. The front loop stays as a ridge.",
      "You turn every row, so the ridges land on one face every other row.",
      "22 rows in the back loop make 11 ribs.",
      "Working both loops makes a flat face and changes the row gauge.",
      "Two oranges can change every 2 rows so each rib is one shade.",
      "Measure the width to 4.25 in either way. Do not trust the row count alone.",
    ],
  ),
  svg(
    "pumpkin-wallet-sideways.svg",
    "Pumpkin wallet: one sideways piece in back-loop ribbing",
    "Chain 21 gives 20 sc, the height. Rows set the width. Fold between stitches 10 and 11.",
    [
      "Chain 21. Row 1: sc in the 2nd chain and across. (20)",
      "Later rows: ch 1, turn, sc in the back loop of each stitch. (20)",
      "Ch 1 is not a stitch.",
      "Stitches 1-10 are the front. Stitches 11-20 are the back.",
      "The fold is between stitches 10 and 11.",
      "20 stitches are about 5 in, which folds to about 2.5 in.",
      "Work an even number of rows until the piece is about 4.25 in wide. About 22 rows at the example gauge.",
    ],
  ),
  svg(
    "pumpkin-wallet-stem-tab.svg",
    "Pumpkin wallet: stem, leaf tab, and snap",
    "Stem is 6 sc by 3 rows, rolled. Tab is 3 sc for 6 rows, then sc3tog. Sew the tab inside the back rim. Stem sits on the back rim.",
    [
      "Stem: chain 7. Sc in the 2nd chain and across. (6)",
      "Rows 2-3: ch 1, turn, sc 6. Fasten off.",
      "Roll from a short end and sew the edge down.",
      "Tab: chain 4. Sc in the 2nd chain and across. (3)",
      "Rows 2-6: sc 3. Row 7: sc3tog. (1) Fasten off.",
      "Sew the tab's foundation edge inside the back rim, centered.",
      "The tab comes over both rims. Mark the snap on the front with the tab closed.",
      "Sew the stem on the back rim, over the tab's base, not on the front of the tab.",
    ],
  ),
  svg(
    "spider-applique.svg",
    "Spiderweb wallet: purple spider assembly",
    "Abdomen: 6, 12, 12, 6. Head: 6, then 6. Eight legs, two stitches each, four per side.",
    [
      "Abdomen, purple. Round 1: magic ring, 6 sc. (6)",
      "Round 2: 2 sc in each stitch. (12)",
      "Round 3: sc in each stitch. (12)",
      "Round 4: sc2tog 6 times. (6)",
      "Stuff with yarn scraps. Close the hole with the tail.",
      "Head: magic ring, 6 sc, then one even round of 6. Close it.",
      "Sew the head to the abdomen, then both to the flap.",
      "Each leg is two straight stitches, four legs each side, bent at the knee.",
    ],
  ),
  svg(
    "spiderweb-wallet-closure.svg",
    "Spiderweb wallet: point loop, button, and card fit",
    "After the point, chain 8 and slip stitch into the same stitch. Test the button before fastening off. Button sits near row 10, stitch 9.",
    [
      "After the last stitch of the point: chain 8, slip stitch into the same stitch.",
      "Test the loop over the button before you fasten off.",
      "If it is tight or loose, undo it and chain 7 to 10 instead.",
      "The flap reaches about 1.6 in below the fold at the example gauge.",
      "The loop adds about 0.4 in. The button sits near row 10 of the front, stitch 9.",
      "Close the flap with a card inside and mark the button before sewing.",
      "These inches are from gauge, not a measured sample.",
    ],
  ),
  svg(
    "spiderweb-wallet-web.svg",
    "Spiderweb wallet: web embroidery paths on the flap",
    "Five spokes from the point to row 27 at stitches 2, 5, 8, 11, and 14. Three rings at rows 29, 31, and 33. Spider last.",
    [
      "Flap seen closed. The point is row 34. The fold is row 27.",
      "Spokes first. Backstitch from the point to row 27.",
      "End the spokes at stitches 2, 5, 8, 11, and 14.",
      "The middle spoke runs up stitch 8.",
      "Rings next, inner ring first, near rows 33, then 31, then 29.",
      "Each ring is four segments, spoke to spoke, dipping slightly toward the point.",
      "Sew the spider last so its legs lie over the web.",
    ],
  ),
  svg(
    "spiderweb-wallet-zones.svg",
    "Spiderweb wallet: rectangle and pointed flap",
    "17 sc wide. Front rows 1-13, back 14-26, flap 27-34 decreasing to 1, then a chain-8 loop.",
    [
      "Chain 18. Row 1: sc in the 2nd chain and across. (17)",
      "Ch 1 does not count as a stitch.",
      "Rows 1-13: front. It folds up. The chain edge becomes the rim.",
      "Rows 14-26: back, 13 rows, about 2.6 in at the example gauge.",
      "Rows 27-34: flap. Each row is sc2tog, sc across, sc2tog.",
      "Flap counts: 15, 13, 11, 9, 7, 5, 3, then sc3tog. (1)",
      "Chain 8 at that stitch for the loop. Leave the top of the front open.",
    ],
  ),
  svg(
    "witch-hat-applique.svg",
    "Witch hat wallet: miniature hat applique",
    "Cone: orange row of 5, then black 5, 3, 3, 1. Brim is 8 sc. Brim sits on row 30. Keep clear of the buttonhole on row 31.",
    [
      "Cone: chain 6 in orange. Sc in the 2nd chain and across. (5)",
      "Change to black on the last yarn over of row 1.",
      "Row 2: sc 5. Row 3: sc2tog, sc, sc2tog. (3)",
      "Row 4: sc 3. Row 5: sc3tog. (1) Fasten off.",
      "Brim: chain 9 in black, 8 sc. Fasten off.",
      "On the closed flap, center the brim on row 30 at stitch 9.",
      "The tip reaches row 25 at the fold.",
      "Sew through the flap only, before the side seams. Do not cover row 31.",
    ],
  ),
  svg(
    "witch-wallet-buttonhole.svg",
    "Witch hat wallet: buttonhole rows and button placement",
    "Row 31 is 7 sc, chain 3, skip 3, 7 sc. Row 32 works 3 sc into the chain. Button sits near row 7, stitch 9.",
    [
      "Row 31: sc 7, chain 3, skip 3, sc 7.",
      "Row 32: sc 7, 3 sc in the chain-3 space, sc 7. (17)",
      "The hole is about 0.75 in for a 5/8 in button. Test the button before row 33.",
      "If the button slips out, redo row 31 as sc 7, ch 2, skip 2, sc 8.",
      "Then row 32 is sc 7, 2 sc in the space, sc 8.",
      "The hole lands about 1.3 in below the fold at the example gauge.",
      "Close the flap with cards in it. Mark the button near row 7, stitch 9.",
    ],
  ),
  svg(
    "witch-wallet-divider.svg",
    "Witch hat wallet: divider and three-layer side seams",
    "Divider is 17 stitches by 11 rows. Sew its whole bottom edge into the fold. Each side seam is 11 three-layer stitches and 1 two-layer stitch.",
    [
      "The divider is 17 sc wide and 11 rows tall, one row shorter than the front.",
      "Whipstitch all 17 foundation chains to the inside of the bottom fold.",
      "The seam must be continuous or a card can pass under the divider.",
      "Each side: 11 sc through front, divider, and back.",
      "The 12th sc catches front and back only.",
      "Repeat on the other side. The flap stays outside both seams.",
      "Test one card in each pocket before you weave the ends.",
    ],
  ),
  svg(
    "witch-wallet-zones.svg",
    "Witch hat wallet: one rectangle in three zones",
    "17 sc wide. Front rows 1-12, back 13-24, flap 25-33. Row 31 is the buttonhole. Row 33 decreases to 15.",
    [
      "Chain 18. Row 1: sc in the 2nd chain and across. (17)",
      "Ch 1 does not count.",
      "Rows 1-12: front. It folds up. The chain edge is the rim.",
      "Rows 13-24: back, 12 rows, about 2.4 in at the example gauge.",
      "Rows 25-33: flap, 9 rows.",
      "Row 31: sc 7, chain 3, skip 3, sc 7.",
      "Row 33: sc2tog, sc 13, sc2tog. (15)",
      "Fold at row 12 and at row 24. Leave the flap outside the side seams.",
    ],
  ),
];

const postsDir = "src/content/posts";
for (const name of readdirSync(postsDir).filter((n) => n.endsWith(".md"))) {
  const path = join(postsDir, name);
  let text = readFileSync(path, "utf8");
  let changed = false;
  for (const d of diagrams) {
    const re = new RegExp(
      `(src="/diagrams/${d.file}"[^>]*?)\\swidth="\\d+"\\sheight="\\d+"`,
    );
    if (!re.test(text)) continue;
    text = text.replace(re, `$1 width="${W}" height="${d.height}"`);
    changed = true;
  }
  if (changed) writeFileSync(path, text);
}

console.log(diagrams.map((d) => `${d.file} ${d.height}`).join("\n"));
