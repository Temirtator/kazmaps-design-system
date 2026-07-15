import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThemeToggle, type Theme } from "./theme-toggle";

const meta: Meta<typeof ThemeToggle> = { title: "Molecules/ThemeToggle", component: ThemeToggle };
export default meta;
export const Interactive: StoryObj<typeof ThemeToggle> = {
  render: function Render() {
    const [theme, setTheme] = useState<Theme>("dark");
    return <ThemeToggle theme={theme} onToggle={setTheme} />;
  },
};
