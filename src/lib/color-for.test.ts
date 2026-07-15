import { colorFor } from "./color-for";

describe("colorFor", () => {
  it("is deterministic for the same seed", () => {
    expect(colorFor("Иван Иванов")).toBe(colorFor("Иван Иванов"));
  });
  it("returns a non-empty CSS color string", () => {
    expect(colorFor("x").length).toBeGreaterThan(0);
  });
});
