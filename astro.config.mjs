import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

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
      if (typeof caption !== "string" || caption.trim() === "") return child;

      delete image.properties.title;

      return {
        type: "element",
        tagName: "figure",
        properties: {},
        children: [
          image,
          {
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: [{ type: "text", value: caption }],
          },
        ],
      };
    });
  };

  return (tree) => {
    transform(tree);
    promoteLeadImage(tree);
  };
}

export default defineConfig({
  site: "https://www.crochetexplained.com",
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeWrapTables, rehypeFigures],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
