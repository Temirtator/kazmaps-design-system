import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toggle } from "./toggle";

const meta: Meta<typeof Toggle> = { title: "Atoms/Toggle", component: Toggle };
export default meta;
export const Interactive: StoryObj<typeof Toggle> = {
  render: function Render() {
    const [on, setOn] = useState(false);
    return <Toggle checked={on} onChange={setOn} label="Уведомления" />;
  },
};
