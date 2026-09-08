import type { Profile } from "@/types/content";

// Edit this file to update your real content — no other files need to change.
export const profile: Profile = {
  name: "Shyamcharan Bharathi",
  role: "Computer Science Student",
  tagline: "Building machine-learning systems, trading tools, and full-stack applications—one hands-on project at a time.",
  initials: "SB",
  location: "Chennai, India",
  email: "shyamcb11@gmail.com",
  bio: [
    "I'm a B.Tech Computer Science student at Vellore Institute of Technology (6th semester), with practical experience across software engineering, data science, and machine learning.",
    "As a Data Scientist Intern at Aptimized LLC, I built a YOLOv8 pipeline (on a custom Roboflow dataset) to detect HVAC symbols in floor plans, chained it into a YOLO-to-SAM2 workflow for piping and ductwork segmentation, benchmarked open-source vision models against GPT-4o for table extraction, and shipped a hybrid FastAPI backend combining detection, segmentation, and local models.",
    "I have also worked on ImageCLEF, including the 2026 Medical Caption Task — fine-tuning Qwen2-VL with LoRA (BLEU-4 = 27.5%) and adding semantic grounding via a BioMedCLIP classifier and retrieval-augmented generation. Alongside this, I develop full-stack, systems, and data-focused projects using Python, Rust, JavaScript, React, Node.js, SQL, MongoDB, and REST APIs — from a Rust LLM router with embedding- and classifier-based routing to a Monte Carlo backtesting engine for crypto trading strategies and machine-learning classifiers for medical and healthcare datasets. I enjoy taking ideas from raw data or an initial problem statement to a useful, reliable application.",
    "Before college, I captained my school football team and competed in debates—experiences that shaped how I collaborate, communicate, and stay composed when tackling unfamiliar challenges.",
  ],
  highlightSkills: ["Python", "SQL", "React", "Node.js", "scikit-learn", "MongoDB"],
  education: [
    {
      institution: "Vellore Institute of Technology, Chennai",
      degree: "B.Tech, Computer Science (CGPA: 8.26/10.00)",
      period: "Expected May 2028",
    },
    {
      institution: "Padma Seshadri Bala Bhavan Senior Secondary School, Chennai",
      degree: "CBSE, Grade 12 — 94.5%",
      period: "Jun 2024",
    },
  ],
  interests: [
    "Football",
    "Machine Learning & Computer Vision",
    "Full-Stack Development",
    "Quantitative Finance & Algorithmic Trading",
  ],
};
