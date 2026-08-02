"use client";

import { useSyncExternalStore } from "react";
import { DESKTOP_BREAKPOINT_PX } from "@/lib/constants";

const QUERY = `(min-width: ${DESKTOP_BREAKPOINT_PX}px)`;

function subscribe(callback: () => void) {
  const mediaQueryList = window.matchMedia(QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * True when the viewport is wide enough for the draggable multi-window desktop.
 * The `lg` cutoff (1024px) is deliberate: portrait tablets, not just phones,
 * also make window-dragging impractical, and `lg` is a better proxy for
 * "has a mouse/trackpad and room for overlapping windows" than `md`.
 */
export function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
