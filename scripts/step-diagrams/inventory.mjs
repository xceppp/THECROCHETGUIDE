// Lists step diagrams per article, read from the articles themselves.
//   node scripts/step-diagrams/inventory.mjs > out.md
import { readFileSync, readdirSync, existsSync } from "node:fs";

const title = (file) => readFileSync(`public/diagrams/${file}`, "utf8").match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? file;
const width = (file) => readFileSync(`public/diagrams/${file}`, "utf8").match(/viewBox="0 0 (\d+)/)?.[1];

const rows = [];
for (const f of readdirSync("src/content/posts").filter((f) => f.endsWith(".md"))) {
  const md = readFileSync(`src/content/posts/${f}`, "utf8");
  if (/^draft:\s*true/m.test(md)) continue;
  const files = [...md.matchAll(/\/diagrams\/([\w-]+\.svg)/g)].map((m) => m[1]).filter((x) => existsSync(`public/diagrams/${x}`));
  const step = files.filter((x) => width(x) === "480");
  const legacy = files.filter((x) => width(x) !== "480");
  rows.push({ slug: f.replace(/\.md$/, ""), step, legacy });
}
rows.sort((a, b) => b.step.length - a.step.length || a.slug.localeCompare(b.slug));
const unique = new Set(rows.flatMap((r) => r.step));
const placements = rows.reduce((a, r) => a + r.step.length, 0);
console.log(`Published articles: ${rows.length}. Step-diagram placements: ${placements}. Distinct step diagrams: ${unique.size}. Articles with at least one: ${rows.filter((r) => r.step.length).length}.\n`);
console.log("| Article | Step diagrams (480 wide) | Older diagrams (640 wide) |");
console.log("| --- | --- | --- |");
for (const r of rows)
  console.log(`| \`/${r.slug}/\` | ${r.step.length ? r.step.map((x) => `${x.replace(/\.svg$/, "")} (${title(x)})`).join("; ") : "none"} | ${r.legacy.length} |`);
