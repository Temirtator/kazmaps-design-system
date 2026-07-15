import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SegmentedControl } from "./segmented-control";

const meta: Meta<typeof SegmentedControl> = {
  title: "Molecules/SegmentedControl",
  component: SegmentedControl,
};
export default meta;
export const Interactive: StoryObj<typeof SegmentedControl> = {
  render: function Render() {
    const [v, setV] = useState("day");
    return (
      <SegmentedControl
        options={[
          { value: "day", label: "День" },
          { value: "week", label: "Неделя" },
          { value: "month", label: "Месяц" },
        ]}
        value={v}
        onChange={setV}
      />
    );
  },
};
