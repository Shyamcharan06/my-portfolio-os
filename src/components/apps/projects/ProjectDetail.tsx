"use client";

import { ChevronLeft, ExternalLink } from "lucide-react";
import type { Project } from "@/types/content";
import { categoryLabels } from "@/data/projects";
import { ProjectThumbnail } from "@/components/apps/projects/ProjectThumbnail";
import { Button } from "@/components/ui/Button";
import { useOSStore } from "@/store/os-store";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const notify = useOSStore((state) => state.notify);
  const { githubUrl, liveUrl } = project;

  function openExternal(url: string, label: string) {
    notify({ type: "info", title: `Opening ${label}...` });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 px-4 pt-3 text-sm font-medium text-accent hover:underline"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to Projects
      </button>

      <ProjectThumbnail project={project} className="mx-4 mt-3 h-36 rounded-lg" />

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold text-zinc-900">{project.title}</h2>
          <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600">
            {categoryLabels[project.category]}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">{project.description}</p>

        <div className="mt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Tools</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tools.map((tool) => (
              <span key={tool} className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {githubUrl && (
            <Button variant="secondary" onClick={() => openExternal(githubUrl, "GitHub")}>
              <ExternalLink className="size-4" aria-hidden="true" />
              View Code
            </Button>
          )}
          {liveUrl && (
            <Button variant="primary" onClick={() => openExternal(liveUrl, "Live Demo")}>
              <ExternalLink className="size-4" aria-hidden="true" />
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
