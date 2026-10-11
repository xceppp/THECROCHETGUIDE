/**
 * Concept plates for the Halloween black-cat AirPods case, drawn from the
 * written counts. These are illustrations, not photographs of a made case.
 * Output:
 *   src/assets/articles/halloween-crochet-airpods-case-result.jpg  (hero)
 *   src/assets/articles/halloween-crochet-airpods-case-1.jpg       (removable view)
 *   public/pins/halloween-crochet-airpods-case-result.jpg          (result pin)
 *   public/pins/halloween-crochet-airpods-case-process.jpg         (process pin)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.join(root, "src/assets/articles");
const pins = path.join(root, "public/pins");
const diagrams = path.join(root, "public/diagrams");
await mkdir(pins, { recursive: true });
await mkdir(assets, { recursive: true });

const font = "Georgia, 'Times New Roman', serif";
const W = 1152;
const H = 864;
const SLUG = "halloween-crochet-airpods-case";

// palette, matching the site tokens
const BG = "#fdfaf6";
const INK = "#2f2a26";
const SOFT = "#6d635a";
const BLACK = "#36302c";
const BLACK_DEEP = "#262120";
const ORANGE = "#d9731f";
const PUMPKIN = "#e08a3c";
const STEM = "#5f6d58";
const AMBER = "#e0a92e";
const WHISKER = "#f3ede3";

function plate(title, drawing, note = "Not a photograph of a made case.") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <text x="64" y="78" font-family="${font}" font-size="34" font-weight="700" fill="${INK}">${title}</text>
  <text x="64" y="118" font-family="${font}" font-size="22" fill="${SOFT}">Crochet concept illustration. ${note}</text>
  ${drawing}
</svg>`;
}

// A small pumpkin accent used in the corner.
function pumpkin(cx, cy, r) {
  const ribs = [-0.62, -0.3, 0, 0.3, 0.62]
    .map(
      (f, i) =>
        `<ellipse cx="${cx + f * r}" cy="${cy}" rx="${r * (0.34 - Math.abs(f) * 0.12)}" ry="${r * 0.92}" fill="${i % 2 ? PUMPKIN : ORANGE}"/>`,
    )
    .join("");
  return `<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.02}" ry="${r * 0.94}" fill="${ORANGE}"/>${ribs}<rect x="${cx - 5}" y="${cy - r * 1.12}" width="10" height="${r * 0.3}" rx="3" fill="${STEM}"/>`;
}

// The finished cat face, front.
function catFront() {
  const x = 300;
  const y = 262;
  const w = 552;
  const h = 408; // 552/408 ~ 1.35, the 60.6 x 45.2 landscape ratio
  const earW = 150;
  const earH = 120;
  const lEarX = x + 26;
  const rEarX = x + w - 26 - earW;
  const ear = (ex) =>
    `<polygon points="${ex},${y + 40} ${ex + earW / 2},${y - earH + 40} ${ex + earW},${y + 40}" fill="${BLACK}"/>` +
    `<polygon points="${ex + earW * 0.3},${y + 34} ${ex + earW / 2},${y - earH * 0.52 + 40} ${ex + earW * 0.7},${y + 34}" fill="${ORANGE}" opacity="0.85"/>`;
  // flap band across the top third (folds over from the back)
  const flapY = y + 34;
  const flapH = 96;
  const cx = x + w / 2;
  const eyeY = y + h * 0.5;
  const noseY = y + h * 0.63;
  return plate(
    "Black cat AirPods case, front",
    `${ear(lEarX)}${ear(rEarX)}
    <rect x="${x}" y="${y + 20}" width="${w}" height="${h}" rx="40" fill="${BLACK}"/>
    <rect x="${x}" y="${flapY}" width="${w}" height="${flapH}" rx="30" fill="${BLACK_DEEP}"/>
    <line x1="${x + 18}" y1="${flapY + flapH}" x2="${x + w - 18}" y2="${flapY + flapH}" stroke="#1d1a18" stroke-width="3"/>
    <circle cx="${cx}" cy="${flapY + flapH - 2}" r="11" fill="${ORANGE}"/>
    <path d="M${cx - 34} ${y - earH * 0.1 + 20} q34 -44 68 0" fill="none" stroke="${BLACK}" stroke-width="16" stroke-linecap="round"/>
    <ellipse cx="${cx - 96}" cy="${eyeY}" rx="40" ry="52" fill="${AMBER}"/>
    <ellipse cx="${cx + 96}" cy="${eyeY}" rx="40" ry="52" fill="${AMBER}"/>
    <rect x="${cx - 96 - 6}" y="${eyeY - 40}" width="12" height="80" rx="6" fill="${INK}"/>
    <rect x="${cx + 96 - 6}" y="${eyeY - 40}" width="12" height="80" rx="6" fill="${INK}"/>
    <polygon points="${cx},${noseY + 26} ${cx - 22},${noseY} ${cx + 22},${noseY}" fill="${ORANGE}"/>
    <path d="M${cx} ${noseY + 26} q-26 30 -58 10 M${cx} ${noseY + 26} q26 30 58 10" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <g stroke="${WHISKER}" stroke-width="4" stroke-linecap="round">
      <path d="M${cx - 60} ${noseY + 6} L${x + 40} ${noseY - 20}"/>
      <path d="M${cx - 60} ${noseY + 20} L${x + 32} ${noseY + 22}"/>
      <path d="M${cx - 60} ${noseY + 34} L${x + 44} ${noseY + 60}"/>
      <path d="M${cx + 60} ${noseY + 6} L${x + w - 40} ${noseY - 20}"/>
      <path d="M${cx + 60} ${noseY + 20} L${x + w - 32} ${noseY + 22}"/>
      <path d="M${cx + 60} ${noseY + 34} L${x + w - 44} ${noseY + 60}"/>
    </g>
    ${pumpkin(x + w - 86, y + h - 40, 42)}
    <text x="64" y="800" font-family="${font}" font-size="20" fill="${SOFT}">Ears on the top corners, embroidered face, a small pumpkin by the hem.</text>
    <text x="64" y="830" font-family="${font}" font-size="20" fill="${SOFT}">The flap folds over the lid to carry and unbuttons to open.</text>`,
  );
}

// The sleeve with the case sliding out, showing the port and removability.
function removable() {
  const x = 288;
  const y = 300;
  const w = 430;
  const h = 360;
  const cx = x + w / 2;
  // the sleeve, tilted open at the top; a plain case lifting out
  const caseW = 300;
  const caseX = cx - caseW / 2;
  const caseTop = y - 120;
  return plate(
    "Slide the case out to charge",
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="36" fill="${BLACK}"/>
    <rect x="${x}" y="${y}" width="${w}" height="70" rx="30" fill="${BLACK_DEEP}"/>
    <ellipse cx="${cx}" cy="${y}" rx="${w / 2 - 10}" ry="26" fill="${BLACK_DEEP}"/>
    <ellipse cx="${cx}" cy="${y}" rx="${w / 2 - 34}" ry="16" fill="#171513"/>
    <rect x="${caseX}" y="${caseTop}" width="${caseW}" height="200" rx="40" fill="#efe9df" stroke="#cfc6ba" stroke-width="3"/>
    <line x1="${caseX + 14}" y1="${caseTop + 70}" x2="${caseX + caseW - 14}" y2="${caseTop + 70}" stroke="#cfc6ba" stroke-width="3"/>
    <circle cx="${cx}" cy="${caseTop + 150}" r="8" fill="#b9b0a4"/>
    <ellipse cx="${cx}" cy="${y + h}" rx="${w / 2 - 20}" ry="22" fill="${BLACK_DEEP}"/>
    <circle cx="${cx}" cy="${y + h - 4}" r="14" fill="${ORANGE}"/>
    <path d="M${x + w - 6} ${y + 40} q58 10 58 70 q0 46 -40 54" fill="none" stroke="${BLACK}" stroke-width="18" stroke-linecap="round"/>
    <text x="64" y="786" font-family="${font}" font-size="20" fill="${SOFT}">The open top lets the case lift straight out. The base hides the port,</text>
    <text x="64" y="816" font-family="${font}" font-size="20" fill="${SOFT}">so take the case out to charge. The loop at the side clips to a bag.</text>`,
  );
}

const heroes = {
  [`${SLUG}-result`]: catFront(),
  [`${SLUG}-1`]: removable(),
};

for (const [name, svg] of Object.entries(heroes)) {
  await sharp(Buffer.from(svg)).jpeg({ quality: 84 }).toFile(path.join(assets, `${name}.jpg`));
  console.log("hero", name);
}

function wrap(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

// Result pin: the finished cat case with a disclosure bar.
{
  const head = wrap("Halloween crochet AirPods case: black cat", 24);
  const pin = `<svg width="1000" height="1500" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="1500" fill="${BG}"/>
    <rect y="1050" width="1000" height="450" fill="${ORANGE}"/>
    ${head.map((l, i) => `<text x="48" y="${1140 + i * 52}" font-family="${font}" font-size="42" font-weight="700" fill="#ffffff">${l}</text>`).join("")}
    <text x="48" y="1440" font-family="${font}" font-size="24" fill="#ffffff">crochetexplained.com</text>
  </svg>`;
  const photo = await sharp(path.join(assets, `${SLUG}-result.jpg`))
    .resize(1000, 998, { fit: "contain", background: BG })
    .jpeg()
    .toBuffer();
  const bar = Buffer.from(
    `<svg width="1000" height="52" xmlns="http://www.w3.org/2000/svg"><rect width="1000" height="52" fill="${INK}" fill-opacity="0.82"/><text x="40" y="34" font-family="${font}" font-size="26" fill="${BG}">Crochet concept illustration</text></svg>`,
  );
  await sharp(Buffer.from(pin))
    .composite([
      { input: photo, left: 0, top: 0 },
      { input: bar, left: 0, top: 998 },
    ])
    .jpeg({ quality: 84 })
    .toFile(path.join(pins, `${SLUG}-result.jpg`));
  console.log("pin result");
}

// Process pin: two diagrams from the written pattern.
{
  const files = ["airpods-base-oval", "airpods-assembly"];
  const lines = wrap("Black cat AirPods case, step by step", 32);
  const svg = `<svg width="1000" height="1500" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="1500" fill="${BG}"/>
    <rect width="1000" height="250" fill="${ORANGE}"/>
    ${lines.map((l, i) => `<text x="48" y="${96 + i * 52}" font-family="${font}" font-size="42" font-weight="700" fill="#ffffff">${l}</text>`).join("")}
    <text x="48" y="214" font-family="${font}" font-size="24" fill="#ffffff">Diagrams from the written pattern</text>
    <text x="48" y="1462" font-family="${font}" font-size="22" fill="${SOFT}">Crochet concept illustration &#183; crochetexplained.com</text>
  </svg>`;
  const parts = [];
  for (const [i, file] of files.entries()) {
    const buf = await sharp(path.join(diagrams, `${file}.svg`), { density: 200 })
      .resize(900, 560, { fit: "contain", background: BG })
      .png()
      .toBuffer();
    parts.push({ input: buf, left: 50, top: 290 + i * 580 });
  }
  await sharp(Buffer.from(svg)).composite(parts).jpeg({ quality: 84 }).toFile(path.join(pins, `${SLUG}-process.jpg`));
  console.log("pin process");
}

console.log("done");
