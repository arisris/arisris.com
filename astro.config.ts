import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  output: "static",
  integrations: [tailwind(), solid(), sitemap()],
  experimental: {
    optimizeHoistedScript: true,
    assets: true
  },
  site: isProd ? "https://arisris.com" : "http://localhost:3000",
  compressHTML: isProd
});
