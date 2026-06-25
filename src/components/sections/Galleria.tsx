"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { gallery, galleryCategories } from "@/lib/site-data";

const categoryLabel: Record<string, string> = {
  trattamenti: "Trattamenti",
  unghie: "Unghie",
  prodotti: "Prodotti",
};

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
            I nostri <span className="text-gradient-gold">lavori</span>
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Trattamenti viso, massaggi, unghie e sguardo: una selezione di lavori reali del nostro centro.
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
                className={`min-h-[40px] cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-[color,background-color,box-shadow] duration-200 ${
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

        {/* Masonry a colonne — rispetta le proporzioni reali */}
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-10 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4"
        >
          {items.map((g, i) => (
            <motion.button
              key={g.src}
              onClick={() => setOpen(i)}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.025, 0.25), ease: [0.16, 1, 0.3, 1] }}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_0_40px_-10px_rgba(228,197,144,0.45)] hover:ring-gold/40 focus-visible:outline-none sm:mb-4"
              aria-label={`Apri immagine: ${g.alt}`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={g.w}
                height={g.h}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                className="h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              {/* didascalia in reveal */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-bg-deep/85 via-bg-deep/30 to-transparent p-3 pt-8 text-left opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold">
                  {categoryLabel[g.category]}
                </span>
                <span className="mt-0.5 block text-xs font-medium text-ink">
                  {g.alt.split(" — ")[0]}
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}
