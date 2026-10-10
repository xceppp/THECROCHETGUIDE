import fs from "fs";
import path from "path";

const dir = "public/diagrams";
const names = fs.readdirSync(dir).filter((n) => n.endsWith(".svg"));
let bad = 0;
for (const name of names) {
  const text = fs.readFileSync(path.join(dir, name), "utf8");
  const missing = [];
  if (!text.includes("<svg")) missing.push("svg");
  if (!text.includes("<title>")) missing.push("title");
  if (!text.includes("<desc>")) missing.push("desc");
  if (!text.includes('viewBox="0 0 640')) missing.push("viewBox");
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
