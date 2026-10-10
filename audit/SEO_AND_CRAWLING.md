# SEO and crawling

Checked in the repo before this pass's deploy, and on the live site at `b3bcad7` before these new edits.

- Sitemap at the last production build: 85 locations, 0 duplicates, including the three tools.
- Canonicals on the tool pages and the stitch lesson were self-referencing `https://www.crochetexplained.com/.../`.
- `robots.txt` allows `/` and disallows `/tools/`. The three tools are not under `/tools/`.
- `ads.txt` is `google.com, pub-5737689254964633, DIRECT, f08c47fec0942fa0`.
- `ADSENSE_CLIENT` in `src/config.ts` is the same publisher id. It was not edited.
- `vercel.json` has no redirects.
- Internal-link scan before this pass: 0 broken. It will be rerun after the homepage and Start Here links.
- Googlebot on `robots.txt` returned HTTP 200 in an earlier check. That is not a Cloudflare dashboard review.
- Search Console coverage, queries, and clicks were not available. Do not invent them.

This pass adds three internal links to existing tool URLs. It does not change canonical logic, robots, or ads.txt.
