import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    rules: {
      // Disable prop-types since we're using TypeScript
      "react/prop-types": "off",
    },
  },
];
