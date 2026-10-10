export type GaugeInput = {
  patternStitches: number;
  actualStitches: number;
  windowInches: number;
  stitchCount: number | null;
  desiredWidth: number | null;
};

export type GaugeSuccess = {
  ok: true;
  patternWidth: number | null;
  predictedWidth: number | null;
  stitchesForWidth: number | null;
  patternStitchesForWidth: number | null;
  widthRatio: number;
  percentVsPattern: number;
  direction: "narrower" | "wider" | "match";
};

export type GaugeFailure = { ok: false; error: string };

const MAX_STITCHES = 500;
const MAX_INCHES = 200;

function finite(value: number): boolean {
  return Number.isFinite(value);
}

export function gaugeAdvice(input: GaugeInput): GaugeSuccess | GaugeFailure {
  const { patternStitches, actualStitches, windowInches, stitchCount, desiredWidth } =
    input;

  if (!finite(patternStitches) || !finite(actualStitches) || !finite(windowInches)) {
    return { ok: false, error: "Enter the pattern gauge, your swatch gauge, and the window in inches." };
  }
  if (patternStitches <= 0 || actualStitches <= 0 || windowInches <= 0) {
    return { ok: false, error: "Gauge and the measuring window have to be numbers greater than zero." };
  }
  if (
    patternStitches > MAX_STITCHES ||
    actualStitches > MAX_STITCHES ||
    windowInches > MAX_INCHES
  ) {
    return { ok: false, error: "That number is outside the range this page will calculate." };
  }
  if (stitchCount !== null && (!finite(stitchCount) || stitchCount <= 0 || stitchCount > 2000)) {
    return { ok: false, error: "Stitch count has to be a number greater than zero." };
  }
  if (desiredWidth !== null && (!finite(desiredWidth) || desiredWidth <= 0 || desiredWidth > MAX_INCHES)) {
    return { ok: false, error: "Width has to be a number of inches greater than zero." };
  }

  const widthRatio = patternStitches / actualStitches;
  const percentVsPattern = (widthRatio - 1) * 100;
  const direction: GaugeSuccess["direction"] =
    Math.abs(percentVsPattern) < 0.05 ? "match" : percentVsPattern < 0 ? "narrower" : "wider";

  const patternWidth = stitchCount === null ? null : stitchCount * (windowInches / patternStitches);
  const predictedWidth = stitchCount === null ? null : stitchCount * (windowInches / actualStitches);
  const stitchesForWidth =
    desiredWidth === null ? null : desiredWidth * (actualStitches / windowInches);
  const patternStitchesForWidth =
    desiredWidth === null ? null : desiredWidth * (patternStitches / windowInches);

  return {
    ok: true,
    patternWidth,
    predictedWidth,
    stitchesForWidth,
    patternStitchesForWidth,
    widthRatio,
    percentVsPattern,
    direction,
  };
}

export function roundTenths(value: number): string {
  return (Math.round(value * 10) / 10).toFixed(1);
}
