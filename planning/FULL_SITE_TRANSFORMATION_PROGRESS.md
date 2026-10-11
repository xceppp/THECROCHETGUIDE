# Full site transformation: progress

Date: 2026-10-11. Status: **all phases worked through for every published
article. Not committed and not deployed** (waiting for owner approval).

## Phase status

| Phase | Status | Deliverable |
| --- | --- | --- |
| 1. Publication dates | Done | `PUBLICATION_DATE_AUDIT.csv`. 14 dates corrected from git evidence (13 moved from August or early September to 2026-09-10, the first commit; the Halloween coasters from 09-16 to 10-09, when the draft flag came off). No date was spread or guessed |
| 2. Author and trust | Done, one owner item open | `AUTHOR_AND_TRUST_AUDIT.md`. M. Amine profile, About rewrite, Person schema, consistent legal pages. **Email unresolved** |
| 3. Visual accuracy | Done | `VISUAL_ACCURACY_REPORT.md`, `VISUAL_ACCURACY_MATRIX.csv`. 241 illustrations labeled, 0 flagged. 22 wallet captions fixed |
| 4. Step-by-step SVGs | Done for every practical tutorial | `SVG_STEP_BY_STEP_INVENTORY.md`. 80 new diagrams, 123 placements, 46 articles |
| 5. Article quality | Done | `ARTICLE_QUALITY_MATRIX.csv`, `UNVERIFIED_PATTERN_LIMITATIONS.md` |
| 6. Interactivity, print, mobile | Done | Progress checklist on 42 articles, stitch counter link, print CSS, privacy disclosure of local storage |
| 7. Consolidation | Recommendations only | `CONSOLIDATION_RECOMMENDATIONS.md`. Nothing merged or redirected |
| 8–14. Technical and release checks | Done | `FINAL_EDITORIAL_REVIEW.md`, `FINAL_RELEASE_REPORT.md` |

## What changed in the code

- `src/config.ts`: author identity only. AdSense IDs untouched.
- `src/pages/[slug].astro`: UTC dates, byline, pattern note, progress checklist.
- New: `src/components/StageChecklist.astro`, `src/pages/author/amine.astro`.
- Rewritten: `src/pages/about.astro`. Edited: contact, disclosures, both
  privacy pages, footer, structured data, post card.
- `astro.config.mjs`: sitemap `lastmod` from frontmatter; figure captions now
  strip "Illustration," as well as "Illustration.".
- `src/styles/global.css`: print rules (diagrams print, illustrations do not).
- 57 articles edited: diagrams placed, dates corrected, four untested
  statements added, Santa hat rounds 8 to 16 written out, the tote's
  multiple-of-12 checkpoint corrected.
- Not touched: `public/ads.txt`, `public/robots.txt`, `vercel.json`, the
  publisher ID, `AdSlot.astro`, the drafts.

## Tools added (all in `scripts/`)

| Script | Purpose |
| --- | --- |
| `audit-pub-dates.mjs` | Rebuilds the date audit from git; `--apply` writes frontmatter |
| `article-inventory.mjs` | Words, headings, images, diagrams, FAQ, mistakes, filler |
| `quality-matrix.mjs` | Writes the quality matrix and lists project pages missing an untested statement |
| `visual-audit.mjs` | Image labeling, alt text, missing files |
| `check-dist-seo.mjs` | Built pages: h1, canonical, JSON-LD author and dates, alt, sitemap lastmod |
| `validate-diagrams.mjs` (updated) | Accepts 480-wide diagrams, enforces 20-unit text, counts small legacy text |
| `step-diagrams/*` | Build, preview, inject, refresh and inventory step diagrams |

## Remaining queue (not blocking release)

1. **Owner:** confirm a real contact inbox for `SITE.email`; replace the
   placeholder social handles.
2. **Owner:** approve or decline each item in `CONSOLIDATION_RECOMMENDATIONS.md`.
3. Redraw the 102 older 640-wide diagrams at 480 wide. Start with the 22 that
   use 13 to 14 unit text (`node scripts/validate-diagrams.mjs` counts them).
4. Trim the longest pattern pages (hooded scarf, bowl cozy, lace bandana)
   toward the 1,800-word guideline.
5. A blank last page appears when printing some long articles (seen on the
   gnome page: 11 pages of content plus one empty page). Cosmetic. Removing
   `min-h-screen` from the body for print did not change it, so the cause is
   elsewhere in the page's trailing elements.

## How to resume

1. `npm install`, then `npm run check` and `npm run build`. Both must pass.
2. If `astro.config.mjs` changed since the last build, delete
   `node_modules/.astro/data-store.json` first.
3. Run the checks: `node scripts/check-internal-links.mjs`,
   `node scripts/verify-release.mjs`, `node scripts/check-dist-seo.mjs`,
   `node scripts/validate-diagrams.mjs`, `node scripts/visual-audit.mjs`,
   `node scripts/quality-matrix.mjs`.
4. For more diagrams: add `scripts/step-diagrams/articles-m.mjs` with a default
   export of `{ file: svg }` and a `placements` list, then run `build.mjs`,
   `preview.mjs %TEMP%\m.png <files>` (look at it at phone width),
   `inject.mjs`, `refresh.mjs`.
5. Set `updatedDate` to the edit day on any article whose instructions or
   diagrams change.
6. Deploy only after owner approval: commit, push `main`, then fast-forward
   `adsense-recovery`.
