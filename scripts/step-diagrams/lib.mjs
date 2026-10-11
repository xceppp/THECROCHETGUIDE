// Primitives for step-by-step crochet diagrams.
//
// Every diagram is drawn on a 480-unit-wide canvas with text no smaller than
// 20 units, so on a 320px phone (about 288px of image) the smallest label
// still renders near 12px. Diagrams are generated from the article's own
// counts, and the round helpers throw when a round's stitches do not add up,
// so a drawing can never disagree with the arithmetic it illustrates.

export const W = 480;
const C = {
  paper: "#fdfaf6",
  deep: "#f6efe6",
  ink: "#2f2a26",
  soft: "#6d635a",
  faint: "#9a9088",
  terra: "#b0604a",
  terraDeep: "#8f4a37",
  sage: "#7d8b72",
  rule: "#e6ddd1",
  yarn: "#6b4428",
  cell: "#fbf7ef",
  grid: "#c9bfb3",
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Rough Georgia wrap: about 0.5em per character. */
export function wrap(text, size, width) {
  const max = Math.max(8, Math.floor(width / (size * 0.5)));
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else line = (line + " " + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}

/** Joins parts into sentences, each ending in exactly one period. */
function sentence(...parts) {
  return parts
    .filter(Boolean)
    .map((p) => p.trim().replace(/[.\s]+$/, "") + ".")
    .join(" ");
}

export function text(x, y, str, { size = 22, fill = C.ink, anchor = "start", weight = "normal", width = W - 2 * x } = {}) {
  const lines = wrap(str, size, weight === "bold" ? width * 0.88 : width * 0.96);
  const out = lines
    .map(
      (l, i) =>
        `<text x="${x}" y="${y + i * size * 1.25}" font-size="${size}" fill="${fill}" text-anchor="${anchor}"${weight !== "normal" ? ` font-weight="${weight}"` : ""}>${esc(l)}</text>`,
    )
    .join("\n");
  return { svg: out, height: lines.length * size * 1.25 };
}

export function frame(title, desc, body, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${Math.ceil(height)}" role="img">
<title>${esc(title)}</title>
<desc>${esc(desc)}</desc>
<rect width="${W}" height="${Math.ceil(height)}" fill="${C.paper}"/>
<style>text{font-family:Georgia,"Times New Roman",serif}</style>
<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.terra}"/></marker></defs>
${body}
</svg>
`;
}

/** Step badge + heading at the top of a diagram. Returns svg and next y. */
function heading(step, title, y = 16) {
  const badge = step
    ? `<circle cx="36" cy="${y + 20}" r="20" fill="${C.terra}"/><text x="36" y="${y + 28}" font-size="22" fill="#fff" text-anchor="middle" font-weight="bold">${esc(step)}</text>`
    : "";
  const t = text(step ? 66 : 20, y + 28, title, { size: 24, weight: "bold", width: W - (step ? 86 : 40) });
  return { svg: badge + t.svg, y: y + Math.max(44, t.height + 12) };
}

const chainLink = (x, y, w = 26, h = 14, stroke = C.yarn, extra = "") =>
  `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${h / 2}" fill="none" stroke="${stroke}" stroke-width="4"${extra}/>`;

/** US symbol for single crochet: an X. hdc: T. dc: T with a slash. */
function symbol(kind, x, y, s, color) {
  const h = s / 2;
  if (kind === "sc")
    return `<path d="M${x - h} ${y - h}L${x + h} ${y + h}M${x + h} ${y - h}L${x - h} ${y + h}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
  if (kind === "hdc")
    return `<path d="M${x - h} ${y - h}H${x + h}M${x} ${y - h}V${y + h}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
  if (kind === "dc")
    return `<path d="M${x - h} ${y - h}H${x + h}M${x} ${y - h}V${y + h}M${x - h / 2} ${y - h / 6}L${x + h / 2} ${y + h / 6}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
  if (kind === "slst") return `<circle cx="${x}" cy="${y}" r="${s / 5}" fill="${color}"/>`;
  return `<circle cx="${x}" cy="${y}" r="${s / 4}" fill="${color}"/>`;
}

/** Positions for n items across width, compressing the middle beyond max. */
function spread(n, x0, x1, max = 16) {
  if (n <= max) {
    const step = (x1 - x0) / n;
    return { pos: Array.from({ length: n }, (_, i) => x0 + step * (i + 0.5)), gap: null, step };
  }
  const head = Math.ceil((max - 2) / 2);
  const tail = max - 2 - head;
  const step = (x1 - x0) / max;
  const pos = [];
  for (let i = 0; i < head; i++) pos.push({ i, x: x0 + step * (i + 0.5) });
  for (let j = 0; j < tail; j++) pos.push({ i: n - tail + j, x: x0 + step * (head + 2 + j + 0.5) });
  return { pos, gap: { x: x0 + step * (head + 1), from: head, to: n - tail - 1 }, step };
}

/**
 * Foundation chain and first row.
 * n: chains; skip: chains from the hook left unworked (1 for sc in 2nd ch);
 * stitch: sc | hdc | dc; skipLabel: what the skipped chains are.
 */
export function chainStart({ step, title, n, skip = 1, stitch = "sc", skipLabel, firstLabel, rowLabel, note, desc }) {
  const count = n - skip;
  const h = heading(step, title);
  let body = h.svg;
  let y = h.y + 56;

  // Chain: slip knot at left, hook at right. Chain index 1 is next to the hook.
  const x0 = 40;
  const x1 = 400;
  const sp = spread(n, x0, x1, 14);
  const pos = Array.isArray(sp.pos) && typeof sp.pos[0] === "number" ? sp.pos.map((x, i) => ({ i, x })) : sp.pos;
  // pos[i].i is 0-based from the slip-knot end; chain number from hook = n - i.
  const fromHook = (p) => n - p.i;
  body += `<circle cx="${x0 - 14}" cy="${y}" r="8" fill="${C.yarn}"/>`;
  body += text(x0 - 22, y + 36, "slip knot", { size: 20, fill: C.soft }).svg;
  for (const p of pos) {
    const k = fromHook(p);
    let stroke = C.yarn;
    let extra = "";
    if (k <= skip) {
      stroke = C.sage;
      extra = ` stroke-dasharray="5 3"`;
    } else if (k === skip + 1) stroke = C.terra;
    body += chainLink(p.x, y, sp.step * 0.9, 16, stroke, extra);
  }
  if (sp.gap) body += `<text x="${sp.gap.x}" y="${y + 7}" font-size="22" fill="${C.soft}" text-anchor="middle">…</text>`;
  // Hook.
  body += `<path d="M412 ${y} H462 q10 0 10 -10" fill="none" stroke="${C.terra}" stroke-width="5" stroke-linecap="round"/>`;
  body += text(470, y + 36, "hook", { size: 20, fill: C.soft, anchor: "end" }).svg;
  body += text(240, y - 24, `ch ${n}${sp.gap ? ` (${n - pos.length} not drawn)` : ""}`, { size: 20, fill: C.ink, anchor: "middle", width: 440 }).svg;

  // Callouts.
  const first = pos.find((p) => fromHook(p) === skip + 1);
  const skipped = pos.filter((p) => fromHook(p) <= skip);
  y += 60;
  if (first) {
    body += `<path d="M${first.x} ${y + 4} V${y - 46}" stroke="${C.terra}" stroke-width="3" marker-end="url(#ah)"/>`;
    const t = text(20, y + 30, firstLabel ?? `First ${stitch} goes in the ${ordinal(skip + 1)} chain from the hook.`, { size: 22, fill: C.terraDeep });
    body += t.svg;
    y += t.height + 14;
  }
  if (skipped.length) {
    const t = text(20, y + 22, skipLabel ?? `The ${skip === 1 ? "skipped chain" : `${skip} skipped chains`} next to the hook ${skip === 1 ? "is" : "are"} the turning chain, not a stitch.`, { size: 20, fill: C.sage });
    body += t.svg;
    y += t.height + 18;
  }

  // Row 1 as stitch symbols, worked right to left.
  y += 22;
  const rsp = spread(count, x0, x1, 14);
  const rpos = typeof rsp.pos[0] === "number" ? rsp.pos.map((x, i) => ({ i, x })) : rsp.pos;
  for (const p of rpos) body += symbol(stitch, p.x, y, Math.min(18, rsp.step * 0.7), C.ink);
  if (rsp.gap) body += `<text x="${rsp.gap.x}" y="${y + 7}" font-size="22" fill="${C.soft}" text-anchor="middle">…</text>`;
  body += `<path d="M${x1} ${y + 26} H${x0 + 10}" stroke="${C.terra}" stroke-width="3" marker-end="url(#ah)"/>`;
  y += 56;
  const r = text(20, y, rowLabel ?? `Row 1: ${count} ${stitch}, worked back toward the slip knot.`, { size: 22, weight: "bold" });
  body += r.svg;
  y += r.height;
  if (note) {
    const t = text(20, y + 8, note, { size: 20, fill: C.soft });
    body += t.svg;
    y += t.height + 8;
  }
  return frame(
    title,
    desc ?? sentence(`A foundation chain of ${n}. The ${skip === 1 ? "chain" : `${skip} chains`} nearest the hook ${skip === 1 ? "is" : "are"} skipped and the first ${stitch} goes into the ${ordinal(skip + 1)} chain from the hook, so row 1 has ${count} ${stitch}`, note),
    body,
    y + 20,
  );
}

export function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Rows of a flat piece, drawn as they lie with the first row at the bottom.
 * rows: row numbers or "…" for skipped rows, bottom first. current: the row
 * number to highlight. Right-handed fixed view: odd rows run right to left,
 * even rows left to right, and the turning chain sits where the row starts.
 */
export function rowGrid({ step, title, cols, rows, current, stitch = "sc", turn = "ch 1, not a st", note, desc, countLabel }) {
  const h = heading(step, title);
  let body = h.svg;
  const x0 = 116;
  const x1 = 420;
  const rowH = 34;
  const sp = spread(cols, x0, x1, 14);
  const pos = typeof sp.pos[0] === "number" ? sp.pos.map((x, i) => ({ i, x })) : sp.pos;
  const top = h.y + 34;
  const drawn = [...rows].reverse();
  let cy = top;
  drawn.forEach((n, k) => {
    const ry = top + k * rowH + rowH / 2;
    if (n === "…") {
      body += `<text x="${(x0 + x1) / 2}" y="${ry + 7}" font-size="22" fill="${C.soft}" text-anchor="middle">⋮</text>`;
      return;
    }
    const isCur = n === current;
    const done = n < current;
    if (isCur) {
      cy = ry;
      body += `<rect x="${x0 - 6}" y="${ry - rowH / 2 + 2}" width="${x1 - x0 + 12}" height="${rowH - 4}" rx="6" fill="#f3dfd6" stroke="${C.terra}" stroke-width="2"/>`;
    }
    for (const p of pos)
      body += symbol(stitch, p.x, ry, Math.min(16, sp.step * 0.6), isCur ? C.terraDeep : done ? C.ink : C.faint);
    if (sp.gap) body += `<text x="${sp.gap.x}" y="${ry + 7}" font-size="20" fill="${C.soft}" text-anchor="middle">…</text>`;
    body += `<text x="20" y="${ry + 7}" font-size="20" fill="${isCur ? C.terraDeep : C.soft}">R${n}</text>`;
  });
  const rtl = current % 2 === 1;
  // Turning chain at the start of the current row, arrow along it.
  body += `<ellipse cx="${rtl ? x1 + 22 : x0 - 24}" cy="${cy}" rx="7" ry="11" fill="none" stroke="${C.sage}" stroke-width="3"/>`;
  let y = top + rows.length * rowH + 6;
  body += `<path d="M${rtl ? x1 - 4 : x0 + 4} ${y} H${rtl ? x0 + 20 : x1 - 20}" stroke="${C.terra}" stroke-width="3" marker-end="url(#ah)"/>`;
  body += `<text x="${(x0 + x1) / 2}" y="${y + 28}" font-size="20" fill="${C.terraDeep}" text-anchor="middle">Row ${current} runs this way</text>`;
  y += 50;
  const legend = text(20, y + 10, `Green loop at the start of the row: ${turn}.`, { size: 20, fill: C.sage });
  body += legend.svg;
  y += legend.height + 10;
  const c = text(20, y + 14, countLabel ?? `Every row: ${cols} ${stitch}.`, { size: 22, weight: "bold" });
  body += c.svg;
  y += c.height + 10;
  if (note) {
    const t = text(20, y + 10, note, { size: 20, fill: C.soft });
    body += t.svg;
    y += t.height + 6;
  }
  return frame(title, desc ?? sentence(`${title}. Rows of ${cols} ${stitch} drawn one symbol per stitch and worked back and forth, each starting with a turning chain (${turn}). Row ${current} is highlighted`, countLabel, note), body, y + 22);
}

/** Parse "sc,inc" style repeats into stitches. */
// "ch" is a chain space: drawn, but neither made into a stitch nor worked into.
const MAKES = { sc: 1, hdc: 1, dc: 1, slst: 1, inc: 2, "3sc": 3, dec: 1, invdec: 1, sc2tog: 1, skip: 0, ch: 0 };
const USES = { sc: 1, hdc: 1, dc: 1, slst: 1, inc: 1, "3sc": 1, dec: 2, invdec: 2, sc2tog: 2, skip: 1, ch: 0 };

export function expand(seq, times) {
  const parts = seq.split(",").map((s) => s.trim());
  const out = [];
  for (let t = 0; t < times; t++) for (const p of parts) {
    const m = p.match(/^(\d+)\s*(\w+)$/);
    const n = m ? Number(m[1]) : 1;
    const kind = m ? m[2] : p;
    if (!(kind in MAKES)) throw new Error(`Unknown stitch ${kind}`);
    for (let i = 0; i < n; i++) out.push(kind);
  }
  return out;
}

/**
 * Standard flat base: 6 in a ring, then 6 increases a round. incFirst writes
 * the repeat as the article does, "(2 sc in next, sc n)" vs "(sc n, 2 sc in next)".
 */
export function sixInc(last, { incFirst = false, word = "Round" } = {}) {
  const out = [
    { label: `${word} 1`, seq: "sc", times: 6, count: 6, ring: true, text: "6 sc in a magic ring" },
    { label: `${word} 2`, seq: "inc", times: 6, count: 12, text: "2 sc in each st" },
  ];
  for (let k = 3; k <= last; k++) {
    const n = k - 2;
    out.push({
      label: `${word} ${k}`,
      seq: incFirst ? `inc,${n}sc` : `${n}sc,inc`,
      times: 6,
      count: 6 * k,
      text: incFirst ? `(2 sc in next, sc${n > 1 ? " " + n : " in next"}) 6 times` : `(sc${n > 1 ? " " + n : ""}, 2 sc in next) 6 times`,
    });
  }
  return out;
}

/** Check a round: returns {makes, uses}. Throws when count or previous disagree. */
export function checkRound(r, prev) {
  const sts = expand(r.seq, r.times);
  const makes = sts.reduce((a, k) => a + MAKES[k], 0);
  const uses = sts.reduce((a, k) => a + USES[k], 0);
  if (makes !== r.count) throw new Error(`${r.label}: makes ${makes}, stated ${r.count}`);
  if (!r.ring && prev != null && uses !== prev) throw new Error(`${r.label}: uses ${uses}, previous round has ${prev}`);
  return { sts, makes, uses };
}

/**
 * Concentric rounds with the current round drawn stitch by stitch.
 * rounds: [{label, seq, times, count, ring?}]; current: index.
 */
export function roundChart({ step, title, rounds, current, note, desc }) {
  let prev = null;
  const checked = rounds.map((r) => {
    const c = checkRound(r, prev);
    prev = r.count;
    return c;
  });
  const h = heading(step, title);
  let body = h.svg;
  const cx = 240;
  const cy = h.y + 150;
  const rMax = 130;
  const ringGap = rMax / rounds.length;
  rounds.forEach((r, i) => {
    const rad = ringGap * (i + 0.75);
    const isCur = i === current;
    body += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${isCur ? C.terra : i < current ? C.grid : C.rule}" stroke-width="${isCur ? 2 : 1.5}" ${i > current ? 'stroke-dasharray="4 4"' : ""}/>`;
  });
  // Draw current round stitches.
  const cur = rounds[current];
  const sts = checked[current].sts;
  const rad = ringGap * (current + 0.75);
  const made = [];
  sts.forEach((k) => {
    if (k === "ch") made.push(k);
    for (let m = 0; m < MAKES[k]; m++) made.push(k);
  });
  const n = made.length;
  made.forEach((k, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    const x = cx + rad * Math.cos(a);
    const y = cy + rad * Math.sin(a);
    const r = n > 48 ? 3.5 : 5;
    if (k === "ch") {
      body += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${C.paper}" stroke="${C.sage}" stroke-width="2"/>`;
      return;
    }
    const color = k === "inc" || k === "3sc" ? C.terra : k === "dec" || k === "invdec" || k === "sc2tog" ? C.sage : C.ink;
    body += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}"/>`;
  });
  body += `<text x="${cx}" y="${cy + 9}" font-size="26" fill="${C.ink}" text-anchor="middle" font-weight="bold">${cur.count}</text>`;
  let y = cy + rMax + 34;
  const has = (set) => sts.some((k) => set.includes(k));
  const legend = [
    has(["inc", "3sc"]) ? "terracotta dots: the 2 stitches made by each increase" : "",
    has(["dec", "invdec", "sc2tog"]) ? "green dots: decreases, 2 stitches worked as 1" : "",
    has(["ch"]) ? "open circles: chain spaces over skipped stitches" : "",
  ]
    .filter(Boolean)
    .join("; ");
  const tail = cur.text && new RegExp(`\\b${cur.count} (sc|dc|hdc)\\b`).test(cur.text) ? "" : ` (${cur.count})`;
  const instr = text(20, y, `${cur.label}: ${cur.text ?? ""}${tail}`, { size: 22, weight: "bold" });
  body += instr.svg;
  y += instr.height + 4;
  if (legend) {
    const t = text(20, y + 6, legend.charAt(0).toUpperCase() + legend.slice(1) + ".", { size: 20, fill: C.soft });
    body += t.svg;
    y += t.height + 4;
  }
  if (note) {
    const t = text(20, y + 8, note, { size: 20, fill: C.soft });
    body += t.svg;
    y += t.height + 4;
  }
  return frame(title, desc ?? sentence(`${title}, drawn as rings from the center out. ${rounds.map((r) => `${r.label}: ${r.text}, ${r.count} stitches`).join(". ")}`, note), body, y + 22);
}

