# Technical audit

Verified from the local source tree unless a line says otherwise. Live HTTP status codes, Cloudflare rules, and Search Console were **not** checked. There is no production crawl in this audit.

## Confirmed from source

| Item | Result | How it was checked |
| --- | --- | --- |
| Published articles | 65 | `draft` is not `true` in frontmatter. 8 other posts are drafts and have no routes. |
| Categories | skills 26, patterns 34, charts 3, gear 2 | Frontmatter `category`. |
| Canonical / site URL | `https://www.crochetexplained.com` | `SITE.url` in `src/config.ts`. Astro `site` must match; confirm in `astro.config.mjs` on build (sitemap uses it). |
| Sitemap | `@astrojs/sitemap` | `astro.config.mjs`. `public/robots.txt` points at `https://www.crochetexplained.com/sitemap-index.xml`. |
| robots.txt | `Allow: /` and `Disallow: /tools/` | No `src` route contains `/tools`. The disallow does not hide a real page. Why it was added is not in the repo. Left unchanged. |
| ads.txt | `google.com, pub-5737689254964633, DIRECT, f08c47fec0942fa0` | Matches `ADSENSE_CLIENT`. |
| Ad slots | Empty | `AdSlot.astro` renders no markup when the slot id is blank. No empty ad box in the template. |
| Analytics | GA4 `G-WSPK5DR3Z5`, GTM `GTM-5PCLM4W5` | Present in config. Not a content-quality fix. Extra third-party scripts can affect LCP; not measured here. |
| Image captions | 0 published images whose Markdown title lacks "Illustration" | `audit/_inventory.mjs` against `src/content/posts`. Captions become `<figcaption>` via `rehypeFigures`. |
| Internal links | 2 links to draft URLs | `easy-crochet-christmas-ornaments.md` linked `/free-pattern-mini-christmas-trees/` and `/free-pattern-snowflake-set/`. Those posts are `draft: true`, so they are not routes. Links removed in this pass. Re-scan after the edit: those two were the only broken internal article links. |
| Course | 12 slugs, 6 stages | `LEARNING_PATH` in `src/config.ts`. Hook-size and yarn-weight charts are intentionally outside it. |
| Trust pages | About, contact, privacy (hub, EU, US), terms, disclosures, cookie settings | Files under `src/pages/`. Footer lists them. |
| Seasonal skin | `OCCASION_THEME_FORCE = "halloween"` | Forces the Halloween palette regardless of the date window in `src/lib/occasions.ts`. On 10 October 2026 that matches the season. It will stay on after 2 November until someone sets it back to `null`. Not changed here. |
| Structured data | WebSite / Article / HowTo depending on the template | Not re-validated against Rich Results. `howTo: true` on a page that is only a materials list would be a problem; spot checks show project pages do contain steps. A full HowTo field audit was not done. |

## Pattern arithmetic (sample, not a yarn test)

`how-to-crochet-a-fall-leaf.md` was checked on paper only:

- Chain 9. First side from the second chain: sc, hdc, 4 dc, hdc, sc = 8 stitches and 8 chains used.
- Two more sc in the tip chain: that chain holds 3 sc, running total 10.
- Return along the other 7 chains: hdc, 4 dc, hdc, sc = 7. Total 17, which matches the page.

That does **not** mean the leaf has been crocheted. The page already says so. No count was edited.

Other project pages were not re-derived stitch by stitch. Thirty pages say the counts were not made in yarn. Treat every one of those counts as unverified.

## Image weight

The production build optimizes images, so the shipped WebP files are smaller than the sources. One source is still far too large for a content photo: `how-to-crochet-a-ghost-candy-bag-result` was about 4.1 MB before optimization (build log: 4120kB). Several bag and scarf sources are 350–550 KB. Worth recompressing the originals later. Not done in this pass, because replacing image bytes is an editorial asset change.

## Uncertainties

- Whether Googlebot is challenged by Cloudflare.
- Whether `www` and the apex host both resolve, and which one is canonical in production.
- Core Web Vitals on the live site. Local source uses system fonts and no ad iframe until a slot id exists, which is the right shape for LCP, but it was not measured.
- Whether the October pages are already indexed. Do not resubmit assuming they are or are not.
- Affiliate link behavior on the gear pages was not clicked through.

## Broken-link fix

See `CHANGES_IMPLEMENTED.md`. Draft pattern URLs must not be linked from published pages.
