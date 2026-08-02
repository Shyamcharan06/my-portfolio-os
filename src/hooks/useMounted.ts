"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only after client hydration. Implemented via useSyncExternalStore (not a
 * `useState` + effect) so there's no synchronous setState-in-effect: the server
 * and first client render both see `false` (via getServerSnapshot), then React
 * reconciles against the real client snapshot (`true`) right after hydration.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
