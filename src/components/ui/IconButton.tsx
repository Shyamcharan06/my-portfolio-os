"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required (not optional) — every icon-only control must be announced to screen readers. */
  "aria-label": string;
}

export function IconButton({ className, children, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md text-current transition-colors",
        "hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
