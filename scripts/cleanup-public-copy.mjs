// One-off: strip internal-audit phrasing from visitor-facing caption and
// description text while preserving real functional limitations (waterproof,
// load-rated, heat, "not used under a tree"). Run once, then review the diff.
//
//   node scripts/cleanup-public-copy.mjs
//
// Writes UTF-8 itself; do not pipe through PowerShell redirection.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = "src/content/posts";

// Ordered. Compound limitations first so the bare strips below do not leave a
// dangling fragment. Each pair is applied globally as a literal string.
const pairs = [
  // Finished-object illustration label (wallets).
  ["Illustration, not a photograph of a made wallet.", "Concept illustration of the finished wallet."],
  ["A computer illustration, not a made sample", "A concept illustration of the design"],

  // Descriptions mixing a real limitation with the audit tag: keep the real one.
  ["Not waterproof, not padding, not yarn-tested.", "Not waterproof and not padding."],
  ["Not yarn-tested and not load-rated.", "Not load-rated."],
  ["Not yarn-tested and not used under a tree.", "Not used under a tree."],
  ["Not drop-proof, waterproof, or yarn-tested.", "Not drop-proof or waterproof."],
  [" Not yarn-tested. Not waterproof.", " Not waterproof."],
  [", not yarn-tested.", "."],

  // Terse audit tails on captions and descriptions.
  [" Gauge estimates, not a yarn-tested sample.", ""],
  [" Gauge estimates, not a yarn-tested pouch.", ""],
  [" The star is not a yarn-tested sample.", ""],
  [" Not a worn, yarn-tested sample.", ""],
  [" Not a yarn-tested sample.", ""],
  [" Not a yarn-tested pouch.", ""],
  [" Not a yarn-tested pair.", ""],
  [" Not a heat test and not a fitted sample.", ""],
  [" Not a photograph of a tested sample.", ""],
  [" Not a photographed sample.", ""],
  [" Not a measured sample.", ""],
  [" Not a fitted sample.", ""],
  [" Not a worn pattern.", ""],
  [" Not a worn pair.", ""],
  [" Not a worn sample, and not the 12 inch panel.", ""],
  [" Not a worn sample.", ""],
  [" Not a weighed amount of yarn.", ""],
  [" Not a weighed amount for a pair.", ""],
  [" Not a weighed amount.", ""],
  [", not a fitted sample.", "."],
  [" Every count checked. Inches are gauge estimates.", " Inches are gauge estimates."],
  [" Counts checked on paper only.", ""],
  [" Not yarn-tested.", ""],
];

let filesChanged = 0;
let totalEdits = 0;
for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const path = `${dir}/${file}`;
  let text = readFileSync(path, "utf8");
  const before = text;
  let edits = 0;
  for (const [find, repl] of pairs) {
    const parts = text.split(find);
    if (parts.length > 1) {
      edits += parts.length - 1;
      text = parts.join(repl);
    }
  }
  if (text !== before) {
    writeFileSync(path, text, "utf8");
    filesChanged += 1;
    totalEdits += edits;
    console.log(`${file}: ${edits}`);
  }
}
console.log(`\n${filesChanged} files, ${totalEdits} replacements.`);
