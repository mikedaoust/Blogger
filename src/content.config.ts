import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Published posts live in /posts/*.md(x). Drafts sit in /posts/drafts/ and are
// intentionally NOT matched by this glob, so anything in drafts/ never ships —
// even if it lands on `main`. Publishing = moving the file up into /posts/.
const posts = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Topic/series tags, e.g. ["socfu", "agentic-ai"].
    tags: z.array(z.string()).default([]),
    // Set true to keep a post out of listings/feeds while it lives in /posts/.
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
