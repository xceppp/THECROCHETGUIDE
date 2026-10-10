/**
 * How many times this browser has opened each article.
 *
 * There is no account and no site-wide view counter. The "Most read" sort
 * uses this map only. Clearing site data resets it.
 */
const KEY = "tcg:reads";
const VERSION = 1;

type StoredReads = {
  v: number;
  counts: Record<string, number>;
};

const empty = (): StoredReads => ({ v: VERSION, counts: {} });

function readStore(): StoredReads {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<StoredReads>;
    if (parsed?.v !== VERSION || typeof parsed.counts !== "object" || !parsed.counts) {
      return empty();
    }
    return { v: VERSION, counts: parsed.counts };
  } catch {
    return empty();
  }
}

export function getArticleReads(): Record<string, number> {
  return readStore().counts;
}

export function recordArticleOpen(slug: string): void {
  if (!slug) return;
  try {
    const store = readStore();
    store.counts[slug] = (store.counts[slug] ?? 0) + 1;
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // Storage blocked. The list still sorts by date.
  }
}
