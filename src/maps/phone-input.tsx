"use client";

import { ChevronDown } from "lucide-react";
import { useId } from "react";
import InputMask from "react-input-mask-format";

import { DEFAULT_REGION, type RegionCode } from "../data/regions";
import {
  DEFAULT_LABELS,
  type PhoneInputLabels,
  type PhoneValue,
  RegionFlag,
  usePhoneMask,
} from "../lib/phone-input-core";
import { RegionPicker } from "./region-picker";

export type { PhoneValue };

export type PhoneInputProps = {
  value?: string;
  defaultValue?: string;
  defaultRegion?: RegionCode;
  onChange?: (value: PhoneValue) => void;
  onRegionChange?: (region: RegionCode) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  regions?: RegionCode[];
  locale?: "ru" | "en";
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
};

export function PhoneInput({
  value: valueProp,
  defaultValue,
  defaultRegion = DEFAULT_REGION,
  onChange,
  onRegionChange,
  onFocus,
  onBlur,
  regions: regionCodes,
  locale = "ru",
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
  className = "",
}: PhoneInputProps) {
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

  const hasError = Boolean(error);
  const description = error ?? hint;
  const hasDesc = Boolean(description);

  return (
    <div className={className}>
      {label == null ? null : (
        <label
          htmlFor={id}
          className="mb-1.5 block text-[11.5px] font-semibold text-(color:--text-primary)"
        >
          {label}
          {required ? (
            <span className="ml-0.5 text-(color:--danger)" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <div
          className={`flex h-[47px] items-center overflow-hidden rounded-[8px] border bg-(--surface-panel) transition-surface focus-ring-within ${
            hasError ? "border-(--danger)" : "border-(--border-input)"
          } ${disabled ? "opacity-50" : ""}`}
        >
          <button
            type="button"
            disabled={Boolean(disabled) || Boolean(readOnly)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? `${pickerId}-list` : undefined}
            aria-label={`${labels.region}: ${locale === "en" ? region.nameEn : region.name}`}
            title={locale === "en" ? region.nameEn : region.name}
            onMouseDown={(event) => {
              if (open) event.preventDefault();
            }}
            onClick={() => {
              setOpen((v) => !v);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setOpen(true);
              }
            }}
            className="flex h-full shrink-0 items-center gap-1.5 border-r border-(--border-input) px-2.5 text-[13.5px] text-(color:--text-tertiary) focus-ring"
          >
            <RegionFlag iso={region.iso} size={16} />
            <span className="tabular-nums">+{region.dial}</span>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
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
              className="min-w-0 flex-1 bg-transparent px-3 text-[13.5px] text-(color:--text-primary) outline-none placeholder:text-(color:--text-tertiary)"
            />
          </InputMask>
        </div>

        {open ? (
          <RegionPicker
            id={pickerId}
            regions={available}
            value={region.iso}
            locale={locale}
            labels={labels}
            onSelect={selectRegion}
            onClose={closePicker}
          />
        ) : null}
      </div>

      {hasDesc ? (
        <p
          id={descId}
          className={`mt-1.5 text-[12px] ${
            hasError ? "text-(color:--danger)" : "text-(color:--text-tertiary)"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
