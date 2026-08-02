import type { Project, ProjectCategory } from "@/types/content";

export const categoryLabels: Record<ProjectCategory, string> = {
  web: "Web",
  "ui-ux": "UI/UX",
  ai: "AI",
  mobile: "Mobile",
  other: "Other",
};

// Edit this file to update your real content — no other files need to change.
export const projects: Project[] = [
  {
    id: "portfolio-os",
    title: "Portfolio OS",
    category: "ui-ux",
    summary: "This very site — a Windows 11-style interactive desktop portfolio.",
    description:
      "A personal portfolio built to look and behave like a Windows 11 desktop: draggable/resizable/maximizable windows, a taskbar with a Start menu and system tray, desktop icons with real select/hover/activate states, toast notifications, and a working terminal with real commands. Every section (Profile, Projects, Resume, Skills, Contact) is a distinct app window rather than a scrolling page.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Motion"],
    githubUrl: "https://github.com/Shyamcharan06/my-portfolio-os",
    liveUrl: "https://my-portfolio-os-woad.vercel.app",
    featured: true,
    accent: "from-blue-500 to-indigo-600",
  },
  {
    id: "meme-coin-trading-bot",
    title: "Meme Coin Trading Bot",
    category: "ai",
    summary: "Monte Carlo backtesting engine for shorting strategies on Hyperliquid.",
    description:
      "A Monte Carlo backtesting engine that evaluates shorting strategies against Hyperliquid historical candlestick data. Implements volume-based entry/exit rules with trailing stop-loss conditions, running millions of hyperparameter combinations to find optimal configurations, with trade outcomes logged for further analysis.",
    tools: ["Python", "Pandas", "NumPy"],
    githubUrl: "https://github.com/Shyamcharan06/Meme-Coin-Trading-Bot",
    featured: true,
    accent: "from-orange-500 to-amber-600",
  },
  {
    id: "liver-disease-prediction",
    title: "Early Liver Disease Prediction",
    category: "ai",
    summary: "ML classifier for liver disease using the Indian Liver Patient Dataset.",
    description:
      "A machine-learning classification system built on the Indian Liver Patient Dataset (ILPD). Includes data preprocessing, feature encoding, scaling, and class-imbalance handling with SMOTE. A tuned Random Forest classifier reached an ROC-AUC of 0.82 with high recall, evaluated with confusion matrices, ROC curves, and feature importance.",
    tools: ["Python", "scikit-learn", "Pandas"],
    githubUrl: "https://github.com/Shyamcharan06/liver-disease-prediction",
    featured: true,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "football-clustering",
    title: "Football Performance Clustering",
    category: "ai",
    summary: "Unsupervised learning over football analytics to surface player patterns.",
    description:
      "Applies unsupervised learning (K-Means clustering) to football data to uncover hidden patterns in player performance and match stats — revealing player similarities and tactical insights from preprocessed and visualized player statistics.",
    tools: ["Python", "NumPy", "Pandas", "scikit-learn"],
    githubUrl: "https://github.com/Shyamcharan06/Football-Data-Clustering",
    accent: "from-sky-500 to-blue-600",
  },
  {
    id: "productivity-tracker",
    title: "Productivity Tracker",
    category: "web",
    summary: "Full-stack task/habit tracker with focus sessions and analytics.",
    description:
      "A full-stack productivity app combining task management, habit streaks, a Pomodoro focus timer, and an analytics dashboard. Productivity and Focus scores are computed with custom weighted formulas, visualized with Chart.js trends and a GitHub-style consistency heatmap, backed by JWT authentication and a MongoDB data layer.",
    tools: ["JavaScript", "Node.js", "Express", "MongoDB", "Chart.js"],
    githubUrl: "https://github.com/Shyamcharan06/productivity-tracker",
    liveUrl: "https://shyam-productivity-tracker.netlify.app/",
    accent: "from-violet-500 to-indigo-600",
  },
  {
    id: "final-portfolio",
    title: "Portfolio v1",
    category: "web",
    summary: "An earlier personal portfolio showcasing frontend and ML projects.",
    description:
      "A previous iteration of my personal portfolio site, built with React and Tailwind CSS to showcase frontend and machine-learning projects — since replaced by this Windows-styled desktop experience.",
    tools: ["React", "Tailwind CSS"],
    githubUrl: "https://github.com/Shyamcharan06/final-portfolio",
    liveUrl: "https://shyamcharan06.github.io/final-portfolio/",
    accent: "from-fuchsia-500 to-purple-600",
  },
  {
    id: "algo-neon",
    title: "algo-neon",
    category: "web",
    summary: "A full-stack React + Convex app scaffold with auth, 3D, and motion.",
    description:
      "A modern full-stack starter built on Vite, React 19, and Convex for the backend and auth, styled with Tailwind and Shadcn UI, with Three.js for 3D visuals and Framer Motion for animation.",
    tools: ["TypeScript", "React", "Convex", "Three.js"],
    githubUrl: "https://github.com/Shyamcharan06/algo-neon",
    accent: "from-rose-500 to-pink-600",
  },
];
