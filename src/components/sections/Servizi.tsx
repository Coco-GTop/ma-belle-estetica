"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { services } from "@/lib/site-data";

export function Servizi() {
  const reduce = useReducedMotion();

  return (
    <section id="servizi" className="relative scroll-mt-20 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">I nostri trattamenti</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Bellezza su misura, <span className="text-gradient-gold">dalla testa ai piedi</span>
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Ogni trattamento è personalizzato sulle tue esigenze, con cura e attenzione ai dettagli.
          </p>
        </Reveal>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: reduce ? 0 : 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <GlassCard className="flex h-full flex-col p-7">
                  <span className="grid size-14 place-items-center rounded-2xl bg-white/5 text-gold-bright ring-1 ring-gold/40 transition-[background-color,transform,box-shadow] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:bg-gold/15 group-hover:shadow-[0_0_24px_-6px_rgba(228,197,144,0.55)]">
                    <Icon className="size-7 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink transition-colors duration-200 group-hover:text-gold-bright">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{s.description}</p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-5">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-ink-muted">
                        <Check className="size-4 shrink-0 text-gold" strokeWidth={2.4} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
