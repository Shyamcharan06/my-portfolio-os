"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Monitor, Trash2 } from "lucide-react";
import { appOrder } from "@/data/apps-registry";
import { socialLinks } from "@/data/links";
import { useOSStore } from "@/store/os-store";
import { DesktopIcon } from "@/components/desktop/DesktopIcon";
import { DecorativeIcon } from "@/components/desktop/DecorativeIcon";
import { ExternalShortcutIcon } from "@/components/shortcuts/ExternalShortcutIcon";
import { TerminalHint } from "@/components/desktop/TerminalHint";

export function DesktopIconGrid() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [everOpenedTerminal, setEverOpenedTerminal] = useState(false);
  const [hintAnchor, setHintAnchor] = useState<{ top: number; left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalIconRef = useRef<HTMLDivElement>(null);
  const terminalIsOpen = useOSStore((state) => Boolean(state.windows.terminal));
  const shortcutLinks = socialLinks.filter((link) => link.kind === "github" || link.kind === "linkedin");

  useEffect(() => {
    if (terminalIsOpen) setEverOpenedTerminal(true);
  }, [terminalIsOpen]);

  const showTerminalHint = !everOpenedTerminal && !hintDismissed;

  // Measured rather than laid out inline: the icon column scrolls (`overflow-y-auto`),
  // which — per the CSS overflow spec — forces its *other* axis to clip too, so a hint
  // bubble positioned inside that column would get cut off instead of floating past it.
  useLayoutEffect(() => {
    if (!showTerminalHint || !containerRef.current || !terminalIconRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const iconRect = terminalIconRef.current.getBoundingClientRect();
    setHintAnchor({
      top: iconRect.top - containerRect.top + iconRect.height / 2,
      left: iconRect.right - containerRect.left,
    });
  }, [showTerminalHint]);

  return (
    // Covers the full desktop so clicking any blank area (not just blank space
    // between icons) clears the current selection, like a real desktop.
    <div ref={containerRef} className="absolute inset-0" onPointerDown={() => setSelected(null)}>
      <div className="flex h-full w-fit flex-col items-start gap-1 overflow-y-auto p-4">
        <DecorativeIcon
          label="This PC"
          icon={Monitor}
          tint="text-sky-200"
          message="Nothing to browse here — it's just for the desktop feel."
          selected={selected === "this-pc"}
          onSelect={() => setSelected("this-pc")}
        />
        {appOrder.map((appId) => (
          <div key={appId} ref={appId === "terminal" ? terminalIconRef : undefined}>
            <DesktopIcon appId={appId} selected={selected === appId} onSelect={() => setSelected(appId)} />
          </div>
        ))}
        {shortcutLinks.map((link) => (
          <ExternalShortcutIcon
            key={link.id}
            link={link}
            selected={selected === link.id}
            onSelect={() => setSelected(link.id)}
          />
        ))}
        <DecorativeIcon
          label="Recycle Bin"
          icon={Trash2}
          tint="text-zinc-300"
          message="It's empty — nothing's been deleted (yet)."
          selected={selected === "recycle-bin"}
          onSelect={() => setSelected("recycle-bin")}
        />
      </div>

      <AnimatePresence>
        {showTerminalHint && hintAnchor && (
          <TerminalHint
            style={{ top: hintAnchor.top, left: hintAnchor.left }}
            onDismiss={() => setHintDismissed(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
