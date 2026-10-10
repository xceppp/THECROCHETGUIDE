import fs from "fs";

const xml = fs.readFileSync("dist/sitemap-0.xml", "utf8");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const dup = locs.filter((loc, index) => locs.indexOf(loc) !== index);
console.log(`locs ${locs.length} dups ${dup.length}`);
console.log(fs.readFileSync("dist/robots.txt", "utf8"));
console.log(fs.readFileSync("dist/ads.txt", "utf8").trim());
const chart = fs.readFileSync("dist/crochet-abbreviations-chart/index.html", "utf8");
console.log(`us-uk ${chart.includes("us-uk-terms")}`);
const cozy = fs.readFileSync("dist/how-to-crochet-a-bowl-cozy/index.html", "utf8");
console.log(`no microwave ${cozy.includes("Do not microwave")}`);
