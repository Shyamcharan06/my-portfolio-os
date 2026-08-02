import { FileCode2, FileText, Mail, SquareTerminal, UserRound, Folder } from "lucide-react";
import type { AppId, Size } from "@/types/window";
import type { LucideIcon } from "lucide-react";

/**
 * Metadata only — no component references here.
 * (Keeping components out of this file avoids a circular import: the OS
 * store reads `appMeta` for default window sizes, and several app
 * components read the OS store. See components/apps/app-components.tsx
 * for the id -> component map, which is only imported by the window
 * manager and the mobile shell.)
 */
export interface AppMeta {
  id: AppId;
  title: string;
  icon: LucideIcon;
  /** Tailwind text-color class applied to the icon glyph on the desktop/taskbar. */
  tint: string;
  defaultSize: Size;
  minSize?: Size;
  resizable?: boolean;
}

export const appOrder: AppId[] = ["profile", "projects", "resume", "skills", "contact", "terminal"];

export const appMeta: Record<AppId, AppMeta> = {
  profile: {
    id: "profile",
    title: "Profile.exe",
    icon: UserRound,
    tint: "text-sky-100",
    defaultSize: { width: 560, height: 540 },
  },
  projects: {
    id: "projects",
    title: "Projects",
    icon: Folder,
    tint: "text-amber-400",
    defaultSize: { width: 780, height: 560 },
    minSize: { width: 520, height: 380 },
  },
  resume: {
    id: "resume",
    title: "Resume.pdf",
    icon: FileText,
    tint: "text-red-400",
    defaultSize: { width: 620, height: 760 },
    minSize: { width: 360, height: 420 },
  },
  skills: {
    id: "skills",
    title: "skills.json",
    icon: FileCode2,
    tint: "text-emerald-300",
    defaultSize: { width: 520, height: 560 },
  },
  contact: {
    id: "contact",
    title: "Contact.exe",
    icon: Mail,
    tint: "text-sky-300",
    defaultSize: { width: 480, height: 580 },
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    icon: SquareTerminal,
    tint: "text-zinc-100",
    defaultSize: { width: 640, height: 420 },
    minSize: { width: 380, height: 260 },
  },
};
