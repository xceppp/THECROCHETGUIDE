# AdSense readiness

**Not recommended for resubmission.** The teaching pages are stronger. The cluster of similar untested project pages is still published.

A later edit on the same branch taught the slip knot, corrected `dc3tog` on the abbreviations chart, and labeled the yardage tables as shopping ranges. That does not change the resubmission answer.

## Verified completed fixes

Local only, on branch `adsense-recovery`.

- Homepage still leads with the course. Seasonal skin is still calendar-based (`OCCASION_THEME_FORCE` is null).
- Six course lessons have a new worked example. See `COURSE_IMPROVEMENTS.md`.
- Twenty-seven IMPROVE articles were edited in the body. The stocking foot length was corrected from 7.5 inches to 5 inches because 25 rounds at 5 rounds per inch is 5.
- One image caption that did not say "Illustration" (the Halloween card wallet) now does.
- `npm run check` and `npm run build` results are in `CONTENT_TRANSFORMATION_REPORT.md` after this run, and in the chat report.

## Local changes awaiting deployment

Everything above is uncommitted or unpushed relative to production. Nothing here is on the live site until you deploy. This pass did not deploy.

## Content awaiting validation

- Every project page that gives inches from a planning gauge. The arithmetic can be right and the object can still come out different in yarn.
- The 23 consolidation candidates. They were kept because they are different objects. They are not tested patterns.
- Physical samples: none in the repo.

## Remaining AdSense risks

- Many pages from 8–9 October 2026 still share a small-project shape: materials, a planning gauge, a rectangle or tube, an illustration.
- Illustrations are still the only pictures of those objects.
- A disclaimer does not make an untested pattern a high-value page.

## Live verification still required

This environment did not click through https://www.crochetexplained.com/ after these edits, and it did not inspect Cloudflare. Production will not show this work until you deploy it. Browser review of the built homepage was not done in this pass. The checks are `astro check`, the production build, and a local link scan.
