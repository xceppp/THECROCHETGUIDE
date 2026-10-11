// Writes every step diagram to public/diagrams/.
//   node scripts/step-diagrams/build.mjs
// Each batch module exports an object of { "file.svg": svgString }. Building
// a round chart whose counts do not add up throws, which stops the build.
import { writeFileSync, readdirSync } from "node:fs";
import { generic } from "./generic.mjs";

const batches = { generic };
for (const file of readdirSync(new URL(".", import.meta.url)).filter((f) => /^articles-.*\.mjs$/.test(f))) {
  const mod = await import(new URL(file, import.meta.url));
  batches[file] = mod.default;
}

let count = 0;
for (const [name, files] of Object.entries(batches)) {
  for (const [file, svg] of Object.entries(files)) {
    writeFileSync(`public/diagrams/${file}`, svg);
    count++;
  }
  console.log(`${name}: ${Object.keys(files).length}`);
}
console.log(`${count} step diagrams written`);
