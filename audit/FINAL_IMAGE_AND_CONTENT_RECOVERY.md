# Final image and content recovery

Date: 10 October 2026. AdSense was not submitted. Approval is not guaranteed.

## 1. Images audited

328 image references on published articles: article photographs plus the new diagrams. Inventory: `audit/IMAGE_INVENTORY.csv`.

Every referenced file exists. Every photograph caption still starts with "Illustration." The build rewrites those captions to "AI illustration:". Diagram captions stay "Diagram." because they are HTML figures, not Markdown images.

Pixel-level review was done for the pumpkin zipper pouch (all result and step images that were oversized or contradicted the text) and the bowl-cozy hero. The other photographs were checked for path, size, alt text, and caption, not opened one by one.

## 2. Optimized

Four PNGs were resized to 1200 pixels and palette-compressed, same filenames:

- `how-to-crochet-a-ghost-candy-bag-result.png` (about 943 KB to 585 KB)
- `how-to-crochet-a-ghost-candy-bag-2.png` (about 869 KB to 547 KB)
- `how-to-crochet-a-pumpkin-zipper-pouch-1.png` (about 731 KB to 474 KB)
- `how-to-crochet-a-pumpkin-zipper-pouch-4.png` (about 838 KB to 528 KB)

Five files are still over 500 KB after that pass. They are listed as OPTIMIZE in the inventory. Shrinking them further would mean a heavier quality drop or a format change. Paths were kept.

## 3. Replaced

Three pumpkin zipper-pouch images. The written project is a single-crochet cup with a zipper and a stem. The old pictures showed a stuffed ribbed pumpkin, and the flat-circle step showed knitting needles.

Replaced, then checked against the instructions:

- `how-to-crochet-a-pumpkin-zipper-pouch-result.png` — cup, zipper at the rim, stem on the side
- `how-to-crochet-a-pumpkin-zipper-pouch-2.png` — flat circle and one crochet hook
- `how-to-crochet-a-pumpkin-zipper-pouch-5.png` — open cup, zipper, a few candies

Captions still say these are illustrations, not measured samples.

## 4. New instructional diagrams

14 original SVGs in `public/diagrams/`:

slip knot, foundation chain, hook insertion, yarn over, single crochet, half double crochet, double crochet, turning chain, counting stitches, front and back loops, gauge window, uneven edges, US/UK names, stitch marker.

## 5. Awaiting manual correction

The remaining published photographs were not opened individually. Anything that still shows the wrong tool, the wrong construction, or a worn fit needs a human look. Five PNGs are still heavier than 500 KB.

No page was set to draft. Withholding the stocking or the tree skirt would remove a live URL, and that was not approved as a deletion.

## 6. Pages visually improved

Course and charts that now include diagrams:

- `/basic-crochet-stitches/`
- `/crochet-turning-chain/`
- `/crochet-gauge/`
- `/how-to-read-a-crochet-pattern/`
- `/crochet-abbreviations-chart/`
- `/crochet-in-the-round/`

Project pictures corrected:

- `/how-to-crochet-a-pumpkin-zipper-pouch/`

## 7. Content issues corrected

- Bowl cozy: do not microwave it, and do not use it as a pot holder, oven mitt, or trivet. Cotton can scorch. Acrylic can melt. No heat test.
- Stocking: the heel sequence has not been crocheted for this page.
- Tree skirt: both size estimates stay on the page, and the page does not promise the circle lies flat.
- Slippers: the pictures are not a worn pair, and the sole is not safe on stairs, tile, or wood.
- Hooded scarf: the 8-inch seam is a planning guess.

## 8. Pattern testing still required

These constructions are still written, not made in yarn: stocking heel and hanging, tree-skirt circle, bowl cozy on a real bowl, slippers on a foot, hooded scarf on a person, and the zipper pouch. The new pouch pictures match the written shape. They are not a finished sample.

## 9. Astro checks and build

- `npm run check`: 0 errors, 0 warnings, 3 existing hints.
- First sync after the last two article edits logged the known same-file "duplicate id" warning. Filenames are unique.
- `npm run build`: complete, 86 pages.
- Internal links: 0 broken.
- Diagrams: 14 SVGs, all referenced.
- Sitemap: 82 locations, 0 duplicates.
- `robots.txt` still allows `/` and disallows `/tools/`.
- `ads.txt` is still `google.com, pub-5737689254964633, DIRECT, f08c47fec0942fa0`.
- `ADSENSE_CLIENT` was not changed.
- No redirects were added.

Browser click-through, including the mobile menu, was not available in this environment. Homepage HTML still contains the course heading. Diagrams use full-width figures.

## 10. Deployment commit

`513f9a53021f19f336f9617820007a3ad002bfa0` on `main`, fast-forwarded from `adsense-recovery`. Not a force push.

## 11. Vercel production status

Live HTML after the push returned `x-vercel-cache: MISS` on the checked URLs, which means Vercel served a fresh response rather than an old cached page. This was an HTTP check, not a look at the Vercel dashboard.

## 12. Live verification

All HTTP 200:

- `/` contains "Learn crochet with clear"
- `/basic-crochet-stitches/` contains `slip-knot.svg`
- `/how-to-crochet-a-bowl-cozy/` contains "Do not microwave"
- `/crochet-abbreviations-chart/` contains `us-uk-terms`
- `/diagrams/slip-knot.svg`
- `/sitemap-index.xml`
- `/robots.txt`
- `/ads.txt`

Googlebot user agent on `robots.txt`: HTTP 200. That is not a Cloudflare challenge page. It is not a full bot-management review.

## 13. Remaining AdSense concerns

The low-value rejection still fits the cluster of similar untested project pages. Diagrams and honest limits help learners. They do not turn those projects into tested samples. Legal pages and the publisher id were already in place.

## 14. Resubmission recommendation

Do not resubmit yet. Make the stocking, tree skirt, bowl cozy, slippers, and hooded scarf in yarn, or withhold the pages whose headline promises a finished object you still have not made. Then review the remaining photographs by eye.
