"use client";

import { Check, Search } from "lucide-react";
import { useEffect, useRef } from "react";

import type { Region } from "../../data/regions";
import { cn } from "../../lib/cn";
import {
  type PhoneInputLabels,
  type PickerCloseReason,
  RegionFlag,
  useRegionPicker,
} from "../../lib/phone-input-core";

export { DEFAULT_LABELS } from "../../lib/phone-input-core";
export type { PhoneInputLabels, PickerCloseReason };

export interface RegionPickerProps {
  id: string;
  regions: readonly Region[];
  value: string;
  locale: "ru" | "en";
  labels: PhoneInputLabels;
  onSelect: (region: Region) => void;
  onClose: (reason: PickerCloseReason) => void;
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
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { query, setQuery, cis, other, ordered, active, onKeyDown, onSearchBlur, optionId } =
    useRegionPicker({ id, regions, value, onSelect, onClose });

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView?.({ block: "nearest" });
  }, [active]);

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
          onBlur={(e) => onSearchBlur(e, rootRef.current)}
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
