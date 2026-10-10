/** Sort modes for the article lists. Newest is the default. */

export type ArticleSortMode = "newest" | "oldest" | "read";

export type SortableArticle = {
  slug: string;
  published: number;
};

export function parseArticleSort(value: string | null | undefined): ArticleSortMode {
  if (value === "oldest" || value === "read") return value;
  return "newest";
}

/** Every word in the query must appear. An empty query matches everything. */
export function articleMatchesQuery(haystack: string, query: string): boolean {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const text = haystack.toLowerCase();
  return terms.every((term) => text.includes(term));
}

export function sortArticles<T extends SortableArticle>(
  items: readonly T[],
  mode: ArticleSortMode,
  reads: Readonly<Record<string, number>>,
): T[] {
  const copy = [...items];
  copy.sort((a, b) => {
    if (mode === "oldest") {
      return a.published - b.published || a.slug.localeCompare(b.slug);
    }
    if (mode === "read") {
      const byReads = (reads[b.slug] ?? 0) - (reads[a.slug] ?? 0);
      if (byReads !== 0) return byReads;
    }
    return b.published - a.published || a.slug.localeCompare(b.slug);
  });
  return copy;
}
