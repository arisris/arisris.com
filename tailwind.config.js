module.exports = {
  purge: [
    './libs/**/*.js',
    './components/**/*.js',
    './pages/**/*.js'
  ],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            "h1,h2,h3,h4,h5,h6": {
              color: theme("colors.gray.800")
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.200"),
              color: theme("colors.gray.800")
            },
            pre: {
              backgroundColor: theme("colors.gray.100"),
              color: theme("colors.gray.800"),
              border: "2px dotted "+theme("colors.gray.300")
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false
          }
        },
        dark: {
          css: {
            color: theme("colors.gray.200"),
            a: {
              color: theme("colors.gray.200")
            },
            "h1,h2,h3,h4,h5,h6": {
              color: theme("colors.gray.200")
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.800"),
              color: theme("colors.gray.200")
            },
            pre: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.gray.200"),
              border: "2px dotted "+theme("colors.gray.700")
            },
            hr: { borderColor: theme('colors.gray.800') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.800') }
              }
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.800') }
              }
            },
            strong: { color: theme('colors.gray.200') },
            thead: {
              color: theme('colors.gray.200')
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.800')
              }
            },
          }
        }
      })
    }
  },
  variants: {
    typography: ['dark']
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
