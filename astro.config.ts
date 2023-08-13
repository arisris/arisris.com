import { defineConfig } from "astro/config";
import unoCss from "unocss/astro";
import presetUno from "unocss/preset-uno";
import presetIcons from "unocss/preset-icons";
import presetTypography from "unocss/preset-typography";

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
    })
  ],
  experimental: {
    assets: true
  }
});
