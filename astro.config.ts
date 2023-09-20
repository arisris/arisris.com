import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import Icons from "unplugin-icons/vite";
import iconifyTypegen from "./plugins/iconify-typegen";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [tailwind(), solid(), iconifyTypegen()],
  vite: {
    plugins: [
      Icons({
        autoInstall: false,
        compiler: "astro"
      })
    ]
  },
  site: isProd ? "https://arisris.com" : "http://localhost:3000",
  compressHTML: isProd
});
