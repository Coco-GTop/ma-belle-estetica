"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
};

/** Glassmorphism card with optional 3D tilt + moving sheen on hover. */
export function GlassCard({ children, className, tilt = true }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 18 });
  const sheen = useTransform(
    mx,
    (v) => `radial-gradient(420px circle at ${v * 100}% 0%, rgba(255,247,233,0.10), transparent 60%)`
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={tilt && !reduce ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={cn(
        "glass group relative overflow-hidden rounded-[var(--radius-soft)] transition-shadow duration-300 hover:shadow-[0_0_50px_-12px_rgba(228,197,144,0.35)]",
        className
      )}
    >
      {/* moving sheen */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: sheen }}
        />
      )}
      {/* gold top edge */}
      <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      {children}
    </motion.div>
  );
}
