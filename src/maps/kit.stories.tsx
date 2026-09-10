import type { Meta, StoryObj } from "@storybook/react-vite";

import { KIT_CASES, OVERLAY_CASES } from "./cases";

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

export const Dialog: StoryObj = { render: () => OVERLAY_CASES[0][1] };
export const BottomSheet: StoryObj = { render: () => OVERLAY_CASES[1][1] };
export const Toast: StoryObj = { render: () => OVERLAY_CASES[2][1] };
export const DayPicker: StoryObj = { render: () => OVERLAY_CASES[3][1] };
