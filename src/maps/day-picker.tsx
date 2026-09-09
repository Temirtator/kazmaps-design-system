"use client";

import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const YEARS_BACK = 5;

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative min-w-0">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="w-full appearance-none rounded-[7px] bg-(--surface-raised) py-1 pr-5 pl-2 text-[13px] font-semibold text-(color:--text-primary) transition-interactive focus-ring hover:brightness-95"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={12}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2 text-(color:--text-tertiary)"
      />
    </div>
  );
}

function iso(year: number, monthIndex: number, day: number): string {
  return `${String(year)}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function DayPicker({
  value,
  onChange,
  max,
  label,
  className = "",
}: {
  value: string;
  onChange: (day: string) => void;
  max?: string;
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const [year, month] = value.split("-").map(Number);
  const [viewYear, setViewYear] = useState(year);
  const [viewMonth, setViewMonth] = useState(month - 1);

  const [lastValue, setLastValue] = useState(value);
  if (value !== lastValue) {
    setLastValue(value);
    const [nextYear, nextMonth] = value.split("-").map(Number);
    setViewYear(nextYear);
    setViewMonth(nextMonth - 1);
  }

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current !== null && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const leadingBlanks = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

  const maxYear = max === undefined ? null : Number(max.slice(0, 4));
  const maxMonth = max === undefined ? 11 : Number(max.slice(5, 7)) - 1;
  const lastYear = maxYear ?? viewYear;
  const firstYear = Math.min(lastYear - YEARS_BACK, viewYear);
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);
  const monthsAvailable = maxYear !== null && viewYear === maxYear ? maxMonth + 1 : 12;
  const selectableMonths = Array.from({ length: monthsAvailable }, (_, i) => i);

  const shiftMonth = (delta: number) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setOpen((v) => !v);
        }}
        className="flex h-7 w-full items-center gap-1.5 rounded-[7px] px-1.5 text-[13.5px] font-medium text-(color:--text-primary) transition-interactive focus-ring hover:bg-(--surface-raised) active:scale-[0.98]"
      >
        <CalendarDays size={15} className="shrink-0 text-(color:--text-tertiary)" />
        <span className="truncate">{label}</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Выбор даты"
          className="absolute top-[calc(100%+6px)] left-0 z-50 w-[278px] animate-modal-in rounded-[11px] border border-(--border) bg-(--surface-panel) p-3 shadow-(--shadow-dropdown)"
        >
          <div className="mb-2 flex items-center gap-1">
            <button
              type="button"
              aria-label="Предыдущий месяц"
              onClick={() => {
                shiftMonth(-1);
              }}
              className="flex size-7 shrink-0 items-center justify-center rounded-[7px] text-(color:--text-tertiary) transition-interactive focus-ring hover:bg-(--surface-raised) hover:text-(color:--text-primary)"
            >
              <ChevronLeft size={15} />
            </button>

            <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
              <SelectField
                label="Месяц"
                value={String(viewMonth)}
                onChange={(next) => {
                  setViewMonth(Number(next));
                }}
                options={selectableMonths.map((monthIndex) => ({
                  value: String(monthIndex),
                  label: MONTHS[monthIndex],
                }))}
              />
              <SelectField
                label="Год"
                value={String(viewYear)}
                onChange={(next) => {
                  const nextYear = Number(next);
                  setViewYear(nextYear);
                  if (maxYear !== null && nextYear === maxYear && viewMonth > maxMonth) {
                    setViewMonth(maxMonth);
                  }
                }}
                options={years.map((y) => ({ value: String(y), label: String(y) }))}
              />
            </div>

            <button
              type="button"
              aria-label="Следующий месяц"
              onClick={() => {
                shiftMonth(1);
              }}
              className="flex size-7 shrink-0 items-center justify-center rounded-[7px] text-(color:--text-tertiary) transition-interactive focus-ring hover:bg-(--surface-raised) hover:text-(color:--text-primary)"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-0.5 text-center">
            {WEEKDAYS.map((weekday) => (
              <span
                key={weekday}
                className="text-[10px] font-semibold text-(color:--text-tertiary)"
              >
                {weekday}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: leadingBlanks }, (_, i) => (
              <span key={`blank-${String(i)}`} className="size-8" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayIso = iso(viewYear, viewMonth, day);
              const disabled = max !== undefined && dayIso > max;
              const selected = dayIso === value;
              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  onClick={() => {
                    onChange(dayIso);
                    setOpen(false);
                  }}
                  className={`flex size-8 items-center justify-center rounded-[7px] text-[12.5px] tabular-nums transition-interactive focus-ring ${
                    selected
                      ? "bg-(--accent) font-semibold text-(color:--text-on-accent)"
                      : "text-(color:--text-primary) hover:bg-(--surface-raised)"
                  } disabled:pointer-events-none disabled:text-(color:--text-tertiary) disabled:opacity-35`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
