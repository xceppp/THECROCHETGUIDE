# The Crochet Guide

Static site for `thecrochetguide.com`. Astro + Tailwind, deploys free on Cloudflare Pages.

## Running it

```
npm install      # once
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run check    # type + template check
```

## Where things are

| Path | What it is |
| --- | --- |
| `src/config.ts` | **All branding.** Site name, domain, author, socials, AdSense IDs, categories, nav. |
| `src/content/posts/*.md` | The articles. One Markdown file per article. |
| `src/content.config.ts` | The frontmatter schema. The build fails if an article's frontmatter is wrong, which is intentional. |
| `src/pages/` | Routes. `[slug].astro` renders every article; the rest are one-off pages. |
| `src/components/AdSlot.astro` | Ad placement. Renders nothing until a publisher ID exists. |
| `src/styles/global.css` | Palette, article typography, print styles. |
| `public/ads.txt` | Needs your real publisher ID before ads will serve. |

## Writing a new article

Create `src/content/posts/your-url-slug.md`. The filename becomes the URL, so
`magic-ring-crochet.md` publishes at `/magic-ring-crochet`. Use lowercase words
separated by hyphens, and put the main keyword in it.

```markdown
---
title: "How to Crochet a Magic Ring"
description: "Under 160 characters. This is what shows in Google and in the listings."
pubDate: 2026-09-15
category: skills          # charts | skills | patterns | gear
level: beginner           # optional: beginner | intermediate | advanced
printable: true           # adds a Print button
howTo: true               # adds HowTo structured data — only if it really is steps
videoUrl: "https://..."   # optional embed URL of your short video
tags: ["magic ring", "beginner"]
draft: false              # true keeps it out of the build entirely
---

Your article. Start with the reader's problem, not a greeting.
```

Two callout boxes are available inside Markdown:

```html
<div class="tip">

Text goes here, with blank lines around it so Markdown still renders.

</div>

<div class="warning">

For things that will cost the reader time or yarn.

</div>
```

Every article should carry `## Frequently asked` at the end with real questions.
It adds genuine value, it holds people on the page, and it picks up long-tail
search traffic.

## Before applying to AdSense

Work through these in order. Do not apply early — a rejection puts you in a
queue and wastes weeks.

1. **Register `thecrochetguide.com`** and attach it to the Vercel project. A
   free `.vercel.app` subdomain is not eligible for AdSense.
2. **Publish at least 15 articles.** Substantial ones, not filler.
3. **Replace the author details** in `src/config.ts` with a real name and bio,
   and add a photo to the About page.
4. **Set up a real inbox** at the address in `src/config.ts` and confirm mail
   arrives.
5. **Add Google Analytics and Search Console**, submit
   `https://thecrochetguide.com/sitemap-index.xml`.
6. **Read `src/pages/privacy-policy.astro`** end to end and confirm every vendor
   listed is one you actually use.
7. **Apply to AdSense.** Once approved, put the publisher ID in
   `ADSENSE_CLIENT`, create three ad units, paste their slot IDs into
   `ADSENSE_SLOTS`, update `public/ads.txt`, and redeploy.
8. **Turn on the consent banner** from the AdSense dashboard under Privacy and
   messaging. Use Google's own GDPR message — it is a certified CMP, which a
   hand-built banner is not, and Google requires a certified one for EEA and UK
   visitors.

## Deploying

Vercel, connected to the git repo. It auto-detects Astro, so there is nothing
to configure — a static Astro site needs no adapter.

- Build command: `npm run build`
- Output directory: `dist`

Every push to `main` deploys. Note that `site` in `astro.config.mjs` is set to
`https://thecrochetguide.com`, so canonical URLs and the sitemap point at the
real domain even while previewing on a `*.vercel.app` URL. That is correct, but
it means the custom domain must be attached before submitting to Search Console
or applying to AdSense.
