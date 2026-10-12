import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { readdirSync, readFileSync } from "node:fs";

/**
 * Article slug -> last real modification day, for sitemap `lastmod`. Pages
 * that are not articles get no lastmod rather than a made-up one.
 */
const articleLastmod = Object.fromEntries(
  readdirSync("src/content/posts")
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const text = readFileSync(`src/content/posts/${file}`, "utf8");
      const field = (key) =>
        text.match(new RegExp(`^${key}:\\s*(\\S+)`, "m"))?.[1];
      return [file.replace(/\.md$/, ""), field("updatedDate") ?? field("pubDate")];
    }),
);

/**
 * Wraps every Markdown table in a positioned container so the scroll-hint
 * fade has something to anchor to. The table itself stays the scrolling
 * element — if the wrapper scrolled instead, an absolutely positioned fade
 * would scroll away with the content.
 */
function rehypeWrapTables() {
  const wrap = (node) => {
    if (!node.children) return;

    for (const child of node.children) wrap(child);

    node.children = node.children.map((child) =>
      child.type === "element" && child.tagName === "table"
        ? {
            type: "element",
            tagName: "div",
            properties: { className: ["table-scroll"] },
            children: [child],
          }
        : child,
    );
  };

  return wrap;
}

/**
 * Turns `![alt](src "caption")` into a real `<figure>` with a `<figcaption>`.
 *
 * Markdown puts a lone image inside a paragraph, and a `<figure>` is not
 * allowed inside a `<p>`, so the paragraph is replaced rather than wrapped.
 * The title attribute is removed on the way past: left in place the browser
 * shows it again as a tooltip, so the caption would read twice.
 *
 * This has to run before Astro's own image handling, which it does — user
 * rehype plugins are registered ahead of it — and that plugin finds `img`
 * nodes anywhere in the tree, so moving one into a figure does not stop it
 * being optimised.
 */
/**
 * One short label is enough to stop a drawing being read as a photograph.
 * Repeated "Concept illustration of the finished wallet" lines are dropped.
 * A caption that is only that phrase becomes "Illustration."
 */
function readerCaption(raw) {
  let text = raw.trim();
  text = text.replace(
    /^(?:concept\s+illustration|illustration)\s+of the finished wallet\.?\s*/i,
    "",
  );
  text = text.replace(/^(?:concept\s+illustration|illustration)\.\s*/i, "");
  text = text.trim();
  if (!text) return raw.trim() ? "Illustration." : "";
  if (/^(?:concept\s+)?illustration\b|^diagram\b/i.test(text)) return text;
  return `Illustration. ${text}`;
}

function textOf(node) {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";
  if (!node.children) return "";
  return node.children.map(textOf).join("");
}

function stripEmptyFigcaptions(node) {
  if (!node?.children) return;
  node.children = node.children.filter((child) => {
    if (child.type !== "element" || child.tagName !== "figcaption") return true;
    return textOf(child).trim() !== "";
  });
  for (const child of node.children) stripEmptyFigcaptions(child);
}

function rehypeFigures() {
  const isBlank = (node) => node.type === "text" && node.value.trim() === "";

  /**
   * Astro lazy-loads every Markdown image. That is right for all of them
   * except the first, which sits in the opening screenful and is therefore
   * what Largest Contentful Paint usually measures — and deferring the
   * element being measured is the one case where lazy loading makes the
   * score worse rather than better.
   */
  const promoteLeadImage = (node) => {
    if (!node.children) return false;

    for (const child of node.children) {
      if (child.type !== "element") continue;

      if (child.tagName === "img") {
        child.properties.loading = "eager";
        child.properties.fetchpriority = "high";
        return true;
      }

      if (promoteLeadImage(child)) return true;
    }

    return false;
  };

  const transform = (node) => {
    if (!node.children) return;

    for (const child of node.children) transform(child);

    node.children = node.children.map((child) => {
      if (child.type !== "element" || child.tagName !== "p") return child;

      const content = child.children.filter((n) => !isBlank(n));
      const [image] = content;

      if (content.length !== 1) return child;
      if (image.type !== "element" || image.tagName !== "img") return child;

      const caption = image.properties?.title;
      if (image.properties) delete image.properties.title;
      const captionText = readerCaption(
        typeof caption === "string" ? caption : "",
      );

      const children = [image];
      if (captionText) {
        children.push({
          type: "element",
          tagName: "figcaption",
          properties: {},
          children: [{ type: "text", value: captionText }],
        });
      }

      return {
        type: "element",
        tagName: "figure",
        properties: {},
        children,
      };
    });
  };

  return (tree) => {
    transform(tree);
    stripEmptyFigcaptions(tree);
    promoteLeadImage(tree);
  };
}

export default defineConfig({
  site: "https://www.crochetexplained.com",
  /**
   * One URL per page. Without this, Vercel serves both `/slug` and `/slug/`
   * as 200s; Google then lists the no-slash copy as "Alternate page with
   * proper canonical tag" and it looks like a failed indexation.
   */
  trailingSlash: "always",
  redirects: {
    ...Object.fromEntries(
      Array.from({ length: 20 }, (_, index) => [
        `/articles/${index + 2}/`,
        "/articles/",
      ]),
    ),
    // Consolidated into the device-case hub (see audit/REDIRECT_PLAN.csv).
    "/how-to-crochet-a-laptop-sleeve/": "/how-to-crochet-a-device-case/",
    "/how-to-crochet-a-book-sleeve/": "/how-to-crochet-a-device-case/",
    "/how-to-crochet-an-earbud-pouch/": "/how-to-crochet-a-device-case/",
    "/how-to-crochet-a-lip-balm-holder/": "/how-to-crochet-a-device-case/",
    "/how-to-crochet-a-ghost-coin-pouch/": "/how-to-crochet-a-drawstring-bag/",
    "/how-to-crochet-a-ghost-candy-bag/": "/how-to-crochet-a-drawstring-bag/",
    "/how-to-crochet-a-pumpkin-treat-bag/": "/how-to-crochet-a-drawstring-bag/",
    "/how-to-crochet-a-mini-shoulder-bag/": "/how-to-crochet-a-strap-bag/",
    "/how-to-crochet-a-phone-crossbody/": "/how-to-crochet-a-strap-bag/",
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !["/tools/", "/cookie-settings/", "/privacy-eu/", "/privacy-us/"].some(
          (path) => page.includes(path),
        ),
      serialize(item) {
        const slug = new URL(item.url).pathname.replace(/^\/|\/$/g, "");
        const day = articleLastmod[slug];
        if (day) item.lastmod = new Date(`${day}T00:00:00Z`).toISOString();
        return item;
      },
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeWrapTables, rehypeFigures],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
