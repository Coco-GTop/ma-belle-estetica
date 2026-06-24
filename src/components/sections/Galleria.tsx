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
    <section id="galleria" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
            Galleria
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            I nostri lavori
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Una selezione di unghie, sguardi e dettagli curati nel nostro centro.
          </p>
        </Reveal>

        {/* filters */}
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
                    ? "bg-primary text-on-primary shadow-[var(--shadow-soft)]"
                    : "border border-line bg-white/70 text-ink-soft hover:border-primary hover:text-primary"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* masonry */}
        <motion.div layout className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {items.map((g, i) => (
            <motion.button
              key={g.src}
              layout
              onClick={() => setOpen(i)}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ring-1 ring-line/60 focus-visible:outline-none"
              aria-label={`Apri immagine: ${g.alt}`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={400}
                height={400}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}
