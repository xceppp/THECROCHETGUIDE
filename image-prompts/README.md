# Article image prompts

One file per article, numbered in course order. Each file lists every image that
article needs, with the prompt to generate it, the filename to save it as, the
alt text, and the caption that will run underneath it.

57 images across 19 articles.

`article-01` to `article-14` are the core course articles. `article-15` to
`article-19` are the Halloween skills articles. The five `free-pattern-*` pages
are not covered yet — see the note at the bottom.

## How to use this

1. Generate each image with the prompt given. **Nano Banana 2**
   (`gemini-3.1-flash-image`), thinking High, 2K, aspect ratio **3:2**.
2. Save it with the exact filename listed. The names are not decorative — they
   are what the Markdown will reference, so a typo means a broken image.
3. Drop all the files into `src/assets/articles/`. That folder is inside `src`
   on purpose: Astro only optimises images it can see at build time, so images
   placed in `public/` would ship at full weight and cost us the page speed the
   ad revenue depends on.
4. Tell me when they are in and I will insert them with captions, alt text,
   dimensions and lazy loading.

## The house style block

Every prompt below already ends with this. It is repeated in full in each one
so you can copy a single prompt without assembling anything, and it is worded
identically everywhere so all 57 images read as one set rather than fifty-seven
unrelated stock photos.

```
Shot from directly overhead on a pale oak table, bright soft daylight from the
upper left, soft clean shadows. Adult female hands, warm medium-brown skin,
short bare nails, no rings, oatmeal knit sleeves pushed to just below the elbow.
Smooth ivory worsted-weight yarn and a plain silver aluminum crochet hook unless
stated otherwise. Bright modern craft photography, sharp focus, high clarity,
natural colour, no plastic sheen. No text, no numerals, no watermark anywhere in
the image. 3:2 horizontal.
```

The Halloween files swap the ivory yarn for a seasonal colour and, where the
yarn is black or white, ask for harder directional light — black yarn loses its
stitch definition in soft light and white yarn blows out against pale oak.
Everything else stays fixed, so the seasonal images still belong to the set.

## Two rules these prompts follow

**Every image is a technique, never a finished project.** `/disclosures`
publicly promises that no computer-generated image on this site is presented as
a real finished object, so there are no photos of completed toys, garments or
homeware here. Hands, stitches, swatches and tools only. The one or two images
that show a small finished piece — a closed magic ring, a blocked swatch — are
samples of a technique, not projects offered to be copied.

**Every caption says it is an illustration.** That is the other half of the
same promise, and it is why a caption is written out for each image rather than
left to be improvised later.

## Accuracy

These illustrate instructions, so a wrong image teaches the wrong thing. Where
an image has a detail that decides whether the technique works, the file notes
what to check before accepting the generation. The recurring one: any image of
a magic ring must show the hook passing under **both** strands of the loop.

## Still to decide: the free-pattern pages

Five pages have no prompts yet — `free-pattern-pumpkin-amigurumi`,
`free-pattern-ghost-amigurumi`, `free-pattern-bat-garland`,
`free-pattern-spider-and-web` and `free-pattern-halloween-coasters`. All five
are still `draft: true`.

They are held back because a pattern page wants the one image the rest of this
set deliberately avoids: the finished thing. Every other image here is hands,
stitches, components or a swatch, because `/disclosures` promises no generated
image on the site is presented as a real finished object. A generated photo of
a completed pumpkin at the top of a pumpkin pattern is exactly that promise
being broken, and it is the kind of thing an AdSense reviewer reads the
disclosures page specifically to check.
