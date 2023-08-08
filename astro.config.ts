import { defineConfig } from "astro/config";
import unoCss from "unocss/astro";
import presetUno from "unocss/preset-uno";
import presetIcons from "unocss/preset-icons";

export default defineConfig({
  output: "static",
  integrations: [
    unoCss({
      presets: [
        presetUno({
          dark: "class"
        }),
        presetIcons({
          autoInstall: false,
          collections: {
            heroicons: () =>
              import("@iconify-json/heroicons/icons.json").then(
                (i) => i.default
              ),
            logos: async () =>
              await import("@iconify-json/logos/icons.json").then((i) => i.default) as Promise<any>
          }
        })
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
