import { Code2 } from "lucide-react";
import type { Project } from "@/types/content";
import { cn } from "@/lib/cn";

/** Generated placeholder visual (gradient + glyph) — no real screenshot exists yet. */
export function ProjectThumbnail({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder thumbnail for ${project.title}`}
      className={cn("flex items-center justify-center bg-gradient-to-br", project.accent, className)}
    >
      <Code2 className="size-8 text-white/40" aria-hidden="true" />
    </div>
  );
}
