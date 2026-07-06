import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        updatedAt: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
        status: z.enum(['draft', 'published']).default('draft'),
      }),
    }),
  },
});
