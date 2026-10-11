// Prints the instruction skeleton of articles: headings, count lines, and
// existing diagrams, so diagrams can be specified from the article's numbers.
//   node scripts/step-diagrams/extract.mjs slug1 slug2 ...
import { readFileSync } from "node:fs";

const COUNT = /\(\d+( sts?| sc| hdc| dc)?\)|^\s*(\*\*)?(Rnd|Round|Row|Rows|Ch|Chain|Stage|Step|R\d)\b|^\|/i;
for (const slug of process.argv.slice(2)) {
  const md = readFileSync(`src/content/posts/${slug}.md`, "utf8").split(/^---\s*$/m).slice(2).join("---");
  console.log(`\n=== ${slug}`);
  for (const line of md.split(/\r?\n/)) {
    if (/^#{2,3} /.test(line)) console.log(line);
    else if (/\/diagrams\//.test(line)) console.log("   [svg] " + line.match(/\/diagrams\/([\w-]+\.svg)/)[1]);
    else if (COUNT.test(line) && !/^\|\s*-/.test(line)) console.log("   " + line.slice(0, 230));
  }
}
