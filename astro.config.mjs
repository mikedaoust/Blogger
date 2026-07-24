// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Update `site` to your production URL once Cloudflare Pages assigns it
// (e.g. https://blogger.pages.dev or your custom domain). It powers the
// sitemap, RSS feed, and any absolute URLs.
export default defineConfig({
  site: 'https://blogger.pages.dev',
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
