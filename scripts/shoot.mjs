// Quick screenshots via headless Chrome. Desktop pages render directly;
// mobile widths render inside an iframe wrapper because headless Chrome
// clamps the window to about 500px wide.
//   node scripts/shoot.mjs <chrome> <outDir>
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";

const chrome = process.argv[2];
const outDir = process.argv[3] || process.env.TEMP + "/ce-shots";
mkdirSync(outDir, { recursive: true });
const base = "http://localhost:4330";

const shots = [
  { name: "home-desktop", url: `${base}/`, w: 1280, h: 1400 },
  { name: "wallet-desktop", url: `${base}/black-cat-crochet-wallet/`, w: 1280, h: 1600 },
  { name: "author-desktop", url: `${base}/author/amine/`, w: 1280, h: 1200 },
  { name: "gnome-desktop", url: `${base}/how-to-crochet-a-gnome/`, w: 1280, h: 1600 },
];
const mobiles = [
  { name: "home-390", url: `${base}/`, w: 390, h: 1500 },
  { name: "wallet-390", url: `${base}/black-cat-crochet-wallet/`, w: 390, h: 1700 },
];

const shoot = (url, w, h, out) =>
  execFileSync(chrome, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    `--window-size=${w},${h}`, `--screenshot=${out}`, url,
  ], { stdio: "ignore", timeout: 60000 });

for (const s of shots) {
  shoot(s.url, s.w, s.h, `${outDir}/${s.name}.png`);
  console.log(`${s.name}.png`);
}
for (const m of mobiles) {
  const wrap = `${outDir}/${m.name}.html`;
  writeFileSync(wrap,
    `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0}iframe{width:${m.w}px;height:${m.h}px;border:0}</style></head>` +
    `<body><iframe src="${m.url}"></iframe></body></html>`);
  shoot(`file:///${wrap.replace(/\\/g, "/")}`, m.w + 20, m.h + 20, `${outDir}/${m.name}.png`);
  console.log(`${m.name}.png`);
}
console.log(`\nout: ${outDir}`);
