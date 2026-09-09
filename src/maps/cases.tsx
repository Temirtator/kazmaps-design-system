import { Layers, MapPin, Route } from "lucide-react";
import { type ReactElement, useEffect } from "react";

import {
  AvatarInitial,
  BottomSheet,
  Button,
  Chip,
  DayPicker,
  Dialog,
  EmptyState,
  IconButton,
  InDevelopment,
  ListRow,
  LogoLockup,
  LogoPin,
  Panel,
  PasswordInput,
  PlaceRow,
  QrCode,
  ScaleBar,
  SearchInput,
  SectionError,
  SectionHeader,
  SegmentedRow,
  ShimmerBlock,
  StarRating,
  TextInput,
  ToastProvider,
  Toggle,
  useToast,
} from "./index";

const noop = () => undefined;

export const KIT_CASES: [string, ReactElement][] = [
  ["Button outline", <Button key="k">Сохранить</Button>],
  [
    "Button filled-accent",
    <Button key="k" variant="filled-accent">
      Продолжить
    </Button>,
  ],
  [
    "IconButton",
    <IconButton key="k" label="Моё местоположение">
      <MapPin size={18} aria-hidden="true" />
    </IconButton>,
  ],
  ["AvatarInitial", <AvatarInitial key="k" name="Айгерим" seed="Айгерим" />],
  ["Chip", <Chip key="k" label="Кафе" />],
  ["Chip active", <Chip key="k" label="Кафе" active />],
  ["InDevelopment", <InDevelopment key="k">Скоро</InDevelopment>],
  ["EmptyState", <EmptyState key="k" title="Пусто" description="Здесь пока ничего нет" />],
  [
    "ListRow",
    <ListRow
      key="k"
      icon={<Route size={16} aria-hidden="true" />}
      title="Маршруты"
      subtitle="3 сохранённых"
    />,
  ],
  [
    "ListRow link",
    <ListRow key="k" title="Помощь" href="https://kazmaps.dev" target="_blank" rel="noreferrer" />,
  ],
  ["LogoLockup", <LogoLockup key="k" />],
  ["LogoPin", <LogoPin key="k" />],
  [
    "Panel",
    <Panel key="k">
      <div className="p-3">Панель</div>
    </Panel>,
  ],
  ["PasswordInput", <PasswordInput key="k" label="Пароль" value="secret" onChange={noop} />],
  [
    "PlaceRow",
    <PlaceRow
      key="k"
      name="Кофейня"
      rating={4.6}
      category="Кафе"
      status={{ label: "Открыто", tone: "success" }}
      metaText="300 м"
    />,
  ],
  ["QrCode", <QrCode key="k" value="https://kazmaps.dev" />],
  ["ScaleBar", <ScaleBar key="k" label="100 м" widthPx={80} />],
  ["SearchInput", <SearchInput key="k" value="" onChange={noop} placeholder="Поиск" />],
  [
    "SearchInput compact",
    <SearchInput key="k" value="кофе" onChange={noop} placeholder="Поиск" compact />,
  ],
  ["SectionError", <SectionError key="k" message="Не удалось загрузить" onRetry={noop} />],
  ["SectionHeader", <SectionHeader key="k">Рядом</SectionHeader>],
  [
    "SegmentedRow",
    <SegmentedRow
      key="k"
      label="Слои"
      activeId="a"
      onSelect={noop}
      items={[
        { id: "a", label: "Карта", icon: <MapPin size={16} aria-hidden="true" /> },
        { id: "b", label: "Слои", icon: <Layers size={16} aria-hidden="true" /> },
      ]}
    />,
  ],
  ["ShimmerBlock", <ShimmerBlock key="k" className="h-4 w-24" />],
  ["StarRating", <StarRating key="k" value={4.5} />],
  [
    "TextInput",
    <TextInput key="k" label="Имя" value="" onChange={noop} placeholder="Как вас зовут" />,
  ],
  [
    "TextInput error",
    <TextInput key="k" label="Имя" value="" onChange={noop} error="Обязательное поле" />,
  ],
  ["Toggle", <Toggle key="k" checked onChange={noop} label="Уведомления" />],
];

function ToastDemo() {
  const show = useToast();
  useEffect(() => {
    show("Маршрут сохранён", { action: { label: "Открыть", onClick: () => undefined } });
  }, [show]);
  return null;
}

export const OVERLAY_CASES: [string, ReactElement][] = [
  [
    "Dialog",
    <Dialog
      key="k"
      title="Удалить маршрут?"
      subtitle="Действие нельзя отменить"
      onClose={() => undefined}
    >
      <p className="text-[13.5px]">Маршрут исчезнет из списка.</p>
    </Dialog>,
  ],
  [
    "BottomSheet",
    <BottomSheet
      key="k"
      snaps={[{ id: "half", heightClassName: "h-[50vh]" }]}
      snap="half"
      onSnapChange={() => undefined}
      label="Лист"
      title="Рядом"
    >
      <div className="p-4">Содержимое листа</div>
    </BottomSheet>,
  ],
  [
    "Toast",
    <ToastProvider key="k">
      <ToastDemo />
    </ToastProvider>,
  ],
  [
    "DayPicker",
    <DayPicker
      key="k"
      value="2026-09-09"
      max="2026-12-31"
      label="Дата"
      onChange={() => undefined}
    />,
  ],
];
