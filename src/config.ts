/**
 * Every piece of branding lives here. Change the name, domain, author or social
 * handles in this file and the whole site follows.
 */

export const SITE = {
  name: "The Crochet Guide",
  tagline: "Clear crochet answers, charts and tutorials",
  description:
    "Free crochet charts, conversion tables and step-by-step tutorials written in plain English. No fluff, no guesswork.",
  url: "https://thecrochetguide.com",
  locale: "en-US",
  /** Shown on the About page and in every article byline. */
  author: {
    name: "Nora Bell",
    role: "Founder and writer",
    bio: "I started The Crochet Guide after spending an entire evening stuck on a pattern that assumed I already knew what it meant. Everything here is written the way I wish it had been explained to me.",
  },
  /**
   * Contact address. Note the double "i" in "guiide" — that is the real
   * address, not a typo. Setting this to an empty string makes every page hide
   * its email link and routes the contact page to social instead.
   */
  email: "thecrochetguiide@gmail.com",
} as const;

/**
 * AdSense publisher ID, e.g. "ca-pub-1234567890123456".
 * Leave it empty until Google approves the site. While it is empty no ad
 * markup is rendered at all, which is what you want during review — Google
 * rejects sites that ship empty ad containers.
 */
export const ADSENSE_CLIENT = "";

/** Ad unit slot IDs, copied from the AdSense dashboard once you have them. */
export const ADSENSE_SLOTS = {
  inArticle: "",
  belowTitle: "",
  footer: "",
} as const;

/**
 * Pinterest gives you a verification code when you claim the domain
 * (Settings > Claimed accounts > Claim website > Add HTML tag). Paste only the
 * content value here, not the whole tag. Requires the domain to be live first.
 */
export const PINTEREST_DOMAIN_VERIFY = "";

export const SOCIALS = [
  { name: "Pinterest", url: "https://pinterest.com/thecrochetguide" },
  { name: "Facebook", url: "https://facebook.com/thecrochetguide" },
  { name: "TikTok", url: "https://tiktok.com/@thecrochetguide" },
  { name: "Instagram", url: "https://instagram.com/thecrochetguide" },
] as const;

export type CategoryId = "charts" | "skills" | "patterns" | "gear";

export const CATEGORIES: Record<
  CategoryId,
  { slug: string; label: string; blurb: string }
> = {
  charts: {
    slug: "charts",
    label: "Charts & Tools",
    blurb:
      "Printable conversion tables and quick answers for when you are mid-project and need a number, not an essay.",
  },
  skills: {
    slug: "tutorials",
    label: "Tutorials",
    blurb:
      "One technique per page, explained slowly, with the mistakes people actually make.",
  },
  patterns: {
    slug: "free-patterns",
    label: "Free Patterns",
    blurb:
      "Hand-picked free patterns from designers we trust, sorted by skill level. Every link goes straight to the designer.",
  },
  gear: {
    slug: "gear",
    label: "Hooks & Yarn",
    blurb:
      "What to buy, what to skip, and what actually helps if your hands hurt.",
  },
};

export const NAV = [
  { label: "Start Here", href: "/start-here" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Charts & Tools", href: "/charts" },
  { label: "Free Patterns", href: "/free-patterns" },
  { label: "Hooks & Yarn", href: "/gear" },
  { label: "About", href: "/about" },
];

/**
 * The guided route through the site, in teaching order.
 *
 * This is the spine of the reader experience: it powers the Start Here page,
 * the "Step N of M" marker on each article, and the previous/next links at the
 * bottom of every article in the path.
 *
 * To reorder the course, move a slug. To add a new article to it, drop its
 * slug into a stage. Anything not listed here still publishes normally and
 * simply has no step navigation.
 *
 * Slugs must match the Markdown filenames in src/content/posts exactly.
 */
export const LEARNING_PATH: Array<{
  stage: string;
  blurb: string;
  slugs: string[];
}> = [
  {
    stage: "Before you pick up a hook",
    blurb:
      "Buy the right yarn and hook first. The wrong yarn makes learning genuinely harder, and most beginners buy it because it looks the nicest on the shelf.",
    slugs: [
      "best-yarn-for-beginners",
      "best-crochet-hook-for-beginners",
      "left-handed-crochet",
    ],
  },
  {
    stage: "Learn to read crochet",
    blurb:
      "Crochet has its own shorthand and two rival dialects. Twenty minutes here and patterns stop looking like code.",
    slugs: [
      "crochet-abbreviations-chart",
      "how-to-read-a-crochet-pattern",
      "crochet-hook-size-conversion-chart",
      "yarn-weight-chart",
    ],
  },
  {
    stage: "Your first stitches",
    blurb:
      "Five stitches build almost everything. Learn them, then learn the one thing that makes edges come out straight.",
    slugs: ["basic-crochet-stitches", "crochet-turning-chain"],
  },
  {
    stage: "Shaping and working in circles",
    blurb:
      "Everything that is not a rectangle is made here — hats, toys, bags, anything round or curved.",
    slugs: [
      "crochet-increase-decrease",
      "how-to-crochet-a-magic-ring",
      "crochet-in-the-round",
    ],
  },
  {
    stage: "Color and finishing",
    blurb:
      "Finishing is most of the difference between handmade and homemade, and it is the part everyone rushes.",
    slugs: ["changing-yarn-color-crochet", "weaving-in-ends-and-blocking"],
  },
  {
    stage: "Make things that actually fit",
    blurb:
      "The last two steps: get the size right, then go find something worth making.",
    slugs: ["crochet-gauge", "where-to-find-free-crochet-patterns"],
  },
];
