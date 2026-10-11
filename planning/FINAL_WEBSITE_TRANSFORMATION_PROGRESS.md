# Final website transformation: progress

Date: 2026-10-11. This tracks the "premium publication + public-copy cleanup"
pass that sits on top of the earlier trust/visual/quality work. It does not
overwrite the earlier `FULL_SITE_TRANSFORMATION_PROGRESS.md`.

## Status by phase (this prompt)

| Phase | Status | Notes |
| --- | --- | --- |
| 1. Reconcile local work | Done | Baseline `main` @ `ca83da5`; prior work preserved, nothing reset |
| 2. Remove public editorial clutter | Done | Captions, wallet tables, owner notes, SVG text, homepage/trust copy |
| 3. Homepage refinement | Done | Hero and section copy naturalized; "How illustrations and ads work" link renamed to "Disclosures" |
| 4. Premium article experience | Done | Per-pattern note rewritten; "What is checked" tables removed; byline, glance, checklist retained |
| 5. Keep good images | Done | 0 illustrations deleted; captions naturalized; 7 SVGs cleaned |
| 6. SVG teaching system | Reviewed | Existing 182-diagram system covers practical tutorials; no new diagrams required |
| 7. Interaction and printing | Preserved | Progress checklist, stitch-counter link, print CSS unchanged and verified |
| 8. Author and trust pages | Done, one owner item | About/author/disclosures natural; email unresolved |
| 9. Publication dates | Preserved | No changes; prior corrections stand; consistency re-checked |
| 10. SEO / structure | Done | 0 broken links, 0 SEO problems, URLs and tools preserved |
| 11. Social / Pinterest metadata | Done | Captions and descriptions naturalized; OG/pin paths preserved |
| 12. Full public-text audit | Done | A removed, B rewritten, C preserved, D (email) flagged |
| 13. Full-library execution | Done | All 69 articles processed, not a sample |
| 14. Final QA | Done | check/build/validators green; rendered pages reviewed at 390px and desktop |

## What changed

- `astro.config.mjs`: figure-caption plugin no longer forces an "AI
  illustration:" prefix; captions render as written, with a plain "Illustration."
  added only when a caption is not already labeled.
- `scripts/cleanup-public-copy.mjs` (new): 96 literal replacements across 49
  posts, removing audit tails from captions and descriptions while keeping real
  functional limits.
- 69 article files edited; 12 `src` files + `astro.config.mjs`; 7
  `public/diagrams` SVGs.
- `scripts/quality-matrix.mjs`: detector updated to recognize the natural
  disclosure wording so the honesty check stays accurate.
- `scripts/shoot.mjs` (new): headless-Chrome screenshots (desktop direct,
  mobile via a 390px iframe wrapper).
- Reports: `FINAL_WEBSITE_RELEASE_REPORT.md` (this pass), this file.

## Caption / disclosure policy now in force

- Figure captions label a picture as an "Illustration" or "Concept
  illustration" and never carry "AI", "not a photograph of a made sample", or
  "not test-crocheted".
- How illustrations are produced (computer-generated, AI-assisted) and how
  patterns are checked (on paper, from gauge, not test-crocheted) is stated once
  on the disclosures page, which About and the author page link to.
- Each untested pattern keeps one natural near-top note (sizes from gauge /
  pictures are illustrations / made up in yarn — stated plainly, not as a table).

## Remaining queue (not blocking release)

1. Owner: confirm the contact email; replace placeholder social handles.
2. Redraw the 22 small-text legacy 640-wide diagrams.
3. Trim the 19 articles over 1,800 words (see CONSOLIDATION_RECOMMENDATIONS.md).
4. Blank last page when printing some long articles (cosmetic).

## How to resume

1. `npm install`; if `astro.config.mjs` changed, delete
   `node_modules/.astro/data-store.json`; then `npm run check` and `npm run build`.
2. Checks: `node scripts/check-dist-seo.mjs`, `node scripts/visual-audit.mjs`,
   `node scripts/check-internal-links.mjs`, `node scripts/validate-diagrams.mjs`,
   `node scripts/verify-release.mjs`, `node scripts/quality-matrix.mjs`.
3. Screenshots: start `npx astro preview --port 4330`, then
   `node scripts/shoot.mjs "<chrome.exe>" "%TEMP%\ce-shots"`.
4. Audit sweep for regressions:
   `rg --no-ignore "AI illustration|test-crocheted|What is checked|Note for the site owner|paper geometry" dist --glob "*.html"`
   should return only privacy/disclosures/about hits.
5. Deploy only after owner approval: commit, push `main`, fast-forward
   `adsense-recovery`. Do not touch AdSense IDs or submit to AdSense.
