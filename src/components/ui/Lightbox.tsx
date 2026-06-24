"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { GalleryItem } from "@/lib/site-data";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const reduce = useReducedMotion();
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev, onClose]);

  const current = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Galleria immagini"
          onClick={onClose}
        >
          {/* scrim */}
          <div className="absolute inset-0 bg-bg-deep/85 backdrop-blur-md" />

          {/* close */}
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full glass text-ink transition hover:text-gold cursor-pointer"
          >
            <X className="size-5" />
          </button>

          {/* prev / next */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Immagine precedente"
            className="absolute left-3 sm:left-6 z-20 grid size-11 place-items-center rounded-full glass text-ink transition hover:text-gold cursor-pointer"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Immagine successiva"
            className="absolute right-3 sm:right-6 z-20 grid size-11 place-items-center rounded-full glass text-ink transition hover:text-gold cursor-pointer"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* image */}
          <motion.figure
            key={current.src}
            className="relative z-10 max-h-[82vh] w-full max-w-3xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={1000}
              height={1000}
              className="mx-auto max-h-[82vh] w-auto rounded-2xl object-contain shadow-[var(--shadow-lift)]"
              sizes="(max-width: 768px) 92vw, 768px"
              priority
            />
            <figcaption className="mt-3 text-center text-sm text-white/90">
              {current.alt.split(" — ")[0]}
              <span className="ml-2 text-white/60">
                {index! + 1} / {items.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
