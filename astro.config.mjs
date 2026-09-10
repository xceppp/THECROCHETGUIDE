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

export default defineConfig({
  site: "https://thecrochetguide.com",
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeWrapTables],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
