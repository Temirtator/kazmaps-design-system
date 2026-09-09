import * as kit from "./index";

const EXPECTED = [
  "Button",
  "IconButton",
  "AvatarInitial",
  "Chip",
  "InDevelopment",
  "EmptyState",
  "ListRow",
  "LogoLockup",
  "LogoPin",
  "Panel",
  "PasswordInput",
  "PhoneInput",
  "PlaceRow",
  "QrCode",
  "ScaleBar",
  "SearchInput",
  "SectionError",
  "SectionHeader",
  "SegmentedRow",
  "ShimmerBlock",
  "StarRating",
  "TextInput",
  "Toggle",
  "Dialog",
  "BottomSheet",
  "ToastProvider",
  "useToast",
  "DayPicker",
  "useFocusTrap",
  "isTopmostTrap",
  "formatE164",
  "parseE164",
];

describe("maps kit public API", () => {
  it.each(EXPECTED)("exports %s", (name) => {
    expect(kit).toHaveProperty(name);
  });
});
