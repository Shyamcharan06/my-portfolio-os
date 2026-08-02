import type { ComponentType, SVGProps } from "react";

/** Broader than `LucideIcon` — also covers the hand-drawn brand marks in components/icons. */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  initials: string;
  location: string;
  email: string;
  education: EducationEntry[];
  interests: string[];
  highlightSkills: string[];
}

export type ProjectCategory = "web" | "ui-ux" | "ai" | "mobile" | "other";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  tools: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  /** Tailwind gradient stops (e.g. "from-sky-500 to-blue-600") for the generated thumbnail. */
  accent: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface ResumeMeta {
  fileName: string;
  /** Canonical Google Doc link — "Open in Google Docs". */
  docUrl: string;
  /** `/preview` embed URL — safe to load in an iframe (the plain edit URL isn't). */
  embedUrl: string;
  /** `/export?format=pdf` — always reflects the doc's current content, no rebuild needed. */
  downloadUrl: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: IconComponent;
  kind: "github" | "linkedin" | "email" | "other";
  /** Tailwind text-color class applied to the icon glyph. */
  tint?: string;
}
