# The Crochet Guide — project context

Read this before making changes. It covers what this project is, the rules that
are not negotiable, and the conventions to follow. Setup and deploy steps live
in `README.md`.

## What this is

A static content site at `thecrochetguide.com`: free crochet tutorials,
printable reference charts, and gear guides, written for a **United States**
audience.

The business model is a funnel. Short vertical videos on Pinterest, Facebook,
TikTok, and Instagram drive traffic to written tutorials here, and the site
earns from Google AdSense display ads plus affiliate links in the gear guides.
Pinterest is the primary traffic source, not TikTok, because it links out
directly with no follower gate.

Every decision follows from that: the site must load fast, rank in Google, pass
AdSense review, and give a visitor a reason to read a second page.

## Stack

Astro 5 (static output) + Tailwind CSS 4 + Markdown content collections.
Deployed on Vercel — no adapter needed, it auto-detects Astro.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run check    # astro check, must stay at 0 errors
```

## Repo map

| Path | What it is |
| --- | --- |
| `src/config.ts` | **All branding and the course order.** Site name, domain, author, socials, AdSense IDs, categories, nav, `LEARNING_PATH`. |
| `src/content/posts/*.md` | The 16 articles. One file per article; the filename becomes the URL. |
| `src/content.config.ts` | Frontmatter schema. Build fails on invalid frontmatter, which is intentional. |
| `src/lib/learningPath.ts` | Resolves `LEARNING_PATH` into step numbers and prev/next links. |
| `src/pages/[slug].astro` | Renders every article. |
| `src/pages/start-here.astro` | The course overview page. |
| `src/components/AdSlot.astro` | Ad placement. Renders nothing until a publisher ID exists. |
| `src/styles/global.css` | Palette, article typography, print styles. |

## Non-negotiable constraints

These are not style preferences. Breaking any of them costs real money or
creates legal exposure.

**1. Never reproduce another designer's crochet pattern.** Not verbatim, and
not reworded — rewording protected expression creates a derivative work, which
is still infringement. Crochet designers file DMCA notices aggressively, and
Google treats reworded copies as scraped content. Techniques, stitch
definitions, and industry standards (Craft Yarn Council hook and yarn charts)
are facts and are free to explain in our own words. Specific designed projects
are not. Round-ups link out to the designer's own page.

**2. Never invent a fact, a measurement, or a URL.** Conversion charts get
copied around the internet with errors baked in. Write them from known
standards, not from other blogs. Verify every external link returns a live page
before publishing it. If a source cannot be verified, name it without linking.

**3. Never present a computer-generated image as a real finished object.** The
`/disclosures` page promises this publicly. AI illustrations and diagrams are
allowed and must be labeled in the caption. AI images of finished crochet items
presented as makeable are not, and no article may describe a pattern for an
object nobody has physically made.

**4. Never ship an empty ad container.** `AdSlot.astro` renders nothing while
`ADSENSE_CLIENT` is empty. Keep it that way until AdSense approves the site —
empty ad slots are a common rejection reason.

**5. Never add a fake contact address, author, or social handle.** `SITE.email`
is deliberately empty because no inbox exists yet; pages detect this and route
to `/contact`, which falls back to social. Do not fill placeholders with
invented values to make a page look complete.

**6. US crochet terminology, always.** American readers use `sc` / `hdc` / `dc`.
UK terms name different stitches with the same abbreviations. Where the
difference matters, state it explicitly rather than leaving the reader to find
out.

**7. US English spelling.** color, aluminum, labeled, memorize.

## Writing an article

Create `src/content/posts/<url-slug>.md`. The filename is the URL, so use
lowercase hyphenated words with the target keyword in it.

```markdown
---
title: "How to Crochet a Magic Ring"
description: "Under 160 characters. Shows in Google and in listings."
pubDate: 2026-09-15
category: skills          # charts | skills | patterns | gear
level: beginner           # beginner | intermediate | advanced
printable: true           # adds a Print button
howTo: true               # adds HowTo structured data — only if it really is steps
videoUrl: "https://..."   # optional embed of the matching short video
tags: ["magic ring", "beginner"]
draft: false              # true keeps it out of the build
---
```

Two callout boxes are available in Markdown. Keep blank lines inside the divs
so Markdown still renders:

```html
<div class="tip">

For genuinely useful advice.

</div>

<div class="warning">

For things that will cost the reader time or yarn.

</div>
```

**Structure every article the same way:** open with the reader's problem in one
or two sentences, deliver the substance, then a section on the mistakes people
actually make, then `## Frequently asked` with real questions. The
troubleshooting and FAQ sections are the differentiator — competing crochet
sites explain techniques but almost never explain what goes wrong.

**Length:** 1,000–1,800 words. Every current article is in that range.

**Cross-link** two or three other articles inline using relative paths like
`/crochet-abbreviations-chart`. This is what turns one pageview into two, which
is most of the difference in ad revenue at the same traffic.

## The guided course

All 16 articles are ordered into 6 stages by `LEARNING_PATH` in
`src/config.ts`. That single array powers the `/start-here` page, the
"Step N of 16" badge on each article, and the next-step card at the bottom.

To reorder, move a slug. To add an article to the course, drop its slug into a
stage. Articles not listed still publish normally and fall back to a
related-articles list instead of step navigation. A slug pointing at a missing
post is skipped rather than throwing, and step numbers stay contiguous.

## Voice

Write like a knowledgeable friend who respects the reader's time. Direct,
concrete, no filler, no hype, no "in today's world" openings. Say the useful
thing first.

Admit what is genuinely uncertain — crochet has real unstandardized areas, like
whether a turning chain counts as a stitch, and saying so builds more trust than
pretending otherwise. Tell readers when they can skip something; the gauge
article says outright that you do not need to swatch a dishcloth.

No emoji. No exclamation marks. Do not address the reader as "crafters" or
"my lovelies."

## Design

Warm paper background, brown ink, terracotta accent, soft sage. Reads like a
craft book, not a tech blog. Tokens are defined in `@theme` in
`src/styles/global.css` — use the Tailwind classes derived from them
(`text-ink-soft`, `border-rule`, `bg-paper-deep`), never hardcoded hex.

| Token | Hex |
| --- | --- |
| `paper` | `#fdfaf6` |
| `paper-deep` | `#f6efe6` |
| `ink` | `#2f2a26` |
| `ink-soft` | `#6d635a` |
| `ink-faint` | `#9a9088` |
| `terracotta` | `#b0604a` |
| `terracotta-deep` | `#8f4a37` |
| `sage` | `#7d8b72` |
| `rule` | `#e6ddd1` |

Serif headings, sans body, both from system font stacks — no web fonts, no
external requests, so Core Web Vitals stay near perfect. Ad revenue tracks page
speed, so do not add a font, an analytics script, or a JavaScript dependency
without a concrete reason.

Print styles matter. Crocheters print charts constantly. Anything that should
not print gets `class="no-print"`.

## Current status

- 16 articles, 28 pages, `npm run check` at 0 errors.
- Repo: `github.com/xceppp/THECROCHETGUIDE`.
- Domain not yet live. AdSense not yet applied for — needs the custom domain,
  a real inbox, and a real author identity first.
- `SITE.author` is the placeholder "Nora Bell", kept deliberately.
- `SITE.email` is empty, kept deliberately.
- Social URLs in `SOCIALS` are placeholder handles awaiting the real accounts.
- Empty sections are an AdSense problem, so every nav category has content.

The full pre-application checklist is in `README.md`.