/**
 * Stitch-count profile: one bar per round (or run of equal rounds), centered,
 * so the bars trace the silhouette of the piece.
 */
export function profile({ step, title, rounds, highlight = [], note, desc, unit = "sts" }) {
  // Group consecutive equal counts.
  const groups = [];
  for (const r of rounds) {
    const last = groups.at(-1);
    if (last && last.count === r.count && !r.break && !r.shown && !last.shown) last.to = r.n;
    else groups.push({ from: r.n, to: r.n, count: r.count, tag: r.tag, shown: r.shown });
  }
  const h = heading(step, title);
  let body = h.svg;
  let y = h.y + 8;
  const max = Math.max(...groups.map((g) => g.count));
  const barH = 30;
  const x0 = 150;
  const span = 300;
  for (const g of groups) {
    const w = Math.max(6, (g.count / max) * span);
    const lab = g.from === g.to ? `R${g.from}` : `R${g.from}–${g.to}`;
    const hot = highlight.some((n) => n >= g.from && n <= g.to);
    body += `<rect x="${x0 + (span - w) / 2}" y="${y + 3}" width="${w}" height="${barH - 6}" rx="4" fill="${hot ? C.terra : C.deep}" stroke="${hot ? C.terraDeep : C.grid}"/>`;
    body += `<text x="20" y="${y + 23}" font-size="20" fill="${C.soft}">${lab}</text>`;
    body += `<text x="${x0 - 10}" y="${y + 23}" font-size="20" fill="${C.ink}" text-anchor="end">${esc(g.shown ?? g.count)}</text>`;
    y += barH;
  }
  y += 14;
  if (note) {
    const t = text(20, y + 10, note, { size: 20, fill: C.soft });
    body += t.svg;
    y += t.height + 6;
  }
  return frame(title, desc ?? sentence(`${title}, as bars sized by stitch count. ${groups.map((g) => `${g.from === g.to ? `Round ${g.from}` : `Rounds ${g.from} to ${g.to}`}: ${g.shown ?? g.count}`).join(", ")}`, note), body, y + 20);
}

