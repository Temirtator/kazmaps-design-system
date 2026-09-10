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
  projects: [
    { name: "vrt", use: { browserName: "chromium" }, testMatch: /(components|maps-kit)\.spec\.ts/ },
    {
      name: "interactions",
      use: { browserName: "chromium", permissions: ["clipboard-read", "clipboard-write"] },
      testMatch: /interactions\.spec\.ts/,
    },
  ],
  webServer: {
    command: "npx http-server storybook-static --port 6006 --silent",
    url: "http://127.0.0.1:6006/iframe.html",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
