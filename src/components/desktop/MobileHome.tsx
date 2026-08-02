"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import type { AppId } from "@/types/window";
import { appOrder, appMeta } from "@/data/apps-registry";
import { appComponents } from "@/components/apps/app-components";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/links";
import { useOSStore } from "@/store/os-store";

// Deliberately its own local "which app is full-screen" state, not the multi-window OS
// store — a phone doesn't need z-order/minimize/multi-instance bookkeeping. The apps
// themselves are the exact same components WindowManager renders on desktop.
export function MobileHome() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const notify = useOSStore((state) => state.notify);

  if (activeApp) {
    const meta = appMeta[activeApp];
    const ActiveComponent = appComponents[activeApp];
    const Icon = meta.icon;
    return (
      <div className="relative flex h-full flex-col">
        <div className="flex shrink-0 items-center gap-2 bg-zinc-900 px-3 py-3 text-white">
          <button
            type="button"
            onClick={() => setActiveApp(null)}
            aria-label="Back to home screen"
            className="flex size-8 items-center justify-center rounded-md hover:bg-white/10"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <Icon className="size-4" aria-hidden="true" />
          <span className="text-sm font-medium">{meta.title}</span>
        </div>
        <div className="min-h-0 flex-1">
          <ActiveComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-5 pt-10 pb-8 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">{profile.name}</h1>
        <p className="text-sm text-white/70">{profile.role}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {appOrder.map((appId) => {
          const meta = appMeta[appId];
          const Icon = meta.icon;
          return (
            <button
              key={appId}
              type="button"
              onClick={() => setActiveApp(appId)}
              className="flex flex-col items-center gap-1.5 rounded-xl p-2 text-center hover:bg-white/10"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="line-clamp-2 text-xs font-medium">{meta.title}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-5">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          const isMailto = link.url.startsWith("mailto:");
          return (
            <a
              key={link.id}
              href={link.url}
              target={isMailto ? undefined : "_blank"}
              rel={isMailto ? undefined : "noopener noreferrer"}
              onClick={() => {
                if (!isMailto) notify({ type: "info", title: `Opening ${link.label}...` });
              }}
              className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
            >
              <Icon className="size-4" aria-hidden="true" />
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
