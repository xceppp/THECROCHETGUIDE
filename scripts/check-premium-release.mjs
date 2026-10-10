import fs from "fs";

const xml = fs.readFileSync("dist/sitemap-0.xml", "utf8");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const dup = locs.filter((loc, index) => locs.indexOf(loc) !== index);
const needed = [
  "https://www.crochetexplained.com/crochet-gauge-calculator/",
  "https://www.crochetexplained.com/crochet-stitch-counter/",
  "https://www.crochetexplained.com/crochet-pattern-practice/",
  "https://www.crochetexplained.com/basic-crochet-stitches/",
  "https://www.crochetexplained.com/crochet-turning-chain/",
  "https://www.crochetexplained.com/how-to-read-a-crochet-pattern/",
  "https://www.crochetexplained.com/crochet-gauge/",
  "https://www.crochetexplained.com/what-you-need-to-start-crocheting/",
];
for (const loc of needed) {
  if (!locs.includes(loc)) console.log("missing sitemap", loc);
}
console.log(`locs ${locs.length} dups ${dup.length}`);

function canonical(file) {
  const html = fs.readFileSync(file, "utf8");
  const match = html.match(/rel="canonical" href="([^"]+)"/);
  return match?.[1] ?? "none";
}

const pages = [
  ["dist/crochet-gauge-calculator/index.html", "https://www.crochetexplained.com/crochet-gauge-calculator/"],
  ["dist/crochet-stitch-counter/index.html", "https://www.crochetexplained.com/crochet-stitch-counter/"],
  ["dist/crochet-pattern-practice/index.html", "https://www.crochetexplained.com/crochet-pattern-practice/"],
  ["dist/basic-crochet-stitches/index.html", "https://www.crochetexplained.com/basic-crochet-stitches/"],
];
for (const [file, expected] of pages) {
  const found = canonical(file);
  console.log(found === expected ? "canonical ok" : `canonical BAD ${found}`, file);
}

const lessons = {
  "dist/basic-crochet-stitches/index.html": "16 − 1",
  "dist/how-to-read-a-crochet-pattern/index.html": "11 − 1",
  "dist/crochet-turning-chain/index.html": "10, 10, 10, 10",
  "dist/crochet-gauge/index.html": "crochet-gauge-calculator",
  "dist/what-you-need-to-start-crocheting/index.html": "hook-gauge-choice",
};
for (const [file, phrase] of Object.entries(lessons)) {
  const html = fs.readFileSync(file, "utf8");
  console.log(html.includes(phrase) ? "lesson ok" : "lesson MISSING", phrase);
}

const svgs = fs.readdirSync("dist/diagrams").filter((name) => name.endsWith(".svg"));
console.log(`dist svgs ${svgs.length}`);
const ads = fs.readFileSync("dist/ads.txt", "utf8");
console.log(ads.includes("pub-5737689254964633") ? "ads.txt ok" : "ads.txt BAD");
