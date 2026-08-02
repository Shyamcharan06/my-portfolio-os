"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { AnimatePresence } from "motion/react";
import type { AppDefinition } from "@/types/window";
import { useOSStore } from "@/store/os-store";
import { appMeta } from "@/data/apps-registry";
import { appComponents } from "@/components/apps/app-components";
import { WindowFrame } from "@/components/window/WindowFrame";

interface WindowManagerProps {
  boundsRef: RefObject<HTMLDivElement | null>;
}

export function WindowManager({ boundsRef }: WindowManagerProps) {
  const windows = useOSStore((state) => state.windows);
  const focusedWindowId = useOSStore((state) => state.focusedWindowId);
  const minimizeWindow = useOSStore((state) => state.minimizeWindow);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && focusedWindowId) {
        minimizeWindow(focusedWindowId);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedWindowId, minimizeWindow]);

  return (
    <AnimatePresence>
      {Object.values(windows).map((instance) => {
        const meta = appMeta[instance.appId];
        const appDef: AppDefinition = { ...meta, component: appComponents[instance.appId] };
        return (
          <WindowFrame
            key={instance.appId}
            appDef={appDef}
            instance={instance}
            isFocused={focusedWindowId === instance.appId}
            boundsRef={boundsRef}
          />
        );
      })}
    </AnimatePresence>
  );
}
