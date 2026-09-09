import type { Meta, StoryObj } from "@storybook/react-vite";

import { KIT_CASES } from "./cases";

const meta: Meta = { title: "Maps kit/Cases" };
export default meta;

export const All: StoryObj = {
  render: () => (
    <div className="flex max-w-[420px] flex-col gap-4">
      {KIT_CASES.map(([name, element]) => (
        <section key={name} className="flex flex-col gap-2">
          <h3 className="text-[11px] uppercase tracking-wider text-(color:--text-tertiary)">
            {name}
          </h3>
          {element}
        </section>
      ))}
    </div>
  ),
};
