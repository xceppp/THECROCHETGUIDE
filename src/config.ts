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
  email: "hello@thecrochetguide.com",
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
  { label: "Tutorials", href: "/tutorials" },
  { label: "Charts & Tools", href: "/charts" },
  { label: "Free Patterns", href: "/free-patterns" },
  { label: "Hooks & Yarn", href: "/gear" },
  { label: "About", href: "/about" },
];
