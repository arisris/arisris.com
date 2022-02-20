/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  content: [
    "./lib/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}"
  ],
  mode: "jit",
  darkMode: "class",
  variants: {
    typography: ["dark"]
  },
  plugins: [require("@tailwindcss/typography")]
};
