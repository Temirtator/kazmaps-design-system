import { cn } from "./cn";

describe("cn", () => {
  it("merges conditional classes", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
  it("resolves tailwind conflicts (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
  it("keeps arbitrary-value token classes intact", () => {
    expect(cn("bg-[var(--brand)]", "text-[var(--ink)]")).toBe(
      "bg-[var(--brand)] text-[var(--ink)]",
    );
  });
});
