import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
const slugs = process.argv.slice(3);
const tiles = [];
for (const slug of slugs) {
  const p = `src/content/posts/${slug}.md`;
  const md = readFileSync(p, "utf8");
  for (const m of md.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) tiles.push(resolve(dirname(p), m[2]));
}
const W = 220;
const bufs = await Promise.all(tiles.map((t) => sharp(t).resize({ width: W, height: W, fit: "cover" }).png().toBuffer()));
const cols = 6, rows = Math.ceil(bufs.length / cols);
await sharp({ create: { width: cols * (W + 6), height: rows * (W + 6), channels: 3, background: "#888" } })
  .composite(bufs.map((b, i) => ({ input: b, left: (i % cols) * (W + 6), top: Math.floor(i / cols) * (W + 6) })))
  .png().toFile(process.argv[2]);
console.log(tiles.map((t, i) => `${i + 1}: ${t.split(/[\\/]/).pop()}`).join("\n"));
