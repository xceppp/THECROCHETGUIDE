# AdSense audit — Crochet Explained

**Site:** https://www.crochetexplained.com/
**Source reviewed:** local repository at commit `9398b63` (October Pinterest plan), plus the files changed in this audit.
**Rejection cited:** "Contenu à faible valeur informative" (low-value content).
**This report does not claim that any change will get AdSense approved.**

Google's published bar, from [AdSense content and user experience](https://support.google.com/adsense/answer/10015918) and the [publisher policies](https://support.google.com/adsense/answer/9335564), is:

- Enough unique content that a visitor has a reason to return.
- No scraped or lightly rewritten copies of other sites, and no large set of near-duplicate pages.
- Navigation that matches what the site promises.
- No misleading representation of the publisher or the content.

Search Console traffic and indexing were **not** available from this repository. Nothing below is an inference about live rankings or crawl stats.

## Most likely reasons for this rejection

### 1. A large set of similar project pages, published together — High

65 articles are in the build. 34 are in `patterns`. **34 of those 65 pages use `pubDate` 2026-10-08 or 2026-10-09** (12 + 22). They are mostly small accessories and gifts: pouches, sleeves, bags, holders, cozies.

Google's own guidance says that if many pages are similar, expand each one or consolidate them. A reviewer who opens several of these in a row sees the same shape: a short problem sentence, a "photos are illustrations / not yarn-tested" warning, estimated gauge, a short stitch sequence, and AI-style product photos with illustration captions.

That is original wording, not a scrape of another designer. It can still read as scaled, low-effort inventory. That matches a low-value-content rejection better than a missing privacy policy or a broken sitemap.

### 2. Instructions the site itself says were not made in yarn — High

30 published articles match an explicit untested disclaimer (`not yarn-tested`, `has not been made`, `checked as written`, and close variants). Captions correctly call the pictures illustrations.

A written stitch sequence that has not been worked in yarn is still a pattern for an object nobody has confirmed. The site's own older rule (and the About page) says not to claim a project was handmade unless the page says so. The pages are honest. Honesty does not add the missing evidence that the instructions work. Google's low-value and "genuine user interest" language is about whether the page helps someone succeed, not whether the disclaimer is polite.

8 fuller pattern files are still `draft: true` and are **not** on the public site (`free-pattern-pumpkin-amigurumi`, ghost, spider, bat garland, gnome, santa, snowflake set, mini Christmas trees). Publishing the shorter "how to" versions while holding the longer patterns as drafts is inconsistent, and it puts the thinner pages in front of reviewers.

### 3. The strongest pages are not what the homepage leads with — Medium

The 12-step course in `src/config.ts` (`LEARNING_PATH`) is real reference material: stitches, abbreviations, gauge, color changes, reading a pattern. Those pages are the part of the site that is hardest to call low-value.

The homepage (`src/pages/index.astro`) sorts published posts by date and features the newest seasonal items. After the October burst, the first screen is the accessory cluster, not the course.

### 4. Publisher identity is thin — Medium

About names the "Crochet Explained Editorial Team" and says digital tools may help draft guides. There is a real contact email (`thecrochetguiide@gmail.com`) and real Pinterest and Facebook URLs in `src/config.ts`. There is no demonstrated maker, no tested-sample record, and no explanation of who checks stitch counts.

That is not a fake persona, which is correct. It also does not show the "continuous structural curation" a reviewer looks for when the byline is a team name and dozens of projects appeared on two dates.

### 5. One disclosure overclaimed what the articles can support — Medium, corrected locally

`src/pages/disclosures.astro` said no pattern on the site describes an item that exists only as an image. Many project pages say the opposite: the counts were checked on paper and the object has not been made. That sentence was rewritten so the disclosure matches the articles. See `CHANGES_IMPLEMENTED.md`.

## What this audit did **not** find

- Empty AdSense containers. `ADSENSE_CLIENT` is set (`ca-pub-5737689254964633`) but `ADSENSE_SLOTS` are empty, and `AdSlot.astro` renders nothing unless both exist. `ads.txt` matches that publisher ID.
- A missing privacy, contact, about, terms, or disclosures page. All exist and are linked from the footer.
- Scraped designer patterns presented as this site's work. Round-ups link out. Project pages are written here and labeled untested.
- Images whose captions fail to say "Illustration." The inventory found **zero** published images whose Markdown title lacked that word. `rehypeFigures` in `astro.config.mjs` turns that title into a visible `<figcaption>`.
- A reason to delete pages automatically. No published article was so empty that removal is the honest fix. Consolidation is the alternative Google describes, and it needs a human decision.

## Severity summary

| Factor | Severity | Status |
| --- | --- | --- |
| October cluster of similar project pages | High | Documented. Not merged. |
| Untested stitch instructions presented as tutorials | High | Documented. Not rewritten with invented counts. |
| Homepage led by the newest cluster | Medium | Not changed. |
| Generic editorial byline | Medium | Not replaced with a fictional person. |
| Disclosure stronger than the articles | Medium | Corrected locally. |
| Links to unpublished pattern URLs | Medium | Two links removed. |
