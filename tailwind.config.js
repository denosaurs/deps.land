const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    fontFamily: {
      mono: [
        "Menlo",
        "Monaco",
        '"Lucida Console"',
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
    extend: {
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
      },
      colors: {
        surface: "#121212",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  purge: false,
};
