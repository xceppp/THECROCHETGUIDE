import fs from "fs";

const safety = new Set([
  "how-to-crochet-a-bowl-cozy",
  "how-to-crochet-slippers",
  "how-to-crochet-a-hooded-scarf",
  "how-to-crochet-a-christmas-stocking",
  "how-to-crochet-a-christmas-tree-skirt",
]);
const withhold = new Set([
  "how-to-crochet-a-christmas-stocking",
  "how-to-crochet-a-christmas-tree-skirt",
]);

const lines = fs.readFileSync("audit/ARTICLE_QUALITY_FINAL.csv", "utf8").trim().split(/\r?\n/).slice(1);
const out = ["slug,decision,why"];
for (const line of lines) {
  const cols = [...line.matchAll(/"([^"]*)"/g)].map((m) => m[1]);
  const [slug, , , published, untested] = cols;
  if (published !== "yes" || untested !== "yes") continue;
  if (slug === "where-to-find-free-crochet-patterns") continue;
  let decision = "retain-with-disclosure";
  let why = "Page says it was not made in yarn. Sequence was not re-crocheted. URL left published.";
  if (safety.has(slug)) {
    decision = "retain-safety-limits-already-on-page";
    why = "Heat, traction, fit, or flatness limits are already in the article. Still not a yarn sample.";
  }
  if (withhold.has(slug)) {
    decision = "recommend-withhold-not-executed";
    why = "Central result is untested: stocking heel, or whether the tree skirt lies flat. Removing the URL needs separate approval.";
  }
  out.push(`"${slug}","${decision}","${why}"`);
}
fs.writeFileSync("audit/UNTESTED_PATTERN_DECISIONS.csv", out.join("\n"));
console.log(`decisions ${out.length - 1}`);
