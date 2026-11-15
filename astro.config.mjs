// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkDirective from "remark-directive";
import remarkCallouts from "./src/plugins/remark-callouts.mjs";

export default defineConfig({
  site: "https://joaoguedes.net",

  integrations: [mdx(), sitemap()],

  markdown: {
    remarkPlugins: [remarkDirective, remarkCallouts],
    shikiConfig: {
      // defaultColor: false emits CSS vars; global.css switches them via .dark
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
