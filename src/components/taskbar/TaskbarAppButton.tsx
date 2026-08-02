"use client";

import type { AppId } from "@/types/window";
import { appMeta } from "@/data/apps-registry";
import { useOSStore } from "@/store/os-store";
import { cn } from "@/lib/cn";

export function TaskbarAppButton({ appId }: { appId: AppId }) {
  const toggleMinimize = useOSStore((state) => state.toggleMinimize);
  const isFocused = useOSStore((state) => state.focusedWindowId === appId);
  const isMinimized = useOSStore((state) => state.windows[appId]?.isMinimized ?? false);
  const meta = appMeta[appId];
  const Icon = meta.icon;

  return (
    <button
      type="button"
      onClick={() => toggleMinimize(appId)}
      aria-pressed={isFocused}
      title={meta.title}
      className={cn(
        "relative flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-white transition-colors",
        isFocused ? "bg-white/20" : "hover:bg-white/10",
        isMinimized && "opacity-70"
      )}
    >
      <Icon className={cn("size-4", meta.tint)} aria-hidden="true" />
      <span className="hidden max-w-24 truncate text-xs sm:inline">{meta.title}</span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-white transition-opacity",
          isFocused ? "opacity-100" : "opacity-0"
        )}
      />
    </button>
  );
}
