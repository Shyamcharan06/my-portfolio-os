"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { Wallpaper } from "@/components/desktop/Wallpaper";

// A Windows-style sign-in screen shown once per load, before the desktop mounts.
export function LoginScreen({ onSignIn }: { onSignIn: () => void }) {
  const [entering, setEntering] = useState(false);

  function handleEnter() {
    if (entering) return;
    setEntering(true);
    setTimeout(onSignIn, 300);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") handleEnter();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      animate={{ opacity: entering ? 0 : 1, scale: entering ? 1.04 : 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <Wallpaper />
      <div className="absolute inset-0 bg-black/15 backdrop-blur-2xl" />

      <div className="relative flex h-full flex-col items-center justify-center gap-5 px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-accent to-blue-700 text-4xl font-semibold shadow-2xl ring-4 ring-white/10"
        >
          {profile.initials}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <p className="text-2xl font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-white/70">{profile.role}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-4 flex flex-col items-center gap-3"
        >
          <button
            type="button"
            onClick={handleEnter}
            autoFocus
            aria-label="Sign in"
            className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Sign in
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <p className="text-xs text-white/50">Press Enter to continue</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
