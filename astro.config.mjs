// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://suwatte.mantton.com',
  integrations: [sitemap()],
  redirects: {
    '/docs': '/docs/introduction/',
    '/developers': '/developers/introduction/',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'poimandres',
      },
      wrap: false,
    },
  },
});
