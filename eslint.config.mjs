import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

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
  ...compat.extends(
    "next/core-web-vitals", // Next.js performance-focused rules
    "next/typescript" // Next.js TypeScript support
  ),
  {
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
        }
      ],
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type
      "@typescript-eslint/no-non-null-assertion": "warn", // Warn on ! operator
      
      // React/Next.js Rules
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "warn", // Warn about native <img>
      
      // JavaScript Rules
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "@typescript-eslint/no-unused-vars": "warn", // Downgrade to warning
      "@next/next/no-img-element": "off",          // Disable completely
      "react-hooks/exhaustive-deps": "warn",        // Warn instead of error
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
    settings: {
      next: {
        rootDir: __dirname // Ensure Next.js plugin knows project root
      }
    }
  }
];

export default eslintConfig;