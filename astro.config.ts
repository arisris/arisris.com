import { defineConfig } from "astro/config";
import unoCss from "unocss/astro";
import presetUno from "unocss/preset-uno";
import presetIcons from "unocss/preset-icons";

export default defineConfig({
  integrations: [
    unoCss({
      presets: [
        presetUno({
          dark: "class"
        }),
        presetIcons()
      ]
    })
  ],
  markdown: {
    gfm: true,
    syntaxHighlight: "prism"
  },
  experimental: {
    assets: true
  }
});
