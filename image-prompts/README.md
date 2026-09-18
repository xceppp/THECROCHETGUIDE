# Article image prompts

One file per article, numbered in course order. Each file lists every image that
article needs, with the prompt to generate it, the filename to save it as, the
alt text, and the caption that will run underneath it.

42 images across 14 articles.

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
identically everywhere so all 42 images read as one set rather than forty-two
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
