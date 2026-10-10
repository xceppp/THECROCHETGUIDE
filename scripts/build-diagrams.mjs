import fs from "fs";
import path from "path";

const out = "public/diagrams";
fs.mkdirSync(out, { recursive: true });

function svg(title, desc, body, height = 420) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 ${height}" role="img">
<title>${title}</title>
<desc>${desc}</desc>
<rect width="640" height="${height}" fill="#fdfaf6"/>
<style>
  text { font-family: Georgia, "Times New Roman", serif; }
  .label { font-size: 26px; fill: #2f2a26; }
  .soft { font-size: 22px; fill: #6d635a; }
  .yarn { fill: none; stroke: #6b4428; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; }
  .ink { fill: none; stroke: #2f2a26; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
  .hook { fill: none; stroke: #b0604a; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
  .mark { fill: none; stroke: #7d8b72; stroke-width: 3; stroke-dasharray: 6 4; }
  .bad { fill: none; stroke: #b0604a; stroke-width: 3; }
</style>
${body}
</svg>
`;
}

function panel(x, y, w, h, heading) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#f6efe6" stroke="#e6ddd1"/>
  <text class="label" x="${x + 16}" y="${y + 36}">${heading}</text>`;
}

const files = {
  "slip-knot.svg": svg(
    "Slip knot on a crochet hook",
    "Three steps. Cross the tail over the working yarn, pull a loop of working yarn through, then seat that loop on the hook. The knot must still slide.",
    `${panel(16, 24, 196, 370, "1. Cross")}
     <path class="yarn" d="M70 120 C70 200 140 200 140 130"/>
     <path class="yarn" d="M150 110 C150 210 60 230 60 300"/>
     <text class="soft" x="32" y="340">Tail over the yarn</text>
     ${panel(222, 24, 196, 370, "2. Pull through")}
     <path class="yarn" d="M280 150 C280 230 360 230 360 160"/>
     <path class="yarn" d="M320 150 C320 110 340 100 350 120"/>
     <text class="soft" x="238" y="340">New loop comes through</text>
     ${panel(428, 24, 196, 370, "3. On the hook")}
     <path class="hook" d="M470 210 H560 q16 0 16 16 q0 16 -16 16 H500"/>
     <path class="yarn" d="M500 200 C470 200 470 250 510 260 C540 268 500 300 470 330"/>
     <text class="soft" x="444" y="340">Slides. Not a chain.</text>`,
  ),
  "foundation-chain.svg": svg(
    "Foundation chain anatomy",
    "The front of a chain is a row of Vs. The back has a bump. The slip knot and the loop on the hook are not stitches.",
    `${panel(16, 24, 608, 370, "One chain, two sides")}
     <path class="yarn" d="M80 180 h80 a28 28 0 1 0 0.1 0 M188 180 h80 a28 28 0 1 0 0.1 0 M296 180 h80 a28 28 0 1 0 0.1 0"/>
     <path class="ink" d="M120 150 l20 24 l20 -24"/>
     <text class="soft" x="100" y="140">Front: a V</text>
     <path class="ink" d="M250 230 q20 18 40 0"/>
     <text class="soft" x="230" y="270">Back: a bump</text>
     <path class="hook" d="M430 168 H520 q14 0 14 14 q0 14 -14 14 H470"/>
     <text class="soft" x="420" y="250">Loop on the hook</text>
     <text class="soft" x="420" y="276">Do not count it</text>
     <text class="label" x="40" y="340">Count only the finished V links.</text>`,
  ),
  "insert-single-crochet.svg": svg(
    "Where to insert the hook for single crochet",
    "The top of a stitch is two loops. For ordinary single crochet, put the hook under both loops.",
    `${panel(16, 24, 608, 370, "Top of one stitch")}
     <path class="yarn" d="M180 200 h160"/>
     <path class="yarn" d="M180 228 h160"/>
     <text class="soft" x="360" y="206">Front loop (near you)</text>
     <text class="soft" x="360" y="236">Back loop (far side)</text>
     <path class="hook" d="M140 250 l70 -40 q8 -4 12 4"/>
     <text class="label" x="40" y="330">Ordinary single crochet goes under both.</text>`,
  ),
  "yarn-over.svg": svg(
    "Yarn over direction",
    "Bring the working yarn over the hook from the back of the hook toward the front.",
    `${panel(16, 24, 608, 370, "Yarn over, back to front")}
     <path class="hook" d="M120 210 H420 q22 0 22 22 q0 22 -22 22 H220"/>
     <path class="yarn" d="M300 300 C300 160 250 150 250 210"/>
     <path class="ink" d="M250 210 l-18 -8 M250 210 l-6 -20"/>
     <text class="soft" x="80" y="330">The wrap travels over the hook, from back to front.</text>`,
  ),
  "single-crochet.svg": svg(
    "Single crochet sequence",
    "Insert under both loops, yarn over and pull up a loop so two loops are on the hook, then yarn over and pull through both.",
    `${panel(16, 24, 196, 370, "Insert")}
     <path class="yarn" d="M50 200 h110"/>
     <path class="yarn" d="M50 224 h110"/>
     <path class="hook" d="M40 250 l80 -36"/>
     <text class="soft" x="32" y="340">Under both loops</text>
     ${panel(222, 24, 196, 370, "Two loops")}
     <path class="hook" d="M250 220 H390"/>
     <path class="yarn" d="M300 220 c0 -30 40 -30 40 0"/>
     <path class="yarn" d="M320 220 c0 -18 24 -18 24 0"/>
     <text class="soft" x="250" y="340">Yarn over, pull up</text>
     ${panel(428, 24, 196, 370, "Close")}
     <path class="hook" d="M460 220 H590"/>
     <path class="yarn" d="M520 220 c0 -28 36 -28 36 0"/>
     <text class="soft" x="444" y="340">Yarn over, pull</text>
     <text class="soft" x="444" y="364">through both</text>`,
    430,
  ),
  "half-double-crochet.svg": svg(
    "Half double crochet sequence",
    "Yarn over before inserting the hook. After you pull up a loop there are three loops. Yarn over and pull through all three at once.",
    `${panel(16, 24, 196, 370, "Yarn over first")}
     <path class="hook" d="M40 210 H180"/>
     <path class="yarn" d="M90 210 c0 -36 40 -36 40 0"/>
     <text class="soft" x="32" y="340">Wrap, then insert</text>
     ${panel(222, 24, 196, 370, "Three loops")}
     <path class="hook" d="M250 230 H390"/>
     <path class="yarn" d="M280 230 c0 -20 16 -20 16 0"/>
     <path class="yarn" d="M310 230 c0 -20 16 -20 16 0"/>
     <path class="yarn" d="M340 230 c0 -20 16 -20 16 0"/>
     <text class="soft" x="246" y="340">Three on the hook</text>
     ${panel(428, 24, 196, 370, "One pull")}
     <path class="hook" d="M460 220 H590"/>
     <path class="yarn" d="M510 220 c0 -30 40 -30 40 0"/>
     <text class="soft" x="444" y="340">Through all three</text>`,
  ),
  "double-crochet.svg": svg(
    "Double crochet sequence",
    "Yarn over, insert, and pull up a loop. Three loops are on the hook. Yarn over and pull through two, twice, until one loop remains.",
    `${panel(16, 24, 196, 370, "Three loops")}
     <path class="hook" d="M40 230 H180"/>
     <path class="yarn" d="M70 230 c0 -18 14 -18 14 0"/>
     <path class="yarn" d="M100 230 c0 -18 14 -18 14 0"/>
     <path class="yarn" d="M130 230 c0 -18 14 -18 14 0"/>
     <text class="soft" x="32" y="340">After the pull-up</text>
     ${panel(222, 24, 196, 370, "Through two")}
     <path class="hook" d="M250 230 H390"/>
     <path class="yarn" d="M300 230 c0 -18 16 -18 16 0"/>
     <path class="yarn" d="M340 230 c0 -18 16 -18 16 0"/>
     <text class="soft" x="250" y="340">Two loops remain</text>
     ${panel(428, 24, 196, 370, "Through two")}
     <path class="hook" d="M460 220 H590"/>
     <path class="yarn" d="M520 220 c0 -26 34 -26 34 0"/>
     <text class="soft" x="456" y="340">One loop remains</text>`,
  ),
  "turning-chain.svg": svg(
    "Turning chain and the first stitch",
    "For single crochet the chain-1 is only for height. The first single crochet goes into the first stitch of the row, not into that chain.",
    `${panel(16, 24, 608, 370, "Single crochet turn")}
     <path class="yarn" d="M80 240 h70 M170 240 h70 M260 240 h70 M350 240 h70"/>
     <path class="yarn" d="M80 262 h70 M170 262 h70 M260 262 h70 M350 262 h70"/>
     <text class="soft" x="80" y="210">1</text>
     <text class="soft" x="170" y="210">2</text>
     <text class="soft" x="260" y="210">3</text>
     <text class="soft" x="350" y="210">4</text>
     <path class="hook" d="M460 180 v40"/>
     <text class="soft" x="480" y="176">Chain-1</text>
     <text class="soft" x="480" y="200">Do not count</text>
     <path class="ink" d="M100 300 v-28"/>
     <text class="label" x="120" y="300">First stitch is here</text>`,
  ),
  "count-stitches.svg": svg(
    "Counting stitches in a row",
    "Count the finished V on top of each stitch. Do not count the loop still on the hook, and do not count a single-crochet turning chain.",
    `${panel(16, 24, 608, 370, "What gets a number")}
     <path class="yarn" d="M70 200 l24 28 l24 -28 M150 200 l24 28 l24 -28 M230 200 l24 28 l24 -28 M310 200 l24 28 l24 -28"/>
     <text class="label" x="78" y="180">1</text>
     <text class="label" x="158" y="180">2</text>
     <text class="label" x="238" y="180">3</text>
     <text class="label" x="318" y="180">4</text>
     <path class="hook" d="M430 210 H540"/>
     <text class="soft" x="430" y="180">Live loop</text>
     <text class="soft" x="430" y="250">Not a stitch</text>
     <text class="label" x="40" y="340">Four Vs means four stitches.</text>`,
  ),
  "front-back-loops.svg": svg(
    "Front loop and back loop",
    "Front loop only goes under the near loop. Back loop only goes under the far loop. Ordinary stitches go under both.",
    `${panel(16, 24, 196, 370, "Both")}
     <path class="yarn" d="M50 190 h110"/>
     <path class="yarn" d="M50 220 h110"/>
     <path class="hook" d="M40 260 l90 -80"/>
     <text class="soft" x="36" y="330">Usual single crochet</text>
     ${panel(222, 24, 196, 370, "Front only")}
     <path class="yarn" d="M250 190 h110"/>
     <path class="yarn" d="M250 230 h110" stroke="#e6ddd1"/>
     <path class="hook" d="M246 210 H370"/>
     <text class="soft" x="246" y="330">Near loop only</text>
     ${panel(428, 24, 196, 370, "Back only")}
     <path class="yarn" d="M460 190 h110" stroke="#e6ddd1"/>
     <path class="yarn" d="M460 230 h110"/>
     <path class="hook" d="M456 248 H580"/>
     <text class="soft" x="456" y="330">Far loop only</text>`,
  ),
  "gauge-swatch.svg": svg(
    "Measuring a gauge swatch",
    "Lay the swatch flat. Measure across the middle, inside the fabric, not across the edge stitches. A 4 inch span is the usual window.",
    `${panel(16, 24, 608, 370, "Measure the middle")}
     <rect x="120" y="120" width="280" height="180" fill="#f3e6d4" stroke="#6b4428" stroke-width="8"/>
     <rect class="mark" x="160" y="160" width="200" height="100"/>
     <path class="ink" d="M160 210 H360"/>
     <text class="label" x="210" y="200">4 inches</text>
     <text class="soft" x="150" y="290">Edges stay outside the window</text>
     <text class="label" x="40" y="360">Do not stretch the swatch to hit the number.</text>`,
  ),
  "uneven-edges.svg": svg(
    "Straight edge and a slanted edge",
    "A straight edge keeps the same stitch count every row. A slant appears when a row gains or loses a stitch, often at the turning chain.",
    `${panel(16, 24, 292, 370, "Same count")}
     <path class="yarn" d="M50 140 h180 M50 190 h180 M50 240 h180 M50 290 h180"/>
     <text class="soft" x="40" y="350">10, then 10, then 10</text>
     ${panel(332, 24, 292, 370, "Gaining one")}
     <path class="yarn" d="M370 150 h120"/>
     <path class="yarn" d="M370 200 h150"/>
     <path class="yarn" d="M370 250 h180"/>
     <path class="yarn" d="M370 300 h210"/>
     <text class="soft" x="360" y="350">10, then 11, then 12</text>`,
  ),
  "us-uk-terms.svg": svg(
    "US and UK crochet stitch names",
    "The same letters name different stitches. US single crochet is UK double crochet. US double crochet is UK treble.",
    `${panel(16, 24, 608, 372, "Same letters, different stitches")}
     <text class="label" x="48" y="100">US</text>
     <text class="label" x="360" y="100">UK</text>
     <text class="soft" x="48" y="150">slip stitch (sl st)</text>
     <text class="soft" x="360" y="150">slip stitch (sl st)</text>
     <text class="soft" x="48" y="200">single crochet (sc)</text>
     <text class="soft" x="360" y="200">double crochet (dc)</text>
     <text class="soft" x="48" y="250">half double (hdc)</text>
     <text class="soft" x="360" y="250">half treble (htr)</text>
     <text class="soft" x="48" y="300">double crochet (dc)</text>
     <text class="soft" x="360" y="300">treble (tr)</text>
     <text class="soft" x="48" y="350">treble (tr)</text>
     <text class="soft" x="360" y="350">double treble (dtr)</text>`,
    420,
  ),
  "stitch-marker.svg": svg(
    "Stitch marker on the first stitch of a round",
    "In a spiral, clip a marker into the first stitch of the round and move it up each time you reach it. The marker is not a stitch.",
    `${panel(16, 24, 608, 370, "First stitch of the round")}
     <circle cx="280" cy="220" r="90" class="yarn"/>
     <circle cx="280" cy="130" r="14" fill="#b0604a"/>
     <text class="label" x="310" y="136">Marker</text>
     <text class="soft" x="80" y="340">Move it to the new first stitch every round.</text>
     <text class="soft" x="80" y="372">The marker itself is not a stitch.</text>`,
  ),
  "pattern-repeat.svg": svg(
    "A crochet repeat worked three times",
    "The instruction single crochet in the next stitch, then two single crochets in the next stitch, worked three times, uses six old stitches and makes nine new stitches.",
    `${panel(16, 24, 608, 372, "One repeat, three times")}
     <text class="soft" x="40" y="100">Each repeat: 1 sc, then 2 sc in the next stitch.</text>
     <text class="label" x="40" y="170">Uses 2 old stitches</text>
     <text class="label" x="40" y="220">Makes 3 new stitches</text>
     <text class="soft" x="40" y="290">Times 3</text>
     <text class="label" x="40" y="350">6 old stitches become 9 new stitches</text>`,
  ),
  "hook-gauge-choice.svg": svg(
    "Which way to change the hook",
    "If four inches contains more stitches than the pattern, each stitch is smaller. Try a larger hook. If four inches contains fewer stitches, try a smaller hook.",
    `${panel(16, 24, 292, 370, "More stitches")}
     <text class="soft" x="40" y="140">20 sc in 4 inches</text>
     <text class="soft" x="40" y="190">Pattern asked for 16</text>
     <text class="label" x="40" y="270">Try a larger hook</text>
     <text class="soft" x="40" y="330">Then measure again</text>
     ${panel(332, 24, 292, 370, "Fewer stitches")}
     <text class="soft" x="356" y="140">14 sc in 4 inches</text>
     <text class="soft" x="356" y="190">Pattern asked for 16</text>
     <text class="label" x="356" y="270">Try a smaller hook</text>
     <text class="soft" x="356" y="330">Then measure again</text>`,
  ),
  "single-crochet-decrease.svg": svg(
    "Single crochet decrease",
    "Work a single crochet decrease by pulling up a loop in two stitches, then yarn over and pull through all three loops. Two stitches become one.",
    `${panel(16, 24, 196, 370, "1. First stitch")}
     <text class="soft" x="32" y="120">Pull up a loop</text>
     <text class="label" x="32" y="180">2 loops</text>
     <text class="soft" x="32" y="240">on the hook</text>
     ${panel(222, 24, 196, 370, "2. Next stitch")}
     <text class="soft" x="238" y="120">Pull up a loop</text>
     <text class="label" x="238" y="180">3 loops</text>
     <text class="soft" x="238" y="240">on the hook</text>
     ${panel(428, 24, 196, 370, "3. Close")}
     <text class="soft" x="444" y="120">Yarn over</text>
     <text class="label" x="444" y="180">Pull through 3</text>
     <text class="soft" x="444" y="250">Count drops by 1</text>`,
  ),
};

for (const [name, contents] of Object.entries(files)) {
  fs.writeFileSync(path.join(out, name), contents);
}
console.log(`wrote ${Object.keys(files).length}`);
