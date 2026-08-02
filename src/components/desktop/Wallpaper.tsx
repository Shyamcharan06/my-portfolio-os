// A hand-built stand-in for a Windows 11-style "folded glass" wallpaper — angular
// ribbon facets in navy/cyan/violet, catching light like folded glass, over a dark
// navy base. No external image asset (so no licensing or network dependency), and
// the left third stays deliberately plain/dark so desktop icon labels stay legible.
export function Wallpaper() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#070c1c]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="base" x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#050813" />
            <stop offset="38%" stopColor="#0a1226" />
            <stop offset="100%" stopColor="#101c3c" />
          </linearGradient>

          {/* Individual glass-facet gradients — each ribbon segment gets its own so the
              folds read as distinct planes catching light at different angles. */}
          <linearGradient id="facetCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="facetBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="facetViolet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5b21b6" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="edgeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <filter id="soften" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="55" />
          </filter>
          <filter id="softenLight" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>

          {/* Darkens the left ~40% so icon labels stay readable against any facet color. */}
          <linearGradient id="leftShade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#020308" stopOpacity="0.92" />
            <stop offset="30%" stopColor="#020308" stopOpacity="0.55" />
            <stop offset="52%" stopColor="#020308" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1920" height="1080" fill="url(#base)" />

        {/* soft ambient glows behind the facets for depth */}
        <g filter="url(#soften)" opacity="0.8">
          <ellipse cx="1500" cy="260" rx="560" ry="380" fill="#2563eb" opacity="0.35" />
          <ellipse cx="1250" cy="760" rx="520" ry="360" fill="#22d3ee" opacity="0.22" />
          <ellipse cx="1780" cy="880" rx="420" ry="300" fill="#8b5cf6" opacity="0.22" />
        </g>

        {/* folded-glass ribbon facets — angular polygons, not blobs */}
        <g opacity="0.9">
          <polygon points="720,1080 1180,560 1420,660 980,1080" fill="url(#facetBlue)" filter="url(#soften)" />
          <polygon points="1000,1080 1420,520 1620,600 1260,1080" fill="url(#facetCyan)" filter="url(#soften)" />
          <polygon points="1300,1080 1680,420 1920,470 1920,1080" fill="url(#facetViolet)" filter="url(#soften)" />
          <polygon points="820,900 1240,440 1340,480 940,960" fill="url(#facetCyan)" filter="url(#soften)" opacity="0.6" />
        </g>

        {/* crisp fold-edge highlights, like light catching the crease of glass panels */}
        <g filter="url(#softenLight)" opacity="0.7">
          <line x1="1180" y1="560" x2="720" y2="1080" stroke="url(#edgeHighlight)" strokeWidth="2.5" />
          <line x1="1420" y1="520" x2="1000" y2="1080" stroke="url(#edgeHighlight)" strokeWidth="2" />
          <line x1="1680" y1="420" x2="1300" y2="1080" stroke="url(#edgeHighlight)" strokeWidth="2" />
          <line x1="1240" y1="440" x2="820" y2="900" stroke="url(#edgeHighlight)" strokeWidth="1.5" />
        </g>

        <rect width="1920" height="1080" fill="url(#leftShade)" />
      </svg>

      {/* fine grain to avoid a flat, over-smooth gradient look */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
