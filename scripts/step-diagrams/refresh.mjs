// Re-syncs alt text and dimensions of placed step diagrams with the SVGs.
//   node scripts/step-diagrams/refresh.mjs
// Only touches 480-wide diagrams, the ones this folder generates.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";

const unescape = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const attr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

let changed = 0;
for (const f of readdirSync("src/content/posts").filter((f) => f.endsWith(".md"))) {
  const path = `src/content/posts/${f}`;
  const md = readFileSync(path, "utf8");
  const out = md.replace(/<img src="\/diagrams\/([\w-]+\.svg)" alt="[^"]*" width="\d+" height="\d+"/g, (tag, file) => {
    if (!existsSync(`public/diagrams/${file}`)) return tag;
    const svg = readFileSync(`public/diagrams/${file}`, "utf8");
    const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
    if (!vb || vb[1] !== "480") return tag;
    const desc = unescape(svg.match(/<desc>([\s\S]*?)<\/desc>/)[1]);
    return `<img src="/diagrams/${file}" alt="${attr(desc)}" width="${vb[1]}" height="${vb[2]}"`;
  });
  if (out !== md) {
    writeFileSync(path, out);
    changed++;
    console.log("updated", f);
  }
}
console.log(`${changed} articles refreshed`);
