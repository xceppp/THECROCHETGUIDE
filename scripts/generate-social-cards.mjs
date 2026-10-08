import { readdir, readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = path.join(root, "src/content/posts");
const assetsDir = path.join(root, "src/assets/articles");
const outDir = path.join(root, "public/social");

function field(frontmatter, name) {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*"?([^"\\n]+)"?\\s*$`, "m"));
  return match ? match[1].trim() : "";
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrap(text, max) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 5);
}

function textBlock(lines, x, y, size, fill, weight = "700") {
  return lines
    .map((line, index) => {
      const dy = index === 0 ? y : size + 8;
      return `<text x="${x}" y="${index === 0 ? y : 0}" dy="${index === 0 ? 0 : dy}" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(line)}</text>`;
    })
    .join("");
}

async function findHero(slug) {
  const names = [
    `${slug}-result.jpg`,
    `${slug}-variations.jpg`,
    `${slug}-1.jpg`,
    `${slug}-result.webp`,
    `${slug}-1.webp`,
  ];
  for (const name of names) {
    const file = path.join(assetsDir, name);
    try {
      await readFile(file);
      return file;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

await mkdir(outDir, { recursive: true });
const files = (await readdir(postsDir)).filter((name) => name.endsWith(".md"));
let made = 0;

for (const file of files) {
  const raw = await readFile(path.join(postsDir, file), "utf8");
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
  if (/^draft:\s*true/m.test(frontmatter)) continue;
  if (field(frontmatter, "ogImage") && field(frontmatter, "pinImage")) continue;

  const slug = file.replace(/\.md$/, "");
  const title = field(frontmatter, "title");
  const level = field(frontmatter, "level");
  const body = raw.replace(/^---[\s\S]*?---/, "");
  const words = body.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  const difficulty = level
    ? level.charAt(0).toUpperCase() + level.slice(1)
    : "All levels";
  const hero = await findHero(slug);

  if (!field(frontmatter, "ogImage")) {
    const lines = wrap(title, 22);
    const titleSvg = lines
      .map(
        (line, index) =>
          `<text x="48" y="${150 + index * 58}" font-family="Georgia, 'Times New Roman', serif" font-size="46" font-weight="700" fill="#2f2a26">${escapeXml(line)}</text>`,
      )
      .join("");
    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#fdfaf6"/>
      ${titleSvg}
      <text x="48" y="580" font-family="Georgia, 'Times New Roman', serif" font-size="22" fill="#6d635a">crochetexplained.com</text>
    </svg>`;
    const base = sharp(Buffer.from(svg));
    if (hero) {
      const photo = await sharp(hero)
        .resize(560, 630, { fit: "cover", position: "centre" })
        .jpeg()
        .toBuffer();
      await base
        .composite([{ input: photo, left: 640, top: 0 }])
        .jpeg({ quality: 82 })
        .toFile(path.join(outDir, `${slug}-og.jpg`));
    } else {
      await base.jpeg({ quality: 82 }).toFile(path.join(outDir, `${slug}-og.jpg`));
    }
  }

  if (!field(frontmatter, "pinImage")) {
    const lines = wrap(title, 24);
    const titleSvg = lines
      .map(
        (line, index) =>
          `<text x="48" y="${1120 + index * 52}" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="700" fill="#ffffff">${escapeXml(line)}</text>`,
      )
      .join("");
    const metaY = 1120 + lines.length * 52 + 8;
    const svg = `<svg width="1000" height="1500" xmlns="http://www.w3.org/2000/svg">
      <rect width="1000" height="1500" fill="#fdfaf6"/>
      <rect x="0" y="1050" width="1000" height="450" fill="#d9731f"/>
      ${titleSvg}
      <text x="48" y="${metaY}" font-family="Georgia, 'Times New Roman', serif" font-size="28" fill="#ffffff">${escapeXml(`${difficulty} • ${minutes} min`)}</text>
      <text x="48" y="1440" font-family="Georgia, 'Times New Roman', serif" font-size="24" fill="#ffffff">crochetexplained.com</text>
    </svg>`;
    const base = sharp(Buffer.from(svg));
    if (hero) {
      const photo = await sharp(hero)
        .resize(1000, 1050, { fit: "cover", position: "centre" })
        .jpeg()
        .toBuffer();
      await base
        .composite([{ input: photo, left: 0, top: 0 }])
        .jpeg({ quality: 82 })
        .toFile(path.join(outDir, `${slug}-pin.jpg`));
    } else {
      await base.jpeg({ quality: 82 }).toFile(path.join(outDir, `${slug}-pin.jpg`));
    }
  }

  made += 1;
}

console.log("social cards", made);
