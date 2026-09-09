import { expect, test } from "@playwright/test";

const THEMES = ["light", "dark"] as const;
const STORIES = ["all", "dialog", "bottom-sheet", "toast", "day-picker"] as const;

function snapshotName(story: string, theme: string): string {
  return story === "all" ? `maps-kit-cases-${theme}.png` : `maps-kit-${story}-${theme}.png`;
}

for (const story of STORIES) {
  for (const theme of THEMES) {
    test(`maps kit ${story} — ${theme}`, async ({ page }) => {
      if (story === "bottom-sheet") {
        // BottomSheet is `md:hidden` by design (mobile-only sheet); the
        // default 900px viewport hides it entirely, so narrow the viewport
        // below Tailwind's `md` breakpoint just for this story.
        await page.setViewportSize({ width: 390, height: 700 });
      }
      await page.goto(
        `/iframe.html?viewMode=story&id=maps-kit-cases--${story}&globals=brand:maps;theme:${theme}`,
      );
      if (story === "dialog") {
        // Dialog renders through a portal into document.body, outside
        // #storybook-root, so assert on its own role instead.
        await expect(page.getByRole("dialog").first()).toBeVisible();
      } else {
        await expect(page.locator("#storybook-root > *").first()).toBeVisible();
      }
      if (story === "toast") {
        await page.getByRole("status").waitFor();
      }
      await expect(page).toHaveScreenshot(snapshotName(story, theme), { fullPage: true });
    });
  }
}
