// Per-article inventory of length, structure, pictures and diagrams.
//   node scripts/article-inventory.mjs        -> table on stdout
//   node scripts/article-inventory.mjs --json -> JSON for other scripts
import { readFileSync, readdirSync, existsSync } from "node:fs";

const DIR = "src/content/posts";
const FILLER = [
  /whether you'?re a (beginner|pro|seasoned)/i,
  /\bdive (in|into)\b/i,
  /\bin this (article|post|guide),? (we|you)/i,
  /\belevate your\b/i,
  /\bgame[- ]changer\b/i,
  /\blook no further\b/i,
  /\bin today'?s world\b/i,
  /\bmy lovelies\b/i,
  /\bcrafters\b/i,
];

export function inventory() {
  const rows = [];
  for (const file of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
    const text = readFileSync(`${DIR}/${file}`, "utf8");
    const field = (k) => text.match(new RegExp(`^${k}:\\s*(.*)$`, "m"))?.[1]?.trim() ?? "";
    if (field("draft") === "true") continue;
    const body = text.split(/^---\s*$/m).slice(2).join("---");
    const images = [
      ...[...body.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)].map((m) => m[1]),
      ...[...body.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1]),
    ];
    const diagrams = images.filter((src) => src.includes("/diagrams/") && src.endsWith(".svg"));
    const photos = images.filter((src) => !diagrams.includes(src));
    const missing = diagrams.filter((src) => !existsSync(`public${src}`));
    rows.push({
      slug: file.replace(/\.md$/, ""),
      category: field("category"),
      level: field("level"),
      howTo: field("howTo") === "true",
      printable: field("printable") === "true",
      pubDate: field("pubDate"),
      updatedDate: field("updatedDate"),
      words: body.split(/\s+/).filter(Boolean).length,
      h2: (body.match(/^## /gm) ?? []).length,
      faq: /^## Frequently asked/m.test(body),
      mistakes: /^## .*(mistake|wrong|troubleshoot|problem|fix)/im.test(body),
      photos: photos.length,
      diagrams: diagrams.length,
      missingDiagrams: missing,
      checklist: /data-checklist|class="checklist"/.test(body),
      counterLink: /\/tools\/stitch-counter|stitch counter/i.test(body),
      filler: FILLER.filter((re) => re.test(body)).map(String),
      validationNote: /checked on paper|paper-checked|technically checked|not (been )?(test-)?crocheted|not been made/i.test(body),
    });
  }
  return rows;
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}` || process.argv[1]?.endsWith("article-inventory.mjs")) {
  const rows = inventory();
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(rows, null, 2));
  } else {
    for (const r of rows)
      console.log(
        [r.slug.padEnd(44), r.category.padEnd(8), String(r.words).padStart(5), `h2:${r.h2}`, `img:${r.photos}`, `svg:${r.diagrams}`, r.howTo ? "howTo" : "-", r.faq ? "faq" : "-", r.mistakes ? "mist" : "-", r.checklist ? "chk" : "-", r.validationNote ? "note" : "-", r.filler.length ? `FILLER:${r.filler.join("|")}` : "", r.missingDiagrams.length ? `MISSING:${r.missingDiagrams}` : ""].join(" "),
      );
    console.log(`${rows.length} published`);
  }
}
