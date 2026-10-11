/**
 * Concept plates for the Halloween wallets, drawn from the written counts.
 * Output replaces the photo-style heroes. Not photographs of made wallets.
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

const font = "Georgia, 'Times New Roman', serif";
const W = 1152;
const H = 864;

function plate(title, drawing) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#fdfaf6"/>
  <text x="64" y="78" font-family="${font}" font-size="34" font-weight="700" fill="#2f2a26">${title}</text>
  <text x="64" y="118" font-family="${font}" font-size="22" fill="#6d635a">Crochet concept illustration. Not a photograph of a made wallet.</text>
  ${drawing}
</svg>`;
}

function cat() {
  const x = 300;
  const y = 250;
  const w = 552;
  const h = 331;
  const flapH = h * (1.8 / 2.4);
  const inset = (w * (16 - 12)) / 16 / 2;
  const step = flapH * (2 / 9);
  const earW = (w * 5) / 16;
  const earGap = (w * 4) / 16;
  const earM = w / 16;
  const earH = w * (0.6 / 4);
  const eyeY = y + flapH * (2 / 9);
  const eyeH = flapH * (2 / 9);
  const eyeW = (w * 2) / 16;
  const e1 = x + (w * 3) / 16;
  const e2 = x + (w * 11) / 16;
  const ears = [x + earM, x + earM + earW + earGap]
    .map(
      (ex) =>
        `<polygon points="${ex},${y} ${ex + earW / 2},${y - earH} ${ex + earW},${y}" fill="#3b3532"/>`,
    )
    .join("");
  return plate(
    "Black cat wallet, closed",
    `${ears}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#3b3532"/>
    <path d="M${x} ${y} H${x + w} V${y + flapH - step} L${x + w - inset} ${y + flapH} H${x + inset} L${x} ${y + flapH - step} Z" fill="#2a2624"/>
    <ellipse cx="${e1 + eyeW / 2}" cy="${eyeY + eyeH / 2}" rx="${eyeW / 2}" ry="${eyeH / 2.2}" fill="#d9a521"/>
    <ellipse cx="${e2 + eyeW / 2}" cy="${eyeY + eyeH / 2}" rx="${eyeW / 2}" ry="${eyeH / 2.2}" fill="#d9a521"/>
    <rect x="${e1 + eyeW / 2 - 3}" y="${eyeY + 6}" width="6" height="${eyeH - 12}" fill="#2f2a26"/>
    <rect x="${e2 + eyeW / 2 - 3}" y="${eyeY + 6}" width="6" height="${eyeH - 12}" fill="#2f2a26"/>
    <polygon points="${x + w / 2},${y + flapH * (6 / 9)} ${x + w / 2 - 16},${y + flapH * (4.2 / 9)} ${x + w / 2 + 16},${y + flapH * (4.2 / 9)}" fill="#e79aa8"/>
    <g stroke="#fbf7ef" stroke-width="3" fill="none">
      <path d="M${x + w * 0.38} ${y + flapH * 0.55} L${x + w * 0.16} ${y + flapH * 0.42}"/>
      <path d="M${x + w * 0.38} ${y + flapH * 0.62} L${x + w * 0.14} ${y + flapH * 0.62}"/>
      <path d="M${x + w * 0.38} ${y + flapH * 0.69} L${x + w * 0.16} ${y + flapH * 0.82}"/>
      <path d="M${x + w * 0.62} ${y + flapH * 0.55} L${x + w * 0.84} ${y + flapH * 0.42}"/>
      <path d="M${x + w * 0.62} ${y + flapH * 0.62} L${x + w * 0.86} ${y + flapH * 0.62}"/>
      <path d="M${x + w * 0.62} ${y + flapH * 0.69} L${x + w * 0.84} ${y + flapH * 0.82}"/>
    </g>
    <text x="64" y="800" font-family="${font}" font-size="20" fill="#6d635a">Flap narrows on the last two rows. Ears sit on the fold. The snap is under the flap.</text>`,
  );
}

function ghost() {
  const x = 366;
  const top = 200;
  const w = 420;
  const body = 430;
  const yAt = (row) => top + body * (1 - row / 22);
  const widths = [
    [18, 17],
    [19, 15],
    [20, 13],
    [21, 11],
    [22, 9],
  ];
  const left = widths
    .map(([row, sts]) => {
      const inset = (w * (17 - sts)) / 17 / 2;
      return `L${x + inset} ${yAt(row)}`;
    })
    .join(" ");
  const right = [...widths]
    .reverse()
    .map(([row, sts]) => {
      const inset = (w * (17 - sts)) / 17 / 2;
      return `L${x + w - inset} ${yAt(row)}`;
    })
    .join(" ");
  const d = `M${x} ${top + body} L${x} ${yAt(18)} ${left} ${right} L${x + w} ${yAt(18)} L${x + w} ${top + body} Z`;
  const scallop = Array.from({ length: 4 }, (_, i) => {
    const cx = x + (w * (i + 0.5)) / 4;
    return `<path d="M${cx - w / 8} ${top + body} Q${cx} ${top + body + 46} ${cx + w / 8} ${top + body}" fill="#fbf7ef" stroke="#c9bfb3" stroke-width="3"/>`;
  }).join("");
  const openY = top + body * (1 - 14 / 22);
  const eyeY = top + body * (1 - 17.5 / 22);
  const mouthY = top + body * (1 - 16 / 22);
  const sx = (st) => x + (w * (st - 0.5)) / 17;
  return plate(
    "Ghost wallet, front",
    `<path d="${d}" fill="#fbf7ef" stroke="#c9bfb3" stroke-width="3"/>
    ${scallop}
    <line x1="${x + 8}" y1="${openY}" x2="${x + w - 8}" y2="${openY}" stroke="#b0604a" stroke-width="4"/>
    <ellipse cx="${sx(6)}" cy="${eyeY}" rx="16" ry="22" fill="#2f2a26"/>
    <ellipse cx="${sx(12)}" cy="${eyeY}" rx="16" ry="22" fill="#2f2a26"/>
    <ellipse cx="${sx(9)}" cy="${mouthY}" rx="8" ry="6" fill="#2f2a26"/>
    <circle cx="${sx(5)}" cy="${mouthY}" r="10" fill="#e79aa8"/>
    <circle cx="${sx(13)}" cy="${mouthY}" r="10" fill="#e79aa8"/>
    <text x="64" y="800" font-family="${font}" font-size="20" fill="#6d635a">Four hem scallops. Face above the opening. Snap is inside, at row 13.</text>`,
  );
}

function pumpkin() {
  const x = 300;
  const y = 300;
  const w = 552;
  const h = 325;
  const ribs = Array.from({ length: 11 }, (_, i) => {
    const rx = x + (w * i) / 11;
    return `<rect x="${rx}" y="${y}" width="${w / 11 - 4}" height="${h}" fill="${i % 2 ? "#c9702a" : "#e08a3c"}"/>`;
  }).join("");
  const tabW = w * (0.75 / 4.25);
  const tabH = h * (1.4 / 2.5);
  return plate(
    "Pumpkin wallet, front",
    `<rect x="${x + w / 2 - 22}" y="${y - 70}" width="44" height="78" rx="14" fill="#5f6d58"/>
    <g>${ribs}</g>
    <rect x="${x}" y="${y}" width="${w}" height="8" fill="#a85a1f"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#a85a1f" stroke-width="3"/>
    <polygon points="${x + w * 0.18},${y + h * 0.46} ${x + w * 0.28},${y + h * 0.24} ${x + w * 0.38},${y + h * 0.46}" fill="#2f2a26"/>
    <polygon points="${x + w * 0.62},${y + h * 0.46} ${x + w * 0.72},${y + h * 0.24} ${x + w * 0.82},${y + h * 0.46}" fill="#2f2a26"/>
    <polygon points="${x + w * 0.5},${y + tabH + 28} ${x + w * 0.43},${y + tabH + 4} ${x + w * 0.57},${y + tabH + 4}" fill="#2f2a26"/>
    <polyline points="${x + w * 0.18},${y + h * 0.82} ${x + w * 0.32},${y + h * 0.7} ${x + w * 0.46},${y + h * 0.82} ${x + w * 0.6},${y + h * 0.7} ${x + w * 0.74},${y + h * 0.82} ${x + w * 0.86},${y + h * 0.7}" fill="none" stroke="#2f2a26" stroke-width="10" stroke-linejoin="round"/>
    <path d="M${x + w / 2 - tabW / 2} ${y} h${tabW} v${tabH * 0.78} l${-tabW / 2} ${tabH * 0.22} l${-tabW / 2} ${-tabH * 0.22} Z" fill="#7d8b72"/>
    <circle cx="${x + w / 2}" cy="${y + tabH * 0.62}" r="9" fill="#6e5289"/>
    <text x="64" y="780" font-family="${font}" font-size="20" fill="#6d635a">Stem stands on the back rim, behind the opening. The leaf tab folds over the front.</text>
    <text x="64" y="812" font-family="${font}" font-size="20" fill="#6d635a">The dot is the snap under the tab tip.</text>`,
  );
}

function witch() {
  const x = 300;
  const y = 280;
  const w = 552;
  const h = 312;
  const flapH = h * (1.8 / 2.4);
  const hatW = w * (1.25 / 4.25);
  const hatH = flapH * (1.2 / 1.8);
  const cx = x + w / 2;
  const brimY = y + hatH * 0.78;
  return plate(
    "Witch hat wallet, closed",
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#8a6aa8"/>
    <path d="M${x} ${y} H${x + w} V${y + flapH} H${x} Z" fill="#6e5289"/>
    <polygon points="${cx},${y + 18} ${cx - hatW / 2},${brimY} ${cx + hatW / 2},${brimY}" fill="#2f2a26"/>
    <rect x="${cx - hatW / 2}" y="${brimY - 10}" width="${hatW}" height="14" fill="#d9731f"/>
    <rect x="${cx - hatW * 0.62}" y="${brimY + 6}" width="${hatW * 1.24}" height="16" fill="#2f2a26"/>
    <rect x="${cx - 28}" y="${brimY + 28}" width="56" height="22" rx="4" fill="#fdfaf6"/>
    <circle cx="${cx}" cy="${brimY + 39}" r="14" fill="#2f2a26"/>
    <text x="64" y="780" font-family="${font}" font-size="20" fill="#6d635a">Hat about 1.25 in wide at the band, brim on row 30. Button shows through the row 31 hole.</text>`,
  );
}

function spider() {
  const x = 300;
  const y = 230;
  const w = 552;
  const h = 338;
  const flap = h * (1.6 / 2.6);
  const point = y + flap;
  const ends = [2, 5, 8, 11, 14].map((st) => x + (w * (st - 0.5)) / 17);
  const spokes = ends
    .map((ex) => `<line x1="${x + w / 2}" y1="${point}" x2="${ex}" y2="${y + 8}" stroke="#fbf7ef" stroke-width="4"/>`)
    .join("");
  const rings = [2 / 8, 4 / 8, 6 / 8]
    .map((t) => {
      const pts = ends
        .map((ex) => {
          const px = x + w / 2 + (ex - (x + w / 2)) * (1 - t);
          const py = point + (y + 8 - point) * (1 - t) + 10;
          return `${px},${py}`;
        })
        .join(" ");
      return `<polyline points="${pts}" fill="none" stroke="#fbf7ef" stroke-width="3"/>`;
    })
    .join("");
  const spiderX = x + w / 2 + (ends[3] - (x + w / 2)) * (1 - 3 / 8);
  const spiderY = point + (y + 8 - point) * (1 - 3 / 8);
  return plate(
    "Spiderweb wallet, closed",
    `<polygon points="${x},${y} ${x + w},${y} ${x + w},${y + h} ${x},${y + h}" fill="#3b3532"/>
    <polygon points="${x},${y} ${x + w},${y} ${x + w / 2},${point}" fill="#2a2624"/>
    ${spokes}
    ${rings}
    <circle cx="${spiderX}" cy="${spiderY}" r="16" fill="#8a5bb8"/>
    <circle cx="${spiderX - 14}" cy="${spiderY - 16}" r="9" fill="#8a5bb8"/>
    <g stroke="#8a5bb8" stroke-width="3" fill="none">
      <path d="M${spiderX - 8} ${spiderY - 8} l-18 -16 l-10 8"/>
      <path d="M${spiderX - 12} ${spiderY} l-22 -4 l-8 10"/>
      <path d="M${spiderX - 10} ${spiderY + 8} l-18 10 l-6 12"/>
      <path d="M${spiderX - 4} ${spiderY + 12} l-8 16 l8 8"/>
      <path d="M${spiderX + 4} ${spiderY - 6} l16 -18 l10 6"/>
      <path d="M${spiderX + 8} ${spiderY + 2} l20 -2 l8 10"/>
      <path d="M${spiderX + 6} ${spiderY + 10} l16 12 l6 10"/>
      <path d="M${spiderX + 2} ${spiderY + 14} l6 16 l10 4"/>
    </g>
    <ellipse cx="${x + w / 2}" cy="${point + 28}" rx="14" ry="22" fill="none" stroke="#fbf7ef" stroke-width="4"/>
    <circle cx="${x + w / 2}" cy="${point + 62}" r="16" fill="#2f2a26"/>
    <text x="64" y="800" font-family="${font}" font-size="20" fill="#6d635a">Five spokes, to stitches 2, 5, 8, 11, and 14. Spider on the stitch-11 spoke. Loop at the point.</text>`,
  );
}

const drawings = {
  "black-cat-crochet-wallet": cat(),
  "ghost-crochet-wallet": ghost(),
  "pumpkin-crochet-wallet": pumpkin(),
  "witch-hat-crochet-wallet": witch(),
  "spiderweb-crochet-wallet": spider(),
};

if (process.env.WALLET_SVG === "1") {
for (const [slug, svg] of Object.entries(drawings)) {
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(path.join(assets, `${slug}-result.jpg`));
  console.log("hero", slug);
}

{
  const order = Object.keys(drawings);
  const labels = ["Black cat", "Ghost", "Pumpkin", "Witch hat", "Spiderweb"];
  const cells = [
    [48, 150],
    [416, 150],
    [784, 150],
    [180, 500],
    [620, 500],
  ];
  const tiles = [];
  for (const [i, slug] of order.entries()) {
    const shot = await sharp(path.join(assets, `${slug}-result.jpg`))
      .extract({ left: 176, top: 145, width: 800, height: 560 })
      .resize(320, 224, { fit: "contain", background: "#fdfaf6" })
      .toBuffer();
    tiles.push({ input: shot, left: cells[i][0], top: cells[i][1] });
  }
  const labelSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#fdfaf6"/>
    <text x="64" y="78" font-family="${font}" font-size="34" font-weight="700" fill="#2f2a26">Five Halloween wallets</text>
    <text x="64" y="118" font-family="${font}" font-size="22" fill="#6d635a">Crochet concept illustration. Not a photograph of a made wallet.</text>
    ${labels
      .map((label, i) => {
        const x = cells[i][0] + 160;
        const y = cells[i][1] + 250;
        return `<text x="${x}" y="${y}" text-anchor="middle" font-family="${font}" font-size="22" fill="#2f2a26">${label}</text>`;
      })
      .join("")}
  </svg>`;
  await sharp(Buffer.from(labelSvg))
    .composite(tiles)
    .jpeg({ quality: 82 })
    .toFile(path.join(assets, "halloween-crochet-wallets-result.jpg"));
  console.log("hero halloween-crochet-wallets");
}
}

const processSets = {
  "black-cat-crochet-wallet": ["cat-wallet-tube", "cat-wallet-face"],
  "ghost-crochet-wallet": ["ghost-wallet-panels", "ghost-wallet-join"],
  "pumpkin-crochet-wallet": ["pumpkin-wallet-sideways", "pumpkin-wallet-stem-tab"],
  "witch-hat-crochet-wallet": ["witch-wallet-zones", "witch-hat-applique"],
  "spiderweb-crochet-wallet": ["spiderweb-wallet-zones", "spiderweb-wallet-web"],
  "halloween-crochet-wallets": ["halloween-wallets-compare", "pumpkin-wallet-stem-tab"],
};

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

const titles = {
  "black-cat-crochet-wallet": "Black cat wallet, step by step",
  "ghost-crochet-wallet": "Ghost wallet, step by step",
  "pumpkin-crochet-wallet": "Pumpkin wallet, step by step",
  "witch-hat-crochet-wallet": "Witch hat wallet, step by step",
  "spiderweb-crochet-wallet": "Spiderweb wallet, step by step",
  "halloween-crochet-wallets": "Five wallets: swatch, then test a card",
};

for (const [slug, files] of Object.entries(processSets)) {
  const lines = wrap(titles[slug], 32);
  const svg = `<svg width="1000" height="1500" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="1500" fill="#fdfaf6"/>
    <rect width="1000" height="250" fill="#b0604a"/>
    ${lines.map((l, i) => `<text x="48" y="${96 + i * 52}" font-family="${font}" font-size="42" font-weight="700" fill="#ffffff">${l}</text>`).join("")}
    <text x="48" y="214" font-family="${font}" font-size="24" fill="#ffffff">Diagrams from the written pattern</text>
    <text x="48" y="1460" font-family="${font}" font-size="22" fill="#6d635a">Crochet concept illustration</text>
  </svg>`;
  const parts = [];
  for (const [i, file] of files.entries()) {
    const buf = await sharp(path.join(diagrams, `${file}.svg`), { density: 200 })
      .resize(900, 560, { fit: "contain", background: "#fdfaf6" })
      .png()
      .toBuffer();
    parts.push({ input: buf, left: 50, top: 270 + i * 580 });
  }
  await sharp(Buffer.from(svg)).composite(parts).jpeg({ quality: 82 }).toFile(path.join(pins, `${slug}-process.jpg`));

  const hero = path.join(assets, `${slug}-result.jpg`);
  const head = slug === "halloween-crochet-wallets" ? "5 free Halloween crochet wallets" : titles[slug].replace(", step by step", ": free pattern");
  const headLines = wrap(head, 24);
  const pin = `<svg width="1000" height="1500" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="1500" fill="#fdfaf6"/>
    <rect y="1050" width="1000" height="450" fill="#d9731f"/>
    ${headLines.map((l, i) => `<text x="48" y="${1140 + i * 52}" font-family="${font}" font-size="42" font-weight="700" fill="#ffffff">${l}</text>`).join("")}
    <text x="48" y="1440" font-family="${font}" font-size="24" fill="#ffffff">crochetexplained.com</text>
  </svg>`;
  const photo = await sharp(hero).resize(1000, 998, { fit: "contain", background: "#fdfaf6" }).jpeg().toBuffer();
  const bar = Buffer.from(`<svg width="1000" height="52" xmlns="http://www.w3.org/2000/svg"><rect width="1000" height="52" fill="#2f2a26" fill-opacity="0.82"/><text x="40" y="34" font-family="${font}" font-size="26" fill="#fdfaf6">Crochet concept illustration</text></svg>`);
  await sharp(Buffer.from(pin))
    .composite([
      { input: photo, left: 0, top: 0 },
      { input: bar, left: 0, top: 998 },
    ])
    .jpeg({ quality: 82 })
    .toFile(path.join(pins, `${slug}-result.jpg`));
  console.log("pins", slug);
}
