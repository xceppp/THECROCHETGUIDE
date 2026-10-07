import fs from "fs";
import path from "path";

const postsDir = "src/content/posts";

function hasAssetRef(body, filename) {
  return body.includes(filename);
}

function insertBeforeFirstH2(body, block) {
  const idx = body.search(/\r?\n## /);
  if (idx === -1) return `${body.trimEnd()}\n\n${block}\n`;
  return `${body.slice(0, idx)}\n\n${block}${body.slice(idx)}`;
}

function insertAfterHeading(body, heading, block) {
  const re = new RegExp(`(\\r?\\n)## ${escapeRegExp(heading)}(\\r?\\n)`);
  const m = re.exec(body);
  if (!m) {
    console.warn("missing heading", heading);
    return body;
  }
  const insertAt = m.index + m[0].length;
  return `${body.slice(0, insertAt)}\n${block}\n${body.slice(insertAt)}`;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fig(file, alt, caption) {
  return `![${alt}](../../assets/articles/${file} "${caption}")`;
}

const jobs = [
  {
    slug: "how-to-crochet-a-christmas-tree",
    hero: fig(
      "how-to-crochet-a-christmas-tree-result.jpg",
      "A finished green crochet Christmas tree standing on a wooden table",
      "Illustration. The finished look these steps build toward.",
    ),
    after: [
      [
        "Method 1: the tiered cone",
        fig(
          "how-to-crochet-a-christmas-tree-1.jpg",
          "Hands crocheting a green cone in the round for a Christmas tree",
          "Illustration. Tiered cone — work in a spiral and mark the first stitch of every round.",
        ),
      ],
      [
        "Making it stand up",
        fig(
          "how-to-crochet-a-christmas-tree-2.jpg",
          "A green crochet Christmas tree being stuffed",
          "Illustration. Stuff firmly and weight the base so the tree stands.",
        ),
      ],
      [
        "Decorating without ruining it",
        fig(
          "how-to-crochet-a-christmas-tree-3.jpg",
          "Sewing a brown trunk onto a crochet Christmas tree",
          "Illustration. Add the trunk and light decorations after the shape is stable.",
        ),
      ],
    ],
  },
  {
    slug: "crochet-santa-amigurumi-for-beginners",
    hero: fig(
      "crochet-santa-amigurumi-for-beginners-result.jpg",
      "A finished beginner crochet Santa amigurumi with red hat",
      "Illustration. The finished look these steps build toward.",
    ),
    after: [
      [
        "Body and head in one piece",
        fig(
          "crochet-santa-amigurumi-for-beginners-1.jpg",
          "Hands crocheting a red Santa hat tube",
          "Illustration. Hat and body pieces start in the round.",
        ),
      ],
      [
        "The face, and why it goes wrong",
        fig(
          "crochet-santa-amigurumi-for-beginners-2.jpg",
          "Stuffing a crochet Santa body",
          "Illustration. Stuff before the opening gets too small.",
        ),
      ],
      [
        "Hat",
        fig(
          "crochet-santa-amigurumi-for-beginners-3.jpg",
          "Embroidering eyes on a crochet Santa",
          "Illustration. Simple embroidered eyes beat oversized safety eyes on a small face.",
        ),
      ],
    ],
  },
  {
    slug: "how-to-crochet-a-gnome",
    hero: fig(
      "how-to-crochet-a-gnome-result.jpg",
      "A finished crochet Christmas gnome with tall hat and beard",
      "Illustration. The finished look these steps build toward.",
    ),
    after: [
      [
        "Body: a weighted cone",
        fig(
          "how-to-crochet-a-gnome-1.jpg",
          "Hands crocheting a round gnome body in the round",
          "Illustration. The body is a weighted cone — start in the round.",
        ),
      ],
      [
        "Assembly, in order",
        fig(
          "how-to-crochet-a-gnome-2.jpg",
          "Sewing a pointed hat onto a crochet gnome",
          "Illustration. Hat on last so it covers the joins cleanly.",
        ),
      ],
    ],
  },
  {
    slug: "christmas-granny-square-variations",
    hero: fig(
      "christmas-granny-square-variations-result.jpg",
      "A set of Christmas granny squares in red green and cream",
      "Illustration. The finished look these color variations build toward.",
    ),
    after: [
      [
        "Classic granny refresher, one color",
        fig(
          "christmas-granny-square-variations-1.jpg",
          "Hook working a granny cluster in seasonal yarn",
          "Illustration. Clusters go into the gaps, never into the stitch tops.",
        ),
      ],
      [
        "Variation 1: candy-cane rings",
        fig(
          "christmas-granny-square-variations-2.jpg",
          "A granny square with cream center and red outer rounds",
          "Illustration. Change color between rounds for candy-cane rings.",
        ),
      ],
    ],
  },
  {
    slug: "yarn-for-christmas-crochet",
    hero: fig(
      "yarn-for-christmas-crochet-result.jpg",
      "Basket of red green and cream Christmas crochet yarns",
      "Illustration. Match yarn to the job — ornaments, gnomes, and trees ask for different things.",
    ),
    after: [
      [
        "The sparkle question",
        fig(
          "yarn-for-christmas-crochet-1.jpg",
          "Smooth worsted yarn beside sparkly Christmas yarn",
          "Illustration. Sparkle photographs well and fights you on small stitches.",
        ),
      ],
      [
        "Colors that make life harder",
        fig(
          "yarn-for-christmas-crochet-2.jpg",
          "Matte red and green Christmas yarn beside a sparkly metallic skein",
          "Illustration. Matte worsted is easier for small stitches than glitter yarn.",
        ),
      ],
    ],
  },
  {
    slug: "basic-crochet-stitches",
    hero: fig(
      "basic-crochet-stitches-result.jpg",
      "A cream crochet swatch showing basic stitches beside a hook",
      "Illustration. Five stitches build almost everything — learn them in height order.",
    ),
    after: [
      [
        "The foundation chain",
        fig(
          "basic-crochet-stitches-1.jpg",
          "Hands making a foundation chain in cream yarn",
          "Illustration. The foundation chain is where every flat piece starts.",
        ),
      ],
      [
        "2. Single crochet (`sc`)",
        fig(
          "basic-crochet-stitches-2.jpg",
          "Close-up of single crochet stitches being formed",
          "Illustration. Single crochet — short, dense, and the stitch most beginners live in.",
        ),
      ],
      [
        "4. Double crochet (`dc`)",
        fig(
          "basic-crochet-stitches-3.jpg",
          "Close-up of a double crochet stitch in progress",
          "Illustration. Double crochet — yarn over first, then work the loops off in pairs.",
        ),
      ],
    ],
  },
  {
    slug: "crochet-in-the-round",
    hero: fig(
      "crochet-in-the-round-result.jpg",
      "A flat cream crochet circle worked in the round with a stitch marker",
      "Illustration. Circles start in the center — magic ring or chain ring — then grow with even increases.",
    ),
    after: [
      [
        "Starting the center: the magic ring",
        fig(
          "crochet-in-the-round-1.jpg",
          "Hands forming a magic ring with cream yarn",
          "Illustration. The magic ring closes tight — pull it shut after the first round.",
        ),
      ],
      [
        "Circle or tube? The increases decide",
        fig(
          "crochet-in-the-round-2.jpg",
          "A growing cream crochet circle with even increases",
          "Illustration. Six increases per round keep a circle flat in single crochet.",
        ),
      ],
    ],
  },
  {
    slug: "changing-yarn-color-crochet",
    hero: fig(
      "changing-yarn-color-crochet-result.jpg",
      "A crochet swatch with a clean cream to terracotta color change",
      "Illustration. Change on the last yarn-over so the new color starts clean.",
    ),
    after: [
      [
        "The basic color change",
        fig(
          "changing-yarn-color-crochet-1.jpg",
          "Hook joining terracotta yarn on the last cream yarn-over",
          "Illustration. Finish the old stitch with the new color.",
        ),
      ],
      [
        "Changing color mid-round",
        fig(
          "changing-yarn-color-crochet-2.jpg",
          "Hands joining terracotta yarn mid-round on a cream amigurumi",
          "Illustration. Mid-round changes use the same last-yarn-over rule.",
        ),
      ],
    ],
  },
  {
    slug: "crochet-turning-chain",
    hero: fig(
      "crochet-turning-chain-result.jpg",
      "Close-up of a turning chain at the start of a crochet row",
      "Illustration. The turning chain lifts the row to the right height — and may or may not count as a stitch.",
    ),
    after: [
      [
        "What it is and why it exists",
        fig(
          "crochet-turning-chain-1.jpg",
          "Hands making a turning chain at the end of a row",
          "Illustration. Chain, turn, then work the next row.",
        ),
      ],
      [
        "The gap at the start of double crochet rows",
        fig(
          "crochet-turning-chain-2.jpg",
          "Cream double crochet fabric showing a gap beside the turning chain",
          "Illustration. A loose turning chain leaves a gap at the start of dc rows.",
        ),
      ],
    ],
  },
  {
    slug: "crochet-increase-decrease",
    hero: fig(
      "crochet-increase-decrease-result.jpg",
      "A cream crochet piece showing increases and decreases shaping the fabric",
      "Illustration. Increases add stitches; decreases remove them — that is all shaping is.",
    ),
    after: [
      [
        "Increasing",
        fig(
          "crochet-increase-decrease-1.jpg",
          "Close-up of a crochet increase two stitches in one",
          "Illustration. Two stitches in one stitch = an increase.",
        ),
      ],
      [
        "Decreasing",
        fig(
          "crochet-increase-decrease-2.jpg",
          "Close-up of a crochet decrease joining two stitches",
          "Illustration. sc2tog pulls two stitches into one.",
        ),
      ],
    ],
  },
  {
    slug: "weaving-in-ends-and-blocking",
    hero: fig(
      "weaving-in-ends-and-blocking-result.jpg",
      "A blocked crochet square pinned flat on a foam mat",
      "Illustration. Weave ends, then block — that order keeps the finish clean.",
    ),
    after: [
      [
        "Weaving in ends properly",
        fig(
          "weaving-in-ends-and-blocking-1.jpg",
          "Tapestry needle weaving a yarn end into crochet fabric",
          "Illustration. Weave through several stitches on the wrong side, then reverse direction once.",
        ),
      ],
      [
        "Blocking",
        fig(
          "weaving-in-ends-and-blocking-2.jpg",
          "A cream granny square pinned flat on a foam blocking mat",
          "Illustration. Pin to shape while damp — corners first, then mid-sides.",
        ),
      ],
    ],
  },
  {
    slug: "how-to-read-a-crochet-pattern",
    hero: fig(
      "how-to-read-a-crochet-pattern-result.jpg",
      "A printed crochet pattern beside yarn and a hook on a desk",
      "Illustration. Read the materials and gauge notes before the first stitch line.",
    ),
    after: [
      [
        "Reading a single line",
        fig(
          "how-to-read-a-crochet-pattern-1.jpg",
          "Finger pointing at crochet pattern abbreviations on paper",
          "Illustration. One pattern line is a recipe — abbreviations, counts, and punctuation.",
        ),
      ],
      [
        "Count your stitches",
        fig(
          "how-to-read-a-crochet-pattern-2.jpg",
          "Finger counting stitches on a cream swatch beside a printed pattern",
          "Illustration. Count after every row or round until the numbers stick.",
        ),
      ],
    ],
  },
  {
    slug: "crochet-abbreviations-chart",
    hero: fig(
      "crochet-abbreviations-chart-result.jpg",
      "A crochet abbreviations reference card beside yarn and a hook",
      "Illustration. Keep this chart open until the common abbreviations stick.",
    ),
    after: [
      [
        "The stitches",
        fig(
          "crochet-abbreviations-chart-1.jpg",
          "Cream crochet fabric beside a small stitch reference note",
          "Illustration. Same abbreviations show up in almost every US pattern.",
        ),
      ],
      [
        "US vs UK terms: the one that catches everyone",
        fig(
          "crochet-abbreviations-chart-2.jpg",
          "Dense single crochet swatch beside taller double crochet fabric",
          "Illustration. US and UK reuse the same letters for different stitch heights.",
        ),
      ],
    ],
  },
  {
    slug: "crochet-hook-size-conversion-chart",
    hero: fig(
      "crochet-hook-size-conversion-chart-result.jpg",
      "A row of aluminum crochet hooks in graduated sizes with a gauge plate",
      "Illustration. Letter, metric, and steel sizes are different rulers — convert before you buy.",
    ),
    after: [
      [
        "Why the letter is not enough",
        fig(
          "crochet-hook-size-conversion-chart-1.jpg",
          "Two crochet hook tip shapes compared side by side",
          "Illustration. Tip shape and true millimeter size both matter.",
        ),
      ],
      [
        "Standard hook sizes",
        fig(
          "crochet-hook-size-conversion-chart-2.jpg",
          "Aluminum crochet hooks checked in a metal gauge plate",
          "Illustration. A gauge plate beats trusting the letter stamped on the hook alone.",
        ),
      ],
    ],
  },
  {
    slug: "yarn-weight-chart",
    hero: fig(
      "yarn-weight-chart-result.jpg",
      "Yarn balls from thin lace weight to bulky lined up by size",
      "Illustration. Weight categories tell you thickness — not brand quality.",
    ),
    after: [
      [
        "What each weight is actually good for",
        fig(
          "yarn-weight-chart-1.jpg",
          "Thin fingering yarn strand beside worsted yarn for comparison",
          "Illustration. Thinner yarns need more stitches and usually a smaller hook.",
        ),
      ],
      [
        "Substituting one yarn for another",
        fig(
          "yarn-weight-chart-2.jpg",
          "Four cream yarn cakes lined up from thin to bulky",
          "Illustration. Match thickness first — then check yardage and fiber.",
        ),
      ],
    ],
  },
  {
    slug: "crochet-gauge",
    hero: fig(
      "crochet-gauge-result.jpg",
      "A cream crochet gauge swatch measured with a metal ruler",
      "Illustration. Measure stitches and rows over inches, not by counting the whole swatch.",
    ),
    after: [
      [
        "Measuring it",
        fig(
          "crochet-gauge-1.jpg",
          "Hands counting stitches across a gauge swatch with a ruler",
          "Illustration. Count inside the fabric, away from the edges.",
        ),
      ],
      [
        "Adjusting",
        fig(
          "crochet-gauge-2.jpg",
          "Two cream gauge swatches compared with a metal ruler",
          "Illustration. Too many stitches per inch means go up a hook size.",
        ),
      ],
    ],
  },
  {
    slug: "where-to-find-free-crochet-patterns",
    hero: fig(
      "where-to-find-free-crochet-patterns-result.jpg",
      "Laptop and tablet beside yarn and a crochet hook on a desk",
      "Illustration. Start with trusted libraries — then check the pattern still opens.",
    ),
    after: [
      [
        "How to tell a good free pattern from a bad one",
        fig(
          "where-to-find-free-crochet-patterns-1.jpg",
          "Notebook project list beside yarn and a hook",
          "Illustration. Clear materials, gauge, and photos beat a pretty cover shot alone.",
        ),
      ],
      [
        "The big pattern databases",
        fig(
          "where-to-find-free-crochet-patterns-2.jpg",
          "Laptop open beside a printed crochet pattern yarn and hook",
          "Illustration. Start with known libraries, then verify the pattern page still opens.",
        ),
      ],
    ],
  },
  {
    slug: "how-to-crochet-a-snowflake",
    heroOnlyIfMissing: true,
    hero: fig(
      "how-to-crochet-a-snowflake-result.jpg",
      "A finished white crochet snowflake with open stiff points",
      "Illustration. The finished look these steps build toward — flat points after stiffening.",
    ),
  },
  {
    slug: "left-handed-crochet",
    heroOnlyIfMissing: true,
    hero: fig(
      "left-handed-crochet-result.jpg",
      "A left hand crocheting a cream swatch with an aluminum hook",
      "Illustration. Same stitches, opposite direction of travel.",
    ),
  },
  {
    slug: "what-you-need-to-start-crocheting",
    heroOnlyIfMissing: true,
    hero: fig(
      "what-you-need-to-start-crocheting-result.jpg",
      "Beginner crochet kit flat lay with hook yarn needle and markers",
      "Illustration. This is genuinely the short shopping list.",
    ),
  },
];

let updated = 0;
for (const job of jobs) {
  const file = path.join(postsDir, `${job.slug}.md`);
  let raw = fs.readFileSync(file, "utf8");
  const parts = raw.split(/^---$/m);
  if (parts.length < 3) {
    console.log("bad fm", job.slug);
    continue;
  }
  let body = parts.slice(2).join("---");
  const before = body;

  if (job.hero) {
    const filename = job.hero.match(/articles\/([^)"]+)/)[1];
    const already = hasAssetRef(body, filename);
    if (!(job.heroOnlyIfMissing && already) && !already) {
      body = insertBeforeFirstH2(body, job.hero);
    }
  }

  for (const [heading, block] of job.after || []) {
    const filename = block.match(/articles\/([^)"]+)/)[1];
    if (!hasAssetRef(body, filename)) {
      body = insertAfterHeading(body, heading, block);
    }
  }

  if (body !== before) {
    raw = `---${parts[1]}---${body}`;
    fs.writeFileSync(file, raw);
    updated++;
    console.log("updated", job.slug);
  } else {
    console.log("skip", job.slug);
  }
}

console.log("done", updated);
