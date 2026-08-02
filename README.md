# Portfolio OS

A personal portfolio built to look and behave like a Windows 11 desktop — draggable/resizable windows, a taskbar, a Start menu, desktop icons, toast notifications, and a working terminal easter egg. Every "app" (Profile, Projects, Resume, Skills, Contact, Terminal) is a real window you can open, move, minimize, maximize, and close.

Live at: _add your deployed URL here once it's live_

## Features

- **Windows 11-style desktop** — folded-glass wallpaper, translucent taskbar, Start menu, system tray, live clock
- **Windows-style sign-in screen** on load, before the desktop mounts
- **Real window behavior** — drag, resize, minimize, maximize/restore, focus/z-order, taskbar presence, open/close animations
- **Six apps**, each a distinct window:
  - `Profile.exe` — bio, education, core skills, interests
  - `Projects` — a File Explorer-style browser for project case studies
  - `Resume.pdf` — embeds a live Google Doc, so the resume is always current with no rebuild step
  - `skills.json` — skills grouped by category
  - `Contact.exe` — a Mail-style compose window with a validated API route (logs submissions; see Deployment below to wire up real delivery)
  - `Terminal` — a working shell with `help`, `about`, `projects`, `skills`, `resume`, `contact`, `open <app>`, `clear`, and more
- **Desktop icon interactions** — click to select (Windows-style selection highlight), hover glow, double-click to open
- **Toast notifications** for actions like opening an app or sending a message
- **Responsive** — a simplified app-launcher layout on mobile, same underlying app components

## Tech stack

- [Next.js](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand) for window/OS state
- [Motion](https://motion.dev) for drag/resize/window animations
- [Lucide](https://lucide.dev) icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All real content lives under `src/data/` — edit these and nothing else needs to change:

| File | Controls |
| --- | --- |
| `src/data/profile.ts` | Name, role, bio, education, skills, interests shown in `Profile.exe` |
| `src/data/projects.ts` | Project case studies shown in `Projects` |
| `src/data/skills.ts` | Skill categories shown in `skills.json` |
| `src/data/resume.ts` | The Google Doc ID the `Resume.pdf` window embeds/exports |
| `src/data/links.ts` | GitHub / LinkedIn / email shortcuts |
| `src/data/apps-registry.ts` | App metadata — title, icon, default window size |

## Project structure

```
src/
  app/                # Next.js App Router entry + API routes (contact form)
  components/
    desktop/           # Wallpaper, desktop icons, login screen, mobile shell
    window/             # Window chrome: drag, resize, minimize/maximize, animations
    taskbar/             # Taskbar, Start menu, system tray, clock
    apps/                 # The actual app windows (profile, projects, resume, skills, contact, terminal)
    notifications/         # Toast system
  data/                # All editable content (see table above)
  store/               # Zustand store for window/OS state
  types/               # Shared TypeScript types
```

## Deployment

This is a standard Next.js app — deploy it anywhere Next.js runs (e.g. [Vercel](https://vercel.com/new)). No environment variables are required unless you wire the contact form ([src/app/api/contact/route.ts](src/app/api/contact/route.ts)) to a real email/notification service.
