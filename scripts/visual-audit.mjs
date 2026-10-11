// Checks every article image against the disclosure rules.
//   node scripts/visual-audit.mjs [--csv planning/VISUAL_ACCURACY_MATRIX.csv]
// Flags: a non-diagram image whose caption does not say it is an
// illustration, alt text that calls it a photo, missing files, short alt.
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const dir = "src/content/posts";
const rows = [];
for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const raw = readFileSync(`${dir}/${file}`, "utf8");
  if (/^draft:\s*true/m.test(raw)) continue;
  const slug = file.replace(/\.md$/, "");
  const fm = raw.split(/^---\s*$/m)[1] ?? "";
  for (const key of ["ogImage", "pinImage"]) {
    const v = fm.match(new RegExp(`^${key}:\\s*"?([^"\\r\\n]+)"?`, "m"))?.[1];
    if (v) rows.push({ slug, kind: key, src: v, alt: "", caption: "", issues: existsSync(`public${v}`) ? [] : ["missing file"] });
  }
  for (const m of raw.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g)) {
    const [, alt, src, title = ""] = m;
    const issues = [];
    const path = src.startsWith("/") ? `public${src}` : resolve(dirname(`${dir}/${file}`), src);
    if (!existsSync(path)) issues.push("missing file");
    if (!/illustration|diagram|chart/i.test(title)) issues.push("caption not labeled illustration");
    if (/\bphoto(graph)?\b/i.test(alt) && !/not a photo/i.test(alt)) issues.push("alt says photo");
    if (alt.trim().length < 15) issues.push("short alt");
    rows.push({ slug, kind: "photo-style", src, alt, caption: title, issues });
  }
  for (const m of raw.matchAll(/<figure[^>]*>\s*<img src="([^"]+)" alt="([^"]*)"[^>]*>\s*<figcaption>([\s\S]*?)<\/figcaption>/g)) {
    const [, src, alt, caption] = m;
    const issues = [];
    if (!existsSync(`public${src}`)) issues.push("missing file");
    if (alt.trim().length < 15) issues.push("short alt");
    const diagram = src.startsWith("/diagrams/");
    if (!diagram && !/illustration/i.test(caption)) issues.push("caption not labeled illustration");
    rows.push({ slug, kind: diagram ? "diagram" : "figure", src, alt, caption, issues });
  }
}

const flagged = rows.filter((r) => r.issues.length);
const by = (k) => rows.filter((r) => r.kind === k).length;
console.log(`images ${rows.length}: photo-style ${by("photo-style")}, diagrams ${by("diagram")}, figures ${by("figure")}, og ${by("ogImage")}, pin ${by("pinImage")}`);
console.log(`flagged ${flagged.length}`);
for (const r of flagged) console.log(`  ${r.slug} ${r.src}: ${r.issues.join("; ")}`);

const out = process.argv[process.argv.indexOf("--csv") + 1];
if (process.argv.includes("--csv") && out) {
  const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const lines = ["slug,kind,src,alt,caption,issues", ...rows.map((r) => [r.slug, r.kind, r.src, r.alt, r.caption, r.issues.join("; ") || "ok"].map(q).join(","))];
  writeFileSync(out, lines.join("\n") + "\n");
  console.log(`wrote ${out}`);
}
