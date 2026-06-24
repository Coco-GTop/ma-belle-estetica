"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  showIcon?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 cursor-pointer focus-visible:outline-none";

const sizes = {
  md: "px-5 py-2.5 text-sm min-h-[44px]",
  lg: "px-7 py-3.5 text-base min-h-[52px]",
};

const variants = {
  solid:
    "bg-primary text-on-primary shadow-[var(--shadow-soft)] hover:bg-primary-dark",
  outline:
    "border-2 border-line text-ink bg-white/70 hover:border-primary hover:text-primary",
  ghost: "text-ink hover:text-primary",
};

export function WhatsAppButton({
  href,
  children,
  variant = "solid",
  size = "md",
  className = "",
  showIcon = true,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      aria-label="Scrivi a Ma Belle Estetica su WhatsApp"
    >
      {showIcon && <MessageCircle className="size-[1.15em]" aria-hidden />}
      {children}
    </motion.a>
  );
}
