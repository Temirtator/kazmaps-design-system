import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");
const read = (p: string): string => readFileSync(join(ROOT, p), "utf8");
const readJson = (p: string): unknown => JSON.parse(read(p));

type Token = { $type: string; $value: string; $description?: string };
type Brand = {
  brand: string;
  defaultTheme: string;
  followsSystem: boolean;
  themes: Record<string, Record<string, Token>>;
  static: Record<string, Token>;
  extras?: Record<string, Record<string, Token>>;
};
type Schema = {
  themes: string[];
  themed: Record<string, string[]>;
  static: string[];
  aliases: Record<string, string>;
};

const schema = readJson("tokens/schema.json") as Schema;
const roles = Object.values(schema.themed).flat();
const BRANDS = ["business", "booking", "maps"];

function definedVars(cssBlock: string): Set<string> {
  return new Set(Array.from(cssBlock.matchAll(/(--[\w-]+)\s*:/g)).map((m) => m[1]));
}

function block(css: string, selector: string): string {
  const start = css.indexOf(selector);
  expect(start, selector).toBeGreaterThan(-1);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  return css.slice(open + 1, close);
}

for (const name of BRANDS) {
  describe(`brand ${name}`, () => {
    const brand = readJson(`tokens/brands/${name}.json`) as Brand;
    const css = read(`src/styles/brands/${name}.css`);

    it("declares defaultTheme among themes", () => {
      expect(schema.themes).toContain(brand.defaultTheme);
      expect(Object.keys(brand.themes).sort()).toEqual([...schema.themes].sort());
    });

    for (const theme of schema.themes) {
      it(`${theme}: every contract role is a literal`, () => {
        for (const role of roles) {
          const token = brand.themes[theme][role];
          expect(token, role).toBeDefined();
          expect(token.$value, role).not.toMatch(/var\(/);
        }
      });
      it(`${theme}: extras do not collide with the contract`, () => {
        for (const extra of Object.keys(brand.extras?.[theme] ?? {})) {
          expect(roles, extra).not.toContain(extra);
          expect(Object.keys(schema.aliases), extra).not.toContain(extra);
        }
      });
      it(`${theme}: generated block defines every contract role`, () => {
        const vars = definedVars(block(css, `[data-brand="${name}"][data-theme="${theme}"]`));
        for (const role of roles) expect(vars).toContain(`--${role}`);
      });
    }

    it("static roles are literals", () => {
      for (const role of schema.static) {
        expect(brand.static[role], role).toBeDefined();
        if (role !== "font-sans") expect(brand.static[role].$value, role).not.toMatch(/var\(/);
      }
    });

    it("follows the system theme only when declared", () => {
      const media = css.includes(`@media (prefers-color-scheme: dark)`);
      expect(media).toBe(brand.followsSystem);
      if (brand.followsSystem) {
        expect(css).toContain(`[data-brand="${name}"]:not([data-theme="light"]) {`);
        const start = css.indexOf("@media (prefers-color-scheme: dark)");
        const vars = definedVars(css.slice(start));
        for (const role of roles) expect(vars).toContain(`--${role}`);
      }
    });

    it("base block carries the default theme values", () => {
      const base = block(css, `[data-brand="${name}"] {`);
      for (const role of roles) {
        expect(base).toContain(`--${role}: ${brand.themes[brand.defaultTheme][role].$value};`);
      }
    });

    it("base block defines contract, static and every alias pointing at its canon", () => {
      const base = block(css, `[data-brand="${name}"] {`);
      const vars = definedVars(base);
      for (const role of [...roles, ...schema.static]) expect(vars).toContain(`--${role}`);
      for (const [old, canon] of Object.entries(schema.aliases)) {
        expect(base).toContain(`--${old}: var(--${canon});`);
      }
    });
  });
}
