import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: false,
  clean: true,
  minify: false,
  target: "es2022",
  external: ["react", "react-dom", "lucide-react"],
  banner: { js: '"use client";' },
  onSuccess:
    "mkdir -p dist/styles/brands && if [ -f src/styles/core.css ]; then cp src/styles/core.css dist/styles/ && cp src/styles/brands/*.css dist/styles/brands/; fi",
});
