import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");
const readJson = (p: string): unknown => JSON.parse(readFileSync(join(ROOT, p), "utf8"));

type Token = { $type: string; $value: string; $description?: string };
type Schema = {
  themes: string[];
  themed: Record<string, string[]>;
  static: string[];
  aliases: Record<string, string>;
};

const schema = readJson("tokens/schema.json") as Schema;
const core = readJson("tokens/core.json") as Record<string, Token>;
const roles = Object.values(schema.themed).flat();

describe("token schema", () => {
  it("has no duplicate role names across groups, static and aliases", () => {
    const all = [...roles, ...schema.static, ...Object.keys(schema.aliases)];
    expect(new Set(all).size).toBe(all.length);
  });

  it("every alias points to a contract role", () => {
    for (const canon of Object.values(schema.aliases)) expect(roles).toContain(canon);
  });

  it("core tokens are literals", () => {
    for (const [name, token] of Object.entries(core)) {
      expect(token.$value, name).not.toMatch(/var\(/);
    }
  });

  it("generated core.css defines every core token", () => {
    const css = readFileSync(join(ROOT, "src/styles/core.css"), "utf8");
    for (const name of Object.keys(core)) expect(css).toContain(`--${name}:`);
  });
});
