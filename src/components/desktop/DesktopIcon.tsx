"use client";

import type { AppId } from "@/types/window";
import { appMeta } from "@/data/apps-registry";
import { useOSStore } from "@/store/os-store";
import { DesktopIconTile } from "@/components/desktop/DesktopIconTile";

interface DesktopIconProps {
  appId: AppId;
  selected: boolean;
  onSelect: () => void;
}

export function DesktopIcon({ appId, selected, onSelect }: DesktopIconProps) {
  const openApp = useOSStore((state) => state.openApp);
  const meta = appMeta[appId];
  return (
    <DesktopIconTile
      label={meta.title}
      icon={meta.icon}
      tint={meta.tint}
      selected={selected}
      onSelect={onSelect}
      onActivate={() => openApp(appId)}
    />
  );
}
