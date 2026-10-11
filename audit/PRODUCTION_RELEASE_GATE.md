# Production release gate

Branch: `adsense-recovery`. Not pushed. Not deployed. Date of this check: 10 October 2026.

## 1. Confirmed fixes

- Homepage leads with the 12-step course. Built `dist/index.html` body class is `flex min-h-screen flex-col`. It does not carry `theme-halloween`. The string `theme-halloween` still appears in the theme-toggle script, which only checks for that class.
- `OCCASION_THEME_FORCE` is `null`.
- Sixteen oversized article images were recompressed in place. Filenames did not change.
- Disclosure and About text still say an illustration is not a yarn test.
- Christmas stocking foot length remains 5 inches for 25 rounds. The built page contains that sentence. Canonical is `https://www.crochetexplained.com/how-to-crochet-a-christmas-stocking/`.
- This pass corrected three more contradictions. See section 2.

No URL was renamed. No redirect was added. `vercel.json` still has headers only. No page was set to `draft: true`.

## 2. Article quality improvements in this gate

Three of the 31 untested project pages had a number that did not match their own stitch math. Those lines were corrected. No finished size was invented from a sample.

| Page | What was wrong | Correction |
| --- | --- | --- |
| `/how-to-crochet-a-pumpkin-zipper-pouch/` | Opening said about 3.5 inches across. The same page's 48 stitches at 4 sc per inch are 12 inches around, and 12 ÷ 3.14 is about 3.8. | Opening now says about 3.8 inches across and 3 inches tall, with that multiply written out. |
| `/how-to-crochet-a-christmas-tree-skirt/` | Row 24 was called about 36 inches across. Row 24 is 312 stitches. At 3 dc per inch that edge is 104 inches around, about 33 inches across. The 36-inch figure is the other estimate: 16 inches of row height on each side of a 4-inch hole. | Both estimates are now on the page. The tape on the floor is the stop rule. |
| `/how-to-crochet-a-christmas-gift-card-holder/` | Card size was written 3.37 by 2.13 inches. | Aligned to ISO/IEC 7810 ID-1: 3.370 by 2.125 inches, with a note that a store gift card can be shorter. |

The other 28 untested pages were read for structure: a title that matches the object, a stitch sequence or an honest "ideas" scope, and a statement that the object was not made in yarn. They were not rewritten again in this pass.

## 3. Duplicate-ID warning

There are not two files for one article.

- 73 Markdown files in `src/content/posts`.
- 0 duplicate filenames.
- `tinyglobby` (`**/*.md`) returns 73 paths and 0 duplicate paths. That is the same glob the content loader uses.

The warning comes from Astro's glob loader (`node_modules/astro/dist/content/loaders/glob.js`, the `store.has(id)` check). When a file that is already in the content store changes, the digest no longer matches, the loader does not take the early return, and it logs "Duplicate id" while overwriting that same id with the same file.

Evidence from this session:

- The first `npm run check` after the three edits warned only for those three slugs.
- The production build that followed did not warn.
- A second `npm run check`, after the store had the new digests, did not warn.
- The sitemap has 82 locations and 0 duplicate locations.

No collection config change and no URL change. The warning will appear again the next time an article file changes, then disappear on the following sync. It does not publish two copies.

## 4. Publish / revise / withhold

31 published pages whose own text says the project was not physically made.

| Decision | Count | Meaning |
| --- | --- | --- |
| PUBLISH | 28 | Instructions or idea-lists are complete enough to follow, and the page says it was not yarn-tested. |
| REVISE | 3 | The three rows in section 2. The corrections are in the files. After those edits they can stay published. |
| WITHHOLD | 0 | No page failed its headline by missing the construction it promises. None were switched to draft. |

Physical testing was not the reason any page was kept or dropped. A page with a full stitch sequence and an honest limit stayed up. A page that only said "not tested" and then skipped the object would have been drafted. That second case was not found in this set.

The 28 PUBLISH pages are still untested drafts. "Publish" here means safe to leave on the site as written, not safe to call a fitted sample.

## 5. Critical content blockers

- No crocheted sample, measurement log, or photograph of a finished object is in the repo.
- The October cluster of similar small projects is still 23 separate URLs. They are different objects. They still look alike.
- The three reference books named in the recovery brief are not in the workspace and were not used.

These block a claim of tested patterns. They do not block shipping the corrections that are already written.

## 6. Build and validation

| Check | Result |
| --- | --- |
| `npm run check` (after the store caught up) | 0 errors, 0 warnings, 3 pre-existing hints |
| `npm run build` | Completed. No duplicate-id warning in that build. |
| Content IDs | 73 files, 0 duplicate names, 0 duplicate glob paths |
| Internal links | 0 broken links from published posts and the main editorial pages |
| Sitemap | 82 `<loc>` values, 0 duplicates |
| Canonical | Stocking page canonical is the live article URL |
| Images | Every published Markdown image path exists. Every caption starts with "Illustration." |
| Redirects | None in `vercel.json` |
| Course files | All 12 `LEARNING_PATH` slugs exist. Previous and next still come from `src/lib/learningPath.ts`. |
| Charts | Abbreviations, hook size, and yarn weight files exist |
| Browser | Not available in this session. Not claimed. |
| Mobile menu | The header source has a button shown below the `lg` breakpoint and a dialog panel. It was not clicked. |

## 7. Deployment risks

- This branch is ahead of what is live only as local edits. Production will not change until you push and Vercel builds it.
- Deploying does not remove the untested project cluster.
- One pumpkin zipper image is still about 1.1 MB after compression.
- The duplicate-id warning can show up in a future CI log the first time a Markdown file changes. The build in this gate did not fail on it.

## 8. Production deployment

**GO**, for this branch, if you want the corrections on the live site.

Nothing in the diff deletes a URL, adds a redirect, or marks a page draft. The build succeeds. The stocking, tree skirt, and zipper-pouch numbers now match the stitch counts on those pages.

This GO is for publishing the branch. It is not a claim that every project has been crocheted.

## 9. AdSense resubmission

**NO-GO.**

Google's stated problem was low-value content. This branch makes the course easier to find and removes some wrong numbers. It does not reduce the set of similar untested project pages, and it does not add a physical sample. Resubmitting now would send the same kind of site back for review. Approval is not guaranteed after samples either. That is not a new rule. It is the limit of what this repo can show.

## Files that will change

56 tracked files differ from the last commit, plus untracked `audit/` and five scripts under `scripts/`. No publication-state or URL change needs a separate approval beyond the decision to deploy.

Tracked:

- `src/config.ts`
- `src/pages/index.astro`, `about.astro`, `disclosures.astro`
- 36 article Markdown files under `src/content/posts/`
- 16 recompressed images under `src/assets/articles/`

Untracked helpers: `scripts/check-internal-links.mjs`, `scripts/compress-large-images.mjs`, `scripts/validate-content-ids.mjs`, `scripts/verify-release.mjs`, `scripts/triage-untested.mjs`, and the `audit/` reports.
