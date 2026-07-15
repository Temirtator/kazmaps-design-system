// Ambient module declaration for CSS side-effect imports (e.g. `import "./preview.css"`)
// in .storybook config files. Vite/Storybook resolve these at build time; plain `tsc`
// (used by `npm run typecheck` and ESLint's type-aware linting) needs this to know the
// import is a valid module.
declare module "*.css";
