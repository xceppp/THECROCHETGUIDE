/**
 * Derives every brand asset the site uses from the two source artworks in
 * src/assets, so the derived files can be rebuilt if the artwork changes.
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * Produces:
 *   src/assets/mark.png        yarn-ball mark, background cut to transparency
 *   src/assets/cover.jpg       hero art, enlarged so wide screens downscale it
 *   public/og-default.jpg      1200x630 social share card
 *   public/favicon-32.png      browser tab
 *   public/icon-512.png        Android / PWA
 *   public/apple-touch-icon.png  iOS, opaque because iOS composites on black
 *
 * sharp comes in with Astro's image service, so this adds no dependency.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const at = (...p) => path.join(root, ...p);

const LOGO = at("src", "assets", "logo.png");
const BANNER = at("src", "assets", "banner.png");
const COVER_SOURCE = at("src", "assets", "cover-source.png");

/**
 * The hero spans the full viewport, but the cover art is only 1024px wide, so
 * a 1080p screen would stretch it and a retina one would stretch it further.
 * Enlarging once here with a good resampling kernel means the browser is
 * downscaling on almost every screen instead of upscaling, and downscaling
 * never looks soft. JPEG rather than PNG because the art is a photographic
 * paper texture — the PNG runs five times larger for no visible difference,
 * and that texture is also what keeps the flat cream from banding.
 */
const COVER_WIDTH = 2560;

/** Flat background the artwork was generated on. */
const CREAM = { r: 253, g: 247, b: 233 };
/** How far from the background a pixel must be before it counts as artwork. */
const INK_THRESHOLD = 40;

const readRaw = async (file) => {
  const { data, info } = await sharp(file)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, ch: info.channels };
};

/**
 * Locates the yarn-ball mark inside the full logo lockup.
 *
 * Rows alone cannot do this: the word "the" sits level with the bottom of the
 * ball, so any purely vertical split drags it along. The mark is terracotta
 * and the wordmark is near-black, so warmth separates them cleanly — a warm
 * pixel has far more red than blue, which is true of the terracotta and false
 * of both the black text and the cream ground.
 */
