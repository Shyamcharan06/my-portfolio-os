"use client";

import type { ProjectCategory } from "@/types/content";
import { categoryLabels } from "@/data/projects";
import { cn } from "@/lib/cn";

export type CategoryKey = ProjectCategory | "all";
const CATEGORIES: CategoryKey[] = ["all", "web", "ui-ux", "ai", "mobile", "other"];

interface CategoryFilterProps {
  active: CategoryKey;
  onChange: (category: CategoryKey) => void;
  counts: Record<CategoryKey, number>;
}

// Uses container queries (`@lg:`), not viewport breakpoints — this app renders both inside a
// resizable desktop window and full-width on mobile, and neither case tracks viewport width alone.
export function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  const visibleCategories = CATEGORIES.filter((category) => category === "all" || counts[category] > 0);

  return (
    <nav
      aria-label="Filter projects by category"
      className="flex shrink-0 gap-1 overflow-x-auto border-b border-zinc-200 bg-zinc-50 p-2 @lg:w-40 @lg:flex-col @lg:overflow-visible @lg:border-r @lg:border-b-0"
    >
      {visibleCategories.map((category) => (
        <button
          key={category}
          type="button"
          aria-current={active === category ? "true" : undefined}
          onClick={() => onChange(category)}
          className={cn(
            "flex shrink-0 items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm whitespace-nowrap transition-colors",
            active === category ? "bg-accent text-white" : "text-zinc-600 hover:bg-zinc-200"
          )}
        >
          <span>{category === "all" ? "All Projects" : categoryLabels[category]}</span>
          <span className={cn("text-xs", active === category ? "text-white/70" : "text-zinc-400")}>
            {counts[category]}
          </span>
        </button>
      ))}
    </nav>
  );
}
