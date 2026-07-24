// Central site metadata. Edit these once and they propagate everywhere.
export const SITE = {
  title: 'blogger',
  // Short tagline shown in the header and used as the default meta description.
  description:
    'Notes from building agentic systems, tuning local LLMs, and working seriously with AI.',
  author: 'Michael',
  // Production origin (also set as `site` in astro.config.mjs).
  url: 'https://blogger.turbozmike.workers.dev',
};

// Header navigation links.
export const NAV = [
  { href: '/', label: 'Posts' },
  { href: '/tags', label: 'Topics' },
  { href: '/about', label: 'About' },
];
