"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { appOrder, appMeta } from "@/data/apps-registry";
import { useOSStore } from "@/store/os-store";
import { cn } from "@/lib/cn";

// Generic grid glyph, not a Windows flag — avoids trademarked iconography (see WindowFrame chrome for the same call).
export function StartButton() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const openApp = useOSStore((state) => state.openApp);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      {open && (
        <div
          role="menu"
          aria-label="All apps"
          className="absolute bottom-full left-0 mb-2 w-48 rounded-lg border border-white/10 bg-zinc-900/95 p-1.5 shadow-2xl backdrop-blur-xl"
        >
          {appOrder.map((appId) => {
            const meta = appMeta[appId];
            const Icon = meta.icon;
            return (
              <button
                key={appId}
                type="button"
                role="menuitem"
                onClick={() => {
                  openApp(appId);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm text-white hover:bg-white/10"
              >
                <Icon className={cn("size-4", meta.tint)} aria-hidden="true" />
                {meta.title}
              </button>
            );
          })}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open start menu"
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md text-white transition-colors",
          open ? "bg-white/20" : "hover:bg-white/10"
        )}
      >
        <LayoutGrid className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
