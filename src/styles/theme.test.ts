import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");
const read = (p: string): string => readFileSync(join(ROOT, p), "utf8");
type Schema = { themed: Record<string, string[]> };
const schema = JSON.parse(read("tokens/schema.json")) as Schema;

describe("theme.css", () => {
  const css = read("src/styles/theme.css");

  it("maps every color role into the tailwind color namespace", () => {
    for (const [group, roles] of Object.entries(schema.themed)) {
      if (group === "shadow") continue;
      for (const role of roles) expect(css).toContain(`--color-${role}: var(--${role});`);
    }
  });

  it("does not touch radius, shadow or font namespaces", () => {
    expect(css).not.toMatch(/--radius-|--shadow-|--font-/);
  });

  it("is exported by the package together with the maps brand", () => {
    const pkg = JSON.parse(read("package.json")) as { exports: Record<string, string> };
    expect(pkg.exports["./styles/theme.css"]).toBe("./dist/styles/theme.css");
    expect(pkg.exports["./styles/brands/maps.css"]).toBe("./dist/styles/brands/maps.css");
  });
});
