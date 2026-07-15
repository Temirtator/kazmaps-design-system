import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from "./tabs";

const meta: Meta<typeof Tabs> = { title: "Molecules/Tabs", component: Tabs };
export default meta;
export const Interactive: StoryObj<typeof Tabs> = {
  render: function Render() {
    const [tab, setTab] = useState("services");
    return (
      <Tabs
        items={[
          { key: "services", label: "Услуги" },
          { key: "reviews", label: "Отзывы" },
          { key: "about", label: "О компании" },
        ]}
        value={tab}
        onChange={setTab}
      />
    );
  },
};
