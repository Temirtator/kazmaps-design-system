import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const IMPORT = /from "([^"]+)"/g;

function files(dir: string): string[] {
  return readdirSync(join(ROOT, dir))
    .filter((f) => /\.tsx?$/.test(f) && !/\.(test|stories)\.tsx?$/.test(f))
    .map((f) => join(dir, f));
}

describe("maps kit boundaries", () => {
  it("maps imports only itself, lib, data and peers", () => {
    const offenders: string[] = [];
    for (const file of files("maps")) {
      for (const m of readFileSync(join(ROOT, file), "utf8").matchAll(IMPORT)) {
        const spec = m[1];
        const ok =
          spec.startsWith("./") ||
          spec.startsWith("../lib/") ||
          spec.startsWith("../data/") ||
          ["react", "react-dom", "lucide-react"].includes(spec);
        if (!ok) offenders.push(`${file}: ${spec}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("root never imports maps", () => {
    const offenders: string[] = [];
    const walk = (dir: string): string[] =>
      readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
      );
    for (const file of [...walk("atoms"), ...walk("molecules"), ...walk("lib"), "index.ts"]) {
      if (!/\.tsx?$/.test(file)) continue;
      if (readFileSync(join(ROOT, file), "utf8").includes("maps/")) offenders.push(file);
    }
    expect(offenders).toEqual([]);
  });
});
