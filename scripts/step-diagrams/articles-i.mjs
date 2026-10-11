// Amigurumi: shape profiles by stitch count, plus shared ring/decrease placements.
import { profile } from "./lib.mjs";

/** One entry per round. A round that changes the count is never merged with the even rounds after it. */
const rr = (counts, solo = []) =>
  counts.map((count, i) => ({
    n: i + 1,
    count,
    break: (i > 1 && counts[i - 1] !== counts[i - 2]) || solo.includes(i + 1) || solo.includes(i),
  }));
const even = (n, c) => Array(n).fill(c);

const ring = (slug) => ({ slug, file: "magic-ring.svg", after: "**Round 1:** 6 sc in a magic ring. (6)", caption: "Round 1 starts in a magic ring, pulled tight so the top has no hole." });
const dec = (slug, after) => ({ slug, file: "invisible-decrease.svg", after, caption: "Through the front loops only, the decrease disappears into the fabric." });

export const placements = [
  ring("crochet-ghost-amigurumi-for-beginners"),
  { slug: "crochet-ghost-amigurumi-for-beginners", file: "ghost-profile.svg", after: "**Round 21:** Sc2tog 6 times.", caption: "The standing build by stitch count. The back-loop round 17 is the fold where the base turns in." },
  dec("crochet-ghost-amigurumi-for-beginners", "**Round 18:** (Sc 3, sc2tog) 6 times. (24)"),
  ring("crochet-santa-amigurumi-for-beginners"),
  dec("crochet-santa-amigurumi-for-beginners", "**Round 14:** (Sc 3, sc2tog) 6 times. (24)"),
  { slug: "crochet-santa-amigurumi-for-beginners", file: "santa-profile.svg", after: "**Round 23:** Sc2tog 6 times.", caption: "Body and head as one piece. Round 14 is the only shaping in the middle, and it makes the shoulders." },
  { slug: "crochet-santa-amigurumi-for-beginners", file: "santa-hat-profile.svg", after: "**Round 16:** (Sc 7, 2 sc in next) 3 times. (27)", caption: "The hat grows 3 stitches every other round, so it stays a slim cone and ends 3 wider than the 24-stitch head." },
  ring("bat-amigurumi-wings-body-and-ears"),
  dec("bat-amigurumi-wings-body-and-ears", "**Round 9:** (Sc, sc2tog) 6 times. (12)"),
  ring("how-to-crochet-a-gnome"),
  { slug: "how-to-crochet-a-gnome", file: "gnome-body-profile.svg", after: "**Round 21:** Sc2tog 6 times.", caption: "The body widens in steps with even rounds between, then the back-loop round 15 turns the base flat." },
  { slug: "how-to-crochet-a-gnome", file: "gnome-hat-profile.svg", after: "**Rounds 20–21:** Sc in each stitch. (42)", caption: "The hat ends at 42, the same as the body, so it sits over the top instead of perching on it." },
  ring("how-to-crochet-a-pumpkin-step-by-step"),
  dec("how-to-crochet-a-pumpkin-step-by-step", "**Round 11:** (Sc 4, sc2tog) 6 times. (30)"),
  ring("how-to-crochet-a-spider-and-web"),
  dec("how-to-crochet-a-spider-and-web", "**Round 8:** (Sc 2, sc2tog) 6 times. (18)"),
  ring("how-to-crochet-a-christmas-tree"),
  { slug: "how-to-crochet-a-christmas-tree", file: "tree-cone-profile.svg", after: "**Round 24:** Sc2tog 6 times.", caption: "The cone by stitch count. Each terracotta round is worked in back loops, leaving the ledge that makes a tier." },
];

export default {
  "ghost-profile.svg": profile({
    title: "Standing ghost, round by round",
    rounds: rr([6, 12, 18, 24, 30, ...even(11, 30), 30, 24, 18, 12, 6], [17]),
    highlight: [17],
    note: "Rounds 1 to 5 add 6 each. Rounds 6 to 16 stay at 30. Round 17 (terracotta) is back loops only, then rounds 18 to 21 remove 6 each.",
  }),
  "santa-profile.svg": profile({
    title: "Santa body and head, round by round",
    rounds: rr([6, 12, 18, 24, 30, ...even(8, 30), 24, ...even(6, 24), 18, 12, 6]),
    highlight: [14],
    note: "Body: rounds 6 to 13 at 30. Round 14 drops to 24 for the shoulders. Head: rounds 15 to 20 at 24, then close.",
  }),
  "santa-hat-profile.svg": profile({
    title: "Santa hat, tip to brim",
    rounds: rr([6, 6, 6, 9, 9, 12, 12, 15, 15, 18, 18, 21, 21, 24, 24, 27]),
    note: "Three stitches added every other round from round 4. The white brim adds two rounds of 27.",
  }),
  "gnome-body-profile.svg": profile({
    title: "Gnome body, top down",
    rounds: rr([6, 12, 18, 24, 30, 30, 30, 36, 36, 36, 42, 42, 42, 42, 42, 36, 30, 24, 18, 12, 6], [15]),
    highlight: [15],
    note: "Round 15 (terracotta) is back loops only at 42. Rounds 16 to 21 remove 6 each to close a flat base.",
  }),
  "gnome-hat-profile.svg": profile({
    title: "Gnome hat, tip down",
    rounds: rr([6, 6, 6, 6, 9, 9, 9, 12, 12, 12, 18, 18, 24, 24, 30, 30, 36, 36, 42, 42, 42]),
    note: "A thin tip first: 3 added every third round to 12. Then 6 every other round to 42.",
  }),
  "tree-cone-profile.svg": profile({
    title: "Tiered cone tree, round by round",
    rounds: rr([6, 6, 9, 9, 12, 12, 18, 18, 18, 24, 24, 24, 30, 30, 30, 36, 36, 36, 36, 30, 24, 18, 12, 6], [9, 12, 15, 19]),
    highlight: [9, 12, 15, 19],
    note: "Rounds 9, 12 and 15 are back loops only, one per tier. Round 19 is the back-loop fold for the base, then rounds 20 to 24 close it.",
  }),
};
