"use client";

import { ChevronDown } from "lucide-react";
import { forwardRef, useId, useImperativeHandle } from "react";
import InputMask from "react-input-mask-format";

import { DEFAULT_REGION, type RegionCode } from "../../data/regions";
import { cn } from "../../lib/cn";
import {
  DEFAULT_LABELS,
  type PhoneInputLabels,
  type PhoneValue,
  RegionFlag,
  usePhoneMask,
} from "../../lib/phone-input-core";
import { RegionPicker } from "./region-picker";

export type { PhoneValue };

export interface PhoneInputProps {
  value?: string;
  defaultValue?: string;
  defaultRegion?: RegionCode;
  onChange?: (value: PhoneValue) => void;
  onRegionChange?: (region: RegionCode) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  regions?: RegionCode[];
  locale?: "ru" | "en";
  size?: "md" | "lg";
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  name?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  labels?: Partial<PhoneInputLabels>;
  className?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  {
    value: valueProp,
    defaultValue,
    defaultRegion = DEFAULT_REGION,
    onChange,
    onRegionChange,
    onFocus,
    onBlur,
    regions: regionCodes,
    locale = "ru",
    size = "md",
    label,
    hint,
    error,
    required,
    disabled,
    readOnly,
    id: idProp,
    name,
    autoFocus,
    autoComplete = "tel-national",
    labels: labelsProp,
    className,
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descId = `${id}-desc`;
  const pickerId = `${id}-picker`;
  const labels = { ...DEFAULT_LABELS, ...labelsProp };

  const {
    region,
    mask,
    formatted,
    open,
    setOpen,
    available,
    inputRef,
    containerRef,
    beforeMaskedStateChange,
    handleChange,
    selectRegion,
    closePicker,
  } = usePhoneMask({
    value: valueProp,
    defaultValue,
    defaultRegion,
    regions: regionCodes,
    onChange,
    onRegionChange,
  });

  useImperativeHandle(ref, () => inputRef.current!);

  const hasError = Boolean(error);
  const hasDesc = Boolean(error ?? hint);
  const lg = size === "lg";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className="text-[length:var(--text-sm)] font-medium text-[var(--ink)]">
          {label}
          {required && (
            <span className="ml-0.5 text-[var(--danger)]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <div
          className={cn(
            "flex items-center gap-2 rounded-[var(--radius-md)] border bg-[var(--card)]",
            lg ? "h-12 px-3.5" : "h-10 px-3",
            "transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-standard)]",
            hasError
              ? "border-[var(--danger)] has-[input:focus]:border-transparent has-[input:focus]:ring-2 has-[input:focus]:ring-[var(--danger)]"
              : "border-[var(--line)] has-[input:focus]:border-transparent has-[input:focus]:ring-2 has-[input:focus]:ring-[var(--brand)]",
            disabled && "opacity-50",
          )}
        >
          <button
            type="button"
            disabled={Boolean(disabled) || Boolean(readOnly)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? `${pickerId}-list` : undefined}
            aria-label={`${labels.region}: ${locale === "en" ? region.nameEn : region.name}`}
            title={locale === "en" ? region.nameEn : region.name}
            onMouseDown={(e) => {
              if (open) e.preventDefault();
            }}
            onClick={() => setOpen((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
            className={cn(
              "flex h-full shrink-0 items-center gap-1.5 border-r border-[var(--line)] pr-2.5",
              "text-[var(--ink)] disabled:cursor-not-allowed",
              "focus-visible:rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
            )}
          >
            <RegionFlag iso={region.iso} size={lg ? 18 : 16} />
            <span
              className={cn(
                "tabular-nums",
                lg ? "text-[length:var(--text-base)]" : "text-[length:var(--text-sm)]",
              )}
            >
              +{region.dial}
            </span>
            <ChevronDown
              size={14}
              className={cn("text-[var(--muted)] transition-transform", open && "rotate-180")}
            />
          </button>

          <InputMask
            ref={inputRef}
            mask={mask}
            maskPlaceholder={region.mask ? "_" : null}
            value={formatted}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
            readOnly={readOnly}
            beforeMaskedStateChange={beforeMaskedStateChange}
          >
            <input
              id={id}
              name={name}
              type="tel"
              inputMode="tel"
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              required={required}
              placeholder={region.mask ? region.mask.replace(/9/g, "_") : undefined}
              aria-describedby={hasDesc ? descId : undefined}
              aria-invalid={hasError || undefined}
              className={cn(
                "h-full w-full min-w-0 bg-transparent tabular-nums text-[var(--ink)] outline-none",
                lg ? "text-[length:var(--text-base)]" : "text-[length:var(--text-sm)]",
                "placeholder:text-[var(--muted)] disabled:cursor-not-allowed",
              )}
            />
          </InputMask>
        </div>

        {open && (
          <RegionPicker
            id={pickerId}
            regions={available}
            value={region.iso}
            locale={locale}
            labels={labels}
            onSelect={selectRegion}
            onClose={closePicker}
          />
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
});

PhoneInput.displayName = "PhoneInput";
