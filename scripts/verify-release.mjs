import fs from "fs";
import path from "path";

const root = process.cwd();
const postsDir = path.join(root, "src/content/posts");
const course = [
  "what-you-need-to-start-crocheting",
  "left-handed-crochet",
  "crochet-abbreviations-chart",
  "how-to-read-a-crochet-pattern",
  "basic-crochet-stitches",
  "crochet-turning-chain",
  "crochet-increase-decrease",
  "crochet-in-the-round",
  "changing-yarn-color-crochet",
  "weaving-in-ends-and-blocking",
  "crochet-gauge",
  "where-to-find-free-crochet-patterns",
];
const charts = [
  "crochet-abbreviations-chart",
  "crochet-hook-size-conversion-chart",
  "yarn-weight-chart",
];
const missingCourse = course.filter((slug) => !fs.existsSync(path.join(postsDir, `${slug}.md`)));
const missingCharts = charts.filter((slug) => !fs.existsSync(path.join(postsDir, `${slug}.md`)));
console.log(`missing course ${missingCourse.length} missing charts ${missingCharts.length}`);

const missingImages = [];
for (const name of fs.readdirSync(postsDir).filter((n) => n.endsWith(".md"))) {
  const text = fs.readFileSync(path.join(postsDir, name), "utf8");
  if (/^draft:\s*true/m.test(text)) continue;
  for (const match of text.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g)) {
    const src = match[1];
    if (!src.startsWith("../") && !src.startsWith("../../")) continue;
    const file = path.normalize(path.join(postsDir, src));
    if (!fs.existsSync(file)) missingImages.push(`${name} -> ${src}`);
    if (match[2] && !match[2].startsWith("Illustration")) {
      missingImages.push(`caption ${name}: ${match[2].slice(0, 80)}`);
    }
  }
}
console.log(`missing images or unlabeled captions ${missingImages.length}`);
for (const row of missingImages) console.log(row);

const sitemap = fs.readFileSync(path.join(root, "dist/sitemap-0.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const dup = locs.filter((loc, i) => locs.indexOf(loc) !== i);
console.log(`sitemap locs ${locs.length} duplicate locs ${dup.length}`);
const stocking = fs.readFileSync(
  path.join(root, "dist/how-to-crochet-a-christmas-stocking/index.html"),
  "utf8",
);
const canon = stocking.match(/rel="canonical" href="([^"]+)"/);
console.log(`stocking canonical ${canon?.[1]}`);
console.log(`stocking has 5 inches ${stocking.includes("5 inches")}`);
console.log(`home halloween theme ${fs.readFileSync(path.join(root, "dist/index.html"), "utf8").includes("theme-halloween")}`);
