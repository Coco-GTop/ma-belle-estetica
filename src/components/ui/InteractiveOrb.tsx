"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

/** Mouse-reactive iridescent 3D orb — champagne/rose glass.
 *  Pure CSS+motion: reliable, performant, on-brand. */
export function InteractiveOrb() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [18, -18]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-18, 18]), { stiffness: 120, damping: 20 });
  const glareX = useTransform(mx, [0, 1], ["20%", "80%"]);
  const glareY = useTransform(my, [0, 1], ["20%", "80%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) => `radial-gradient(120px circle at ${gx} ${gy}, rgba(255,255,255,0.55), transparent 55%)`
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative mx-auto aspect-square w-full max-w-[460px]"
      style={{ perspective: 1000 }}
    >
      {/* ambient halo */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(228,197,144,0.25),transparent_60%)] blur-2xl" />

      <motion.div
        className="absolute inset-[8%]"
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* main sphere */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #fff7e9 0%, #f2d9a8 14%, #e2a6be 42%, #b49bd0 64%, #6d4a78 86%, #2a1730 100%)",
            boxShadow:
              "inset -30px -30px 70px rgba(40,15,40,0.65), inset 20px 20px 50px rgba(255,247,233,0.45), 0 30px 80px -20px rgba(228,197,144,0.5)",
          }}
          animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* iridescent conic overlay */}
        <motion.div
          className="absolute inset-0 rounded-full mix-blend-screen opacity-60"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(226,166,190,0.0), rgba(228,197,144,0.5), rgba(180,155,208,0.4), rgba(226,166,190,0.5), rgba(228,197,144,0.0))",
          }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        {/* moving glare */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: glare }}
        />
        {/* rim light */}
        <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
      </motion.div>

      {/* orbiting glass shards */}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 16 + i * 6, repeat: Infinity, ease: "linear" }}
            style={{ width: 1, height: 1 }}
          >
            <div
              className="glass absolute rounded-2xl"
              style={{
                width: 54 - i * 8,
                height: 54 - i * 8,
                transform: `translate(${150 + i * 26}px, -20px) rotate(25deg)`,
                background: "rgba(255,255,255,0.06)",
              }}
            />
          </motion.div>
        ))}
    </div>
  );
}
