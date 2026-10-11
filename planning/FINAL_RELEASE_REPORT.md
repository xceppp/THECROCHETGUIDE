# Final release report

Date: 2026-10-11. **Release candidate: ready for owner review. Not committed,
not deployed, AdSense not submitted.**

## Validation (clean build, render cache cleared)

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings |
| `npm run build` | 89 pages |
| Published articles | 69 (10 drafts withheld) |
| Internal links | 0 broken on published pages (11 inside drafts, which are not built) |
| `verify-release.mjs` | OK; 85 sitemap URLs; stocking and tree skirt not built and not in the sitemap |
| `check-dist-seo.mjs` | 69 article pages, 0 problems (h1, canonical, Person author, dates, alt, lastmod) |
| `validate-diagrams.mjs` | 182 SVGs, 0 invalid, 0 unused; 22 older files with text under 16 units |
| `visual-audit.mjs` | 473 image references, 0 flagged; 241 illustrations all labeled |
| `check-release-files.mjs` | ads.txt intact with `pub-5737689254964633` |
| Gauge math and article sort tests | Pass |

## Visual checks

- At 320, 390 and 768px (black cat wallet page): layout holds, no horizontal
  scroll, and the turning-chain comparison diagram can be read at 320px.
- Desktop (gnome page): diagrams, checklist and pattern note render correctly.
- Print (gnome page): no nav, ads, checklist or illustrations; diagrams and
  pattern text print. One blank page at the end (cosmetic, open).

## Withheld content confirmed

The two previously withheld tutorials, `how-to-crochet-a-christmas-stocking`
and `how-to-crochet-a-christmas-tree-skirt`, remain `draft: true`, are not
built and are not in the sitemap. The eight `free-pattern-*` drafts are also
unchanged.

## Preserved

`public/ads.txt`, `public/robots.txt`, `vercel.json`, `ADSENSE_CLIENT`, the
publisher ID and `AdSlot.astro` have not been modified. No Cloudflare-specific
behavior was added; the output is still plain static files.

## Known issues

1. `SITE.email` holds `thecrochetguiide@gmail.com`, which the owner has not
   confirmed. The answer given ("crochetexplained.com") is a domain, not an
   address.
2. The social URLs are still placeholders.
3. 102 older 640-wide diagrams remain; 22 use small text.
4. 20 articles exceed 1,800 words.
5. A blank last page appears when printing some long articles.

## Owner actions before deploying

1. Confirm or supply the contact address.
2. Review the diff (`git status`, `git diff`), especially `about.astro`,
   `author/amine.astro` and the date changes in `PUBLICATION_DATE_AUDIT.csv`.
3. Approve the deploy. Then: commit, push `main`, fast-forward
   `adsense-recovery`.
4. Decide on `CONSOLIDATION_RECOMMENDATIONS.md` separately. Nothing there has
   been applied.
