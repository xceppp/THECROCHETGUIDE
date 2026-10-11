import fs from "fs";
import path from "path";

const dir = "public/diagrams";
const names = fs.readdirSync(dir).filter((n) => n.endsWith(".svg"));
let bad = 0;
const smallLegacy = [];
for (const name of names) {
  const text = fs.readFileSync(path.join(dir, name), "utf8");
  const missing = [];
  if (!text.includes("<svg")) missing.push("svg");
  if (!text.includes("<title>")) missing.push("title");
  if (!text.includes("<desc>")) missing.push("desc");
  const width = text.match(/viewBox="0 0 (\d+) \d+"/)?.[1];
  if (width !== "640" && width !== "480") missing.push("viewBox");
  // Step diagrams are 480 wide so 20-unit text stays about 12px on a 320px phone.
  const sizes = [...text.matchAll(/font-size[=:]\s*"?(\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
  const smallest = sizes.length ? Math.min(...sizes) : Infinity;
  if (width === "480" && smallest < 20) missing.push(`font-size ${smallest}`);
  if (width === "640" && smallest < 16) smallLegacy.push(name);
  if (missing.length) {
    bad++;
    console.log(name, missing.join(","));
  }
}
const posts = fs.readdirSync("src/content/posts").filter((n) => n.endsWith(".md"));
const used = new Set();
for (const post of posts) {
  const text = fs.readFileSync(path.join("src/content/posts", post), "utf8");
  for (const match of text.matchAll(/\/diagrams\/([a-z0-9-]+\.svg)/g)) used.add(match[1]);
}
const unused = names.filter((n) => !used.has(n));
console.log(`svg ${names.length} invalid ${bad} unused ${unused.join(",") || "none"}`);
console.log(`640-wide diagrams with text under 16 units (hard to read on a phone): ${smallLegacy.length}`);
if (bad) process.exitCode = 1;
