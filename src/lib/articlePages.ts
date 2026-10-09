/** How many articles each archive page shows. */
export const ARTICLE_PAGE_SIZE = 12;

/** Page 1 lives at /articles/. Later pages are /articles/2/ and so on. */
export function articlePageHref(page: number): string {
  return page <= 1 ? "/articles/" : `/articles/${page}/`;
}
