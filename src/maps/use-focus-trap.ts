"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const openTraps: HTMLElement[] = [];

let lastFocusOutside: HTMLElement | null = null;
let priorFocusOutside: HTMLElement | null = null;

if (typeof document !== "undefined") {
  document.addEventListener(
    "focusin",
    (e) => {
      const target = e.target as HTMLElement | null;
      if (target === null) return;
      if (openTraps.some((panel) => panel.contains(target))) return;
      priorFocusOutside = lastFocusOutside;
      lastFocusOutside = target;
    },
    true,
  );
}

function unregisterTrap(panel: HTMLElement) {
  const index = openTraps.indexOf(panel);
  if (index !== -1) openTraps.splice(index, 1);
}

export function isTopmostTrap(panel: HTMLElement | null): boolean {
  return panel !== null && openTraps[openTraps.length - 1] === panel;
}

export function useFocusTrap(onClose: () => void): (node: HTMLElement | null) => void {
  const [panel, setPanel] = useState<HTMLElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const panelRef = useCallback((node: HTMLElement | null) => {
    setPanel(node);
  }, []);

  useEffect(() => {
    if (panel === null) return;
    const activeOnOpen = document.activeElement as HTMLElement | null;
    previouslyFocusedRef.current = panel.contains(activeOnOpen) ? priorFocusOutside : activeOnOpen;
    openTraps.push(panel);
    if (!panel.contains(document.activeElement)) {
      const first = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      (first ?? panel).focus();
    }
    return () => {
      unregisterTrap(panel);
      const target = previouslyFocusedRef.current;
      if (target?.isConnected === true) target.focus();
    };
  }, [panel]);

  useEffect(() => {
    if (panel === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (!isTopmostTrap(panel)) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [panel, onClose]);

  return panelRef;
}
