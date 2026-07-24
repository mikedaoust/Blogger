import { getCollection, type CollectionEntry } from 'astro:content';

const isDev = import.meta.env.DEV;

/**
 * All posts that should be publicly visible, newest first.
 * Drafts (draft: true) are hidden in production but shown in `astro dev`
 * so you can preview them locally.
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', ({ data }) => isDev || !data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

/** Unique tags across published posts, with counts, sorted by frequency. */
export async function getTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
