import fs from "fs";
import path from "path";

const dir = "src/content/posts";
const rows = [];
for (const name of fs.readdirSync(dir).filter((n) => n.endsWith(".md"))) {
  const text = fs.readFileSync(path.join(dir, name), "utf8");
  const draft = /^draft:\s*true/m.test(text);
  const category = text.match(/^category:\s*(\S+)/m)?.[1] ?? "";
  const title = text.match(/^title:\s*"([^"]+)"/m)?.[1] ?? name;
  const untested = /not been (made|worn|hung|heat-tested|crocheted)|has not been|not yarn-tested|not a measured sample|not worn/i.test(text);
  rows.push({ name, title, category, draft, untested });
}
const published = rows.filter((row) => !row.draft);
const csv = (value) => `"${String(value).replaceAll('"', '""')}"`;
const lines = ["slug,title,category,published,says_untested"];
for (const row of rows.sort((a, b) => a.name.localeCompare(b.name))) {
  lines.push(
    [row.name.replace(/\.md$/, ""), row.title, row.category, row.draft ? "no" : "yes", row.untested ? "yes" : "no"]
      .map(csv)
      .join(","),
  );
}
fs.mkdirSync("audit", { recursive: true });
fs.writeFileSync("audit/ARTICLE_QUALITY_FINAL.csv", lines.join("\n"));
console.log(`files ${rows.length} published ${published.length} phrase-untested ${published.filter((r) => r.untested).length} drafts ${rows.length - published.length}`);
