import { expect, test } from "@playwright/test";

const THEMES = ["light", "dark"] as const;

for (const theme of THEMES) {
  test(`maps kit cases — ${theme}`, async ({ page }) => {
    await page.goto(
      `/iframe.html?viewMode=story&id=maps-kit-cases--all&globals=brand:maps;theme:${theme}`,
    );
    await expect(page.locator("#storybook-root > *").first()).toBeVisible();
    await expect(page).toHaveScreenshot(`maps-kit-cases-${theme}.png`, { fullPage: true });
  });
}
