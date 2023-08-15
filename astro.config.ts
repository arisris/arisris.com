import { defineConfig } from "astro/config";
import unoCss from "unocss/astro";
import presetUno from "unocss/preset-uno";
import presetIcons from "unocss/preset-icons";
import presetTypography from "unocss/preset-typography";
import solid from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";

export default defineConfig({
  output: "static",
  integrations: [
    unoCss({
      presets: [
        presetUno({
          dark: "class"
        }),
        presetTypography(),
        presetIcons({
          collections: {
            async ri() {
              const mod = await import("@iconify-json/ri");
              return mod.icons;
            },
            async logos() {
              const mod = await import("@iconify-json/logos");
              return mod.icons;
            }
          }
        })
      ]
    }),
    solid(),
    mdx({
      gfm: true
    })
  ],
  experimental: {
    assets: true
  },
  compressHTML: true
});
