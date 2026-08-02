import { GraduationCap, Heart, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

function AvatarMonogram({ initials }: { initials: string }) {
  return (
    <div
      className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-indigo-600 text-2xl font-semibold text-white shadow-inner"
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export function ProfileApp() {
  return (
    <div className="h-full overflow-y-auto bg-white px-6 py-6 text-zinc-800">
      <div className="flex items-start gap-4">
        <AvatarMonogram initials={profile.initials} />
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-zinc-900">{profile.name}</h1>
          <p className="text-sm font-medium text-accent">{profile.role}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
            <MapPin className="size-3.5" aria-hidden="true" />
            {profile.location}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm italic text-zinc-500">{profile.tagline}</p>

      <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700">
        {profile.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <section className="mt-5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Core skills</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {profile.highlightSkills.map((skill) => (
            <span key={skill} className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          <GraduationCap className="size-3.5" aria-hidden="true" />
          Education
        </h2>
        <ul className="mt-2 space-y-2">
          {profile.education.map((entry) => (
            <li key={entry.institution}>
              <p className="text-sm font-medium text-zinc-800">{entry.degree}</p>
              <p className="text-xs text-zinc-500">
                {entry.institution} · {entry.period}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5 mb-2">
        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          <Heart className="size-3.5" aria-hidden="true" />
          Interests
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <span key={interest} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600">
              {interest}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
