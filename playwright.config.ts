import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "vrt",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [["list"]],
  expect: {
    toHaveScreenshot: { animations: "disabled", caret: "hide" },
  },
  use: {
    baseURL: "http://127.0.0.1:6006",
    viewport: { width: 900, height: 700 },
    deviceScaleFactor: 1,
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer: {
    command: "npx http-server storybook-static --port 6006 --silent",
    url: "http://127.0.0.1:6006/iframe.html",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
