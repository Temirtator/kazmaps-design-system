import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchInput } from "./search-input";

const meta: Meta<typeof SearchInput> = { title: "Molecules/SearchInput", component: SearchInput };
export default meta;
export const Interactive: StoryObj<typeof SearchInput> = {
  render: function Render() {
    const [q, setQ] = useState("");
    return <SearchInput value={q} onChange={setQ} placeholder="Поиск по филиалам" shortcut="⌘K" />;
  },
};
