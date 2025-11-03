// import js from "@eslint/js";
// import globals from "globals";
// import pluginReact from "eslint-plugin-react";
// import json from "@eslint/json";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   pluginReact.configs.flat.recommended,
//   { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
// ]);

import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parser: "@babel/eslint-parser",
      parserOptions: {
        requireConfigFile: false, // مهم جدًا عشان ESLint يشتغل من غير babel.config.js
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      import: pluginImport,
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended,
      "plugin:react/jsx-runtime",
      "plugin:import/recommended",
    ],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "react/prop-types": "off",
      "import/no-unused-modules": ["warn", { unusedExports: true }],
      "import/order": ["warn", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
      }],
    },
    settings: {
      react: { version: "detect" },
    },
  },
]);
