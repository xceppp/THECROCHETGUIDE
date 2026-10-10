import fs from "fs";
import path from "path";

const root = process.cwd();
const postsDir = path.join(root, "src/content/posts");
const pagesDir = path.join(root, "src/pages");
const slugs = new Set(
  fs
    .readdirSync(postsDir)
    .filter((name) => name.endsWith(".md"))
    .filter((name) => !/^draft:\s*true/m.test(fs.readFileSync(path.join(postsDir, name), "utf8")))
    .map((name) => name.slice(0, -3)),
);
const pageRoutes = new Set();
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".astro")) {
      const rel = path.relative(pagesDir, full).replaceAll("\\", "/").replace(/\.astro$/, "");
      if (rel === "index") pageRoutes.add("/");
      else if (!rel.includes("[")) pageRoutes.add(`/${rel.replace(/\/index$/, "")}/`);
    }
  }
}
walk(pagesDir);
const hrefRe = /(?:href|]\()\/([a-z0-9-]+)\/?/g;
const broken = [];
function scan(file) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(hrefRe)) {
    const slug = match[1];
    if (slugs.has(slug) || pageRoutes.has(`/${slug}/`) || slug === "articles") continue;
    const draft = fs.existsSync(path.join(postsDir, `${slug}.md`));
    broken.push({ file: path.relative(root, file), slug, draft });
  }
}
for (const name of fs.readdirSync(postsDir)) {
  if (name.endsWith(".md")) scan(path.join(postsDir, name));
}
for (const file of ["src/pages/index.astro", "src/pages/about.astro", "src/pages/start-here.astro", "src/pages/disclosures.astro"]) {
  scan(path.join(root, file));
}
const publishedDraftLinks = broken.filter((row) => {
  const sourceText = fs.readFileSync(
    row.file.endsWith(".md") ? path.join(root, row.file) : path.join(root, row.file),
    "utf8",
  );
  const isDraft = /^draft:\s*true/m.test(sourceText);
  return !isDraft;
});
console.log(`broken-looking links ${broken.length}, from non-draft sources ${publishedDraftLinks.length}`);
for (const row of publishedDraftLinks) console.log(`${row.file} -> /${row.slug}/`);
