import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const schema = JSON.parse(readFileSync(join(ROOT, "tokens/schema.json"), "utf8"));
const canonToOld = Object.fromEntries(
  Object.entries(schema.aliases).map(([old, canon]) => [canon, old]),
);
const roles = Object.values(schema.themed).flat();

function parseBlock(css, selector) {
  const start = css.indexOf(selector);
  const open = css.indexOf("{", start);
  let depth = 1;
  let i = open + 1;
  while (depth > 0) {
    if (css[i] === "{") depth++;
    if (css[i] === "}") depth--;
    i++;
  }
  const body = css.slice(open + 1, i - 1);
  const vars = {};
  for (const m of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/gs))
    vars[m[1]] = m[2].replace(/\s+/g, " ").trim();
  return vars;
}

const color = (value, description) =>
  description
    ? { $type: "color", $value: value, $description: description }
    : { $type: "color", $value: value };

const NEW_ROLE_FROM_OLD = {
  "text-faint": "muted-2",
  "surface-subtle": "bg-2",
  "border-hairline": "line-2",
  "border-input": "line",
  "accent-soft-border": "brand-200",
};

function themeTokens(vars) {
  const out = {};
  for (const role of roles) {
    if (role in canonToOld) out[role] = color(vars[canonToOld[role]]);
    else if (role in NEW_ROLE_FROM_OLD) out[role] = color(vars[NEW_ROLE_FROM_OLD[role]]);
    else if (role === "text-on-accent") out[role] = color("#ffffff");
    else if (role === "backdrop-scrim")
      out[role] = color("#00000080", "ожидает значения от дизайнера");
    else if (role.startsWith("shadow-")) out[role] = { $type: "shadow", $value: vars[role] };
    else if (role in vars) out[role] = color(vars[role]);
    else throw new Error(`no source for ${role}`);
  }
  return out;
}

function extras(vars) {
  const known = new Set([
    ...Object.keys(schema.aliases),
    ...roles,
    ...schema.static,
    "success",
    "danger",
    "info",
  ]);
  const out = {};
  for (const [name, value] of Object.entries(vars)) {
    if (!known.has(name) && !name.startsWith("radius-") && name !== "font-sans")
      out[name] = color(value);
  }
  return out;
}

for (const brand of ["business", "booking"]) {
  const css = readFileSync(join(ROOT, `tokens/legacy/${brand}.css`), "utf8");
  const dark = parseBlock(css, `[data-brand="${brand}"] {`);
  const light = parseBlock(css, `[data-brand="${brand}"][data-theme="light"]`);
  const json = {
    brand,
    defaultTheme: "dark",
    followsSystem: false,
    themes: { light: themeTokens(light), dark: themeTokens(dark) },
    static: Object.fromEntries(
      schema.static.map((s) => [
        s,
        { $type: s === "font-sans" ? "fontFamily" : "dimension", $value: dark[s] },
      ]),
    ),
    extras: { light: extras(light), dark: extras(dark) },
  };
  mkdirSync(join(ROOT, "tokens/brands"), { recursive: true });
  writeFileSync(join(ROOT, `tokens/brands/${brand}.json`), JSON.stringify(json, null, 2) + "\n");
}
