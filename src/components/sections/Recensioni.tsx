"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { CountUp } from "@/components/ui/CountUp";
import { business, mapsLink } from "@/lib/site-data";

const valori = [
  { quote: "Ogni persona è un essere speciale: per ognuna adeguo il trattamento richiesto.", label: "La nostra filosofia" },
  { quote: "Delicatezza e attenzione in ogni gesto, per farti sentire davvero coccolata.", label: "La nostra promessa" },
  { quote: "Passione e amore per la cura della persona, dal 2012.", label: "Il nostro impegno" },
];

export function Recensioni() {
  const reduce = useReducedMotion();

  return (
    <section className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, type: "spring", stiffness: 300 }}
              >
                <Star className="size-8 fill-gold text-gold drop-shadow-[0_0_12px_rgba(228,197,144,0.5)]" />
              </motion.span>
            ))}
          </div>
          <p className="mt-4 font-display text-5xl font-semibold text-gold">
            <CountUp to={5} decimals={1} /> / 5
          </p>
          <p className="mt-1 text-ink-muted">
            Valutazione media su Google · {business.reviewsCount} recensioni
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {valori.map((v, i) => (
            <Reveal key={v.label} delay={i * 0.1}>
              <GlassCard className="h-full p-7" tilt={false}>
                <Quote className="size-8 text-gold/70" />
                <blockquote className="mt-4 font-display text-lg italic leading-relaxed text-ink">
                  {v.quote}
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium uppercase tracking-wider text-gold">
                  {v.label}
                </figcaption>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-ink transition-colors hover:text-gold"
          >
            <Star className="size-4 fill-gold text-gold" />
            Lascia una recensione su Google
          </a>
        </Reveal>
      </div>
    </section>
  );
}