/**
 * Fold a flat rectangle and seam it. Top: the flat piece with the fold line.
 * Bottom: the folded pouch with seams and the opening.
 */
export function foldSeam({ step, title, wIn, hIn, foldAt = 0.5, flapIn = 0, widthLabel, heightLabel, foldLabel = "fold", seamLabel = "seam both sides", openLabel = "open", note, desc }) {
  const h = heading(step, title);
  let body = h.svg;
  let y = h.y + 20;
  // Flat piece on the left, folded piece on the right, both to true scale.
  const maxH = 300;
  const maxW = 130;
  const s = Math.min(maxH / hIn, maxW / wIn);
  const fw = wIn * s;
  const fh = hIn * s;
  const fx = 100 + (maxW - fw) / 2;
  const fy = y;
  body += `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="${C.deep}" stroke="${C.yarn}" stroke-width="3"/>`;
  const foldY = fy + fh * (1 - foldAt);
  body += `<line x1="${fx - 10}" y1="${foldY}" x2="${fx + fw + 10}" y2="${foldY}" stroke="${C.terra}" stroke-width="3" stroke-dasharray="9 6"/>`;
  body += `<text x="${fx + fw + 14}" y="${foldY + 7}" font-size="20" fill="${C.terraDeep}">${esc(foldLabel)}</text>`;
  if (flapIn) {
    const fl = fy + flapIn * s;
    body += `<line x1="${fx}" y1="${fl}" x2="${fx + fw}" y2="${fl}" stroke="${C.sage}" stroke-width="2" stroke-dasharray="4 4"/><text x="${fx + fw + 14}" y="${fl + 7}" font-size="20" fill="${C.sage}">flap</text>`;
  }
  body += `<path d="M${fx - 18} ${fy} V${fy + fh}" stroke="${C.ink}" stroke-width="2" marker-start="url(#ah)" marker-end="url(#ah)"/>`;
  // Folded: pocket depth is the part below the fold, flap (if any) laps over.
  const px = 320 + (maxW - fw) / 2;
  const pocketH = hIn * foldAt * s;
  const backH = Math.min(hIn - hIn * foldAt, hIn) * s;
  const py = fy + (fh - pocketH);
  if (flapIn || backH > pocketH + 1) {
    body += `<rect x="${px}" y="${py - (backH - pocketH)}" width="${fw}" height="${backH}" fill="#efe2d4" stroke="${C.yarn}" stroke-width="2"/>`;
    if (!flapIn) body += `<text x="${px + fw / 2}" y="${py - (backH - pocketH) + 24}" font-size="20" fill="${C.soft}" text-anchor="middle">back</text><text x="${px + fw / 2}" y="${py + pocketH / 2 + 8}" font-size="20" fill="${C.soft}" text-anchor="middle">front</text>`;
  }
  body += `<rect x="${px}" y="${py}" width="${fw}" height="${pocketH}" fill="${C.deep}" stroke="${C.yarn}" stroke-width="3"/>`;
  if (flapIn) {
    const fh2 = flapIn * s;
    body += `<path d="M${px} ${py - (backH - pocketH)} h${fw} v${fh2} q${-fw / 2} 14 ${-fw} 0 z" fill="#e9d6c3" stroke="${C.yarn}" stroke-width="2"/>`;
  }
  const n = Math.max(3, Math.round(pocketH / 22));
  for (const sx of [px, px + fw])
    for (let k = 0; k < n; k++) {
      const yy = py + 8 + k * ((pocketH - 16) / Math.max(1, n - 1));
      body += `<line x1="${sx - 7}" y1="${yy + 4}" x2="${sx + 7}" y2="${yy - 4}" stroke="${C.terra}" stroke-width="3"/>`;
    }
  body += `<path d="M${fx + fw + 24} ${fy + fh / 2 + 30} H${px - 16}" stroke="${C.terra}" stroke-width="3" marker-end="url(#ah)"/>`;
  if (!flapIn && backH <= pocketH + 1) body += `<text x="${px + fw / 2}" y="${py - 10}" font-size="20" fill="${C.sage}" text-anchor="middle">${esc(openLabel)}</text>`;
  body += `<text x="${px + fw / 2}" y="${py + pocketH + 26}" font-size="20" fill="${C.terraDeep}" text-anchor="middle">${esc(foldLabel)}</text>`;
  y = Math.max(fy + fh, py + pocketH + 26) + 28;
  body += `<text x="20" y="${y}" font-size="20" fill="${C.ink}">Flat: ${esc(widthLabel ?? `${wIn} in`)} wide, ${esc(heightLabel ?? `${hIn} in`)} tall</text>`;
  y += 30;
  const seam = text(20, y + 6, seamLabel, { size: 22, weight: "bold" });
  body += seam.svg;
  y += seam.height;
  if (note) {
    const t = text(20, y + 10, note, { size: 20, fill: C.soft });
    body += t.svg;
    y += t.height + 6;
  }
  return frame(title, desc ?? sentence(`Drawn to scale. A flat piece ${widthLabel ?? `${wIn} in`} wide and ${heightLabel ?? `${hIn} in`} tall, folded at the dashed line into a pocket${flapIn ? " with the flap above" : ""}`, seamLabel, note), body, y + 22);
}

