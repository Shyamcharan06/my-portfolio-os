"use client";

import { useMemo, useState } from "react";
import type { ProjectCategory } from "@/types/content";
import { categoryLabels, projects } from "@/data/projects";
import { CategoryFilter, type CategoryKey } from "@/components/apps/projects/CategoryFilter";
import { ProjectGrid } from "@/components/apps/projects/ProjectGrid";
import { ProjectDetail } from "@/components/apps/projects/ProjectDetail";

export function ProjectsApp() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const base = { all: projects.length } as Record<CategoryKey, number>;
    (Object.keys(categoryLabels) as ProjectCategory[]).forEach((category) => {
      base[category] = projects.filter((project) => project.category === category).length;
    });
    return base;
  }, []);

  const filteredProjects = useMemo(
    () => (activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)),
    [activeCategory]
  );

  const selectedProject = selectedId ? (projects.find((project) => project.id === selectedId) ?? null) : null;

  return (
    <div className="@container flex h-full flex-col overflow-hidden bg-white">
      {selectedProject ? (
        <ProjectDetail project={selectedProject} onBack={() => setSelectedId(null)} />
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden @lg:flex-row">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} counts={counts} />
          <ProjectGrid projects={filteredProjects} onSelect={setSelectedId} />
        </div>
      )}
    </div>
  );
}
