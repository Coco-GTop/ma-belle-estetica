/** Fixed luxury background shared by the whole page.
 *  Static (no per-frame blur recompute) for performance — the depth comes
 *  from layered radial gradients painted once and composited. */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-deep">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #1c1020 0%, #0b0610 55%, #080409 100%)," +
            "radial-gradient(40% 40% at 8% 12%, rgba(228,197,144,0.14), transparent 60%)," +
            "radial-gradient(38% 38% at 96% 48%, rgba(226,166,190,0.13), transparent 60%)," +
            "radial-gradient(34% 34% at 32% 96%, rgba(180,155,208,0.11), transparent 60%)",
        }}
      />
      {/* faint dotted grid */}
      <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:42px_42px]" />
      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/30 via-transparent to-bg-deep/80" />
    </div>
  );
}
