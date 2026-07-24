// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Production URL. Powers the sitemap, RSS feed, and any absolute URLs.
// Update this if you later add a custom domain.
export default defineConfig({
  site: 'https://blogger.turbozmike.workers.dev',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Dual themes so code blocks look right in light and dark mode.
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
