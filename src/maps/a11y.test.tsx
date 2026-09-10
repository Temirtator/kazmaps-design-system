import { render } from "@testing-library/react";
import axe from "axe-core";

import { KIT_CASES, OVERLAY_CASES } from "./cases";

async function expectNoViolations(el: HTMLElement) {
  const { violations } = await axe.run(el, {
    rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
  });
  expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.html).join("; ")}`)).toEqual([]);
}

describe("maps kit: axe: no violations", () => {
  it.each(KIT_CASES)("%s", async (_name, element) => {
    const { container } = render(element);
    await expectNoViolations(container);
  });
});

describe("maps kit overlays: axe: no violations", () => {
  it.each(OVERLAY_CASES)("%s", async (_name, element) => {
    const { container } = render(element);
    await expectNoViolations(container.childElementCount > 0 ? container : document.body);
  });
});
