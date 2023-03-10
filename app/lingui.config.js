const nextConfig = require("./next.config");

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: nextConfig.i18n.locales,
  pseudoLocale: "pseudo",
  sourceLocale: nextConfig.i18n.defaultLocale,
  fallbackLocales: {
    default: nextConfig.i18n.defaultLocale,
  },
  // this is crucial to make `lingui extract` work in nextjs with swc compiler
  extractBabelOptions: {
    presets: ["@babel/preset-typescript", "@babel/preset-react"],
  },
  catalogs: [
    {
      path: "locales/{locale}/messages",
      include: ["pages", "components", "utils"],
      exclude: ["**/node_modules/**"],
    },
  ],
  format: "po",
};
