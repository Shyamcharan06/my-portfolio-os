"use client";

import { useOSStore } from "@/store/os-store";
import { appOrder } from "@/data/apps-registry";
import { profile } from "@/data/profile";
import { StartButton } from "@/components/taskbar/StartButton";
import { TaskbarAppButton } from "@/components/taskbar/TaskbarAppButton";
import { SystemTray } from "@/components/taskbar/SystemTray";
import { TaskbarClock } from "@/components/taskbar/TaskbarClock";
import { TASKBAR_HEIGHT } from "@/lib/constants";

export function Taskbar() {
  const windows = useOSStore((state) => state.windows);
  const openAppIds = appOrder.filter((appId) => windows[appId]);

  return (
    <div
      style={{ height: TASKBAR_HEIGHT }}
      className="absolute inset-x-0 bottom-0 z-[999] flex items-center gap-2 border-t border-white/10 bg-zinc-900/45 px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl"
    >
      <StartButton />
      <span className="hidden text-xs font-medium text-white/85 sm:inline">{profile.name}</span>
      <div className="mx-1 h-4 w-px shrink-0 bg-white/15" />
      <div className="flex flex-1 items-center gap-1 overflow-x-auto">
        {openAppIds.map((appId) => (
          <TaskbarAppButton key={appId} appId={appId} />
        ))}
      </div>
      <SystemTray />
      <div className="mx-0.5 h-4 w-px shrink-0 bg-white/15" />
      <TaskbarClock />
    </div>
  );
}
