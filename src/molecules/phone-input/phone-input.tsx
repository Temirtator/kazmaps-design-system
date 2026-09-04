"use client";

import { ChevronDown } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import InputMask, { type BeforeMaskedStateChangeFn } from "react-input-mask-format";

import { DEFAULT_REGION, findRegion, REGIONS, type Region } from "../../data/regions";
import { cn } from "../../lib/cn";
import {
  digitsOnly,
  formatNational,
  isComplete,
  isEmptyNational,
  literalDigits,
  maskFor,
  normalizeNational,
  parseE164,
  toE164,
} from "../../lib/phone";
import { RegionFlag } from "./region-flag";
import {
  DEFAULT_LABELS,
  type PhoneInputLabels,
  type PickerCloseReason,
  RegionPicker,
} from "./region-picker";

export interface PhoneValue {
  e164: string;
  region: string;
  national: string;
  complete: boolean;
}

export interface PhoneInputProps {
  value?: string;
  defaultValue?: string;
  defaultRegion?: string;
  onChange?: (value: PhoneValue) => void;
  onRegionChange?: (region: string) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  regions?: string[];
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

interface PhoneState {
  region: Region;
  national: string;
}

function buildValue(region: Region, national: string): PhoneValue {
  const clean = isEmptyNational(region, national) ? "" : national;
  return {
    e164: toE164(region, clean),
    region: region.iso,
    national: clean,
    complete: isComplete(region, clean),
  };
}

function seed(value: string | undefined, defaultRegion: string): PhoneState {
  const fallback = findRegion(defaultRegion) ?? findRegion(DEFAULT_REGION)!;
  if (!value) return { region: fallback, national: "" };
  return parseE164(value) ?? { region: fallback, national: "" };
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

  const available = useMemo<readonly Region[]>(
    () =>
      regionCodes
        ? regionCodes.map((c) => findRegion(c)).filter((r): r is Region => r !== undefined)
        : REGIONS,
    [regionCodes],
  );

  const isControlled = valueProp !== undefined;
  const [state, setState] = useState<PhoneState>(() =>
    seed(isControlled ? valueProp : defaultValue, defaultRegion),
  );
  const stateRef = useRef(state);
  const lastEmitted = useRef<string>(toE164(state.region, state.national));
  const pending = useRef<PhoneState | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(ref, () => inputRef.current!);

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isControlled) return;
    if (valueProp === lastEmitted.current) return;
    const next = seed(valueProp, defaultRegion);
    lastEmitted.current = valueProp;
    stateRef.current = next;
    setState(next);
  }, [isControlled, valueProp, defaultRegion]);

  const emit = useCallback(
    (next: PhoneState) => {
      const regionChanged = next.region.iso !== stateRef.current.region.iso;
      stateRef.current = next;
      setState(next);
      const v = buildValue(next.region, next.national);
      lastEmitted.current = v.e164;
      onChange?.(v);
      if (regionChanged) onRegionChange?.(next.region.iso);
    },
    [onChange, onRegionChange],
  );

  const region = state.region;
  const mask = maskFor(region);
  const formatted = formatNational(region, state.national);

  const beforeMaskedStateChange: BeforeMaskedStateChangeFn = ({
    previousState,
    currentState,
    nextState,
  }) => {
    if (previousState !== undefined && currentState !== undefined) {
      const current = stateRef.current.region;
      const normalized = normalizeNational(currentState.value, current);
      const display = formatNational(normalized.region, normalized.national);
      const settled = digitsOnly(display);
      if (normalized.region.iso !== current.iso || settled !== digitsOnly(nextState.value)) {
        pending.current = { region: normalized.region, national: settled };
        return { value: display, selection: { start: display.length, end: display.length } };
      }
      return nextState;
    }
    if (isEmptyNational(stateRef.current.region, stateRef.current.national)) {
      return { ...nextState, value: "" };
    }
    return nextState;
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (pending.current) {
      const next = pending.current;
      pending.current = null;
      emit(next);
      return;
    }
    const digits = digitsOnly(e.target.value);
    const national = digits === literalDigits(mask) ? "" : digits;
    emit({ region: stateRef.current.region, national });
  }

  function selectRegion(next: Region) {
    setOpen(false);
    if (next.iso !== stateRef.current.region.iso) emit({ region: next, national: "" });
    inputRef.current?.focus();
  }

  function closePicker(reason: PickerCloseReason) {
    setOpen(false);
    if (reason === "escape") inputRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

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
