"use client";

import { motion, useReducedMotion } from "motion/react";

/** Fixed luxury background shared by the whole page:
 *  deep gradient + warm grain + slow animated ambient blobs. */
export function SiteBackground() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-deep">
      {/* base radial depth */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#1c1020_0%,#0b0610_55%,#080409_100%)]" />

      {/* ambient blobs */}
      <motion.div
        className="absolute -left-[10%] top-[8%] size-[42vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(228,197,144,0.16), transparent 70%)" }}
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-8%] top-[42%] size-[38vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(226,166,190,0.16), transparent 70%)" }}
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[2%] left-[30%] size-[34vw] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(180,155,208,0.13), transparent 70%)" }}
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* faint grid / grain */}
      <div className="absolute inset-0 opacity-[0.4] [background-image:radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px]" />

      {/* top + bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/40 via-transparent to-bg-deep/80" />
    </div>
  );
}
