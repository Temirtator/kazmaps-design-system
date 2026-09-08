import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");
const read = (p: string): string => readFileSync(join(ROOT, p), "utf8");

function parseBlock(css: string, selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  expect(start, selector).toBeGreaterThan(-1);
  const open = css.indexOf("{", start);
  let depth = 1;
  let i = open + 1;
  while (depth > 0) {
    if (css[i] === "{") depth++;
    if (css[i] === "}") depth--;
    i++;
  }
  const vars: Record<string, string> = {};
  for (const m of css.slice(open + 1, i - 1).matchAll(/--([\w-]+)\s*:\s*([^;]+);/gs)) {
    vars[m[1]] = m[2].replace(/\s+/g, " ").trim();
  }
  return vars;
}

function resolve(vars: Record<string, string>, name: string): string {
  let value = vars[name];
  for (let hops = 0; hops < 5; hops++) {
    const ref = /^var\(--([\w-]+)\)$/.exec(value ?? "");
    if (!ref) break;
    value = vars[ref[1]];
  }
  return value;
}

for (const brand of ["business", "booking"]) {
  describe(`${brand}: generated css resolves every legacy variable to its old value`, () => {
    const legacy = read(`tokens/legacy/${brand}.css`);
    const next = read(`src/styles/brands/${brand}.css`);
    const base = `[data-brand="${brand}"] {`;
    const light = `[data-brand="${brand}"][data-theme="light"]`;

    it("default (dark) block", () => {
      const old = parseBlock(legacy, base);
      const now = parseBlock(next, base);
      for (const [name, value] of Object.entries(old)) expect(resolve(now, name), name).toBe(value);
    });

    it("light block", () => {
      const old = parseBlock(legacy, light);
      const now = { ...parseBlock(next, base), ...parseBlock(next, light) };
      for (const [name, value] of Object.entries(old)) expect(resolve(now, name), name).toBe(value);
    });
  });
}
