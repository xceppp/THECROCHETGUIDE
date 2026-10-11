# Recovery implementation

Branch: `adsense-recovery` (local only). Started from `9398b63` plus the uncommitted audit edits (disclosures wording, two draft links removed). Those earlier edits were kept.

## Implemented and checked in source

| Change | Evidence |
| --- | --- |
| Homepage leads with the course, then technique lessons, then charts, then six written project guides, then seasonal ideas, then the full archive | `src/pages/index.astro` |
| Hero states that untested pages are illustrations, not finished samples | Same file, first section |
| About page explains course vs paper stitch-check vs yarn sample | `src/pages/about.astro` |
| Halloween skin is no longer forced | `OCCASION_THEME_FORCE` is `null` in `src/config.ts` |
| 16 source images over 500 KB were recompressed in place, same filenames | `scripts/compress-large-images.mjs` output. Largest examples: ghost candy bag result 4121 KB to 943 KB; pumpkin zipper pouch 2 was 5480 KB to 1112 KB |
| Previous disclosure correction and ornament draft links | Still in the working tree. Not reverted |

## Not implemented

| Item | Why |
| --- | --- |
| Merging the 23 consolidate candidates | Different objects. Redirects would need your approval. None were added. |
| Rewriting the 27 IMPROVE articles | Would require stitch counts and sizes that are not in a sample log. |
| Marking any project physically tested | No sample evidence in the repo. |
| New author persona | No truthful personal bio was available. |
| Push or deploy | Not approved. |

## Counts

- Articles with body rewrites this pass: **0**
- Articles retained at the same URL: **65**
- Articles consolidated (redirect live): **0**
- Articles awaiting a merge decision: **23** (see `CONTENT_AUDIT.csv`)
- Pages whose own text says the work was not made in yarn, excluding the resource page that only describes that policy: **31** (see `ARTICLES_REQUIRING_TESTING.md`)

## Course navigation

Previous and next links already exist for the 12 course slugs through `LEARNING_PATH` and `StepNav`. No second navigation system was added.

## Verification

Run locally on 10 October 2026. Not checked against the live domain or Cloudflare.

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors. Hints remain on two inline scripts in `BaseLayout.astro` and an unused helper in `scripts/generate-social-cards.mjs`. Those hints were already in the project. |
| `npm run build` | Completed. `dist/sitemap-index.xml` was written. |
| Built homepage | `dist/index.html` contains the visible heading "Learn crochet with clear, step-by-step guides" and "Start the 12-step course". Canonical is `https://www.crochetexplained.com/`. |
| Seasonal class | No `theme-halloween` in built HTML. `body` class is `flex min-h-screen flex-col`. That matches the calendar: 10 October sits between World Teachers' Day and World Food Day. |
| Internal links | `node scripts/check-internal-links.mjs` reported 0 broken links from published posts and the homepage, About, start-here, and disclosures pages. |
| Redirects | `vercel.json` has headers only. No redirect rules were added. |
| Sitemap drafts | `dist/sitemap-0.xml` has 82 `<loc>` entries and does not list the draft Christmas pattern URLs that were unlinked earlier. |
| `robots.txt` | `Allow: /`. The only disallow is `/tools/`, and that route does not exist. Googlebot is not blocked. |
| `ads.txt` | Unchanged: `pub-5737689254964633`. |
| Browser click-through | Not done. There is no browser session in this pass. The checks above are on the built files. |
