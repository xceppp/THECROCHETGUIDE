# Production readiness — Crochet Explained

**Date of this check:** 12 October 2026 (UTC)  
**Production origin:** `https://www.crochetexplained.com/`  
**Deployed commit:** `650a9d4` (`main` → `origin/main`)  
**Workflow:** GitHub push to `main` → Vercel production (no Vercel CLI in this environment)

This report records **tests that were actually run**. It does not guarantee AdSense approval. AdSense was **not** resubmitted.

**Recommendation: GO** for a human to request AdSense re-review from the dashboard, after reading *Outstanding issues* and *What was not tested*.

---

## 1. Git and deploy

Inspected working tree at start of this pass:

- Branch: `main`, tracking `origin/main` at `6f5231f`.
- Consolidation already on `main` (`12eb323`, `bd69c03`, `6f5231f`).
- Only pending change: `vercel.json` `permanent: true` → `statusCode: 301`.

Live probe **before** that commit:

| Retired URL (trailing slash) | Status | Location |
| --- | --- | --- |
| all 9 listed in §3 | **308** | correct hub |

Vercel maps `permanent: true` to **308 Permanent Redirect**. The pending edit was the correct fix for a genuine **301**.

Committed as `650a9d4` ("Emit HTTP 301 instead of Vercel 308 for consolidated URLs") and pushed to `origin/main`. Re-probed after deploy; Vercel edge now returns `HTTP/1.1 301 Moved Permanently` with `x-vercel-id` present.

No articles were rewritten. No new libraries. Architecture unchanged.

---

## 2. Local validation (this machine, after cache clear)

`node_modules/.astro/data-store.json` deleted, then:

| Command | Result |
| --- | --- |
| `npm run check` | **0 errors**, 0 warnings, 8 pre-existing hints |
| `npm run build` | clean, **84 pages** |
| `node scripts/check-internal-links.mjs` | broken-looking 11; **from non-draft sources: 0** |
| `node scripts/check-dist-seo.mjs` | 64 article pages, **problems 0** |
| `node scripts/verify-release.mjs` | missing course 0, missing charts 0, sitemap locs 80, duplicate locs 0. 13 caption notes are existing `Concept illustration` wallet captions (allowed). Two draft slugs (`christmas-stocking`, `christmas-tree-skirt`) correctly unbuilt. |
| `node scripts/visual-audit.mjs` | images 441, **flagged 0** |
| `node scripts/quality-matrix.mjs` | 64 rows written. FAQ on 64/64. "Missing near-top untested statement" only on two technique pages (`basic-crochet-stitches`, `how-to-read-a-crochet-pattern`), which is expected. |

---

## 3. Retired URLs — production HTTP 301

Method: `curl.exe -sI --max-redirs 0` against each trailing-slash URL (the indexed form).

| Old URL | Status | Location | Match |
| --- | --- | --- | --- |
| `/how-to-crochet-a-laptop-sleeve/` | **301 Moved Permanently** | `/how-to-crochet-a-device-case/` | yes |
| `/how-to-crochet-a-book-sleeve/` | **301 Moved Permanently** | `/how-to-crochet-a-device-case/` | yes |
| `/how-to-crochet-an-earbud-pouch/` | **301 Moved Permanently** | `/how-to-crochet-a-device-case/` | yes |
| `/how-to-crochet-a-lip-balm-holder/` | **301 Moved Permanently** | `/how-to-crochet-a-device-case/` | yes |
| `/how-to-crochet-a-ghost-coin-pouch/` | **301 Moved Permanently** | `/how-to-crochet-a-drawstring-bag/` | yes |
| `/how-to-crochet-a-ghost-candy-bag/` | **301 Moved Permanently** | `/how-to-crochet-a-drawstring-bag/` | yes |
| `/how-to-crochet-a-pumpkin-treat-bag/` | **301 Moved Permanently** | `/how-to-crochet-a-drawstring-bag/` | yes |
| `/how-to-crochet-a-mini-shoulder-bag/` | **301 Moved Permanently** | `/how-to-crochet-a-strap-bag/` | yes |
| `/how-to-crochet-a-phone-crossbody/` | **301 Moved Permanently** | `/how-to-crochet-a-strap-bag/` | yes |

No-slash form (not one of the nine indexed URLs): `/how-to-crochet-a-laptop-sleeve` returns **308** → `/how-to-crochet-a-laptop-sleeve/` (Vercel trailing-slash normalization), then the 301 above. That is expected with `trailingSlash: true`.

---

## 4. Hubs — 200, indexable, in sitemap

| Hub | HTTP | Canonical (from live HTML) | `noindex` | In `sitemap-0.xml` |
| --- | --- | --- | --- | --- |
| `/how-to-crochet-a-device-case/` | **200** | `https://www.crochetexplained.com/how-to-crochet-a-device-case/` | absent | yes |
| `/how-to-crochet-a-drawstring-bag/` | **200** | `https://www.crochetexplained.com/how-to-crochet-a-drawstring-bag/` | absent | yes |
| `/how-to-crochet-a-strap-bag/` | **200** | `https://www.crochetexplained.com/how-to-crochet-a-strap-bag/` | absent | yes |

Live sitemap:

