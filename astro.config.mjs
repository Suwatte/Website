import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Suwatte",
      social: {
        github: "https://github.com/suwatte",
        discord: "https://discord.gg/8wmkXsT6h5",
        patreon: "https://patreon.com/mantton",
      },
      sidebar: [
        {
          label: "Quick Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Welcome to Suwatte!", link: "/guides/quick/welcome/" },
            { label: "External Runners", link: "/guides/quick/external/" },
            {
              label: "Reading Archived Comics",
              link: "/guides/quick/archived/",
            },
            {
              label: "Reading from OPDS Servers",
              link: "/guides/quick/opds/",
            },
            {
              label: "Reading from Komga Servers",
              link: "/guides/quick/komga/",
            },
          ],
        },
        // {
        //   label: "The Daisuke Engine",
        //   items: [],
        // },
        // {
        //   label: "Reference",
        //   autogenerate: { directory: "reference" },
        // },
      ],
      customCss: ["./src/tailwind.css"],
    }),
    tailwind({ applyBaseStyles: true }),
  ],
});