/**
 * A buttonhole row: before sc, a chain over skipped stitches, after sc, drawn
 * above one plain row so the skipped stitches are visible.
 */
export function buttonholeRow({ step, title, before, chain, skip, after, rowLabel, note, desc }) {
  const cols = before + skip + after;
  const h = heading(step, title);
  let body = h.svg;
  const cw = Math.min(44, 400 / cols);
  const x0 = (W - cols * cw) / 2;
  const yTop = h.y + 70;
  const yLow = yTop + 52;
  for (let c = 0; c < cols; c++) {
    const x = x0 + cw * (c + 0.5);
    body += symbol("sc", x, yLow, 16, C.ink);
    const skipped = c >= before && c < before + skip;
    if (skipped) body += `<circle cx="${x}" cy="${yLow - 24}" r="5" fill="none" stroke="${C.sage}" stroke-width="2"/>`;
    else body += symbol("sc", x, yTop, 16, C.terraDeep);
  }
  const lx = x0 + cw * before;
  const lw = cw * skip;
  body += `<path d="M${lx} ${yTop} q${lw / 2} -54 ${lw} 0" fill="none" stroke="${C.yarn}" stroke-width="4"/>`;
  body += `<text x="${lx + lw / 2}" y="${yTop - 50}" font-size="20" fill="${C.ink}" text-anchor="middle">ch ${chain}</text>`;
  let y = yLow + 46;
  const t1 = text(20, y, rowLabel ?? `Sc ${before}, ch ${chain}, skip ${skip}, sc ${after}.`, { size: 22, weight: "bold" });
  body += t1.svg;
  y += t1.height + 4;
  const t2 = text(20, y + 6, `Green circles: the ${skip} skipped stitches. The row uses ${cols} stitches and makes ${before + after} sc plus the loop.`, { size: 20, fill: C.sage });
  body += t2.svg;
  y += t2.height + 4;
  if (note) {
    const t = text(20, y + 8, note, { size: 20, fill: C.soft });
    body += t.svg;
    y += t.height + 4;
  }
  return frame(title, desc ?? sentence(`Buttonhole row over ${cols} stitches: sc ${before}, ch ${chain} over ${skip} skipped stitches, sc ${after}`, rowLabel, note), body, y + 22);
}

