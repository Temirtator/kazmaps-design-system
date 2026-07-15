import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { StarRating } from "./star-rating";

const meta: Meta<typeof StarRating> = {
  title: "Molecules/StarRating",
  component: StarRating,
};
export default meta;

export const Display: StoryObj<typeof StarRating> = {
  args: { value: 4 },
};

export const Interactive: StoryObj<typeof StarRating> = {
  render: function Render() {
    const [v, setV] = useState(3);
    return <StarRating value={v} onChange={setV} size="lg" />;
  },
};
