# Mobile and UX

No Playwright, Chromium, or browser tool was available in this session. These viewports were not opened: 320, 375, 768, 1440.

What the source does specify, and what was not measured on a screen:

- Tool buttons use `min-h-11` (44px).
- Calculator inputs are full width with a label on each field.
- Quiz choices are native radio buttons inside labels.
- `:focus-visible` in `src/styles/global.css` draws a 2px terracotta outline.
- Article diagrams use `width: 100%` and `height: auto` inside `.prose figure img`, and the decrease diagram sets width and height attributes.
- Tables sit in a scroll wrapper from the Markdown plugin.

Manual checklist for a person with a browser:

1. Open the homepage at 320px and 375px. Confirm the tools list is readable and the menu button opens and closes.
2. Open the gauge calculator. Submit 16, 20, and 4 with 16 stitches. Expect about 3.2 inches and a narrower result. Submit 0 and a blank and expect a rejection, not a number.
3. Open the stitch counter. Increase, decrease at zero, and reset.
4. Open pattern practice. Answer all five, including one wrong answer, and read the note under each question.
5. Open the increase lesson and confirm the decrease diagram text is readable.
6. Tab through each tool and confirm the outline is visible.
