"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { categoryLabels } from "@/data/projects";
import { ProjectThumbnail } from "@/components/apps/projects/ProjectThumbnail";

interface ProjectGridProps {
  projects: Project[];
  onSelect: (id: string) => void;
}

export function ProjectGrid({ projects, onSelect }: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="flex-1 p-6 text-sm text-zinc-500">No projects in this category yet.</p>;
  }

  return (
    <div className="grid flex-1 auto-rows-min grid-cols-1 gap-3 overflow-y-auto p-4 @sm:grid-cols-2 @2xl:grid-cols-3">
      {projects.map((project) => (
        <button
          key={project.id}
          type="button"
          onClick={() => onSelect(project.id)}
          className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ProjectThumbnail project={project} className="h-24 w-full" />
          <div className="flex flex-1 flex-col gap-1 p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-zinc-900">{project.title}</h3>
              <ArrowUpRight
                className="size-4 shrink-0 text-zinc-300 transition-colors group-hover:text-accent"
                aria-hidden="true"
              />
            </div>
            <p className="text-xs text-zinc-500">{categoryLabels[project.category]}</p>
            <p className="mt-1 line-clamp-2 text-xs text-zinc-600">{project.summary}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
