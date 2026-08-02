import { skillCategories } from "@/data/skills";

export function SkillsApp() {
  return (
    <div className="h-full overflow-y-auto bg-white p-4">
      {skillCategories.map((category) => (
        <section key={category.id} className="mb-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{category.label}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span key={skill.name} className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
