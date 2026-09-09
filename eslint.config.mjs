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
      "src/data/**/*.{ts,tsx}",
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
  {
    // place-row.tsx is copied byte-identical from main-web (a Next.js app) and
    // carries a `// eslint-disable-next-line @next/next/no-img-element` comment.
    // This repo has no `@next/eslint-plugin-next`, so ESLint can't resolve the
    // rule name and errors on the directive itself; register a no-op stand-in
    // so the untouched comment lints clean without pulling in Next.js tooling.
    files: ["src/maps/place-row.tsx"],
    plugins: { "@next/next": { rules: { "no-img-element": { create: () => ({}) } } } },
    linterOptions: { reportUnusedDisableDirectives: "off" },
  },
  { files: ["**/*.{js,mjs}"], extends: [tseslint.configs.disableTypeChecked] },
  { files: ["tsup.config.ts", "vitest.config.ts"], extends: [tseslint.configs.disableTypeChecked] },
  prettier,
);
