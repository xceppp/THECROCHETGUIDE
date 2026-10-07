import type { ImageMetadata } from "astro";

/**
 * Eager map of article images so listing cards can show the finished-result
 * photo (or the first step shot) without each page importing files by hand.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/articles/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

function findBySuffix(slug: string, suffix: string): ImageMetadata | undefined {
  const needle = `/${slug}${suffix}`;
  for (const [path, mod] of Object.entries(modules)) {
    if (path.replace(/\\/g, "/").endsWith(needle)) return mod.default;
  }
  return undefined;
}

/** Prefer the finished-result shot; fall back to the first step image. */
export function getPostThumbnail(slug: string): ImageMetadata | undefined {
  return (
    findBySuffix(slug, "-result.jpg") ??
    findBySuffix(slug, "-result.jpeg") ??
    findBySuffix(slug, "-result.png") ??
    findBySuffix(slug, "-result.webp") ??
    findBySuffix(slug, "-1.jpg") ??
    findBySuffix(slug, "-1.jpeg") ??
    findBySuffix(slug, "-1.png") ??
    findBySuffix(slug, "-1.webp")
  );
}
