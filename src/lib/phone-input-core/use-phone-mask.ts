"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BeforeMaskedStateChangeFn } from "react-input-mask-format";

import {
  DEFAULT_REGION,
  findRegion,
  REGIONS,
  type Region,
  type RegionCode,
} from "../../data/regions";
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
} from "../phone";
import type { PickerCloseReason } from "./labels";

export interface PhoneValue {
  e164: string;
  region: RegionCode;
  national: string;
  complete: boolean;
}

export interface PhoneMaskState {
  region: Region;
  national: string;
  mask: string;
  formatted: string;
  open: boolean;
  setOpen: (v: boolean | ((o: boolean) => boolean)) => void;
  available: readonly Region[];
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  beforeMaskedStateChange: BeforeMaskedStateChangeFn;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectRegion: (r: Region) => void;
  closePicker: (reason: PickerCloseReason) => void;
}

export interface UsePhoneMaskArgs {
  value?: string;
  defaultValue?: string;
  defaultRegion?: RegionCode;
  regions?: RegionCode[];
  onChange?: (value: PhoneValue) => void;
  onRegionChange?: (region: RegionCode) => void;
}

interface PhoneState {
  region: Region;
  national: string;
}

function buildValue(region: Region, national: string): PhoneValue {
  const clean = isEmptyNational(region, national) ? "" : national;
  return {
    e164: toE164(region, clean),
    region: region.iso as RegionCode,
    national: clean,
    complete: isComplete(region, clean),
  };
}

function caretAfterDigits(display: string, count: number): number {
  if (count <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < display.length; i += 1) {
    const code = display.charCodeAt(i);
    if (code >= 48 && code <= 57) {
      seen += 1;
      if (seen === count) return i + 1;
    }
  }
  return display.length;
}

function seed(value: string | undefined, defaultRegion: string): PhoneState {
  const fallback = findRegion(defaultRegion) ?? findRegion(DEFAULT_REGION)!;
  if (!value) return { region: fallback, national: "" };
  return parseE164(value) ?? { region: fallback, national: "" };
}

// Головы у корневого PhoneInput и у kit-версии разные, поведение — одно:
// маска, дедупликация emit, каретка и закрытие пикера живут здесь.
export function usePhoneMask({
  value: valueProp,
  defaultValue,
  defaultRegion = DEFAULT_REGION,
  regions: regionCodes,
  onChange,
  onRegionChange,
}: UsePhoneMaskArgs): PhoneMaskState {
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
      if (regionChanged) onRegionChange?.(next.region.iso as RegionCode);
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
        const edit = currentState.selection.start ?? currentState.value.length;
        const caret = caretAfterDigits(
          display,
          digitsOnly(currentState.value.slice(0, edit)).length,
        );
        pending.current = { region: normalized.region, national: settled };
        return { value: display, selection: { start: caret, end: caret } };
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

  return {
    region,
    national: state.national,
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
  };
}
