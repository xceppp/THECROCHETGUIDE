# Changes implemented

Local only. Nothing was pushed, deployed, or unpublished.

**Git state before edits:** `main` at `9398b63` — "Add the October Pinterest plan for the 65 live articles." Working tree clean aside from ignored or untracked install artifacts (`node_modules`, `dist`).

## Edits

### `src/pages/disclosures.astro`

The illustrations section said no pattern on the site describes an item that exists only as an image. Published project pages say the opposite: counts were checked on paper and the object has not been made in yarn.

The sentence now says a computer-generated image is not presented as a photograph, captions identify illustrations, and a written pattern is not a claim of a yarn sample unless that page says it was.

### `src/content/posts/easy-crochet-christmas-ornaments.md`

Removed two links that pointed at draft posts with no public URL:

- `/free-pattern-mini-christmas-trees/`
- `/free-pattern-snowflake-set/`

The published Christmas-tree and snowflake tutorials remain linked. No stitch counts were changed.

## Explicitly not done

- No article deleted or set to `draft`.
- No canonical or slug change.
- No new stitch counts, measurements, or "tested" claims.
- No new images.
- No homepage reorder.
- No change to `OCCASION_THEME_FORCE`.
- No author biography invented.
- The 15 rewrites in `TOP_15_IMPROVEMENTS.md` are instructions, not applied text.

## Audit files added

- `audit/ADSENSE_AUDIT.md`
- `audit/CONTENT_AUDIT.csv` (65 published URLs)
- `audit/TOP_15_IMPROVEMENTS.md`
- `audit/TECHNICAL_AUDIT.md`
- `audit/CHANGES_IMPLEMENTED.md`
- `audit/ADSENSE_RESUBMISSION_CHECKLIST.md`

## Verification

- `npm run check`: 0 errors, 0 warnings, 3 existing hints (`is:inline` on consent scripts in `BaseLayout.astro`). Those hints were not introduced by this audit.
- `npm run build`: completed. 86 pages. Sitemap written. Social cards generated for 65 articles.
- Internal-link scan after the ornament edit: 0 links from published posts to missing slugs.
- Live site, Cloudflare, and Search Console were not exercised.
