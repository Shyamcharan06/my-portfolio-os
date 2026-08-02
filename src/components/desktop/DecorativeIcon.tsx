"use client";

import type { LucideIcon } from "lucide-react";
import { useOSStore } from "@/store/os-store";
import { DesktopIconTile } from "@/components/desktop/DesktopIconTile";

interface DecorativeIconProps {
  label: string;
  icon: LucideIcon;
  tint?: string;
  message: string;
  selected: boolean;
  onSelect: () => void;
}

/** For icons that look real (This PC, Recycle Bin) but have no window behind them — double-click just toasts. */
export function DecorativeIcon({ label, icon, tint, message, selected, onSelect }: DecorativeIconProps) {
  const notify = useOSStore((state) => state.notify);

  return (
    <DesktopIconTile
      label={label}
      icon={icon}
      tint={tint}
      selected={selected}
      onSelect={onSelect}
      onActivate={() => notify({ type: "info", title: label, message })}
    />
  );
}
