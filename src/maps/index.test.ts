import * as kit from "./index";

const EXPECTED = ["Button", "IconButton"];

describe("maps kit public API", () => {
  it.each(EXPECTED)("exports %s", (name) => {
    expect(kit).toHaveProperty(name);
  });
});
