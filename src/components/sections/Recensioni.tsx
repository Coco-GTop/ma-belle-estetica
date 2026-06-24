"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { business, mapsLink } from "@/lib/site-data";

const valori = [
  {
    quote: "Ogni persona è un essere speciale: per ognuna adeguo il trattamento richiesto.",
    label: "La nostra filosofia",
  },
  {
    quote: "Delicatezza e attenzione in ogni gesto, per farti sentire davvero coccolata.",
    label: "La nostra promessa",
  },
  {
    quote: "Passione e amore per la cura della persona, dal 2012.",
    label: "Il nostro impegno",
  },
];

export function Recensioni() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-gradient-to-b from-cream to-cream-deep/60 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, type: "spring", stiffness: 300 }}
              >
                <Star className="size-8 fill-[var(--color-gold)] text-[var(--color-gold)]" />
              </motion.span>
            ))}
          </div>
          <p className="mt-4 font-display text-4xl font-semibold text-ink">
            {business.rating.toFixed(1)} / 5
          </p>
          <p className="mt-1 text-ink-soft">
            Valutazione media su Google · {business.reviewsCount} recensioni
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {valori.map((v, i) => (
            <Reveal key={v.label} delay={i * 0.1}>
              <figure className="h-full rounded-[var(--radius-soft)] border border-line/70 bg-white/80 p-7 shadow-[var(--shadow-soft)]">
                <Quote className="size-8 text-secondary" />
                <blockquote className="mt-4 font-display text-lg italic leading-relaxed text-ink">
                  {v.quote}
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium uppercase tracking-wider text-primary">
                  {v.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-line bg-white/70 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
          >
            <Star className="size-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
            Lascia una recensione su Google
          </a>
        </Reveal>
      </div>
    </section>
  );
}
