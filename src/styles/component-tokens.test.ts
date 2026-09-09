import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");
const readJson = (p: string): unknown => JSON.parse(readFileSync(join(ROOT, p), "utf8"));

type Schema = {
  themed: Record<string, string[]>;
  static: string[];
  aliases: Record<string, string>;
};
const schema = readJson("tokens/schema.json") as Schema;
const core = readJson("tokens/core.json") as Record<string, unknown>;

// Badge `brand` читает шкалу business/booking, которой нет в контракте; перевод на
// accent-soft-bg/accent-press сдвинул бы пиксели (dark: brand-50 #11131f ≠ accent-soft-bg
// #1a1d33). Уходит в C3 вместе с ревизией вида business/booking.
const ALLOWED_UNTIL_C3 = new Set(["--brand-50", "--brand-700"]);

const allowed = new Set(
  [
    ...Object.values(schema.themed).flat(),
    ...schema.static,
    ...Object.keys(schema.aliases),
    ...Object.keys(core),
  ].map((n) => `--${n}`),
);

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

it("components reference only contract, alias or core tokens", () => {
  const files = [...walk(join(ROOT, "src/atoms")), ...walk(join(ROOT, "src/molecules"))].filter(
    (f) => /\.tsx?$/.test(f) && !/\.(test|stories)\.tsx?$/.test(f),
  );
  const offenders: string[] = [];
  for (const file of files) {
    for (const m of readFileSync(file, "utf8").matchAll(/--[a-z][a-z0-9-]*/g)) {
      const name = m[0];
      if (!allowed.has(name) && !ALLOWED_UNTIL_C3.has(name)) offenders.push(`${file}: ${name}`);
    }
  }
  expect(offenders).toEqual([]);
});
