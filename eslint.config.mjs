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
  // Продуктовый код не логирует в консоль: отладочный вывод доезжает до браузера
  // пользователя. Диагностика ошибок — через обработчик ошибок, не через console.
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/**/*.{test,spec,stories}.{ts,tsx}"],
    rules: { "no-console": "error" },
  },
  {
    files: ["src/maps/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../atoms/*", "../molecules/*", "../index"],
              message: "maps kit must not depend on the root entry",
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      "src/atoms/**/*.{ts,tsx}",
      "src/molecules/**/*.{ts,tsx}",
      "src/lib/**/*.{ts,tsx}",
      "src/index.ts",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/maps/*", "../maps", "./maps"],
              message: "root entry must not depend on the maps kit",
            },
          ],
        },
      ],
    },
  },
  { files: ["**/*.{js,mjs}"], extends: [tseslint.configs.disableTypeChecked] },
  { files: ["tsup.config.ts", "vitest.config.ts"], extends: [tseslint.configs.disableTypeChecked] },
  prettier,
);
