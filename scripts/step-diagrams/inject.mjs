// Places step diagrams into articles.
//   node scripts/step-diagrams/inject.mjs
// Each articles-*.mjs exports `placements`: [{ slug, file, after, caption }].
// `after` is a literal string that starts the paragraph or heading the figure
// goes after. Alt text is the SVG's own <desc>, so it always describes what
// is drawn. A placement whose diagram is already in the article is skipped.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const placements = [];
for (const file of readdirSync(new URL(".", import.meta.url)).filter((f) => /^articles-.*\.mjs$/.test(f))) {
  const mod = await import(new URL(file, import.meta.url));
  placements.push(...(mod.placements ?? []));
}

const unescape = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const attr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

let added = 0;
const problems = [];
for (const p of placements) {
  const path = `src/content/posts/${p.slug}.md`;
  let md = readFileSync(path, "utf8");
  if (md.includes(`/diagrams/${p.file}"`)) continue;
  const svg = readFileSync(`public/diagrams/${p.file}`, "utf8");
  const [, w, h] = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  const desc = unescape(svg.match(/<desc>([\s\S]*?)<\/desc>/)[1]);
  const nl = md.includes("\r\n") ? "\r\n" : "\n";
  const lines = md.split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith(p.after));
  if (start < 0) {
    problems.push(`${p.slug}: anchor not found: ${p.after}`);
    continue;
  }
  // End of that block: a heading is one line; a paragraph runs to a blank line.
  let end = start;
  if (!lines[start].startsWith("#")) while (end + 1 < lines.length && lines[end + 1].trim() !== "") end++;
  const caption = typeof p.caption === "string" ? p.caption.trim() : "";
  const figure = [
    "",
    '<figure class="diagram">',
    `<img src="/diagrams/${p.file}" alt="${attr(desc)}" width="${w}" height="${h}" loading="lazy" decoding="async" />`,
    ...(caption ? [`<figcaption>${attr(caption)}</figcaption>`] : []),
    "</figure>",
  ];
  lines.splice(end + 1, 0, ...figure);
  md = lines.join(nl);
  writeFileSync(path, md);
  added++;
}
console.log(`${added} diagrams placed`);
for (const p of problems) console.log("  " + p);
if (problems.length) process.exitCode = 1;
