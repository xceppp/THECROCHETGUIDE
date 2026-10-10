import {
  articleMatchesQuery,
  parseArticleSort,
  sortArticles,
  type ArticleSortMode,
} from "../lib/articleSort";
import { getArticleReads } from "./articleReads";

type Card = {
  slug: string;
  published: number;
  search: string;
  element: HTMLElement;
};

const SORT_LABEL: Record<ArticleSortMode, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  read: "Most read on this browser",
};

function cardsIn(list: HTMLElement): Card[] {
  return [...list.querySelectorAll<HTMLElement>("[data-slug]")].map((element) => ({
    slug: element.dataset.slug ?? "",
    published: Number(element.dataset.published ?? 0),
    search: element.dataset.search ?? "",
    element,
  }));
}

function apply(root: HTMLElement): void {
  const list = root.querySelector<HTMLElement>("[data-article-list]");
  const queryInput = root.querySelector<HTMLInputElement>("[data-article-query]");
  const sortInput = root.querySelector<HTMLSelectElement>("[data-article-sort]");
  const status = root.querySelector<HTMLElement>("[data-article-status]");
  if (!list || !queryInput || !sortInput) return;

  const mode = parseArticleSort(sortInput.value);
  const reads = getArticleReads();
  const cards = cardsIn(list);
  const matched = cards.filter((card) => articleMatchesQuery(card.search, queryInput.value));
  const ordered = sortArticles(matched, mode, reads);
  const hidden = new Set(ordered.map((card) => card.element));

  for (const card of cards) {
    card.element.hidden = !hidden.has(card.element);
  }
  for (const card of ordered) list.appendChild(card.element);

  if (!status) return;
  const opened = Object.values(reads).some((count) => count > 0);
  const lead =
    matched.length === cards.length
      ? `${cards.length} articles`
      : `${matched.length} of ${cards.length} articles`;
  const extra =
    mode === "read" && !opened
      ? " None opened in this browser yet, so the order matches newest first."
      : "";
  status.hidden = false;
  status.textContent =
    matched.length === 0
      ? "No articles match that search."
      : `${lead}. ${SORT_LABEL[mode]}.${extra}`;
}

export function mountArticleBrowsers(): void {
  const params = new URLSearchParams(window.location.search);

  for (const root of document.querySelectorAll<HTMLElement>("[data-article-browser]")) {
    if (root.dataset.browserReady === "true") continue;
    root.dataset.browserReady = "true";

    const queryInput = root.querySelector<HTMLInputElement>("[data-article-query]");
    const sortInput = root.querySelector<HTMLSelectElement>("[data-article-sort]");
    const form = root.querySelector<HTMLFormElement>("[data-article-form]");
    if (!queryInput || !sortInput || !form) continue;

    if (params.has("q")) queryInput.value = params.get("q") ?? "";
    if (params.has("sort")) sortInput.value = parseArticleSort(params.get("sort"));

    const sync = () => {
      apply(root);
      const next = new URLSearchParams();
      const query = queryInput.value.trim();
      const sort = parseArticleSort(sortInput.value);
      if (query) next.set("q", query);
      if (sort !== "newest") next.set("sort", sort);
      const search = next.toString();
      const url = `${window.location.pathname}${search ? `?${search}` : ""}`;
      window.history.replaceState(null, "", url);
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      sync();
    });
    queryInput.addEventListener("input", sync);
    sortInput.addEventListener("change", sync);
    apply(root);
  }
}
