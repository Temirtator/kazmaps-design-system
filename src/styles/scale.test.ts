import { readFileSync } from "node:fs";
import { join } from "node:path";

const styles = join(__dirname);
const read = (p: string) => readFileSync(join(styles, p), "utf8");

const TEXT = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"];

const EXPECTED: Record<string, Record<string, string>> = {
  business: {
    "text-xs": "11px",
    "text-sm": "13px",
    "text-base": "15px",
    "text-lg": "17px",
    "text-xl": "20px",
    "text-2xl": "24px",
    "text-3xl": "30px",
    "radius-sm": "6px",
    "radius-md": "8px",
    "radius-lg": "12px",
  },
  booking: {
    "text-xs": "11px",
    "text-sm": "13px",
    "text-base": "15px",
    "text-lg": "17px",
    "text-xl": "20px",
    "text-2xl": "24px",
    "text-3xl": "30px",
    "radius-sm": "8px",
    "radius-md": "12px",
    "radius-lg": "16px",
  },
  maps: {
    "text-xs": "0.75rem",
    "text-sm": "0.875rem",
    "text-base": "1rem",
    "text-lg": "1.125rem",
    "text-xl": "1.25rem",
    "text-2xl": "1.5rem",
    "text-3xl": "1.875rem",
    "radius-sm": "0.25rem",
    "radius-md": "0.375rem",
    "radius-lg": "0.5rem",
  },
};

const MAPS_KIT_STATIC: Record<string, string> = {
  "ease-standard": "cubic-bezier(0.4, 0, 0.2, 1)",
  "motion-fast": "140ms",
  "motion-panel": "240ms",
  "motion-shimmer": "1.6s",
  "shadow-column": "rgba(16, 24, 40, 0.05) 2px 0px 8px 0px",
  "shadow-button-sm": "rgba(16, 24, 40, 0.08) 0px 1px 3px 0px",
  "shadow-button-md": "rgba(16, 24, 40, 0.1) 0px 1px 3px 0px",
  "shadow-modal": "rgba(16, 24, 40, 0.28) 0px 18px 48px 0px",
  "shadow-sheet-top": "rgba(16, 24, 40, 0.14) 0px -4px 20px 0px",
  "shadow-dropdown": "rgba(16, 24, 40, 0.22) 0px 12px 32px 0px",
};

function baseBlock(css: string, brand: string): string {
  const start = css.indexOf(`[data-brand="${brand}"] {`);
  return css.slice(start, css.indexOf("\n}\n", start));
}

describe("brand scale", () => {
  it("core.css declares no text scale", () => {
    const core = read("core.css");
    for (const name of TEXT) expect(core).not.toContain(`--${name}:`);
  });

  it.each(Object.keys(EXPECTED))("%s declares its own text and radius scale", (brand) => {
    const block = baseBlock(read(`brands/${brand}.css`), brand);
    for (const [name, value] of Object.entries(EXPECTED[brand])) {
      expect(block, name).toContain(`--${name}: ${value};`);
    }
  });

  it("maps declares the kit statics", () => {
    const block = baseBlock(read("brands/maps.css"), "maps");
    for (const [name, value] of Object.entries(MAPS_KIT_STATIC)) {
      expect(block, name).toContain(`--${name}: ${value};`);
    }
  });

  it("maps declares shimmer-peak per theme", () => {
    const css = read("brands/maps.css");
    expect(css).toMatch(
      /\[data-brand="maps"\]\[data-theme="light"\] \{[^}]*--shimmer-peak: 0\.94;/,
    );
    expect(css).toMatch(/\[data-brand="maps"\]\[data-theme="dark"\] \{[^}]*--shimmer-peak: 1\.12;/);
  });

  it("business and booking declare no kit statics", () => {
    for (const brand of ["business", "booking"]) {
      const css = read(`brands/${brand}.css`);
      expect(css).not.toContain("--motion-fast:");
      expect(css).not.toContain("--shadow-button-md:");
      expect(css).not.toContain("--shimmer-peak:");
    }
  });
});

describe("highlight roles", () => {
  const VALUES: Record<string, Record<string, [string, string]>> = {
    business: { light: ["#c99a16", "#f9f0d8"], dark: ["#f0bf00", "#241f10"] },
    booking: { light: ["#e8a317", "#fbefd3"], dark: ["#e8a317", "#3a2f1a"] },
    maps: { light: ["#f2a615", "#fdf3e6"], dark: ["#f2a615", "#141d31"] },
  };

  it.each(Object.keys(VALUES))("%s themes highlight and highlight-soft", (brand) => {
    const css = read(`brands/${brand}.css`);
    for (const theme of ["light", "dark"] as const) {
      const [highlight, soft] = VALUES[brand][theme];
      const block = css.slice(css.indexOf(`[data-brand="${brand}"][data-theme="${theme}"] {`));
      expect(block.slice(0, block.indexOf("\n}\n"))).toContain(`--highlight: ${highlight};`);
      expect(block.slice(0, block.indexOf("\n}\n"))).toContain(`--highlight-soft: ${soft};`);
    }
  });

  it("aliases gold to highlight in the base block", () => {
    for (const brand of ["business", "booking", "maps"]) {
      const block = baseBlock(read(`brands/${brand}.css`), brand);
      expect(block).toContain("--gold: var(--highlight);");
      expect(block).toContain("--gold-soft: var(--highlight-soft);");
      expect(block).not.toMatch(/--gold: #/);
    }
  });

  it("theme.css exposes color-highlight", () => {
    const theme = read("theme.css");
    expect(theme).toContain("--color-highlight: var(--highlight);");
    expect(theme).toContain("--color-highlight-soft: var(--highlight-soft);");
  });
});
