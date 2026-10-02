// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://suwatte.app',
  // /open only forwards shared app links; it has nothing to index.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/open/') })],
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
