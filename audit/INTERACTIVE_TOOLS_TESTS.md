# Interactive tool tests

`node --experimental-strip-types scripts/test-gauge-math.mjs` printed `gauge math ok` and `counter and quiz ok`. The counter and the quiz import the same modules as the pages.

The calculator and the test import `src/lib/gaugeMath.ts`.

## Gauge formula

Same stitch count:

predicted width = stitch count × (window inches ÷ your stitches)

pattern width = stitch count × (window inches ÷ pattern stitches)

Width ratio = pattern stitches ÷ your stitches.

A desired width, with no stitch count:

stitches at your gauge = width × (your stitches ÷ window)

stitches at the pattern gauge = width × (pattern stitches ÷ window)

## Cases that passed

| Input | Result |
| --- | --- |
| Pattern 16, swatch 20, window 4, 16 stitches | 3.2 inches wide, pattern expected 4, narrower by 20 percent |
| Pattern 14, swatch 14, window 4, 28 stitches | 8 inches, and 8 inches, match |
| Pattern 16, swatch 14, window 4, width 8 inches | 28 stitches at your gauge, 32 at the pattern gauge, wider |
| Pattern and swatch only, no project number | Direction only. No fake width. |
| Zero, negative, or blank gauge | Rejected |
| Stitch count of 0 | Rejected |

The page tells the reader to try a larger hook when the fabric is narrower, and a smaller hook when it is wider, then swatch again. It says row gauge is not included.

## Counter

Increase adds 1. Decrease stops at 0. Reset returns to 0. Buttons are real buttons, and the number is in an `aria-live` region. No account and no storage. This behavior is in the page script. It was not clicked in a browser.

## Pattern practice

Five questions. Each has a Check button and an explanation. Score all five refuses to score until every question has an answer. Correct keys, checked against the lesson:

1. US `sc` is the short stitch.
2. `(10 sc)` is a count, not ten more stitches.
3. Chain 11, skip the first, is 10 single crochets.
4. The bracket repeat uses 6 and makes 9.
5. The practice chain-1 does not count.

Keyboard: radios and buttons are native controls. This was not run in a mobile browser.