function findMarkBox({ data, width, height, ch }) {
  const isWarmInk = (x, y) => {
    const i = (y * width + x) * ch;
    if (dist(data, i) <= INK_THRESHOLD) return false;
    return data[i] - data[i + 2] > 40;
  };

  const rowInk = [];
  for (let y = 0; y < height; y++) {
    let count = 0;
    for (let x = 0; x < width; x++) if (isWarmInk(x, y)) count++;
    rowInk.push(count);
  }

  const top = rowInk.findIndex((c) => c > 0);
  if (top === -1) throw new Error("found no terracotta artwork in the logo");

  // "Guide" is terracotta too, so stop at the blank band below the ball.
  // Nothing else in the lockup leaves a gap this deep.
  const GAP = 15;
  let bottom = top;
  let blank = 0;
  for (let y = top; y < height; y++) {
    if (rowInk[y] === 0) {
      if (++blank >= GAP) break;
    } else {
      blank = 0;
      bottom = y;
    }
  }

  let left = width;
  let right = 0;
  for (let y = top; y <= bottom; y++) {
    for (let x = 0; x < width; x++) {
      if (!isWarmInk(x, y)) continue;
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }

  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

const dist = (data, i) =>
  Math.abs(data[i] - CREAM.r) +
  Math.abs(data[i + 1] - CREAM.g) +
  Math.abs(data[i + 2] - CREAM.b);

/**
 * The most common color among solidly inked pixels. Taking the single darkest
 * pixel instead would let one stray dark speck stand in for the whole mark,
 * which throws off every alpha value derived from it.
 */
function dominantInk({ data, width, height, ch }) {
  const buckets = new Map();
  for (let p = 0; p < width * height; p++) {
    const i = p * ch;
    if (dist(data, i) < 150) continue;
    const key =
      ((data[i] >> 4) << 8) | ((data[i + 1] >> 4) << 4) | (data[i + 2] >> 4);
    const seen = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    seen.n++;
    seen.r += data[i];
    seen.g += data[i + 1];
    seen.b += data[i + 2];
    buckets.set(key, seen);
  }

  let best = null;
  for (const seen of buckets.values()) {
    if (!best || seen.n > best.n) best = seen;
  }
  if (!best) throw new Error("no inked pixels found in the mark");

  return {
    r: Math.round(best.r / best.n),
    g: Math.round(best.g / best.n),
    b: Math.round(best.b / best.n),
  };
}

/**
 * Every pixel is a blend of the mark over the flat background, so solving for
 * the blend factor recovers a clean alpha channel with the original
 * antialiasing intact — far better than keying out a color, which leaves a
 * pale fringe on every curved edge. The reference ink only sets the scale for
 * alpha; each pixel's own color is then recovered by undoing the blend, so any
 * shading in the artwork survives.
 */
function cutToAlpha({ data, width, height, ch }, ink) {
  const spread = {
    r: CREAM.r - ink.r,
    g: CREAM.g - ink.g,
    b: CREAM.b - ink.b,
  };

  const out = Buffer.alloc(width * height * 4);
  for (let p = 0; p < width * height; p++) {
    const i = p * ch;
    const alpha = Math.min(
      1,
      Math.max(
        0,
        Math.max(
          Math.abs(spread.r) > 8 ? (CREAM.r - data[i]) / spread.r : 0,
          Math.abs(spread.g) > 8 ? (CREAM.g - data[i + 1]) / spread.g : 0,
          Math.abs(spread.b) > 8 ? (CREAM.b - data[i + 2]) / spread.b : 0,
        ),
      ),
    );

    const o = p * 4;
    // The artwork carries a faint haze over the flat areas. Snapping the ends
    // of the range removes it, so the cutout sits cleanly on any background
    // and the flat regions compress instead of storing noise.
    const a255 = Math.round(alpha * 255);
    out[o + 3] = a255 < 10 ? 0 : a255 > 245 ? 255 : a255;

    // Below roughly a quarter coverage, dividing the blend back out amplifies
    // noise into wild colors. Those pixels are almost invisible once
    // composited, but the noise wrecks PNG compression, so they take the flat
    // reference ink instead.
    if (alpha < 0.25) {
      out[o] = ink.r;
      out[o + 1] = ink.g;
      out[o + 2] = ink.b;
      continue;
    }

    // Undo the blend against the background to get the true pixel color.
    for (let c = 0; c < 3; c++) {
      const bg = [CREAM.r, CREAM.g, CREAM.b][c];
      out[o + c] = Math.min(
        255,
        Math.max(0, Math.round((data[i + c] - (1 - alpha) * bg) / alpha)),
      );
    }
  }

  return out;
}

const logo = await readRaw(LOGO);
const box = findMarkBox(logo);
console.log(
  `mark detected at ${box.width}x${box.height} (offset ${box.left},${box.top}) in ${logo.width}x${logo.height}`,
);

const cropped = await sharp(LOGO)
  .extract({
    left: box.left,
    top: box.top,
    width: box.width,
    height: box.height,
  })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const raw = {
  data: cropped.data,
  width: cropped.info.width,
  height: cropped.info.height,
  ch: cropped.info.channels,
};
const ink = dominantInk(raw);
console.log(
  `mark ink #${[ink.r, ink.g, ink.b].map((v) => v.toString(16).padStart(2, "0")).join("")}`,
);
const out = cutToAlpha(raw, ink);

const markPng = await sharp(out, {
  raw: { width: box.width, height: box.height, channels: 4 },
})
  .png({ palette: true, quality: 92, effort: 10 })
  .toBuffer();

await sharp(markPng).toFile(at("src", "assets", "mark.png"));

// Square canvas so the icons never stretch a non-square mark.
const side = Math.max(box.width, box.height);
const squared = await sharp({
  create: {
    width: side,
    height: side,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([{ input: markPng, gravity: "center" }])
  .png()
  .toBuffer();

for (const [file, size] of [
  ["favicon-32.png", 32],
  ["icon-512.png", 512],
]) {
  await sharp(squared).resize(size, size).png({ palette: true, quality: 92, effort: 10 }).toFile(at("public", file));
}

// iOS ignores transparency and composites on black, so this one keeps the
// cream background and a little breathing room inside the rounded corners.
await sharp({
  create: { width: 180, height: 180, channels: 4, background: CREAM },
})
  .composite([
    { input: await sharp(squared).resize(148, 148).toBuffer(), gravity: "center" },
  ])
  .png()
  .toFile(at("public", "apple-touch-icon.png"));

// Facebook and Pinterest expect roughly 1.91:1. The banner is wider than that,
// so it sits on a cream field rather than being cropped into. JPEG because the
// artwork is photographic — the same image as PNG runs about nine times larger
// for no visible gain, and social crawlers refetch it constantly.
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: CREAM },
})
  .composite([
    { input: await sharp(BANNER).resize(1200).toBuffer(), gravity: "center" },
  ])
  .jpeg({ quality: 86, chromaSubsampling: "4:4:4", mozjpeg: true })
  .toFile(at("public", "og-default.jpg"));

const coverMeta = await sharp(COVER_SOURCE).metadata();
await sharp(COVER_SOURCE)
  .resize({ width: COVER_WIDTH, kernel: "lanczos3" })
  // Enlarging softens the rope's twist very slightly; this puts it back
  // without haloing the edges.
  .sharpen({ sigma: 0.6 })
  .jpeg({ quality: 94, chromaSubsampling: "4:4:4", mozjpeg: true })
  .toFile(at("src", "assets", "cover.jpg"));
console.log(
  `cover enlarged ${coverMeta.width}px -> ${COVER_WIDTH}px so wide screens downscale`,
);

console.log("brand assets written");
