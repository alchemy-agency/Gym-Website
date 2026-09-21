/**
 * Fixed film grain. Sits above everything, never intercepts a pointer, and is
 * intentionally tiny (an inline tiled turbulence pattern) so it costs one
 * composited layer rather than a repaint on every scroll frame.
 *
 * Kept deliberately faint. Grain plus a monospace label plus a green cast is
 * what made an earlier version of this site read as a CRT; at this opacity it
 * reads as paper or film instead.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
      }}
    />
  );
}
