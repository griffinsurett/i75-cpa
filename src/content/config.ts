// src/content/config.ts
/**
 * Collection structure:
 *
 * src/content/[collection]/
 *   _meta.mdx         ← Collection config (frontmatter) + index page content (body)
 *                        The _ prefix excludes it from collection entries
 *   item-one.mdx      ← Collection item
 *   item-two.mdx      ← Collection item
 *
 * _meta.mdx frontmatter controls:
 * - title: Display name for the collection
 * - description: Collection description
 * - hasPage: Whether to generate /[collection] index page
 * - itemsHasPage: Whether items get individual pages
 * - featuredImage: Hero image for index page
 * - seo: SEO overrides
 */
import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { baseSchema, MenuSchema, MenuItemFields, refSchema, imageInputSchema } from "./schema";
import { MenuItemsLoader } from "@/utils/loaders/MenuItemsLoader";

export const collections = {
  // ── menus.json ─────────────────────────────────────────
  "menus": defineCollection({
    loader: file("src/content/menus/menus.json"),
    schema: MenuSchema,
  }),

  // ── menu-items.json ─────────────────────────────────────
  "menu-items": defineCollection({
    loader: MenuItemsLoader(),
    schema: MenuItemFields,
  }),

  "contact-us": defineCollection({
    loader: file("src/content/contact-us/contact-us.json"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        linkPrefix: z.string().optional(),
      }),
  }),

  "social-media": defineCollection({
    loader: file("src/content/social-media/socialmedia.json"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        link: z.string().optional(),
      }),
  }),

  "facebook-groups": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        link: z.string().optional(),
        openInNewTab: z.boolean().optional(),
      }),
  }),

  // ── legal ───────────────────────────────────────────────
  "legal": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        effectiveDate: z
          .union([z.date(), z.string()])
          .optional()
          .transform((val) => {
            if (!val) return undefined;
            if (val instanceof Date) return val;
            return new Date(val);
          }),
      }),
  }),

  "about-us": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image })
  }),

  "blog": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        author: refSchema("authors"),
        tags: z.array(z.string()).default([]),
        readingTime: z.number().optional(),
      }),
  }),

  "authors": defineCollection({
    loader: file("src/content/authors/authors.json"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        email: z.string().email().optional(),
        social: z
          .object({
            twitter: z.string().url().optional(),
            github: z.string().url().optional(),
            linkedin: z.string().url().optional(),
            website: z.string().url().optional(),
          })
          .optional(),
        role: z.string().optional(),
      }),
  }),

  "features": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image }),
  }),

  "memes": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image }),
  }),

  "part": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image }),
  }),

  "testimonials": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        role: z.string(),
        company: z.string().optional(),
        rating: z.number().min(1).max(5).default(5),
        videoUrl: z.string().url().optional(),
        videoThumbnail: imageInputSchema({ image }).optional(),
        orientation: z.enum(["portrait", "landscape", "square"]).optional(),
      }),
  }),

  "partners": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image }),
  }),

  "recent-passers": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image }),
  }),

  "faq": defineCollection({
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        category: z.string().optional(),
      }),
  }),
};
