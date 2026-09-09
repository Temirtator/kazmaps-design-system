"use client";

import { Check, Search } from "lucide-react";
import { useEffect, useRef } from "react";

import type { Region } from "../data/regions";
import {
  type PhoneInputLabels,
  type PickerCloseReason,
  RegionFlag,
  useRegionPicker,
} from "../lib/phone-input-core";

export type RegionPickerProps = {
  id: string;
  regions: readonly Region[];
  value: string;
  locale: "ru" | "en";
  labels: PhoneInputLabels;
  onSelect: (region: Region) => void;
  onClose: (reason: PickerCloseReason) => void;
};

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
        <div className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-(color:--text-tertiary)">
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
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                onClick={() => {
                  onSelect(r);
                }}
                className={`flex cursor-pointer items-center gap-2.5 rounded-[7px] px-2.5 py-2 text-[13.5px] text-(color:--text-primary) ${
                  index === active ? "bg-(--surface-raised)" : ""
                }`}
              >
                <RegionFlag iso={r.iso} size={16} />
                <span className="flex-1">{name(r)}</span>
                <span className="tabular-nums text-(color:--text-tertiary)">+{r.dial}</span>
                <span className="inline-flex w-4 text-(color:--accent)">
                  {selected ? <Check size={14} aria-hidden="true" /> : null}
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
      className="absolute left-0 top-[calc(100%+6px)] z-50 w-full max-w-[340px] overflow-hidden rounded-lg border border-(--border) bg-(--surface-panel) shadow-(--shadow-dropdown) animate-modal-in"
    >
      <div className="flex items-center gap-2 border-b border-(--border-input) px-3 py-2.5 text-(color:--text-tertiary)">
        <Search size={16} aria-hidden="true" />
        <input
          ref={searchRef}
          type="search"
          role="searchbox"
          aria-label={labels.search}
          aria-controls={`${id}-list`}
          aria-activedescendant={ordered.length > 0 ? optionId(active) : undefined}
          placeholder={labels.search}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onKeyDown={onKeyDown}
          onBlur={(event) => {
            onSearchBlur(event, rootRef.current);
          }}
          className="w-full bg-transparent text-[13.5px] text-(color:--text-primary) outline-none placeholder:text-(color:--text-tertiary)"
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
        {ordered.length === 0 ? (
          <li role="presentation" className="px-3 py-2 text-[12px] text-(color:--text-tertiary)">
            {labels.noResults}
          </li>
        ) : null}
      </ul>
    </div>
  );
}
