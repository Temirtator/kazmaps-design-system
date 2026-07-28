"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "../../lib/cn";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectOptionGroup = {
  label: string;
  options: SelectOption[];
};

export type SelectProps = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  options?: SelectOption[];
  optionGroups?: SelectOptionGroup[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
  /** Доступное имя триггера, когда видимого `label` нет. Перекрывает `label`. */
  ariaLabel?: string;
};

export function Select({
  label,
  hint,
  error,
  required,
  options = [],
  optionGroups,
  placeholder = "Выберите...",
  value: valueProp,
  defaultValue = "",
  onChange,
  disabled,
  id: idProp,
  name,
  className,
  ariaLabel,
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descId = `${id}-desc`;
  const labelId = `${id}-label`;

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<"selected" | "first" | "last">("selected");
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const allOptions = optionGroups ? optionGroups.flatMap((g) => g.options) : options;
  const selectedLabel = allOptions.find((o) => o.value === value)?.label;

  const hasError = Boolean(error);
  const hasDesc = Boolean(error ?? hint);

  function enabledOptions(): HTMLButtonElement[] {
    return Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]:not(:disabled)') ?? [],
    );
  }

  function closeAndRefocus() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleSelect(optValue: string) {
    if (!isControlled) setInternalValue(optValue);
    onChange?.(optValue);
    closeAndRefocus();
  }

  function handleListKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const options = enabledOptions();
    if (options.length === 0) return;
    const current = options.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      options[Math.min(current + 1, options.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      options[Math.max(current - 1, 0)]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      options[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      options[options.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.stopPropagation();
      closeAndRefocus();
    }
  }

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const options = enabledOptions();
    if (options.length === 0) return;
    let target: HTMLButtonElement | undefined;
    if (initialFocusRef.current === "first") target = options[0];
    else if (initialFocusRef.current === "last") target = options[options.length - 1];
    else target = options.find((o) => o.dataset.selected === "true") ?? options[0];
    target.focus();
  }, [open]);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={id}
          id={labelId}
          className="text-[length:var(--text-sm)] font-medium text-[var(--ink)]"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-[var(--danger)]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div
        ref={containerRef}
        className="relative"
        onBlur={(e) => {
          if (open && !containerRef.current?.contains(e.relatedTarget)) {
            setOpen(false);
          }
        }}
      >
        {name && <input type="hidden" name={name} value={value} />}

        <button
          ref={triggerRef}
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-describedby={hasDesc ? descId : undefined}
          aria-invalid={hasError || undefined}
          onClick={() => {
            initialFocusRef.current = "selected";
            setOpen((v) => !v);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              initialFocusRef.current = e.key === "ArrowDown" ? "first" : "last";
              setOpen(true);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          className={cn(
            "flex h-9 w-full items-center justify-between px-3",
            "rounded-[var(--radius-md)] border bg-[var(--card)]",
            "text-[length:var(--text-sm)] text-left",
            "transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
            "focus-visible:outline-none",
            hasError
              ? [
                  "border-[var(--danger)]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--danger)] focus-visible:border-transparent",
                  open && "ring-2 ring-[var(--danger)] border-transparent",
                ]
              : [
                  "border-[var(--line)]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:border-transparent",
                  open && "ring-2 ring-[var(--brand)] border-transparent",
                ],
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <span className={cn(value ? "text-[var(--ink)]" : "text-[var(--muted)]")}>
            {selectedLabel ?? placeholder}
          </span>
          <ChevronDown
            size={16}
            className={cn(
              "shrink-0 text-[var(--muted)] transition-transform duration-[var(--dur-base)]",
              open && "rotate-180",
            )}
          />
        </button>

        {open && (
          <div
            ref={listRef}
            role="listbox"
            aria-labelledby={label ? labelId : undefined}
            onKeyDown={handleListKeyDown}
            className={cn(
              "absolute left-0 right-0 top-[calc(100%+4px)] z-50",
              "rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--card)]",
              "shadow-[var(--shadow-lg)] py-1",
              "max-h-60 overflow-y-auto",
              "animate-scale-in",
            )}
          >
            {optionGroups
              ? optionGroups.map((group) => (
                  <div key={group.label}>
                    <div className="px-3 py-1.5 text-[length:var(--text-xs)] font-medium uppercase tracking-wider text-[var(--muted)]">
                      {group.label}
                    </div>
                    {group.options.map((opt) => (
                      <OptionItem
                        key={opt.value}
                        opt={opt}
                        selected={value === opt.value}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                ))
              : options.map((opt) => (
                  <OptionItem
                    key={opt.value}
                    opt={opt}
                    selected={value === opt.value}
                    onSelect={handleSelect}
                  />
                ))}
          </div>
        )}
      </div>

      {hasDesc && (
        <p
          id={descId}
          className={cn(
            "text-[length:var(--text-xs)]",
            hasError ? "text-[var(--danger)]" : "text-[var(--muted)]",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

type OptionItemProps = {
  opt: SelectOption;
  selected: boolean;
  onSelect: (value: string) => void;
};

function OptionItem({ opt, selected, onSelect }: OptionItemProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      data-selected={selected || undefined}
      disabled={opt.disabled}
      onClick={() => onSelect(opt.value)}
      className={cn(
        "flex w-full items-center justify-between px-3 py-2",
        "text-[length:var(--text-sm)] text-left",
        "transition-colors duration-[var(--dur-base)] ease-[var(--ease-standard)]",
        "focus-visible:outline-none focus-visible:bg-[var(--bg-2)]",
        selected ? "font-medium text-[var(--ink)]" : "text-[var(--ink-2)]",
        opt.disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-[var(--bg-2)]",
      )}
    >
      {opt.label}
      {selected && <Check size={14} className="shrink-0 text-[var(--ink)]" />}
    </button>
  );
}
