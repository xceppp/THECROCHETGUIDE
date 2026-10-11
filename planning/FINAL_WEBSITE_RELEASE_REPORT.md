# Final website release report

Date: 2026-10-11. **Release candidate. Nothing is committed or deployed, and
AdSense has not been submitted. Waiting on owner approval and one email answer.**

## Executive summary

The site now reads like a normal, professional crochet publication rather than
an internal publishing report. The visitor-facing "AI illustration" labels,
"checked on paper / not test-crocheted" audit lines, the "What is checked, and
what is not" tables, and two owner-only notes have all been removed or rewritten
in plain reader language. The honest facts a reader actually needs — that a
picture is an illustration, and that a size is calculated from gauge rather than
measured from a finished sample — are kept, stated once and naturally, with the
full advertising and image disclosures still on the accessible disclosures and
privacy pages. All previous local work (dates, author identity, diagrams,
quality passes) is preserved. `npm run check` is at 0 errors, the build is 89
pages, and every release check passes.

## 1. Repository baseline

- Branch `main`, last commit `ca83da5` ("Use illustrated photos for the
  Halloween wallet cards and articles"). The deployed wallet collection and the
  earlier editorial work are intact and were not reset.
- 69 published articles, 10 drafts, 89 built pages.

## 2. Previously completed work preserved

Publication-date corrections, the M. Amine author identity and profile page, the
step-diagram system (80 diagrams, 123 placements), the quality matrix, progress
checklists, and print styles were all left in place and re-validated. No earlier
change was reverted.

## 3. New work this release — public-facing cleanup

The core of this release. Classification from Phase Twelve:

- **Removed from public view (A):**
  - The forced "AI illustration:" prefix on every figure caption (plugin).
  - The "What is checked, and what is not" heading and validation table on all
    six wallet pages.
  - An owner-only note on the contact page and an owner-only note on the
    privacy hub, both of which named AdSense. The contact one is now a
    server-side comment that never renders; the privacy one is replaced with a
    reader-facing "not legal advice" line.
  - "Not test-crocheted" / "Paper geometry" / "Arithmetic, not a sample" text
    baked into six wallet and coaster SVG diagrams.
- **Rewritten in natural reader language (B):**
  - 96 scripted replacements across 49 articles stripped terse audit tails
    ("Not a measured sample.", "Not a weighed amount.", "not a photograph of a
    made wallet.", "checked on paper only.") from captions and meta
    descriptions, keeping real functional limits (waterproof, load-rated, heat).
  - ~30 targeted rewrites of top-of-article notes, wallet card-fit notes, the
    per-pattern note in the article template, the homepage hero and section
    copy, and the About, author, and disclosures pages.
- **Preserved as required disclosure (C):**
  - The disclosures page still states that illustrations are computer-generated
    (including with AI tools), that writing is AI-assisted and editor-checked,
    and that patterns are calculated from gauge, not test-crocheted.
  - AdSense cookie disclosures on the EU/UK and US privacy pages.
  - Genuine safety and fit limits in article bodies (heat not tested on the bowl
    cozy, grip not tested on slippers, hood/ear-warmer fit caveats).
- **Flagged for the owner (D):** the contact email (see section 8).

## 4. Articles reviewed

All 69 published articles were reviewed; 69 were edited (every post file
changed, mostly by the caption/description pass). 12 shared pages/components and
`astro.config.mjs` were edited. Seven SVG assets were edited.

## 5. Before and after (public copy)

| Where | Before | After |
| --- | --- | --- |
| Wallet result caption | "AI illustration: Not a photograph of a made wallet." | "Concept illustration of the finished wallet." |
| Amigurumi caption | "Illustration. The intended look. Not a measured sample." | "Illustration. The intended look." |
| Wallet top section | "## What is checked, and what is not" + a 5-row validation table | "The finished size and card fit here are worked out from the example gauge … slip a real bank card in at round 10 … The picture is a concept illustration of the design." |
| Article template note | "Stitch counts on this page were checked on paper; the project has not been made in yarn by this site…" | "Sizes here are worked out from gauge rather than from a finished sample, so swatch and measure as you go, and the pictures of finished pieces are illustrations." |
| Homepage hero | "Project pages that have not been made in yarn say so, and their pictures are labeled illustrations." | "…work through clear project guides with step-by-step diagrams for the parts beginners get stuck on." |
| Contact page | Visible "Note for the site owner: AdSense requires…" (gated) | Server-side comment, never rendered |

## 6. Author and trust pages

The About, `/author/amine/`, and disclosures pages were made natural and
consistent. The AI-tooling narration was removed from About and the author page
and now lives only on the disclosures page, which links are added to. M. Amine
is described as publisher and editor who checks instructions, never as a maker.

## 7. Publication dates

No dates were changed this release. The corrections from the prior pass
(`planning/PUBLICATION_DATE_AUDIT.csv`) stand; `datePublished` / `dateModified`,
visible dates, and sitemap `lastmod` remain consistent (checked by
`check-dist-seo.mjs`, 0 problems).

## 8. Contact information still needed

`SITE.email` holds `thecrochetguiide@gmail.com` (note the double "i"), which the
owner has not confirmed. The answer previously given, "crochetexplained.com", is
a domain, not an address. The contact page currently shows this address and also
routes to social, so a functional contact method exists; confirming or replacing
the address is the one open content item.

## 9. Images

No illustrations were deleted. All 241 photo-style illustrations are kept and
are labeled (visual-audit: 0 flagged). Seven SVG diagrams had audit text removed
from the drawing itself. Captions that could read as a photo now say "Concept
illustration".

## 10. Diagrams

182 SVGs, 0 invalid, 0 unused. No new diagrams were required for this release;
the existing step-diagram system covers the practical tutorials. 22 older
640-wide diagrams still use small text and are listed for a future redraw.

## 11. Usability

Progress checklists (42 articles), the stitch-counter link, and print styles
from the prior pass are unchanged and verified in the rendered pages.

## 12. QA and build results

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 8 hints |
| `npm run build` | 89 pages |
| `check-dist-seo.mjs` | 69 pages, 0 problems |
| `visual-audit.mjs` | 476 images, 241 illustrations labeled, 0 flagged |
| `check-internal-links.mjs` | 0 broken from non-draft pages |
| `validate-diagrams.mjs` | 182 SVGs, 0 invalid, 0 unused |
| `verify-release.mjs` | 85 sitemap URLs, 0 duplicates; stocking and tree skirt not built, not in sitemap |
| `quality-matrix.mjs` | 50 in length range, 19 long; 67 with a near-top disclosure; 2 technique pages without one (acceptable) |
| Rendered dist grep | No AI/audit/owner-note text outside the privacy and disclosures pages |

## 13. Rendered-page review

Captured with headless Chrome against the preview build:

- Homepage, desktop and 390px: clean hero, course list, no internal copy.
- Black cat wallet, desktop and 390px: byline, "At a glance", a natural note
  near the top, no validation table, "Concept illustration" caption, no
  horizontal scroll on mobile.
- Author page, desktop: professional, no AI-tooling narration.
- Gnome page, desktop: diagrams and natural note render correctly.

## 14. Withheld content

The two withheld tutorials (Christmas stocking, Christmas tree skirt) and the
eight `free-pattern-*` drafts remain `draft: true`, are not built, and are not in
the sitemap.

## 15. Preserved infrastructure

`public/ads.txt`, `public/robots.txt`, `vercel.json`, `ADSENSE_CLIENT`, the
publisher ID, `AdSlot.astro`, and the Pinterest/analytics IDs were not modified.
Output is still plain static files, compatible with Vercel and Cloudflare.

## 16. Outstanding and remaining

1. **Owner:** confirm or supply the contact email.
2. **Owner:** confirm or replace the placeholder social handles.
3. Redraw the 22 small-text legacy 640-wide diagrams.
4. 19 articles run over 1,800 words (see `CONSOLIDATION_RECOMMENDATIONS.md`).
5. A blank last page appears when printing some long articles (cosmetic).

## 17. Git files changed

69 article files, 12 files under `src/pages` / `src/components` / `src/layouts`
plus `astro.config.mjs`, 7 files under `public/diagrams`, new scripts under
`scripts/`, and the planning reports. Run `git status` and `git diff` to review;
start with `about.astro`, `author/amine.astro`, `contact.astro`,
`privacy-policy.astro`, `index.astro`, `astro.config.mjs`, and the six wallet
posts.

## 18. Deployment readiness

Ready for owner review. Recommended order once approved: answer the email item,
review the diff, then commit, push `main`, and fast-forward `adsense-recovery`.
Do not submit to AdSense; that remains the owner's separate decision.
