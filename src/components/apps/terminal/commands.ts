import { profile } from "@/data/profile";
import { projects, categoryLabels } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { socialLinks } from "@/data/links";
import { resumeMeta } from "@/data/resume";
import { isValidAppId } from "@/store/os-store";
import type { AppId } from "@/types/window";

export interface TerminalContext {
  openApp: (id: AppId) => void;
  clear: () => void;
  minimizeSelf: () => void;
}

export interface CommandDefinition {
  description: string;
  run: (args: string[], ctx: TerminalContext) => string | string[];
}

// Pure, React-free by design — TerminalApp owns scrollback/history as local state and
// calls into this registry; new commands only need an entry here, nothing else changes.
export const commands: Record<string, CommandDefinition> = {
  help: {
    description: "List available commands",
    run: () => [
      "Available commands:",
      ...Object.entries(commands).map(([name, cmd]) => `  ${name.padEnd(10)} ${cmd.description}`),
    ],
  },
  about: {
    description: "Print a short bio",
    run: () => [`${profile.name} — ${profile.role}`, profile.tagline, "", "Type 'open profile' for the full picture."],
  },
  whoami: {
    description: "Print the current user",
    run: () => profile.name,
  },
  projects: {
    description: "List projects, or 'projects <name>' for details",
    run: (args) => {
      if (args.length === 0) {
        return [
          "Projects:",
          ...projects.map((p) => `  ${p.id.padEnd(16)} [${categoryLabels[p.category]}]  ${p.summary}`),
          "",
          "Try: projects <name>",
        ];
      }
      const query = args.join(" ").toLowerCase();
      const match = projects.find((p) => p.id.toLowerCase() === query || p.title.toLowerCase() === query);
      if (!match) return `No project found matching "${args.join(" ")}". Try 'projects' to list all.`;
      return [
        `${match.title} [${categoryLabels[match.category]}]`,
        match.description,
        `Tools: ${match.tools.join(", ")}`,
        match.githubUrl ? `GitHub: ${match.githubUrl}` : "",
        match.liveUrl ? `Live: ${match.liveUrl}` : "",
      ].filter(Boolean);
    },
  },
  skills: {
    description: "List skills by category",
    run: () =>
      skillCategories.flatMap((category) => [
        `${category.label}:`,
        `  ${category.skills.map((skill) => skill.name).join(", ")}`,
        "",
      ]),
  },
  resume: {
    description: "Show resume info and open the Resume app",
    run: (_args, ctx) => {
      ctx.openApp("resume");
      return `Opening ${resumeMeta.fileName}...`;
    },
  },
  contact: {
    description: "Show contact info and open the Contact app",
    run: (_args, ctx) => {
      ctx.openApp("contact");
      return [
        `Email: ${profile.email}`,
        ...socialLinks.filter((l) => l.kind !== "email").map((l) => `${l.label}: ${l.url}`),
      ];
    },
  },
  open: {
    description: "Open an app window, e.g. 'open projects'",
    run: (args, ctx) => {
      const target = args[0]?.toLowerCase();
      if (!target) return "Usage: open <profile|projects|resume|skills|contact|terminal>";
      if (!isValidAppId(target)) return `Unknown app "${target}".`;
      ctx.openApp(target);
      return `Opening ${target}...`;
    },
  },
  clear: {
    description: "Clear the terminal screen",
    run: (_args, ctx) => {
      ctx.clear();
      return [];
    },
  },
  date: {
    description: "Print the current date and time",
    run: () => new Date().toString(),
  },
  echo: {
    description: "Echo the given text back",
    run: (args) => args.join(" "),
  },
  sudo: {
    description: "Try it and see",
    run: () => "Nice try. Permission denied: you are not root here.",
  },
  exit: {
    description: "Minimize the terminal window",
    run: (_args, ctx) => {
      ctx.minimizeSelf();
      return [];
    },
  },
};
