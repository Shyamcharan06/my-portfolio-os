"use client";

import { AnimatePresence } from "motion/react";
import { useOSStore } from "@/store/os-store";
import { Toast } from "@/components/notifications/Toast";

export function ToastViewport() {
  const notifications = useOSStore((state) => state.notifications);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-end gap-2 px-4 lg:bottom-16"
    >
      <AnimatePresence>
        {notifications.map((notification) => (
          <Toast key={notification.id} notification={notification} />
        ))}
      </AnimatePresence>
    </div>
  );
}
