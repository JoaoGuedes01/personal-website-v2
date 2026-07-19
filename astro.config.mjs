// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// ---------------------------------------------------------------------------
// Deployment note:
//   This is configured for a GitHub *user* page → https://joaoguedes01.github.io
//   (repo named `joaoguedes01.github.io`). If you instead deploy to a *project*
//   repo (e.g. keep it in `personal_website`), the site lives at a sub-path, so:
//     1. set `base: "/personal_website"` below, and
//     2. always build links with `import.meta.env.BASE_URL` (the helpers in
//        src/data/site.ts already do this).
// ---------------------------------------------------------------------------

export default defineConfig({
  site: "https://joaoguedes.net",
  // base: "/personal_website", // ← uncomment only for a project-page deploy

  integrations: [mdx(), sitemap()],

  markdown: {
    shikiConfig: {
      // Dual themes: light code on light site themes, dark on dark ones.
      // `defaultColor: false` emits CSS vars that global.css switches via the
      // `.dark` class (the theme picker toggles it). Swap for any bundled
      // Shiki themes you prefer.
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      wrap: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
