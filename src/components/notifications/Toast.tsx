"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import type { AppNotification } from "@/types/window";
import { TOAST_DURATION_MS } from "@/lib/constants";
import { useOSStore } from "@/store/os-store";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

const NOTIFICATION_ICONS = {
  info: Info,
  success: CheckCircle2,
  error: AlertCircle,
} as const;

export function Toast({ notification }: { notification: AppNotification }) {
  const dismiss = useOSStore((state) => state.dismissNotification);
  const Icon = NOTIFICATION_ICONS[notification.type];

  // Auto-dismiss lives here (not in the store) so the store stays free of side-effecting timers.
  useEffect(() => {
    const timer = setTimeout(() => dismiss(notification.id), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [notification.id, dismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 32, transition: { duration: 0.15 } }}
      role="status"
      className="pointer-events-auto flex w-80 max-w-[calc(100vw-2rem)] items-start gap-3 rounded-lg border border-white/10 bg-zinc-900/95 p-3 text-white shadow-2xl backdrop-blur-xl"
    >
      <Icon
        className={cn(
          "mt-0.5 size-5 shrink-0",
          notification.type === "success" && "text-emerald-400",
          notification.type === "error" && "text-red-400",
          notification.type === "info" && "text-sky-400"
        )}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{notification.title}</p>
        {notification.message && <p className="mt-0.5 text-xs text-white/70">{notification.message}</p>}
      </div>
      <IconButton
        aria-label="Dismiss notification"
        className="hover:bg-white/10"
        onClick={() => dismiss(notification.id)}
      >
        <X className="size-4" aria-hidden="true" />
      </IconButton>
    </motion.div>
  );
}
