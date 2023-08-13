import { z, defineCollection, reference } from "astro:content";

const blogPosts = defineCollection({
  schema: z.object({
    title: z.string().min(4),
    status: z.enum(["publish", "draft", "private"]).default("publish"),
    author: reference("profiles"),
    tags: z.array(z.string()).default([]),
    relatedPosts: z.array(reference("blogPosts")).optional(),
    isAiGenerated: z.boolean().default(false),
    image: z
      .object({
        src: z.string(),
        alt: z.string().optional()
      })
      .or(z.string())
      .optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((date) => new Date(date)),
    upDate: z
      .string()
      .or(z.date())
      .transform((date) => new Date(date))
      .optional()
  })
});

const profiles = defineCollection({
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    avatar: z.string(),
    website: z.string().optional(),
    brithDate: z
      .string()
      .or(z.date())
      .transform((date) => new Date(date))
      .optional(),
    socialLinks: z.array(z.string()).optional()
  })
});

export const collections = {
  blogPosts,
  profiles
};
