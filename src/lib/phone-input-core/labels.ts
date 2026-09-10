export interface PhoneInputLabels {
  region: string;
  search: string;
  groupCis: string;
  groupOther: string;
  noResults: string;
}

export const DEFAULT_LABELS: PhoneInputLabels = {
  region: "Регион",
  search: "Страна или код",
  groupCis: "Казахстан и СНГ",
  groupOther: "Другие страны",
  noResults: "Ничего не найдено",
};

export type PickerCloseReason = "escape" | "blur";