/**
 * A flap worked in rows over some stitches of the last round, shown with the
 * round unrolled. loop: [firstSkipped (1-based within flap), count] on the
 * last flap row, where a chain replaces skipped stitches.
 */
export function flapPlan({ step, title, cols, flapCols, flapRows, loop, note, desc, wallLabel }) {
  const h = heading(step, title);
  let body = h.svg;
  const cw = Math.min(16, 440 / cols);
  const x0 = (W - cols * cw) / 2;
  const fs = Math.floor((cols - flapCols) / 2);
  const rowH = 20;
  const top = h.y + 20;
  const wallY = top + flapRows * rowH + 10;
  // Flap rows, top row first.
  for (let r = flapRows; r >= 1; r--) {
    const y = top + (flapRows - r) * rowH;
    for (let c = 0; c < flapCols; c++) {
      const inLoop = r === flapRows && loop && c + 1 >= loop[0] && c + 1 < loop[0] + loop[1];
      if (inLoop) continue;
      body += `<rect x="${x0 + (fs + c) * cw}" y="${y}" width="${cw - 1}" height="${rowH - 2}" fill="#f3dfd6" stroke="${C.terra}" stroke-width="1"/>`;
    }
    body += `<text x="${x0 + (fs + flapCols) * cw + 8}" y="${y + 16}" font-size="20" fill="${C.terraDeep}">${r === 1 || r === flapRows ? `row ${r}` : ""}</text>`;
  }
  if (loop) {
    const lx = x0 + (fs + loop[0] - 1) * cw;
    const lw = loop[1] * cw;
    body += `<path d="M${lx} ${top + rowH - 4} q${lw / 2} -${rowH * 1.6} ${lw} 0" fill="none" stroke="${C.yarn}" stroke-width="4"/>`;
  }
  // Wall band.
  body += `<rect x="${x0}" y="${wallY}" width="${cols * cw}" height="${rowH * 2}" fill="${C.deep}" stroke="${C.yarn}" stroke-width="2"/>`;
  for (let c = 1; c < cols; c++) body += `<line x1="${x0 + c * cw}" y1="${wallY}" x2="${x0 + c * cw}" y2="${wallY + rowH * 2}" stroke="${C.grid}" stroke-width="1"/>`;
  body += `<rect x="${x0 + fs * cw}" y="${wallY}" width="${flapCols * cw}" height="${rowH * 2}" fill="none" stroke="${C.terra}" stroke-width="3"/>`;
  let y = wallY + rowH * 2 + 28;
  body += text(20, y, wallLabel ?? `Last round unrolled: ${cols} sts. The flap uses ${flapCols} of them.`, { size: 20, fill: C.ink }).svg;
  y += 52;
  if (note) {
    const t = text(20, y, note, { size: 20, fill: C.soft });
    body += t.svg;
    y += t.height;
  }
  return frame(title, desc ?? sentence(`A flap of ${flapRows} rows worked over ${flapCols} of the ${cols} stitches on the last round, with a chain loop on the top row`, note), body, y + 16);
}

