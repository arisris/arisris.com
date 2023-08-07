import { defineConfig } from "astro/config";
import unoCss from "unocss/astro";
import presetUno from "unocss/preset-uno";

export default defineConfig({
  integrations: [
    unoCss({
      presets: [
        presetUno({
          dark: "class"
        })
      ]
    })
  ],
  markdown: {
    gfm: true,
    syntaxHighlight: "prism"
  }
});
