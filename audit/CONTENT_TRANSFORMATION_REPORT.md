# Content transformation report

Local branch `adsense-recovery`. Not pushed. Not deployed.

The three supplied crochet books are not in this workspace. They were not opened, quoted, or paraphrased.

## What changed in the articles

Twenty-seven pages that the audit marked IMPROVE now have a topic-specific check, a removed marketing claim, or a corrected number. Six course lessons gained a worked example. About now says a digital draft is not a yarn test and that stitch text is not copied from a textbook. That sentence was already partly present and was kept.

Examples of the substance, not a word-count pass:

- Scarf and baby blanket: width is the reader's own stitches per inch, with the multiply written out. The published planning counts stay labeled as planning counts.
- Mug cozy: the Pinterest opening is gone. A 10-inch mug at 4 sc per inch is 36 rows for a 9-inch body. Yardage is labeled a guess.
- Halloween coasters: 48 stitches at 4 per inch are 12 inches around, and 12 / π is about 3.8 inches across. The page had called that roughly 4 inches.
- Christmas stocking: the foot length now matches the rounds. Twenty-five rounds at 5 rounds per inch are 5 inches. The old 7.5-inch line did not match that count. The heel setup 6 + 12 + 20 + 12 = 50, and the five decrease rounds down to 40, were checked as addition. The stocking was not crocheted.
- Phone case: Apple's published iPhone 18 Pro Max body size was re-checked against https://support.apple.com/en-us/148591 (3.07 in, 6.43 in, 0.34 in). The page now says those numbers are the phone, not a measured sleeve.
- Card wallet: the hero caption now says illustration. The card size is ISO/IEC 7810 ID-1, and the wallet is still not fitted.
- Halloween and Christmas granny pages each say what the other page is for, so they are not two copies of "seasonal granny squares."
- Scrunchie and flower lost the "photographs well / traffic" openings. The scrunchie length is twice the elastic you measured. The flower leaf is 6 stitches on a chain of 7.

## What did not change

No URL was retired. No redirect was added. No project was marked yarn-tested. No new finished-object photo was generated. The homepage hierarchy and `OCCASION_THEME_FORCE = null` were left as they were.

The 23 consolidation candidates are different objects that share a template (a bag is not a laptop sleeve). Merging them would delete instructions for an object the other page does not teach. They stay published, still untested. See `CONSOLIDATION_DECISIONS.csv`.

## Publish-ready

A page can teach a method and still be unfit to call a finished pattern. Arithmetic that adds up is not a sample. None of the project pages are marked fully publish-ready as tested patterns.

## Later pass, same day

Compared every published paragraph of 120 characters or more. None is copied across three or more articles, so the 23 project pages were not merged and their Care sections were not rewritten into one shared block.

Five course and reference pages were edited where a statement was missing or wrong:

- The basic-stitches lesson now teaches the slip knot before the chain.
- The abbreviations chart no longer calls `dc3tog` a number written after a stitch, and it states that the 24-stitch repeat stays at 24 only when the row you are working into has 24 stitches.
- The left-handed lesson no longer says the skill is no harder than following an unflipped right-handed video.
- The starter page and the yarn-weight chart now say their yardage tables are shopping ranges, not yarn weighed for this site.

The three reference books are still not in the workspace.

## Verification on 10 October 2026

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 3 pre-existing hints. During content sync it warned that the edited post ids were duplicated. The production build did not repeat that warning. |
| `npm run build` | Completed. Sitemap written. `basic-crochet-stitches` appears once. |
| Stocking page in `dist` | The built HTML says 5 inches for 25 rounds, not 7.5. |
| Internal links | `node scripts/check-internal-links.mjs` reported 0 broken links from published posts and the main editorial pages. |
| Browser and live site | Not checked. These edits are not deployed. |