/**
 * Two stacked panels: correct method above, common mistake below. Each panel
 * takes a drawing callback (x, y, w) => {svg, height} and a caption.
 */
export function compare({ title, good, bad, desc }) {
  const h = heading(null, title);
  let body = h.svg;
  let y = h.y + 6;
  for (const [kind, p] of [["good", good], ["bad", bad]]) {
    const col = kind === "good" ? C.sage : C.terra;
    const label = kind === "good" ? "CORRECT" : "COMMON MISTAKE";
    const d = p.draw(20, y + 46, W - 40);
    const cap = text(36, y + 46 + d.height + 30, p.caption, { size: 20, fill: C.ink, width: W - 72 });
    const ph = 46 + d.height + cap.height + 26;
    body += `<rect x="12" y="${y}" width="${W - 24}" height="${ph}" rx="10" fill="${kind === "good" ? "#f1f3ed" : "#f8ebe5"}" stroke="${col}" stroke-width="2"/>`;
    body += `<text x="32" y="${y + 32}" font-size="20" font-weight="bold" fill="${col}">${label}${p.label ? ": " + esc(p.label) : ""}</text>`;
    body += d.svg + cap.svg;
    y += ph + 14;
  }
  return frame(title, desc ?? `${good.caption} Mistake: ${bad.caption}`, body, y + 8);
}

