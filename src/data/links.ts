import { Mail } from "lucide-react";
import { GithubMark, LinkedinMark } from "@/components/icons/BrandIcons";
import type { SocialLink } from "@/types/content";

// Edit this file to update your real content — no other files need to change.
export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/Shyamcharan06",
    icon: GithubMark,
    kind: "github",
    tint: "text-white",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/shyamcharan-bharathi/",
    icon: LinkedinMark,
    kind: "linkedin",
    tint: "text-[#0A66C2]",
  },
  {
    id: "email",
    label: "Email",
    url: "mailto:shyamcb11@gmail.com",
    icon: Mail,
    kind: "email",
  },
];
