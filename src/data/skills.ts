import type { SkillCategory } from "@/types/content";

// Edit this file to update your real content — no other files need to change.
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 75 },
      { name: "C++", level: 70 },
      { name: "C", level: 70 },
      { name: "SQL", level: 75 },
      { name: "Java", level: 60 },
      { name: "Rust", level: 65 },
      { name: "Bash", level: 55 },
      { name: "HTML", level: 70 },
    ],
  },
  {
    id: "frameworks",
    label: "Tools & Frameworks",
    skills: [
      { name: "React", level: 78 },
      { name: "Node.js", level: 70 },
      { name: "scikit-learn", level: 82 },
      { name: "Pandas / NumPy", level: 85 },
      { name: "REST APIs", level: 75 },
      { name: "MySQL", level: 70 },
      { name: "MongoDB", level: 65 },
      { name: "Supabase", level: 60 },
      { name: "Kubernetes", level: 50 },
      { name: "Git", level: 80 },
      { name: "matplotlib", level: 75 },
    ],
  },
];