/** Generic panel of labeled steps drawn by callbacks, stacked vertically. */
export function stack({ title, steps, desc }) {
  const h = heading(null, title);
  let body = h.svg;
  let y = h.y + 4;
  steps.forEach((s, i) => {
    const t = text(62, y + 33, s.title, { size: 22, weight: "bold", width: W - 90 });
    const off = 50 + t.height - 27;
    const d = s.draw(20, y + off, W - 40);
    const cap = text(36, y + off + d.height + 28, s.caption, { size: 20, width: W - 72 });
    const ph = off + d.height + cap.height + 22;
    body += `<rect x="12" y="${y}" width="${W - 24}" height="${ph}" rx="10" fill="${C.deep}" stroke="${C.rule}"/>`;
    body += `<circle cx="38" cy="${y + 26}" r="15" fill="${C.terra}"/><text x="38" y="${y + 33}" font-size="20" fill="#fff" text-anchor="middle" font-weight="bold">${i + 1}</text>`;
    body += t.svg;
    body += d.svg + cap.svg;
    y += ph + 12;
  });
  return frame(title, desc ?? steps.map((s, i) => `${i + 1}. ${s.title}: ${s.caption}`).join(" "), body, y + 8);
}

export const colors = C;
export { symbol, chainLink, spread, heading, esc };
