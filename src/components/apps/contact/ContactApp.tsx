"use client";

import { Mail } from "lucide-react";
import { ContactForm } from "@/components/apps/contact/ContactForm";
import { socialLinks } from "@/data/links";
import { useOSStore } from "@/store/os-store";

export function ContactApp() {
  const notify = useOSStore((state) => state.notify);

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3">
        <p className="flex items-center gap-1.5 text-sm font-medium text-zinc-800">
          <Mail className="size-4 text-accent" aria-hidden="true" />
          Get in touch
        </p>
        <p className="mt-0.5 text-xs text-zinc-500">I read every message — form, email, or otherwise.</p>
      </div>

      <ContactForm />

      <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-zinc-200 px-4 py-3">
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
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-accent"
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
