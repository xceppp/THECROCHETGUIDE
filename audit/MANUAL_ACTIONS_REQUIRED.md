# Manual actions required

Nothing below was guessed into the articles.

## Approval needed before any URL change

`audit/REDIRECT_PLAN.csv` proposes **no redirects**. Pairs that look related (market bag vs granny tote, ghost toy vs ghost pouch, pumpkin sphere vs zipper pouch) do not share one search intent. Merging them would drop distinct measurements.

Approve a pair only after you have made one of the objects and can say the other page adds nothing. Then add a single 301 or 308 from the retired URL to the survivor. Do not chain redirects. Do not do this on a timer.

## Physical samples

See `ARTICLES_REQUIRING_TESTING.md`. Minimum set before another AdSense review:

1. One scarf, with measured length and width.
2. One wearable from the glove / ear-warmer / slipper group.
3. One bag **or** one pumpkin, not five of each.
4. A photo of that object, captioned as a photograph of the sample. Do not reuse the current illustrations for that claim.

## Editorial decisions not made here

- Whether the 27 IMPROVE pages get line-edited. Their stitch numbers were not rewritten, because missing rounds cannot be invented.
- Whether `OCCASION_THEME_FORCE` should be forced again for a photoshoot. It is `null`, so the calendar in `src/lib/occasions.ts` decides. On 10 October 2026 that calendar is between World Teachers' Day (ends 8 October) and World Food Day (starts 12 October), so the default palette is correct for today. Halloween skin starts 20 October.
- Who the publisher is, beyond "Crochet Explained Editorial Team." No person was added.

## Deploy

These edits are local on branch `adsense-recovery`. They are not on `origin/main` and not deployed. Push and Vercel deploy only after you approve the branch.
