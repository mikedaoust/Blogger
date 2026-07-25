// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

// Production URL. Powers the sitemap, RSS feed, and any absolute URLs.
export default defineConfig({
  site: 'https://technicallyoverrated.com',
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

  adapter: cloudflare()
});