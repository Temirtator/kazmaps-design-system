import { readFileSync } from "node:fs";
import { join } from "node:path";

const COLOR_TOKENS = [
  "--bg",
  "--bg-2",
  "--card",
  "--line",
  "--line-2",
  "--ink",
  "--ink-2",
  "--muted",
  "--muted-2",
  "--brand",
  "--brand-press",
  "--brand-soft",
  "--brand-50",
  "--brand-100",
  "--brand-200",
  "--brand-300",
  "--brand-400",
  "--brand-500",
  "--brand-600",
  "--brand-700",
  "--gold",
  "--gold-press",
  "--gold-soft",
  "--success",
  "--success-soft",
  "--danger",
  "--danger-soft",
  "--warn",
  "--warn-soft",
  "--info",
  "--info-soft",
  "--shadow-sm",
  "--shadow-md",
  "--shadow-lg",
] as const;
const BASE_ONLY_TOKENS = [
  "--radius-sm",
  "--radius-md",
  "--radius-lg",
  "--radius-full",
  "--font-sans",
] as const;
const CORE_TOKENS = [
  "--text-xs",
  "--text-sm",
  "--text-base",
  "--text-lg",
  "--text-xl",
  "--text-2xl",
  "--text-3xl",
  "--space-3",
  "--space-page",
  "--dur-fast",
  "--dur-base",
  "--dur-slow",
  "--dur-reveal",
  "--ease-standard",
  "--ease-spring",
  "--ease-reveal",
] as const;

function definedVars(cssBlock: string): Set<string> {
  const matches = Array.from(cssBlock.matchAll(/(--[\w-]+)\s*:/g));
  return new Set(matches.map((m) => m[1]));
}

function block(css: string, selector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  return css.slice(open + 1, close);
}

const read = (p: string): string => readFileSync(join(__dirname, p), "utf8");

describe("token contract", () => {
  it("core.css defines type/spacing/motion tokens", () => {
    const vars = definedVars(block(read("core.css"), ":root"));
    for (const t of CORE_TOKENS) expect(vars).toContain(t);
  });

  for (const brand of ["business", "booking"] as const) {
    it(`${brand}.css dark block defines the full palette + radii + font`, () => {
      const css = read(`brands/${brand}.css`);
      const vars = definedVars(block(css, `[data-brand="${brand}"] {`));
      for (const t of [...COLOR_TOKENS, ...BASE_ONLY_TOKENS]) expect(vars).toContain(t);
    });
    it(`${brand}.css light block overrides the full color palette`, () => {
      const css = read(`brands/${brand}.css`);
      const vars = definedVars(block(css, `[data-brand="${brand}"][data-theme="light"]`));
      for (const t of COLOR_TOKENS) expect(vars).toContain(t);
    });
  }
});
