"use client";

import type { SocialLink } from "@/types/content";
import { useOSStore } from "@/store/os-store";
import { DesktopIconTile } from "@/components/desktop/DesktopIconTile";

interface ExternalShortcutIconProps {
  link: SocialLink;
  selected: boolean;
  onSelect: () => void;
}

export function ExternalShortcutIcon({ link, selected, onSelect }: ExternalShortcutIconProps) {
  const notify = useOSStore((state) => state.notify);

  function handleActivate() {
    notify({ type: "info", title: `Opening ${link.label}...` });
    window.open(link.url, "_blank", "noopener,noreferrer");
  }

  return (
    <DesktopIconTile
      label={link.label}
      icon={link.icon}
      tint={link.tint}
      selected={selected}
      onSelect={onSelect}
      onActivate={handleActivate}
    />
  );
}
