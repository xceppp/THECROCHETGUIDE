// Checks the built article pages after `npm run build`.
//   node scripts/check-dist-seo.mjs
// One h1, canonical to itself, JSON-LD that parses with a Person author and
// the frontmatter dates, every <img> with alt text, and a sitemap lastmod.
import { readFileSync, readdirSync, existsSync } from "node:fs";

const SITE = "https://www.crochetexplained.com";
const sitemap = readdirSync("dist").filter((f) => /^sitemap-\d+\.xml$/.test(f)).map((f) => readFileSync(`dist/${f}`, "utf8")).join("");
const problems = [];
let pages = 0;
for (const f of readdirSync("src/content/posts").filter((f) => f.endsWith(".md"))) {
  const md = readFileSync(`src/content/posts/${f}`, "utf8");
  if (/^draft:\s*true/m.test(md)) continue;
  const slug = f.replace(/\.md$/, "");
  const path = `dist/${slug}/index.html`;
  if (!existsSync(path)) {
    problems.push(`${slug}: not built`);
    continue;
  }
  pages++;
  const html = readFileSync(path, "utf8");
  const pub = md.match(/^pubDate:\s*(\S+)/m)?.[1];
  const upd = md.match(/^updatedDate:\s*(\S+)/m)?.[1];
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) problems.push(`${slug}: ${h1} h1`);
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canon !== `${SITE}/${slug}/`) problems.push(`${slug}: canonical ${canon}`);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let post;
  for (const b of blocks) {
    try {
      const j = JSON.parse(b);
      for (const node of [j, ...(j["@graph"] ?? [])]) if (node["@type"] === "BlogPosting") post = node;
    } catch {
      problems.push(`${slug}: JSON-LD does not parse`);
    }
  }
  if (!post) problems.push(`${slug}: no BlogPosting`);
  else {
    if (post.author?.["@type"] !== "Person" || post.author?.name !== "M. Amine") problems.push(`${slug}: author ${JSON.stringify(post.author)}`);
    if (!String(post.datePublished).startsWith(pub)) problems.push(`${slug}: datePublished ${post.datePublished} vs ${pub}`);
    if (!String(post.dateModified).startsWith(upd ?? pub)) problems.push(`${slug}: dateModified ${post.dateModified} vs ${upd ?? pub}`);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="[^"]+"/.test(m[0]) && !/aria-hidden="true"|class="pin-source"/.test(m[0])) problems.push(`${slug}: img without alt ${m[0].slice(0, 80)}`);
  const loc = new RegExp(`<loc>${SITE}/${slug}/</loc>\\s*<lastmod>([^<]+)</lastmod>`);
  const lm = sitemap.match(loc)?.[1];
  if (!lm) problems.push(`${slug}: no sitemap lastmod`);
  else if (!lm.startsWith(upd ?? pub)) problems.push(`${slug}: lastmod ${lm} vs ${upd ?? pub}`);
}
console.log(`article pages checked ${pages}, problems ${problems.length}`);
for (const p of problems) console.log("  " + p);
if (problems.length) process.exitCode = 1;
