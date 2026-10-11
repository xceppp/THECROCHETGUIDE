// Renders diagrams at phone width into one contact sheet for review.
//   node scripts/step-diagrams/preview.mjs out.png file1.svg file2.svg ...
import sharp from "sharp";

const [out, ...files] = process.argv.slice(2);
const width = 288;
const tiles = await Promise.all(
  files.map((f) => sharp(`public/diagrams/${f}`, { density: 96 }).resize({ width }).png().toBuffer({ resolveWithObject: true })),
);
const gap = 12;
const cols = Math.min(4, tiles.length);
const rows = Math.ceil(tiles.length / cols);
const rowHeights = Array.from({ length: rows }, (_, r) => Math.max(...tiles.slice(r * cols, r * cols + cols).map((t) => t.info.height)));
const sheet = sharp({
  create: { width: cols * (width + gap) + gap, height: rowHeights.reduce((a, b) => a + b + gap, gap), channels: 3, background: "#888" },
});
let top = gap;
const composites = [];
tiles.forEach((t, i) => {
  const r = Math.floor(i / cols);
  const c = i % cols;
  if (c === 0 && r > 0) top += rowHeights[r - 1] + gap;
  composites.push({ input: t.data, left: gap + c * (width + gap), top });
});
await sheet.composite(composites).png().toFile(out);
console.log(out);
