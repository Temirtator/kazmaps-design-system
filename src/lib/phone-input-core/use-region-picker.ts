"use client";

import { useMemo, useState } from "react";

import type { Region } from "../../data/regions";
import type { PickerCloseReason } from "./labels";

export interface RegionPickerState {
  query: string;
  setQuery: (q: string) => void;
  cis: Region[];
  other: Region[];
  ordered: Region[];
  active: number;
  setActive: (i: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchBlur: (e: React.FocusEvent<HTMLInputElement>, root: HTMLElement | null) => void;
  optionId: (i: number) => string;
}

export interface UseRegionPickerArgs {
  id: string;
  regions: readonly Region[];
  value: string;
  onSelect: (region: Region) => void;
  onClose: (reason: PickerCloseReason) => void;
}

function matches(region: Region, query: string): boolean {
  const q = query.trim().toLowerCase().replace(/^\+/, "");
  if (q === "") return true;
  return (
    region.name.toLowerCase().includes(q) ||
    region.nameEn.toLowerCase().includes(q) ||
    region.iso.toLowerCase() === q ||
    region.dial.startsWith(q)
  );
}

// Разметка, фокус поиска и скролл активной опции остаются в компонентах:
// хук отдаёт только состояние списка и обработчики клавиатуры/блюра.
export function useRegionPicker({
  id,
  regions,
  value,
  onSelect,
  onClose,
}: UseRegionPickerArgs): RegionPickerState {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => regions.filter((r) => matches(r, query)), [regions, query]);
  const cis = filtered.filter((r) => r.group === "cis");
  const other = filtered.filter((r) => r.group === "other");
  const ordered = [...cis, ...other];

  const defaultActive = () =>
    Math.max(
      0,
      ordered.findIndex((r) => r.iso === value),
    );
  const [active, setActive] = useState(defaultActive);
  const [activeQuery, setActiveQuery] = useState(query);
  if (query !== activeQuery) {
    setActiveQuery(query);
    setActive(defaultActive());
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, ordered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = ordered[active];
      if (r) onSelect(r);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClose("escape");
    }
  }

  function onSearchBlur(e: React.FocusEvent<HTMLInputElement>, root: HTMLElement | null) {
    const next = e.relatedTarget;
    if (!(next instanceof Node) || !root?.contains(next)) onClose("blur");
  }

  const optionId = (i: number) => `${id}-opt-${i}`;

  return {
    query,
    setQuery,
    cis,
    other,
    ordered,
    active,
    setActive,
    onKeyDown,
    onSearchBlur,
    optionId,
  };
}
