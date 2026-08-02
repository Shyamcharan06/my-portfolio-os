import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server (`npm run dev`) be reached from other devices on the
  // LAN by IP, e.g. testing on a phone — Next.js blocks cross-origin dev
  // requests by default. Add any other subnet you develop from here.
  allowedDevOrigins: ["192.168.1.*", "10.212.134.*"],
  // Hides the dev-only route indicator badge (bottom-left "N" icon) — it's
  // build/route debug info, not part of the desktop UI.
  devIndicators: false,
};

export default nextConfig;
