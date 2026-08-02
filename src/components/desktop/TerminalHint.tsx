"use client";

import type { CSSProperties } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

interface TerminalHintProps {
  /** Anchor position (top/left in px, relative to the nearest positioned ancestor). */
  style: CSSProperties;
  onDismiss: () => void;
}

/** A one-time callout pointing at the Terminal icon, nudging first-time visitors to try it. */
export function TerminalHint({ style, onDismiss }: TerminalHintProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8, y: "-50%" }}
      animate={{ opacity: 1, x: [0, 5, 0], y: "-50%" }}
      exit={{ opacity: 0, x: -8, y: "-50%" }}
      transition={{
        opacity: { duration: 0.4 },
        x: { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
      }}
      // `y` is animated (see above) rather than set via a Tailwind translate class —
      // motion writes the whole `transform` string itself, so a CSS class fighting
      // over the same property would just get overwritten the moment `x` animates.
      style={{ ...style, position: "absolute" }}
      className="z-10 ml-3 w-52"
    >
      <div className="relative rounded-lg border border-white/15 bg-zinc-900/90 px-3 py-2 text-xs text-white shadow-xl backdrop-blur-md">
        <div
          aria-hidden="true"
          className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rotate-45 border-b border-l border-white/15 bg-zinc-900/90"
        />
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss hint"
          className="absolute top-1 right-1 flex size-4 items-center justify-center rounded text-white/50 hover:bg-white/10 hover:text-white"
        >
          <X className="size-3" aria-hidden="true" />
        </button>
        <p className="pr-3 leading-snug">
          Psst — open the <span className="font-semibold text-sky-300">Terminal</span> and type{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[11px]">help</code>
        </p>
      </div>
    </motion.div>
  );
}
