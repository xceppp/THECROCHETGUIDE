import fs from "fs";
import { glob } from "tinyglobby";

const base = "src/content/posts";
const files = fs.readdirSync(base).filter((name) => name.endsWith(".md"));
const ids = new Map();
for (const name of files) {
  const id = name.slice(0, -3);
  ids.set(id, (ids.get(id) ?? 0) + 1);
}
const dupNames = [...ids.entries()].filter(([, n]) => n > 1);
const globbed = await glob("**/*.md", { cwd: base, expandDirectories: false });
const counts = new Map();
for (const file of globbed) counts.set(file, (counts.get(file) ?? 0) + 1);
const dupGlob = [...counts.entries()].filter(([, n]) => n > 1);
console.log(`files on disk ${files.length}`);
console.log(`duplicate filenames ${dupNames.length}`);
console.log(`tinyglobby results ${globbed.length}`);
console.log(`tinyglobby duplicate paths ${dupGlob.length}`);
if (dupGlob.length) console.log(dupGlob);