- `https://www.crochetexplained.com/sitemap-index.xml` → 200, points at `sitemap-0.xml`
- `sitemap-0.xml`: **80** `<loc>`, **0** duplicates
- All 9 retired slugs: **0** hits in the sitemap

Viewport on each hub: `width=device-width, initial-scale=1`.

---

## 5. Technical files, ads, navigation, homepage, images

### robots.txt / ads.txt

| URL | HTTP | Body checked |
| --- | --- | --- |
| `/robots.txt` | 200 | `Allow: /`, `Disallow: /tools/`, sitemap → `sitemap-index.xml` |
| `/ads.txt` | 200 | `google.com, pub-5737689254964633, DIRECT, f08c47fec0942fa0` |

### AdSense markup (live hub + home HTML)

- `adsbygoogle.js?client=ca-pub-5737689254964633` present in `<head>` (1 reference per page checked).
- `<ins class="adsbygoogle">` count: **0**
- `aria-label="Advertisement"` asides: **0**

This matches empty `ADSENSE_SLOTS` in `src/config.ts`: verification loader ships; no empty ad boxes render.

### Critical pages (HEAD, no follow)

All **200**: `/`, `/start-here/`, `/about/`, `/author/amine/`, `/disclosures/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/tutorials/`, `/charts/`, `/free-patterns/`, `/gear/`.

### Homepage links (parsed from live `/` HTML)

- Nav targets present: `/start-here/` (5), `/tutorials/` (4), `/charts/` (5), `/free-patterns/` (6), `/gear/` (4), `/about/` (3), `/disclosures/` (1), `/author/amine/` (1).
- Hubs linked: device-case 2, drawstring-bag 2, strap-bag 2, phone-case 1.
- Retired slugs: **0** leftover homepage links.

### Images

- Device-case live assets sampled (lead webp, diagrams, mark): all **200**.
- Hub pages: 0 images with empty `src`; 0 missing `alt` on article images (device-case 14, drawstring 9, strap 6).
- Homepage listing thumbnails use `alt=""` in `PostCard.astro` (12 cards). Adjacent card titles supply the name. This is a pre-existing listing pattern, not introduced by this release.

---

## 6. Content / reviewer inspection (fetched live HTML)

Performed by fetching and reading the live pages (not a logged-in AdSense crawl).

| Page | Original instructional value | Authorship / transparency |
| --- | --- | --- |
| Device-case hub | Two constructions, decision guide, worked laptop / book / earbud / lip-balm math, troubleshooting, FAQ | "Published by M. Amine"; links `/author/amine/` |
| Drawstring-bag hub | Four-stage method + three worked sizes + belly variation, troubleshooting, FAQ | Same |
| Strap-bag hub | Folded body + worked strap, shoulder vs crossbody, box-and-X attach, stretch-after-wear, troubleshooting, FAQ | Same |
| `/about/` | Publisher (not designer) stated; paper-check vs yarn-test distinguished; disclosures linked | M. Amine named |
| `/start-here/` | 12-step course with working links | Course overview intact |
| `/disclosures/` | 200; illustration / testing disclosure lives here | Present |

Navigation on those pages is the same site header/footer used on home (targets above all 200).

---

## 7. Mobile / layout

**Not tested in a real browser or device.** No browser automation tools were available in this session.

What *was* checked:

- Viewport meta is present on home, hubs, about, disclosures, author.
- Listing cards already use responsive `srcset` / `sizes` in `PostCard.astro`.
- Live article HTML is long-form, sectioned, and not an empty template.

What was **not** checked: wrap at 320 px, overflow/horizontal scroll, tap targets, CLS from late images, visual theme (`body` class on live home is `theme-food`).

---

## 8. Outstanding issues

1. **Listing-card `alt=""`** on the homepage (12 images). Card titles sit next to the image. Not a content-quality blocker; optional a11y follow-up.
2. **No interactive browser pass.** Layout and mobile behavior are inferred from HTML/CSS, not seen.
3. **`SITE.email` / socials** remain the older unconfirmed values noted in repo docs. Not a production HTTP failure.
4. **Approval is Google's decision.** This pass removed the templated-duplicate signal and proved the redirects. It cannot promise a second review will pass.

None of these failed a critical HTTP or validation gate.

---

## 9. GO / NO-GO

| Gate | Status |
| --- | --- |
| 9 retired URLs return genuine production **301** to the correct hub | **PASS** (tested) |
| 3 hubs return **200**, self-canonical, indexable, in live sitemap | **PASS** (tested) |
| Retired URLs absent from live sitemap | **PASS** (tested) |
| robots.txt, ads.txt, sitemap-index | **PASS** (tested) |
| AdSense verification script present; 0 empty ad slots | **PASS** (tested) |
| Homepage / nav / trust pages 200; homepage points at hubs, not retired URLs | **PASS** (tested) |
| Local check / build / link / SEO / release / visual-audit | **PASS** (tested) |
| Real-device / browser visual QA | **NOT RUN** |

**GO** — request the AdSense re-review from the dashboard when you are ready. Do not treat this as a guaranteed approval.

---

*Supporting files: `audit/ADSENSE_READINESS.md`, `audit/REDIRECT_PLAN.csv`, `audit/CONSOLIDATION_DECISIONS.csv`, `planning/ARTICLE_QUALITY_MATRIX.csv`.*
