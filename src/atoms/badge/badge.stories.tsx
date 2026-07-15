import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, type BadgeVariant } from "./badge";

const VARIANTS: BadgeVariant[] = [
  "default",
  "neutral",
  "primary",
  "secondary",
  "brand",
  "success",
  "warning",
  "error",
  "info",
];

const meta: Meta<typeof Badge> = { title: "Atoms/Badge", component: Badge };
export default meta;
export const AllVariants: StoryObj<typeof Badge> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {VARIANTS.map((v) => (
        <Badge key={v} variant={v}>
          {v}
        </Badge>
      ))}
    </div>
  ),
};
