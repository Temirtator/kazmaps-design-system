"use client";

import { Check, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Region } from "../../data/regions";
import { cn } from "../../lib/cn";
import { RegionFlag } from "./region-flag";

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

export interface RegionPickerProps {
  id: string;
  regions: readonly Region[];
  value: string;
  locale: "ru" | "en";
  labels: PhoneInputLabels;
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

export function RegionPicker({
  id,
  regions,
  value,
  locale,
  labels,
  onSelect,
  onClose,
}: RegionPickerProps) {
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView?.({ block: "nearest" });
  }, [active]);

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

  function onSearchBlur(e: React.FocusEvent<HTMLInputElement>) {
    const next = e.relatedTarget;
    if (!(next instanceof Node) || !rootRef.current?.contains(next)) onClose("blur");
  }

  const optionId = (i: number) => `${id}-opt-${i}`;
  const name = (r: Region) => (locale === "en" ? r.nameEn : r.name);

  function renderGroup(title: string, items: Region[], offset: number) {
    if (items.length === 0) return null;
    return (
      <li role="presentation">
        <div className="px-3 pb-1 pt-2 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[var(--muted-2)]">
          {title}
        </div>
        <ul role="group" aria-label={title} className="m-0 list-none p-0">
          {items.map((r, i) => {
            const index = offset + i;
            const selected = r.iso === value;
            return (
              <li
                key={r.iso}
                id={optionId(index)}
                data-index={index}
                role="option"
                aria-selected={selected}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelect(r)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-2",
                  "text-[length:var(--text-sm)] text-[var(--ink)]",
                  index === active && "bg-[var(--bg-2)]",
                )}
              >
                <RegionFlag iso={r.iso} size={16} />
                <span className="flex-1">{name(r)}</span>
                <span className="tabular-nums text-[var(--muted)]">+{r.dial}</span>
                <span className="inline-flex w-4 text-[var(--brand)]">
                  {selected && <Check size={14} />}
                </span>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "absolute left-0 top-[calc(100%+6px)] z-50 w-full max-w-[340px] overflow-hidden",
        "rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--card)] shadow-[var(--shadow-lg)]",
        "animate-scale-in",
      )}
    >
      <div className="flex items-center gap-2 border-b border-[var(--line)] px-3 py-2.5 text-[var(--muted)]">
        <Search size={16} />
        <input
          ref={searchRef}
          type="search"
          role="searchbox"
          aria-label={labels.search}
          aria-controls={`${id}-list`}
          aria-activedescendant={ordered.length > 0 ? optionId(active) : undefined}
          placeholder={labels.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={onSearchBlur}
          className="w-full bg-transparent text-[length:var(--text-sm)] text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
        />
      </div>
      <ul
        ref={listRef}
        id={`${id}-list`}
        role="listbox"
        aria-label={labels.region}
        className="m-0 max-h-[268px] list-none overflow-y-auto p-1.5"
      >
        {renderGroup(labels.groupCis, cis, 0)}
        {renderGroup(labels.groupOther, other, cis.length)}
        {ordered.length === 0 && (
          <li
            role="presentation"
            className="px-3 py-2 text-[length:var(--text-xs)] text-[var(--muted-2)]"
          >
            {labels.noResults}
          </li>
        )}
      </ul>
    </div>
  );
}
