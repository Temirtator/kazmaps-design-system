import { MapPin } from "lucide-react";
import type { ReactElement } from "react";

import { Button, IconButton } from "./index";

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
];
