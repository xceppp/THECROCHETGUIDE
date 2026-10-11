// Reconstructs each article's publication timeline from git history.
//
//   node scripts/audit-pub-dates.mjs          -> writes planning/PUBLICATION_DATE_AUDIT.csv
//   node scripts/audit-pub-dates.mjs --apply  -> also rewrites pubDate / updatedDate
//
// Published = first commit in which the file exists without `draft: true`.
// Vercel deploys main within minutes of a push, and the owner confirmed the
// pre-rebrand site (thecrochetguide.com, then crochetexplained.com from
// 2026-09-30) was publicly reachable, so that commit day is the public date.
// Updated = last commit after publication that changed at least MIN_LINES
// lines other than the date fields. A commit that only bumps a date does not
// count as an update.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/content/posts";
const MIN_LINES = 2;
const apply = process.argv.includes("--apply");
const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 << 20 }).trim();

const fm = (text, key) => text.match(new RegExp(`^${key}:\\s*(.*)$`, "m"))?.[1].trim() ?? "";
const day = (iso) => iso.slice(0, 10);

const rows = [];
for (const file of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
  const path = `${DIR}/${file}`;
  const slug = file.replace(/\.md$/, "");
  const text = readFileSync(path, "utf8");
  const prevPub = fm(text, "pubDate");
  const prevUpd = fm(text, "updatedDate");
  const draftNow = fm(text, "draft") === "true";

  // Oldest first: hash, ISO date, subject.
  const log = git("log", "--reverse", "--format=%h|%aI|%s", "--", path)
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      const [hash, date, ...s] = l.split("|");
      return { hash, date, subject: s.join("|") };
    });

  let pub = null;
  for (const c of log) {
    let body = "";
    try {
      body = git("show", `${c.hash}:${path}`);
    } catch {
      continue;
    }
    if (fm(body, "draft") !== "true") {
      pub = c;
      break;
    }
  }

  let upd = null;
  if (pub) {
    for (const c of log) {
      if (c.date <= pub.date || day(c.date) === day(pub.date)) continue;
      const diff = git("show", "-U0", "--format=", c.hash, "--", path)
        .split("\n")
        .filter((l) => /^[+-](?![+-])/.test(l) && !/^[+-](pubDate|updatedDate):/.test(l) && l.trim().length > 1);
      if (diff.length >= MIN_LINES) upd = c;
    }
  }

  const newPub = draftNow ? prevPub : pub ? day(pub.date) : prevPub;
  const newUpd = draftNow ? prevUpd : upd ? day(upd.date) : "";
  const first = log[0];
  const evidence = draftNow
    ? "Draft; not built or public"
    : [
        `first commit ${first.hash} ${day(first.date)}`,
        pub && pub.hash !== first.hash ? `made public ${pub.hash} ${day(pub.date)} (${pub.subject})` : "",
        upd ? `last material edit ${upd.hash} ${day(upd.date)} (${upd.subject})` : "",
      ]
        .filter(Boolean)
        .join("; ");

  let confidence = "high";
  let question = "";
  if (!draftNow && newPub < "2026-09-30") {
    confidence = "medium";
    question =
      "Published before the crochetexplained.com rebrand (2026-09-30) on the earlier site; owner confirmed that site was public.";
  }
  if (!draftNow && prevPub < day(first.date)) {
    question = (question + " Previous date predates the repository itself.").trim();
  }

  const action = draftNow
    ? "none (draft)"
    : [
        newPub !== prevPub ? `pubDate ${prevPub} -> ${newPub}` : "",
        newUpd !== prevUpd ? `updatedDate ${prevUpd || "(none)"} -> ${newUpd || "(none)"}` : "",
      ]
        .filter(Boolean)
        .join("; ") || "kept";

  rows.push({
    url: `https://www.crochetexplained.com/${slug}/`,
    status: draftNow ? "draft" : "published",
    prevPub,
    prevUpd,
    newPub,
    newUpd,
    evidence,
    confidence,
    action,
    question,
  });

  if (apply && !draftNow && action !== "kept") {
    let out = text.replace(/^pubDate:.*$/m, `pubDate: ${newPub}`);
    if (newUpd) {
      out = /^updatedDate:/m.test(out)
        ? out.replace(/^updatedDate:.*$/m, `updatedDate: ${newUpd}`)
        : out.replace(/^pubDate:.*$/m, `pubDate: ${newPub}\nupdatedDate: ${newUpd}`);
    } else {
      out = out.replace(/^updatedDate:.*\r?\n/m, "");
    }
    writeFileSync(path, out);
  }
}

const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
const header =
  "url,status,previous_pubDate,previous_updatedDate,supported_pubDate,supported_updatedDate,evidence,confidence,action_taken,unresolved_questions";
const csv = [
  header,
  ...rows.map((r) =>
    [r.url, r.status, r.prevPub, r.prevUpd, r.newPub, r.newUpd, r.evidence, r.confidence, r.action, r.question]
      .map(esc)
      .join(","),
  ),
].join("\n");
writeFileSync(join("planning", "PUBLICATION_DATE_AUDIT.csv"), csv + "\n");
const changed = rows.filter((r) => r.status === "published" && r.action !== "kept");
console.log(`${rows.length} files, ${changed.length} published articles with date changes${apply ? " (applied)" : ""}`);
for (const r of changed) console.log(`  ${r.url.split("/").at(-2)}: ${r.action}`);
