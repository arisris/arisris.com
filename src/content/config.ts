import { z, defineCollection, reference } from "astro:content";

const blogPosts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(4),
    status: z.enum(["publish", "draft", "private"]).default("publish"),
    author: reference("profiles"),
    tags: z.array(z.string()).default([]),
    relatedPosts: z.array(reference("blogPosts")).optional(),
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
  type: "data",
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    about: z.string().optional(),
    avatar: z.string(),
    brithDate: z
      .string()
      .or(z.date())
      .transform((date) => new Date(date))
      .optional(),
    socialProfiles: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url()
        })
      )
      .optional()
  })
});

export const collections = {
  blogPosts,
  profiles
};
