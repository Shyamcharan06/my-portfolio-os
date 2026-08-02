"use client";

import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import type { DragControls } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Copy, Minus, Square, X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

interface WindowTitleBarProps {
  title: string;
  icon: LucideIcon;
  tint: string;
  isFocused: boolean;
  isMaximized: boolean;
  dragControls: DragControls;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
}

export function WindowTitleBar({
  title,
  icon: Icon,
  tint,
  isFocused,
  isMaximized,
  dragControls,
  onMinimize,
  onToggleMaximize,
  onClose,
}: WindowTitleBarProps) {
  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    // Ignore drags started from the minimize/maximize/close buttons themselves.
    if ((event.target as HTMLElement).closest("button") || isMaximized) return;
    dragControls.start(event);
  }

  function handleDoubleClick(event: ReactMouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    onToggleMaximize();
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      className={cn(
        "flex h-9 shrink-0 items-center gap-2 px-3 text-white select-none backdrop-blur-xl",
        isMaximized ? "rounded-none" : "rounded-t-xl",
        isMaximized ? "cursor-default" : "cursor-grab active:cursor-grabbing",
        isFocused ? "bg-accent/75" : "bg-zinc-800/65"
      )}
    >
      <Icon className={cn("size-4 shrink-0", tint)} aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate text-xs font-medium">{title}</span>
      <IconButton aria-label={`Minimize ${title} window`} className="hover:bg-white/15" onClick={onMinimize}>
        <Minus className="size-4" aria-hidden="true" />
      </IconButton>
      <IconButton
        aria-label={isMaximized ? `Restore ${title} window` : `Maximize ${title} window`}
        className="hover:bg-white/15"
        onClick={onToggleMaximize}
      >
        {isMaximized ? <Copy className="size-3.5 -scale-x-100" aria-hidden="true" /> : <Square className="size-3.5" aria-hidden="true" />}
      </IconButton>
      <IconButton aria-label={`Close ${title} window`} className="hover:bg-red-500" onClick={onClose}>
        <X className="size-4" aria-hidden="true" />
      </IconButton>
    </div>
  );
}
