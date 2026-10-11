import fs from "fs";

const slugs = `crochet-bag-charm-ideas
easy-crochet-christmas-ornaments
how-to-crochet-a-beginner-scarf
how-to-crochet-a-christmas-stocking
how-to-crochet-a-chunky-beanie
how-to-crochet-a-fall-leaf
how-to-crochet-an-ear-warmer
how-to-crochet-fingerless-gloves
how-to-crochet-slippers
gothic-bat-earbuds-pouch
how-to-crochet-a-book-sleeve
how-to-crochet-a-bowl-cozy
how-to-crochet-a-cable-organizer
how-to-crochet-a-christmas-gift-card-holder
how-to-crochet-a-christmas-tree-skirt
how-to-crochet-a-ghost-candy-bag
how-to-crochet-a-ghost-coin-pouch
how-to-crochet-a-granny-square-tote
how-to-crochet-a-hooded-scarf
how-to-crochet-a-lace-bandana
how-to-crochet-a-laptop-sleeve
how-to-crochet-a-lip-balm-holder
how-to-crochet-a-makeup-pouch
how-to-crochet-a-market-bag
how-to-crochet-a-mini-shoulder-bag
how-to-crochet-a-phone-crossbody
how-to-crochet-a-pumpkin-treat-bag
how-to-crochet-a-pumpkin-zipper-pouch
how-to-crochet-a-tumbler-sleeve
how-to-crochet-a-wine-bottle-bag
how-to-crochet-an-earbud-pouch`.split("\n");

for (const slug of slugs) {
  const text = fs.readFileSync(`src/content/posts/${slug}.md`, "utf8");
  const title = text.match(/^title:\s*"?([^"\n]+)"?/m)?.[1] ?? "";
  const headings = [...text.matchAll(/^##+ (.+)$/gm)].map((m) => m[1]);
  const rows = (text.match(/\*\*(Row|Rnd|Round)/g) || []).length;
  const zipper = /zip/i.test(text);
  const zipSteps = /sew the zip|zipper teeth|install the zip/i.test(text);
  console.log(`\n# ${slug}`);
  console.log(title);
  console.log(`stitch-lines ${rows} zipperMention ${zipper} zipSteps ${zipSteps}`);
  console.log(headings.join(" | "));
}
