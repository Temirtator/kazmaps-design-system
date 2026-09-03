import { DEFAULT_REGION, findRegion, REGIONS } from "./regions";

describe("REGIONS", () => {
  it("has unique two-letter ISO codes", () => {
    const codes = REGIONS.map((r) => r.iso);
    expect(new Set(codes).size).toBe(codes.length);
    for (const c of codes) expect(c).toMatch(/^[A-Z]{2}$/);
  });
  it("dial codes are 1–3 digits without plus", () => {
    for (const r of REGIONS) expect(r.dial).toMatch(/^\d{1,3}$/);
  });
  it("exactly ten CIS regions carry a mask made of 9-tokens and literal digits", () => {
    const masked = REGIONS.filter((r) => r.mask !== undefined);
    expect(masked.map((r) => r.iso).sort()).toEqual([
      "AM",
      "AZ",
      "BY",
      "GE",
      "KG",
      "KZ",
      "RU",
      "TJ",
      "TM",
      "UZ",
    ]);
    for (const r of masked) {
      expect(r.group).toBe("cis");
      expect(r.mask).toMatch(/^[0-8 9()\-]+$/);
    }
  });
  it("orders KZ first, then CIS, then the rest alphabetically by Russian name", () => {
    expect(REGIONS[0].iso).toBe("KZ");
    const cis = REGIONS.filter((r) => r.group === "cis");
    expect(REGIONS.slice(0, cis.length).every((r) => r.group === "cis")).toBe(true);
    const rest = REGIONS.slice(cis.length).map((r) => r.name);
    expect(rest).toEqual([...rest].sort((a, b) => a.localeCompare(b, "ru")));
  });
  it.each([
    ["KZ", "7"],
    ["UZ", "998"],
    ["US", "1"],
    ["GB", "44"],
    ["DE", "49"],
    ["CN", "86"],
    ["TR", "90"],
    ["AE", "971"],
  ])("%s dials +%s", (iso, dial) => {
    expect(findRegion(iso)?.dial).toBe(dial);
  });
  it("findRegion is case-insensitive and DEFAULT_REGION resolves", () => {
    expect(findRegion("kz")?.iso).toBe("KZ");
    expect(findRegion("zz")).toBeUndefined();
    expect(findRegion(DEFAULT_REGION)?.name).toBe("Казахстан");
  });
  it("has at least 190 regions", () => {
    expect(REGIONS.length).toBeGreaterThanOrEqual(190);
  });
});
