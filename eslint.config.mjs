import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintComments from "eslint-plugin-eslint-comments";

// Convert ESM URL to CommonJS path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    // Prevents legacy config warnings
    all: false,
  },
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "eslint-comments": eslintComments, // ✅ correct for flat config
    },
    rules: {
      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off", // ✅ Suppress ! operator

      // ESLint Comments Rules
      "eslint-comments/no-unused-disable": "off", // ✅ Suppress unused eslint-disable warning

      // React/Next.js Rules
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",

      // JavaScript Rules
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    },
    settings: {
      next: {
        rootDir: __dirname,
      },
    },
  },
];

export default eslintConfig;
