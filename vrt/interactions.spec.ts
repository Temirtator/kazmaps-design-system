import { expect, test, type Page } from "@playwright/test";

// Один и тот же сценарий гоняется по корневой молекуле в двух брендах и по
// kit-версии из /maps: обе головы сидят на общем ядре phone-input-core.
const BRANDS = [
  { brand: "business", story: "molecules-phoneinput--live" },
  { brand: "maps", story: "molecules-phoneinput--live" },
  { brand: "maps", story: "maps-kit-phoneinput--live" },
] as const;

async function openLive(page: Page, brand: string, story: string): Promise<void> {
  await page.goto(`/iframe.html?viewMode=story&id=${story}&globals=brand:${brand};theme:light`);
  await expect(page.getByLabel("Номер телефона")).toBeVisible();
}

const readout = (page: Page) => page.getByTestId("readout");

for (const { brand, story } of BRANDS) {
  test.describe(`${brand} · ${story}`, () => {
    test("typing digits masks the value and yields E.164 when complete", async ({ page }) => {
      await openLive(page, brand, story);
      const input = page.getByLabel("Номер телефона");
      await input.click();
      await expect(input).toHaveValue("");
      await input.pressSequentially("7012345678");
      await expect(input).toHaveValue("(701) 234-56-78");
      await expect(readout(page)).toContainText('"e164":"+77012345678"');
    });

    test("pasting an 8-prefixed number normalizes to KZ", async ({ page }) => {
      await openLive(page, brand, story);
      const input = page.getByLabel("Номер телефона");
      await input.click();
      await page.evaluate(() => navigator.clipboard.writeText("8 701 234 56 78"));
      await page.keyboard.press("ControlOrMeta+V");
      await expect(input).toHaveValue("(701) 234-56-78");
    });

    test("fill() (autofill-like) with an international number switches region", async ({
      page,
    }) => {
      await openLive(page, brand, story);
      const input = page.getByLabel("Номер телефона");
      await input.fill("+998901234567");
      await expect(page.getByRole("button", { name: /Регион/ })).toContainText("+998");
      await expect(input).toHaveValue("90 123-45-67");
      await expect(readout(page)).toContainText('"region":"UZ"');
    });

    test("caret survives editing in the middle", async ({ page }) => {
      await openLive(page, brand, story);
      const input = page.getByLabel("Номер телефона");
      await input.click();
      await input.pressSequentially("7012345678");
      await page.keyboard.press("Home");
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("Delete");
      await expect(input).toHaveValue("(712) 345-67-8_");
      await page.keyboard.type("0");
      await expect(input).toHaveValue("(701) 234-56-78");
    });

    test("picker opens with mouse and keyboard, selection refocuses the input", async ({
      page,
    }) => {
      await openLive(page, brand, story);
      await page.getByRole("button", { name: /Регион/ }).click();
      await expect(page.getByRole("searchbox")).toBeFocused();
      await page.keyboard.type("узб");
      await page.keyboard.press("Enter");
      await expect(page.getByRole("listbox")).toBeHidden();
      await expect(page.getByLabel("Номер телефона")).toBeFocused();
      await page.getByLabel("Номер телефона").press("Escape");
      await page.getByRole("button", { name: /Регион/ }).focus();
      await page.keyboard.press("ArrowDown");
      await expect(page.getByRole("listbox")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("listbox")).toBeHidden();
    });
  });
}
