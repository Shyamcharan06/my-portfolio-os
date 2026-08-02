"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import type { IconComponent } from "@/types/content";
import { cn } from "@/lib/cn";

interface DesktopIconTileProps {
  label: string;
  icon: IconComponent;
  /** Tailwind text-color class for the glyph — defaults to plain white. */
  tint?: string;
  selected: boolean;
  onSelect: () => void;
  onActivate: () => void;
}

/** Shared visual for every desktop icon: apps, external shortcuts, and decorative (This PC, Recycle Bin). */
export function DesktopIconTile({ label, icon: Icon, tint, selected, onSelect, onActivate }: DesktopIconTileProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onSelect();
  }

  function handleDoubleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onActivate();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter") onActivate();
  }

  return (
    <button
      type="button"
      data-desktop-icon
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-20 shrink-0 flex-col items-center gap-1 rounded p-1.5 text-center outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-white/70",
        selected
          ? "bg-accent/40 ring-1 ring-sky-300/50"
          : "hover:bg-white/10 hover:shadow-[0_0_16px_rgba(255,255,255,0.18)]"
      )}
    >
      <Icon
        className={cn("size-8 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]", tint ?? "text-white")}
        aria-hidden="true"
      />
      <span className="line-clamp-2 text-xs font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0_/_0.85)]">
        {label}
      </span>
    </button>
  );
}
