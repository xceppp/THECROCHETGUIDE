/**
 * Course progress, kept in the visitor's own browser.
 *
 * There is no account and no cookie: the site is static, there is no server to
 * sync to, and the homepage promises no email is required. localStorage keeps
 * that promise — the data never leaves the device, and clearing site data
 * removes it.
 *
 * Every access is wrapped because localStorage throws outright in some
 * privacy modes rather than returning null. A blocked browser degrades to
 * "nothing remembered", never to a broken page.
 */
const KEY = "tcg:progress";
const VERSION = 1;

export type Progress = {
  v: number;
  /** Most recently opened step, kept for future use. */
  last: string | null;
  /** Slug to timestamp, for every step opened. */
  read: Record<string, number>;
};

const empty = (): Progress => ({ v: VERSION, last: null, read: {} });

export function getProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();

    const parsed = JSON.parse(raw) as Partial<Progress>;
    // A version bump means the shape changed; start clean rather than guess.
    if (parsed?.v !== VERSION || typeof parsed.read !== "object") return empty();

    return { v: VERSION, last: parsed.last ?? null, read: parsed.read ?? {} };
  } catch {
    return empty();
  }
}

export function markRead(slug: string): void {
  try {
    const progress = getProgress();
    progress.read[slug] = Date.now();
    progress.last = slug;
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // Storage blocked. Reading the site still works; it just is not remembered.
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear if storage was never available.
  }
}
