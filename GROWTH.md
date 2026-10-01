# Traffic goal: 3,000 visitors by Christmas

**Window:** now → 25 Dec 2026  
**Target:** **3,000** unique site visits on `www.crochetexplained.com`  
**Primary channel:** Pinterest (then Facebook / reels). Google search helps, but Pins win this window.

3,000 in ~85 days ≈ **35 visits/day average**. Peak harder in December.

## Scoreboard (fill weekly)

| Period | Target visits | Focus | Actual |
| --- | --- | --- | --- |
| 1–31 Oct | **800** | Halloween projects + wallet | |
| 1–30 Nov | **900** | Beginner evergreen + early Christmas Pins | |
| 1–25 Dec | **1,300** | Christmas projects hard push | |
| **Total** | **3,000** | | |

Track in **Google Analytics** (once `GA_MEASUREMENT_ID` is set in `src/config.ts`) and cross-check **Search Console** clicks.

## What you do (non-negotiable weekly)

Every week until Christmas:

1. **Post at least 5 Pins** → each links to one of the priority URLs below (not just the homepage).
2. **Post at least 3 short videos** (Pinterest Idea Pins / Facebook / TikTok) → same outbound link in the caption or bio link.
3. **One save-optimized Pin per priority article** (clear finished object, text overlay with the project name, vertical 2:3).
4. In Search Console: request indexing only for new/updated URLs; otherwise leave it alone.

## Priority URLs to push

### Phase A — through 2 Nov (Halloween)

1. https://www.crochetexplained.com/halloween-crochet-card-wallet/
2. https://www.crochetexplained.com/how-to-crochet-a-pumpkin-step-by-step/
3. https://www.crochetexplained.com/crochet-ghost-amigurumi-for-beginners/
4. https://www.crochetexplained.com/how-to-crochet-a-spider-and-web/
5. https://www.crochetexplained.com/bat-amigurumi-wings-body-and-ears/
6. https://www.crochetexplained.com/halloween-granny-square-variations/

### Phase B — Nov (bridge traffic)

1. https://www.crochetexplained.com/start-here/
2. https://www.crochetexplained.com/what-you-need-to-start-crocheting/
3. https://www.crochetexplained.com/basic-crochet-stitches/
4. https://www.crochetexplained.com/how-to-crochet-a-snowflake/ *(start pinning early)*
5. https://www.crochetexplained.com/how-to-crochet-a-gnome/

### Phase C — Dec (Christmas)

1. https://www.crochetexplained.com/how-to-crochet-a-snowflake/
2. https://www.crochetexplained.com/how-to-crochet-a-christmas-tree/
3. https://www.crochetexplained.com/crochet-santa-amigurumi-for-beginners/
4. https://www.crochetexplained.com/how-to-crochet-a-gnome/
5. https://www.crochetexplained.com/christmas-granny-square-variations/
6. https://www.crochetexplained.com/yarn-for-christmas-crochet/

## Site switches (agent / config)

| When | Action |
| --- | --- |
| After Halloween (≈ 3 Nov) | Set `OCCASION_THEME_FORCE` in `src/config.ts` to `null` (or `"christmas"` to preview early) |
| From mid-Nov | Christmas skin + snowflake lead CTA are already wired in `src/lib/occasions.ts` |
| Anytime | Paste GA4 id into `GA_MEASUREMENT_ID` in `src/config.ts`, then deploy |

## Why this hits 3k

- Halloween and Christmas crochet are high-save Pinterest topics.
- You already have pictured step-by-step pages ready to receive that traffic.
- 5 Pins + 3 videos/week into those URLs is enough volume for 3k if creatives show the finished object first.

## Do not waste time on

- Chasing AdSense “ads.txt” status refreshes daily
- Rewriting old articles instead of posting Pins
- Ranking for huge head terms (“crochet”) before seasonal project terms
- Building new site features instead of shipping Pins to live URLs

## Mid-point check (15 Nov)

If total visits are under **1,200**, double Pin volume for two weeks and only push the top 3 URLs that already get saves. Do not spread thin across every article.
