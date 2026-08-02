"use client";

import { Download, ExternalLink } from "lucide-react";
import { resumeMeta } from "@/data/resume";
import { useOSStore } from "@/store/os-store";

export function ResumeApp() {
  const notify = useOSStore((state) => state.notify);

  return (
    <div className="flex h-full flex-col bg-zinc-100">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-zinc-200 bg-white px-4 py-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-800">{resumeMeta.fileName}</p>
          <p className="text-xs text-zinc-400">Synced live from Google Docs</p>
        </div>
        {/* Plain button-styled anchors (not the shared <Button>) — nesting a <button> inside an <a> is invalid HTML. */}
        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={resumeMeta.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => notify({ type: "info", title: "Opening Google Docs..." })}
            className="inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            Open
          </a>
          <a
            href={resumeMeta.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => notify({ type: "success", title: "Resume downloaded", message: `${resumeMeta.fileName}.pdf` })}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Download className="size-4" aria-hidden="true" />
            Download
          </a>
        </div>
      </div>
      <iframe src={resumeMeta.embedUrl} title={`${resumeMeta.fileName} preview`} className="min-h-0 flex-1 bg-white" />
    </div>
  );
}
