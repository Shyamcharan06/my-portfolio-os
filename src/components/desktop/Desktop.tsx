"use client";

import { useEffect, useRef, useState } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useMounted } from "@/hooks/useMounted";
import { useOSStore } from "@/store/os-store";
import { Wallpaper } from "@/components/desktop/Wallpaper";
import { LoginScreen } from "@/components/desktop/LoginScreen";
import { DesktopIconGrid } from "@/components/desktop/DesktopIconGrid";
import { Taskbar } from "@/components/taskbar/Taskbar";
import { WindowManager } from "@/components/window/WindowManager";
import { ToastViewport } from "@/components/notifications/ToastViewport";
import { MobileHome } from "@/components/desktop/MobileHome";
import { TASKBAR_HEIGHT } from "@/lib/constants";

export function Desktop() {
  const mounted = useMounted();
  const isDesktop = useIsDesktop();
  const boundsRef = useRef<HTMLDivElement>(null);
  const notify = useOSStore((state) => state.notify);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (!signedIn) return;
    const timer = setTimeout(() => {
      notify({
        type: "info",
        title: "Welcome!",
        message: "Feel free to click around — everything here is interactive.",
      });
    }, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedIn]);

  // Avoids a flash of the wrong layout: server-render and first paint can't know the
  // viewport size, so we show just the wallpaper for one tick rather than committing
  // to mobile-then-swapping-to-desktop (or vice versa) once matchMedia resolves.
  if (!mounted) {
    return (
      <div className="relative h-full w-full">
        <Wallpaper />
      </div>
    );
  }

  if (!signedIn) {
    return (
      <div className="relative h-full w-full">
        <LoginScreen onSignIn={() => setSignedIn(true)} />
      </div>
    );
  }

  if (!isDesktop) {
    return (
      <div className="relative h-full w-full">
        <Wallpaper />
        {/* `relative` matters here: Wallpaper is `absolute`, and a plain in-flow sibling
            paints *below* any positioned element regardless of DOM order — without this,
            the opaque wallpaper covers MobileHome entirely. */}
        <div className="relative h-full">
          <MobileHome />
        </div>
        <ToastViewport />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Wallpaper />
      <div ref={boundsRef} className="absolute inset-x-0 top-0" style={{ bottom: TASKBAR_HEIGHT }}>
        <DesktopIconGrid />
        <WindowManager boundsRef={boundsRef} />
      </div>
      <Taskbar />
      <ToastViewport />
    </div>
  );
}
