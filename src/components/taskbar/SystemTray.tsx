"use client";

import { BatteryFull, ChevronUp, Volume2, Wifi } from "lucide-react";

// Decorative — a real desktop's tray reflects live system state, but there's no
// network/battery/volume to read here, so these just complete the Windows look.
export function SystemTray() {
  return (
    <div className="flex items-center gap-0.5 text-white/85">
      <button
        type="button"
        aria-label="Show hidden icons"
        className="flex size-7 items-center justify-center rounded-md hover:bg-white/10"
      >
        <ChevronUp className="size-3.5" aria-hidden="true" />
      </button>
      <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5 hover:bg-white/10">
        <Wifi className="size-3.5" aria-hidden="true" />
        <Volume2 className="size-3.5" aria-hidden="true" />
        <BatteryFull className="size-3.5" aria-hidden="true" />
      </div>
    </div>
  );
}
