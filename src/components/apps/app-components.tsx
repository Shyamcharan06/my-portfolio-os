import type { ComponentType } from "react";
import type { AppId } from "@/types/window";
import { ProfileApp } from "@/components/apps/profile/ProfileApp";
import { ProjectsApp } from "@/components/apps/projects/ProjectsApp";
import { ResumeApp } from "@/components/apps/resume/ResumeApp";
import { SkillsApp } from "@/components/apps/skills/SkillsApp";
import { ContactApp } from "@/components/apps/contact/ContactApp";
import { TerminalApp } from "@/components/apps/terminal/TerminalApp";

/**
 * Id -> component map, kept separate from data/apps-registry.ts (metadata only).
 * Several app components read the OS store, and the store reads apps-registry.ts
 * for default window sizes — merging components into that same file would create
 * a circular import. Only WindowManager and MobileHome need this map.
 */
export const appComponents: Record<AppId, ComponentType> = {
  profile: ProfileApp,
  projects: ProjectsApp,
  resume: ResumeApp,
  skills: SkillsApp,
  contact: ContactApp,
  terminal: TerminalApp,
};
