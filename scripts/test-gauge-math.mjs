import assert from "node:assert/strict";
import { gaugeAdvice } from "../src/lib/gaugeMath.ts";

const tight = gaugeAdvice({
  patternStitches: 16,
  actualStitches: 20,
  windowInches: 4,
  stitchCount: 16,
  desiredWidth: null,
});
assert.equal(tight.ok, true);
if (tight.ok) {
  assert.equal(tight.predictedWidth, 3.2);
  assert.equal(tight.patternWidth, 4);
  assert.equal(tight.direction, "narrower");
  assert.ok(Math.abs(tight.percentVsPattern + 20) < 0.001);
}

const even = gaugeAdvice({
  patternStitches: 14,
  actualStitches: 14,
  windowInches: 4,
  stitchCount: 28,
  desiredWidth: null,
});
assert.equal(even.ok, true);
if (even.ok) {
  assert.equal(even.predictedWidth, 8);
  assert.equal(even.patternWidth, 8);
  assert.equal(even.direction, "match");
}

const looseWidth = gaugeAdvice({
  patternStitches: 16,
  actualStitches: 14,
  windowInches: 4,
  stitchCount: null,
  desiredWidth: 8,
});
assert.equal(looseWidth.ok, true);
if (looseWidth.ok) {
  assert.equal(looseWidth.stitchesForWidth, 28);
  assert.equal(looseWidth.patternStitchesForWidth, 32);
  assert.equal(looseWidth.direction, "wider");
}

for (const bad of [
  { patternStitches: 0, actualStitches: 16, windowInches: 4, stitchCount: 10, desiredWidth: null },
  { patternStitches: 16, actualStitches: -1, windowInches: 4, stitchCount: null, desiredWidth: null },
  { patternStitches: Number.NaN, actualStitches: 16, windowInches: 4, stitchCount: null, desiredWidth: null },
  { patternStitches: 16, actualStitches: 16, windowInches: 4, stitchCount: 0, desiredWidth: null },
]) {
  const result = gaugeAdvice(bad);
  assert.equal(result.ok, false);
}

const emptyWidth = gaugeAdvice({
  patternStitches: 16,
  actualStitches: 20,
  windowInches: 4,
  stitchCount: null,
  desiredWidth: null,
});
assert.equal(emptyWidth.ok, true);
if (emptyWidth.ok) {
  assert.equal(emptyWidth.predictedWidth, null);
  assert.equal(emptyWidth.direction, "narrower");
}

const huge = gaugeAdvice({
  patternStitches: 501,
  actualStitches: 16,
  windowInches: 4,
  stitchCount: null,
  desiredWidth: null,
});
assert.equal(huge.ok, false);

const text = gaugeAdvice({
  patternStitches: Number("abc"),
  actualStitches: 16,
  windowInches: 4,
  stitchCount: null,
  desiredWidth: null,
});
assert.equal(text.ok, false);

const blank = gaugeAdvice({
  patternStitches: Number(""),
  actualStitches: Number(""),
  windowInches: Number(""),
  stitchCount: null,
  desiredWidth: null,
});
assert.equal(blank.ok, false);

console.log("gauge math ok");

const { singleCrochetFromChain, repeatTotals, changeCount } = await import("../src/lib/practiceMath.ts");
const { PATTERN_QUESTIONS, explainAnswer, scoreQuiz } = await import("../src/lib/patternQuiz.ts");

assert.equal(singleCrochetFromChain(16), 15);
assert.equal(singleCrochetFromChain(11), 10);
assert.deepEqual(repeatTotals(2, 3, 3), { oldStitches: 6, newStitches: 9 });

assert.equal(changeCount(0, "up"), 1);
assert.equal(changeCount(4, "down"), 3);
assert.equal(changeCount(0, "down"), 0);
assert.equal(changeCount(9, "reset"), 0);

assert.equal(PATTERN_QUESTIONS.length, 5);
assert.equal(PATTERN_QUESTIONS[2].options[PATTERN_QUESTIONS[2].answer], "10");
assert.equal(PATTERN_QUESTIONS[3].options[PATTERN_QUESTIONS[3].answer], "Uses 6 and makes 9");
assert.match(explainAnswer(PATTERN_QUESTIONS[0], null), /Choose an answer/);
assert.match(explainAnswer(PATTERN_QUESTIONS[0], 0), /That matches/);
assert.match(explainAnswer(PATTERN_QUESTIONS[0], 1), /Not this one/);
const partial = scoreQuiz([0, null, null, null, null]);
assert.equal(partial.complete, false);
const all = scoreQuiz(PATTERN_QUESTIONS.map((question) => question.answer));
assert.equal(all.correct, 5);
assert.equal(all.complete, true);
const wrong = scoreQuiz([1, 1, 1, 0, 0]);
assert.equal(wrong.correct, 4);

console.log("counter and quiz ok");
