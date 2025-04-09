// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  useTabs: true,
  singleQuote: true,
  trailingComma: "none",
  printWidth: 100,
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
    "prettier-plugin-merge",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
