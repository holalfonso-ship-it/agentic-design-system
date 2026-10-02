import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

// Lint mínimo y bloqueante en CI: reglas recomendadas, sin estilo (no hay Prettier).
export default tseslint.config(
  { ignores: ["dist", "storybook-static", "coverage", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["scripts/**/*.mjs", "*.config.{js,ts}", ".storybook/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.node },
  },
);
