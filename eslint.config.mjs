// @ts-check
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "storybook-static/**", "node_modules/**"] },
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      // Mirrors business-client: its autofix (type X = {} -> interface) breaks
      // copied components' export shapes; keep type aliases as-is.
      "@typescript-eslint/consistent-type-definitions": "off",
    },
  },
  {
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs["recommended-latest"].rules,
  },
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  { files: ["**/*.{js,mjs}"], extends: [tseslint.configs.disableTypeChecked] },
  { files: ["tsup.config.ts", "vitest.config.ts"], extends: [tseslint.configs.disableTypeChecked] },
  prettier,
);
