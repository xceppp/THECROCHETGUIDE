import fs from "fs";
import path from "path";
import sharp from "sharp";

const postsDir = "src/content/posts";
const rows = [];

function csv(value) {
  const text = String(value ?? "").replaceAll('"', '""');
  return `"${text}"`;
}

for (const name of fs.readdirSync(postsDir).filter((n) => n.endsWith(".md"))) {
  const raw = fs.readFileSync(path.join(postsDir, name), "utf8");
  const draft = /^draft:\s*true/m.test(raw);
  if (draft) continue;
  const slug = name.replace(/\.md$/, "");
  const imageRe = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g;
  for (const match of raw.matchAll(imageRe)) {
    const alt = match[1];
    const src = match[2];
    const caption = match[3] ?? "";
    const file = src.startsWith("/")
      ? path.join("public", src)
      : path.normalize(path.join(postsDir, src));
    let bytes = 0;
    let width = "";
    let height = "";
    let format = path.extname(file).slice(1);
    let exists = fs.existsSync(file);
    if (exists && /\.(png|jpe?g|webp|gif)$/i.test(file)) {
      bytes = fs.statSync(file).size;
      const meta = await sharp(file).metadata();
      width = meta.width ?? "";
      height = meta.height ?? "";
      format = meta.format ?? format;
    }
    let action = "KEEP";
    if (!exists) action = "REPLACE";
    else if (bytes > 500 * 1024) action = "OPTIMIZE";
    if (!alt.trim()) action = "REPLACE";
    rows.push({
      url: `/${slug}/`,
      file,
      purpose: caption.slice(0, 120),
      width,
      height,
      bytes,
      format,
      alt,
      caption,
      kind: "AI illustration (captioned; pixels not re-shot)",
      action,
    });
  }
  const diagramRe = /src="(\/diagrams\/[^"]+)"/g;
  for (const match of raw.matchAll(diagramRe)) {
    const file = path.join("public", match[1]);
    rows.push({
      url: `/${slug}/`,
      file,
      purpose: "instructional diagram",
      width: 640,
      height: "",
      bytes: fs.existsSync(file) ? fs.statSync(file).size : 0,
      format: "svg",
      alt: "see figure",
      caption: "Diagram",
      kind: "original SVG diagram",
      action: fs.existsSync(file) ? "KEEP" : "ADD",
    });
  }
}

const header = [
  "url",
  "file",
  "purpose",
  "width",
  "height",
  "bytes",
  "format",
  "alt",
  "caption",
  "kind",
  "action",
];
const lines = [header.join(",")];
for (const row of rows) {
  lines.push(header.map((key) => csv(row[key])).join(","));
}
fs.mkdirSync("audit", { recursive: true });
fs.writeFileSync("audit/IMAGE_INVENTORY.csv", lines.join("\n"));
const actions = {};
for (const row of rows) actions[row.action] = (actions[row.action] ?? 0) + 1;
console.log(`rows ${rows.length}`);
console.log(actions);
const big = rows.filter((row) => row.bytes > 500 * 1024);
for (const row of big) console.log(`${(row.bytes / 1024).toFixed(0)}KB ${row.file}`);
