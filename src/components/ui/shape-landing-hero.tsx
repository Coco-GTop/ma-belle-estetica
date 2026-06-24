"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export function HeroGeometric({
  badge = "Ma Belle Estetica",
  title1 = "Bellezza",
  title2 = "su misura",
  description,
  children,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
  };

  return (
    <div className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden bg-[#2a0716]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.18] via-transparent to-accent/[0.18] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-primary/[0.45]" className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-accent/[0.45]" className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-secondary/[0.45]" className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]" />
        <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-[var(--color-gold)]/[0.45]" className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]" />
        <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-secondary/[0.45]" className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.06] px-4 py-1.5 backdrop-blur"
        >
          <span className="text-sm font-medium tracking-wide text-white/80">{badge}</span>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
            <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              {title1}
            </span>
            <br />
            <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text font-medium italic text-transparent">
              {title2}
            </span>
          </h1>
        </motion.div>

        {description && (
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl">
              {description}
            </p>
          </motion.div>
        )}

        {children && (
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            {children}
          </motion.div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2a0716] via-transparent to-[#2a0716]/80" />
    </div>
  );
}
