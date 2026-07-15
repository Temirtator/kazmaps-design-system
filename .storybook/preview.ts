import type { Preview } from "@storybook/react-vite";

import "./preview.css";

const preview: Preview = {
  globalTypes: {
    brand: {
      description: "Brand preset",
      toolbar: { title: "Brand", items: ["business", "booking"], dynamicTitle: true },
    },
    theme: {
      description: "Color theme",
      toolbar: { title: "Theme", items: ["dark", "light"], dynamicTitle: true },
    },
  },
  initialGlobals: { brand: "business", theme: "dark" },
  decorators: [
    (Story, ctx) => {
      const root = document.documentElement;
      root.setAttribute("data-brand", String(ctx.globals.brand));
      root.setAttribute("data-theme", String(ctx.globals.theme));
      document.body.style.background = "var(--bg)";
      document.body.style.color = "var(--ink)";
      document.body.style.fontFamily = "var(--font-sans)";
      return Story();
    },
  ],
  parameters: { backgrounds: { disable: true }, layout: "padded" },
  tags: ["autodocs"],
};
export default preview;
