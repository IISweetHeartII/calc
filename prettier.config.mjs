/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  // Core formatting options
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  endOfLine: "lf",

  // Trailing commas (ES5 style for better git diffs)
  trailingComma: "es5",

  // Arrow functions
  arrowParens: "always",

  // JSX
  jsxSingleQuote: false,
  bracketSameLine: false,

  // Plugins
  plugins: ["prettier-plugin-tailwindcss"],

  // Tailwind CSS class sorting
  tailwindFunctions: ["cn", "cva"],
};

export default config;
