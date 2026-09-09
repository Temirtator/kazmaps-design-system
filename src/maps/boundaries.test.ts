import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const IMPORT = /(?:from\s+|import\s*\(?\s*)"([^"]+)"/g;

function walk(dir: string): string[] {
  return readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

function sourceFiles(paths: string[]): string[] {
  return paths.filter((f) => /\.tsx?$/.test(f) && !/\.(test|stories)\.tsx?$/.test(f));
}

function importSpecs(file: string): string[] {
  return [...readFileSync(join(ROOT, file), "utf8").matchAll(IMPORT)].map((m) => m[1]);
}

describe("maps kit boundaries", () => {
  it("import regex extracts from-imports, bare side-effect imports and dynamic imports", () => {
    const fixture = [
      'import { Foo } from "./foo";',
      'import "./side-effect.css";',
      'void import("./dynamic");',
    ].join("\n");
    expect([...fixture.matchAll(IMPORT)].map((m) => m[1])).toEqual([
      "./foo",
      "./side-effect.css",
      "./dynamic",
    ]);
  });

  it("maps imports only itself, lib, data and peers", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(walk("maps"))) {
      for (const spec of importSpecs(file)) {
        const ok =
          spec.startsWith("./") ||
          spec.startsWith("../lib/") ||
          spec.startsWith("../data/") ||
          // qrcode is an optional peer dependency read only by qr-code.tsx's dynamic import.
          // react-input-mask-format is a regular dependency shared with the root phone input.
          ["react", "react-dom", "lucide-react", "qrcode", "react-input-mask-format"].includes(
            spec,
          );
        if (!ok) offenders.push(`${file}: ${spec}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("root never imports maps", () => {
    const offenders: string[] = [];
    const files = [
      ...sourceFiles(walk("atoms")),
      ...sourceFiles(walk("molecules")),
      ...sourceFiles(walk("lib")),
      ...sourceFiles(walk("data")),
      "index.ts",
    ];
    for (const file of files) {
      for (const spec of importSpecs(file)) {
        const offends =
          spec === "./maps" ||
          spec.startsWith("./maps/") ||
          spec.startsWith("../maps") ||
          spec.includes("/maps/");
        if (offends) offenders.push(`${file}: ${spec}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
