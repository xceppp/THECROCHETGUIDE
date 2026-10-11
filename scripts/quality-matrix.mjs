// Writes planning/ARTICLE_QUALITY_MATRIX.csv from the articles themselves.
//   node scripts/quality-matrix.mjs
// Also lists project pages with counts but no "not test-crocheted" statement
// near the top, which AGENTS.md rule 3 requires.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { inventory } from "./article-inventory.mjs";

const STAGE = /^(step|stage|part|round|rounds|row|rows|panel)\b|^\d+\.\s|\b(assembly|assemble|join|joining|seam|edging|finish|finishing|attach)\b/i;
const NOT_STAGE = /frequently|mistake|troubleshoot|material|what you need|abbreviation|gauge|care\b|at a glance/i;
const UNTESTED = /not (been )?(yarn-)?(test-)?crocheted|not a (yarn-)?tested|not physically|was (not )?crocheted or measured|no \w+ for this page was crocheted|nobody has (crocheted|made)|not been made|made up in yarn|not (yet )?crocheted|not a fitted sample|not test-crocheted|checked on paper|counted on paper|added up on paper|not a made sample|not a measured sample|illustrations of the finished|a guide rather than a measured|sizes come from gauge|worked out from gauge/i;

const rows = inventory();
const out = [];
const gaps = [];
for (const r of rows) {
  const md = readFileSync(`src/content/posts/${r.slug}.md`, "utf8");
  const body = md.split(/^---\s*$/m).slice(2).join("---");
  const headings = [...body.matchAll(/^(#{2,3}) (.+)$/gm)].map((m) => m[2].replace(/`/g, ""));
  const stages = r.howTo ? headings.filter((h) => STAGE.test(h) && !NOT_STAGE.test(h)) : [];
  const steps = [...body.matchAll(/\/diagrams\/([\w-]+\.svg)/g)].map((m) => m[1]).filter((f) => existsSync(`public/diagrams/${f}`) && /viewBox="0 0 480/.test(readFileSync(`public/diagrams/${f}`, "utf8")));
  const counted = /^\*\*(Rnd|Round|Row)s?\b[^*]*\*\*/m.test(body) || /^\s*-?\s*\*\*(Rnd|Round|Row)/m.test(body);
  const top = body.slice(0, Math.floor(body.length * 0.35));
  const templateNote = r.category === "patterns" && r.howTo;
  const ownNote = UNTESTED.test(top);
  let validation = "technique or reference page";
  if (counted) validation = templateNote ? (ownNote ? "template note + in-text note" : "template note") : ownNote ? "in-text note near top" : "MISSING near-top note";
  if (counted && !templateNote && !ownNote) gaps.push(r.slug);
  out.push({
    url: `/${r.slug}/`,
    category: r.category,
    level: r.level,
    words: r.words,
    in_length_range: r.words >= 1000 && r.words <= 1800 ? "yes" : r.words > 1800 ? "long" : "short",
    h2: r.h2,
    illustrations: r.photos,
    diagrams_total: r.diagrams,
    step_diagrams: steps.length,
    mistakes_section: r.mistakes ? "yes" : "no",
    faq: r.faq ? "yes" : "no",
    howTo: r.howTo ? "yes" : "no",
    progress_checklist: stages.length >= 3 ? `yes (${stages.length})` : "no",
    has_counts: counted ? "yes" : "no",
    validation_disclosure: validation,
    filler_found: r.filler.length ? r.filler.join(" | ") : "none",
    pubDate: r.pubDate,
    updatedDate: r.updatedDate || "",
  });
}
const cols = Object.keys(out[0]);
const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
writeFileSync("planning/ARTICLE_QUALITY_MATRIX.csv", [cols.join(","), ...out.map((o) => cols.map((c) => q(o[c])).join(","))].join("\n") + "\n");
console.log(`wrote planning/ARTICLE_QUALITY_MATRIX.csv (${out.length} rows)`);
const tally = (k) => Object.entries(out.reduce((a, o) => ((a[o[k]] = (a[o[k]] ?? 0) + 1), a), {})).map(([v, n]) => `${v}: ${n}`).join(", ");
for (const k of ["in_length_range", "progress_checklist", "validation_disclosure", "mistakes_section", "faq"]) console.log(`${k}: ${k === "progress_checklist" ? out.filter((o) => o[k] !== "no").length + " yes" : tally(k)}`);
console.log(`missing near-top untested statement: ${gaps.length ? gaps.join(", ") : "none"}`);
