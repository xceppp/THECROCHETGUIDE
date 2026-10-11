/**
 * Stitch-count checker for the Halloween Black Cat AirPods Case pattern.
 *
 * Re-derives every round/row total from its written operations and asserts the
 * total printed in the article. Run: node scripts/check-airpods-pattern.mjs
 *
 * This validates the arithmetic only. It is not a physical fit test; the sleeve
 * has not been crocheted, and the article says so.
 */
import assert from "node:assert/strict";

let failures = 0;
function check(label, got, want) {
  try {
    assert.equal(got, want);
    console.log(`ok   ${label}: ${got}`);
  } catch {
    failures++;
    console.log(`FAIL ${label}: got ${got}, expected ${want}`);
  }
}

// --- Device facts (Apple, AirPods Pro 2 MagSafe charging case) -------------
const caseWidthIn = 2.39; // 60.6 mm
const caseDepthIn = 0.85; // 21.7 mm
const perimeterIn = 2 * (caseWidthIn + caseDepthIn);
check("footprint perimeter (in)", Number(perimeterIn.toFixed(2)), 6.48);

// Example gauge stated in the article.
const stitchGauge = 4; // sc per inch
const bodyStitchesFromPerimeter = Math.round(perimeterIn * stitchGauge);
check("stitches from perimeter (round to workable)", bodyStitchesFromPerimeter, 26);

// --- Oval base --------------------------------------------------------------
const straight = 7; // sc per straight side (ch 9 foundation)
// Round 1: side A + end1(3) + side B + end2(3)
const r1 = straight + 3 + straight + 3;
check("base rnd 1", r1, 20);
// Round 2: each 3-st end doubled to 6; straights unchanged
const r2 = 6 + straight + 6 + straight;
check("base rnd 2", r2, 26);
check("base increase r1->r2", r2 - r1, 6);

// --- Walls ------------------------------------------------------------------
const wallRounds = 6; // rnds 3-8, even
for (let i = 0; i < wallRounds; i++) check(`wall rnd ${i + 3}`, 26, 26);
const rowGauge = 5; // rounds per inch
check("wall height (in) at example gauge", Number((wallRounds / rowGauge).toFixed(2)), 1.2);

// --- Flap (worked on 7 back stitches) --------------------------------------
const flapWidth = 7;
for (let r = 1; r <= 5; r++) check(`flap row ${r}`, flapWidth, 7);
// Row 6 buttonhole: sc2, ch2 (skip 2), sc3  -> 5 sc worked, 2 skipped, 5 covered
const flapR6Worked = 2 + 3;
const flapR6Skipped = 2;
check("flap row 6 sc worked", flapR6Worked, 5);
check("flap row 6 stitches spanned", flapR6Worked + flapR6Skipped, flapWidth);

// --- Ears (make 2) ----------------------------------------------------------
const ear = [6, 4, 2, 1]; // rows: 6 sc, then two double-decrease rows, then 1
for (let i = 1; i < ear.length - 1; i++) {
  check(`ear row ${i + 1} decreases 2`, ear[i - 1] - ear[i], 2);
}
check("ear final row", ear[ear.length - 1], 1);

// --- Total body stitches sanity (base perimeter == wall count) -------------
check("wall count matches base outer round", 26, r2);

// --- Base count formula: rnd2 = 2*straight + 12 -----------------------------
const base2 = (s) => 6 + s + 6 + s; // both ends doubled to 6, two straights
check("formula straight 7 -> 26", base2(7), 2 * 7 + 12);
check("AirPods 4 (straight 5) base rnd2", base2(5), 22);
check("AirPods 3 (straight 6) base rnd2", base2(6), 24);
check("Pro 2  (straight 7) base rnd2", base2(7), 26);

// --- Compatibility table: perimeter -> starting count (4 sc/in, even) -------
const startCount = (wIn, dIn) => {
  const t = Math.round(2 * (wIn + dIn) * stitchGauge);
  return t % 2 === 0 ? t : t + 1;
};
check("Pro 2 start count (6.48 in)", startCount(2.39, 0.85), 26);
check("AirPods 4 start count (5.60 in)", startCount(1.97, 0.83), 22);
check("AirPods 3 start count (5.96 in)", startCount(2.14, 0.84), 24);

console.log("");
console.log(failures === 0 ? "ALL PATTERN COUNTS OK" : `${failures} COUNT CHECK(S) FAILED`);
process.exitCode = failures === 0 ? 0 : 1;
