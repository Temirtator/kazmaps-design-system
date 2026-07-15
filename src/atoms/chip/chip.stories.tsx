import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Chip } from "./chip";

const meta: Meta<typeof Chip> = { title: "Atoms/Chip", component: Chip };
export default meta;
export const Interactive: StoryObj<typeof Chip> = {
  render: function Render() {
    const [active, setActive] = useState(false);
    return <Chip label="Wi-Fi" active={active} onToggle={setActive} />;
  },
};
