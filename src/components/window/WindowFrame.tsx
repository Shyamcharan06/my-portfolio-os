"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useDragControls, useMotionValue } from "motion/react";
import type { AppDefinition, WindowInstance } from "@/types/window";
import { useOSStore } from "@/store/os-store";
import { WindowTitleBar } from "@/components/window/WindowTitleBar";
import { ResizeHandles } from "@/components/window/ResizeHandles";
import { MIN_WINDOW_SIZE } from "@/lib/constants";
import { cn } from "@/lib/cn";

interface WindowFrameProps {
  appDef: AppDefinition;
  instance: WindowInstance;
  isFocused: boolean;
  boundsRef: React.RefObject<HTMLDivElement | null>;
}

export function WindowFrame({ appDef, instance, isFocused, boundsRef }: WindowFrameProps) {
  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);

  const closeWindow = useOSStore((state) => state.closeWindow);
  const minimizeWindow = useOSStore((state) => state.minimizeWindow);
  const toggleMaximize = useOSStore((state) => state.toggleMaximize);
  const focusWindow = useOSStore((state) => state.focusWindow);
  const commitWindowPosition = useOSStore((state) => state.commitWindowPosition);
  const commitWindowSize = useOSStore((state) => state.commitWindowSize);

  // Motion values, not React state: `drag` writes to these directly during a gesture,
  // bypassing React's render cycle entirely (this is *why* motion was chosen over
  // hand-rolled pointermove state for dragging — see the implementation plan). Seeded
  // once at mount from the store; thereafter the only writers are this component's own
  // drag/resize gestures (which commit back to the store) and the maximize/restore
  // effect below, which is the one deliberate external resync point.
  const x = useMotionValue(instance.position.x);
  const y = useMotionValue(instance.position.y);

  // Resize is plain React state (not a motion value) — it's hand-rolled and scoped to
  // this one window's own subtree, so a re-render per pointer tick is an acceptable trade.
  const [liveSize, setLiveSize] = useState(instance.size);

  const isMaximized = instance.isMaximized;

  useEffect(() => {
    if (isMaximized) {
      const bounds = boundsRef.current;
      x.set(0);
      y.set(0);
      setLiveSize(bounds ? { width: bounds.clientWidth, height: bounds.clientHeight } : instance.size);
    } else {
      x.set(instance.position.x);
      y.set(instance.position.y);
      setLiveSize(instance.size);
    }
    // Only meant to fire on the maximize/restore transition itself, not on every
    // position/size commit (those are read from the live `instance` at the time).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaximized]);

  useEffect(() => {
    if (!isFocused || !containerRef.current) return;
    if (containerRef.current.contains(document.activeElement)) return;
    // Prefer an interactive element inside the app (e.g. the terminal's input, the
    // contact form's first field) over the inert window shell — otherwise refocusing
    // a window (taskbar click, app switch) leaves keystrokes going nowhere.
    const focusable = containerRef.current.querySelector<HTMLElement>(
      "input, textarea, select, [contenteditable='true'], button"
    );
    (focusable ?? containerRef.current).focus({ preventScroll: true });
  }, [isFocused]);

  const Component = appDef.component;
  const minSize = appDef.minSize ?? MIN_WINDOW_SIZE;
  const isResizable = appDef.resizable !== false && !isMaximized;

  return (
    <motion.div
      ref={containerRef}
      tabIndex={-1}
      aria-label={appDef.title}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={boundsRef}
      onDragEnd={() => commitWindowPosition(appDef.id, { x: x.get(), y: y.get() })}
      onPointerDownCapture={() => focusWindow(appDef.id)}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: instance.isMinimized ? 0 : 1, scale: instance.isMinimized ? 0.88 : 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={instance.isMinimized}
      style={{
        x,
        y,
        width: liveSize.width,
        height: liveSize.height,
        zIndex: instance.zIndex,
      }}
      className={cn(
        "absolute top-0 left-0 flex flex-col overflow-hidden border border-white/10 outline-none",
        isMaximized ? "shadow-none" : "rounded-xl shadow-[0_24px_70px_-12px_rgba(0,0,0,0.6)]",
        instance.isMinimized && "pointer-events-none"
      )}
    >
      <WindowTitleBar
        title={appDef.title}
        icon={appDef.icon}
        tint={appDef.tint}
        isFocused={isFocused}
        isMaximized={isMaximized}
        dragControls={dragControls}
        onMinimize={() => minimizeWindow(appDef.id)}
        onToggleMaximize={() => toggleMaximize(appDef.id)}
        onClose={() => closeWindow(appDef.id)}
      />
      <div className="min-h-0 flex-1">
        <Component />
      </div>
      {isResizable && (
        <ResizeHandles
          size={liveSize}
          minSize={minSize}
          onResize={setLiveSize}
          onResizeEnd={(size) => commitWindowSize(appDef.id, size)}
        />
      )}
    </motion.div>
  );
}
