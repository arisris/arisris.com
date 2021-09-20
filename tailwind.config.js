const { spacing, fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./libs/**/*.js", "./components/**/*.js", "./pages/**/*.js", "./hooks/**/*.js"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              'text-decoration': 'none !important',
              color: `${theme("colors.blue.500")} !important`,
              "&:hover": {
                color: theme("colors.blue.700"),
              },
              code: { color: theme("colors.blue.400") },
            },
            "h1,h2,h3,h4,h5,h6": {
              "scroll-margin-top": spacing[32],
            },
            code: { color: theme("colors.pink.500") },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              'text-decoration': 'none',
              color: `${theme("colors.blue.400")} !important`,
              "&:hover": {
                color: theme("colors.blue.600"),
              },
              code: { color: theme("colors.blue.400") },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            "h1,h2,h3,h4,h5,h6": {
              color: theme("colors.gray.100"),
              "scroll-margin-top": spacing[32],
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.300") },
            thead: {
              color: theme("colors.gray.100"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animatecss")({
      classes: [
        "animate__animated",
        "animate__fadeIn",
        "animate__zoomIn",
        "animate__fast",
        "animate__faster",
      ],
      settings: {
        animatedSpeed: 300,
        heartBeatSpeed: 300,
        hingeSpeed: 750,
        bounceInSpeed: 450,
        bounceOutSpeed: 450,
        animationDelaySpeed: 300,
      },
      variants: ["responsive", "hover"],
    }),
  ],
}
