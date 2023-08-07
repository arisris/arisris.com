import { z, defineCollection } from "astro:content";

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string().min(4),
      author: z.enum(["admin", "editor"]),
      createdAt: z
        .string()
        .or(z.date())
        .transform((v, c) => {
          const value = new Date(v);
          if (isNaN(value.getTime())) {
            c.addIssue({
              code: "custom",
              message: "Invalid Date Format"
            });
          }
          return value;
        }),
      updatedAt: z
        .string()
        .or(z.date())
        .optional()
        .transform((v) => (v ? new Date(v) : undefined))
    })
  })
};
