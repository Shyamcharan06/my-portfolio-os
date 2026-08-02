"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const interval = setInterval(callback, 15_000);
  return () => clearInterval(interval);
}

function getSnapshot() {
  return Date.now();
}

function getServerSnapshot() {
  return 0;
}

export function TaskbarClock() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (now === 0) {
    return <span className="text-xs text-white/80 tabular-nums">--:--</span>;
  }

  const date = new Date(now);
  return (
    <div className="flex flex-col items-end leading-tight text-white/90 tabular-nums">
      <span className="text-xs">{date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
      <span className="text-[10px] text-white/60">
        {date.toLocaleDateString([], { month: "short", day: "numeric" })}
      </span>
    </div>
  );
}
