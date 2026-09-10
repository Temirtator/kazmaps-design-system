import { expect, test, type Page } from "@playwright/test";

const STORIES = [
  { id: "atoms-checkbox--states", name: "checkbox-states" },
  { id: "atoms-input--states", name: "input-states" },
  { id: "atoms-select--interactive", name: "select" },
  { id: "atoms-select--with-error", name: "select-error" },
  { id: "atoms-toggle--interactive", name: "toggle-off" },
  { id: "molecules-errorboundary--caught", name: "error-boundary-fallback" },
  { id: "molecules-formfield--with-error", name: "form-field-error" },
  { id: "molecules-phoneinput--states", name: "phone-input-states" },
  { id: "molecules-phoneinput--sizes", name: "phone-input-sizes" },
  { id: "molecules-searchinput--interactive", name: "search-input" },
  { id: "molecules-segmentedcontrol--interactive", name: "segmented-control" },
  { id: "molecules-starrating--display", name: "star-rating-display" },
  { id: "molecules-starrating--interactive", name: "star-rating-interactive" },
  { id: "molecules-tabs--interactive", name: "tabs" },
];

const THEMES = ["dark", "light"] as const;

async function openStory(page: Page, id: string, theme: string, brand = "business"): Promise<void> {
  await page.goto(`/iframe.html?viewMode=story&id=${id}&globals=brand:${brand};theme:${theme}`);
  await expect(page.locator("#storybook-root > *").first()).toBeVisible();
}

for (const story of STORIES) {
  for (const theme of THEMES) {
    test(`${story.name} — ${theme}`, async ({ page }) => {
      await openStory(page, story.id, theme);
      await expect(page).toHaveScreenshot(`${story.name}-${theme}.png`, { fullPage: true });
    });
  }
}

// State shots for the visual fixes on this branch: the toggle thumb is only
// distinguishable from the track when on, and the select listbox only renders
// while open (ArrowDown exercises the restored keyboard-open path).
for (const theme of THEMES) {
  test(`toggle-on — ${theme}`, async ({ page }) => {
    await openStory(page, "atoms-toggle--interactive", theme);
    await page.getByRole("switch").click();
    await expect(page.getByRole("switch")).toHaveAttribute("aria-checked", "true");
    await expect(page).toHaveScreenshot(`toggle-on-${theme}.png`, { fullPage: true });
  });

  test(`select-open — ${theme}`, async ({ page }) => {
    await openStory(page, "atoms-select--interactive", theme);
    await page.getByRole("button", { name: "Город" }).focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("listbox")).toBeVisible();
    await expect(page).toHaveScreenshot(`select-open-${theme}.png`, { fullPage: true });
  });

  test(`phone-input-picker-open — ${theme}`, async ({ page }) => {
    await openStory(page, "molecules-phoneinput--states", theme);
    await page
      .getByRole("button", { name: /Регион/ })
      .first()
      .click();
    await expect(page.getByRole("listbox")).toBeVisible();
    await expect(page).toHaveScreenshot(`phone-input-picker-open-${theme}.png`, { fullPage: true });
  });
}

for (const story of STORIES) {
  for (const theme of THEMES) {
    test(`maps ${story.name} — ${theme}`, async ({ page }) => {
      await openStory(page, story.id, theme, "maps");
      await expect(page).toHaveScreenshot(`maps-${story.name}-${theme}.png`, { fullPage: true });
    });
  }
}

for (const story of STORIES) {
  for (const theme of THEMES) {
    test(`booking ${story.name} — ${theme}`, async ({ page }) => {
      await openStory(page, story.id, theme, "booking");
      await expect(page).toHaveScreenshot(`booking-${story.name}-${theme}.png`, {
        fullPage: true,
      });
    });
  }
}

async function readSurfacePanel(page: Page): Promise<string> {
  return page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--surface-panel").trim(),
  );
}

test.describe("maps follows the system theme", () => {
  test.use({ colorScheme: "dark" });

  test("no data-theme falls back to the system dark scheme", async ({ page }) => {
    await page.goto(`/iframe.html?viewMode=story&id=${STORIES[0].id}&globals=brand:maps`);
    await expect(page.locator("#storybook-root > *").first()).toBeVisible();
    await page.evaluate(() => document.documentElement.removeAttribute("data-theme"));
    await page.waitForTimeout(50);
    expect(await readSurfacePanel(page)).toBe("#0d1320");
  });

  test("explicit data-theme=light overrides the system dark scheme", async ({ page }) => {
    await page.goto(`/iframe.html?viewMode=story&id=${STORIES[0].id}&globals=brand:maps`);
    await expect(page.locator("#storybook-root > *").first()).toBeVisible();
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "light"));
    await page.waitForTimeout(50);
    expect(await readSurfacePanel(page)).toBe("#fff");
  });
});
