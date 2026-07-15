import * as api from "./index";

const EXPECTED = [
  "cn",
  "colorFor",
  "Button",
  "Spinner",
  "Input",
  "Textarea",
  "Select",
  "Checkbox",
  "Toggle",
  "Badge",
  "Chip",
  "ChipPill",
  "Avatar",
  "Skeleton",
  "Divider",
  "Heading",
  "Text",
  "Caption",
  "FormField",
  "SearchInput",
  "SegmentedControl",
  "StarRating",
  "ThemeToggle",
  "Tabs",
  "ErrorBoundary",
];

describe("public API", () => {
  it.each(EXPECTED)("exports %s", (name) => {
    expect(api).toHaveProperty(name);
  });
});
