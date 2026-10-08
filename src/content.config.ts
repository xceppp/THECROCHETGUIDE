import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    /** Used as the meta description and the listing excerpt. Keep under 160 chars. */
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(["charts", "skills", "patterns", "gear"]),
    level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    /** Minutes. Leave unset and it is estimated from word count. */
    readingTime: z.number().optional(),
    tags: z.array(z.string()).default([]),
    /** Embed URL of the matching short video, if you made one. */
    videoUrl: z.string().url().optional(),
    /** Adds a "Print this page" button. Use on charts and step-by-steps. */
    printable: z.boolean().default(false),
    /** Adds HowTo structured data. Only set true when the post really is steps. */
    howTo: z.boolean().default(false),
    featured: z.boolean().default(false),
    /** One live article can be pinned above seasonal blocks on the homepage. */
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
    /** Two or three sentences shown under the title. */
    quickAnswer: z.string().optional(),
    /** Shown on project pages. Leave a field off rather than guessing it. */
    glance: z
      .object({
        time: z.string().optional(),
        size: z.string().optional(),
        yarn: z.string().optional(),
        hook: z.string().optional(),
        yardage: z.string().optional(),
      })
      .optional(),
    /** Absolute or site-root path to a 1200x630 social image. */
    ogImage: z.string().optional(),
    /** Site-root path to a 1000x1500 Pinterest image. */
    pinImage: z.string().optional(),
    pinTitle: z.string().optional(),
  }),
});

export const collections = { posts };
