"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline";
  className?: string;
  pulse?: boolean;
};

export function MagneticButton({ href, children, variant = "gold", className = "", pulse = false }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.45);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const styles =
    variant === "gold"
      ? "bg-gradient-to-r from-gold-bright to-gold-deep text-bg-deep shadow-[var(--shadow-gold)]"
      : "border border-line-strong bg-white/5 text-ink backdrop-blur hover:border-gold/60";

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      className={`relative inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold tracking-tight transition-colors duration-200 ${styles} ${pulse ? "[animation:pulse-ring_2.6s_ease-out_infinite]" : ""} ${className}`}
    >
      {children}
    </motion.a>
  );
}
