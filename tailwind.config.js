/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  content: [
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}"
  ],
  mode: "jit",
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({ strategy: "class" })
  ]
};
