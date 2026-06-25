"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type Props = {
  children: ReactNode;
  /** spostamento massimo in px (positivo = entra dal basso e sale) */
  distance?: number;
  className?: string;
};

/**
 * Parallax leggero legato allo scroll — solo `transform: translateY` (GPU-cheap,
 * non ricalcola blur). Disattivato su prefers-reduced-motion (linee guida ui-ux-pro-max:
 * niente scroll-jacking aggressivo).
 */
export function Parallax({ children, distance = 40, className }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
