"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { gallery, galleryCategories } from "@/lib/site-data";

export function Galleria() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>("tutte");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "tutte" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter]
  );

  return (
    <section id="galleria" className="relative scroll-mt-20 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">Galleria</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            I nostri <span className="text-gold">lavori</span>
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Una selezione di unghie, sguardi e dettagli curati nel nostro centro.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                aria-pressed={active}
                className={`min-h-[40px] cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-gradient-to-r from-gold-bright to-gold-deep text-bg-deep shadow-[var(--shadow-gold)]"
                    : "glass text-ink-muted hover:text-gold"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {items.map((g, i) => (
            <motion.button
              key={g.src}
              layout
              onClick={() => setOpen(i)}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl ring-1 ring-line transition-shadow hover:shadow-[0_0_40px_-10px_rgba(228,197,144,0.45)] hover:ring-gold/40 focus-visible:outline-none"
              aria-label={`Apri immagine: ${g.alt}`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-bg-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}
