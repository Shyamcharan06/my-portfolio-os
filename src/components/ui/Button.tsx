"use client";

import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
}

/** Styled for use inside a window's (light) content area — see WindowTitleBar/IconButton for dark chrome controls. */
export function Button({ variant = "primary", loading, className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-accent text-white hover:brightness-110",
        variant === "secondary" && "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50",
        variant === "ghost" && "text-zinc-600 hover:bg-zinc-100",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
