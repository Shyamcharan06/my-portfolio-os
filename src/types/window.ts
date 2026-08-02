import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

export type AppId = "profile" | "projects" | "resume" | "skills" | "contact" | "terminal";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowInstance {
  appId: AppId;
  position: Position;
  size: Size;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  /** Position/size to return to on un-maximize — set only while maximized. */
  restore?: { position: Position; size: Size };
}

export interface AppDefinition {
  id: AppId;
  title: string;
  icon: LucideIcon;
  tint: string;
  component: ComponentType;
  defaultSize: Size;
  minSize?: Size;
  resizable?: boolean;
}

export type NotificationType = "info" | "success" | "error";

/** Named `AppNotification`, not `Notification` — that name shadows the browser's global Notification API. */
export interface AppNotification {
  id: string;
  title: string;
  message?: string;
  type: NotificationType;
}
