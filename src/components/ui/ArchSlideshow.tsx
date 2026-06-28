"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

export type Slide = { src: string; alt: string };

type Props = {
  slides: Slide[];
  /** ms tra un'immagine e l'altra */
  interval?: number;
};

/**
 * Slideshow nitido in cornice ad arco: crossfade + Ken-Burns con next/image
 * (nessuna compressione video → dettaglio pieno). Tilt 3D al mouse.
 * Su prefers-reduced-motion mostra solo la prima immagine, statica.
 */
export function ArchSlideshow({ slides, interval = 3800 }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reduce || slides.length < 2) return;
    timerRef.current = setInterval(() => setActive((v) => (v + 1) % slides.length), interval);
  }, [reduce, slides.length, interval]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  function goTo(i: number) {
    setActive(i);
    startTimer();
  }

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

  const arch = "48% 48% 16% 16% / 38% 38% 8% 8%";

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className="relative mx-auto w-full max-w-[440px]" style={{ perspective: 1100 }}>
      {/* alone caldo */}
      <div aria-hidden className="absolute -inset-6 bg-[radial-gradient(circle,rgba(228,197,144,0.22),transparent_62%)] blur-2xl" style={{ borderRadius: arch }} />

      <motion.div
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, borderRadius: arch, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] overflow-hidden bg-bg-base ring-1 ring-gold/35 shadow-[var(--shadow-gold)]"
      >
        {(reduce ? slides.slice(0, 1) : slides).map((s, idx) => {
          const isActive = idx === active;
          return (
            <motion.div
              key={s.src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: reduce ? 1 : isActive ? 1 : 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex: isActive ? 2 : 1 }}
            >
              <motion.div
                className="absolute inset-0"
                animate={reduce ? { scale: 1 } : { scale: isActive ? 1.0 : 1.07 }}
                transition={{ duration: (interval + 1400) / 1000, ease: "linear" }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={idx === 0}
                  quality={90}
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* grade brand soft (senza grana, per non sporcare il dettaglio) */}
        <span aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-bg-deep/55 via-transparent to-bg-deep/15" />
        <span aria-hidden className="pointer-events-none absolute inset-0 z-10 [box-shadow:inset_0_0_90px_20px_rgba(11,6,16,0.45)]" />
        <span aria-hidden className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </motion.div>

      {/* dot indicators */}
      {!reduce && slides.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Seleziona slide">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="rounded-full"
              animate={{
                width: i === active ? 20 : 6,
                height: 6,
                backgroundColor: i === active ? "rgba(228,197,144,1)" : "rgba(255,255,255,0.25)",
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>
      )}

      {/* schegge di vetro fluttuanti */}
      {!reduce &&
        [0, 1].map((i) => (
          <motion.div
            key={i}
            aria-hidden
            className="glass absolute rounded-2xl"
            style={{
              width: 50 - i * 12,
              height: 50 - i * 12,
              top: i === 0 ? "8%" : "auto",
              bottom: i === 1 ? "6%" : "auto",
              right: i === 0 ? "-4%" : "auto",
              left: i === 1 ? "-3%" : "auto",
              background: "rgba(255,255,255,0.06)",
            }}
            animate={{ y: [0, i === 0 ? -14 : 12, 0] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
    </div>
  );
}
