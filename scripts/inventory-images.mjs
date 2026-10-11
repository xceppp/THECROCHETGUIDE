import fs from "node:fs";
import path from "node:path";

const dir = "src/content/posts";
const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md")).sort();
const rows = [
  [
    "URL",
    "Existing Images",
    "New Images",
    "Type",
    "Purpose",
    "Accuracy Status",
    "Manual Review Required",
  ],
];

for (const file of files) {
  const text = fs.readFileSync(path.join(dir, file), "utf8");
  if (/^draft:\s*true/m.test(text)) continue;
  const images = (text.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length;
  const diagrams = (text.match(/class="diagram"/g) || []).length;
  const existing = images + diagrams;
  const type = diagrams > 0 ? "existing diagram and illustration" : "existing illustration";
  rows.push([
    `/${file.replace(/\.md$/, "/")}`,
    String(existing),
    "0",
    type,
    "Kept. No new picture added in this pass.",
    "Not newly generated",
    "No",
  ]);
}

fs.mkdirSync("audit", { recursive: true });
fs.writeFileSync(
  "audit/ARTICLE_IMAGE_MATRIX.csv",
  rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n") + "\n",
);
console.log(`published ${rows.length - 1}`);
