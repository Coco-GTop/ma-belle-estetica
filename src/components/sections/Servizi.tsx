"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/site-data";

export function Servizi() {
  const reduce = useReducedMotion();

  return (
    <section id="servizi" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
            I nostri trattamenti
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Bellezza su misura, dalla testa ai piedi
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Ogni trattamento è personalizzato in base alle tue esigenze, con cura e
            attenzione ai dettagli.
          </p>
        </Reveal>

        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: reduce ? 0 : 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group flex flex-col rounded-[var(--radius-soft)] border border-line/70 bg-white/70 p-7 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-secondary/60 to-accent/30 text-primary-dark transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-7" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-line/60 pt-5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check className="size-4 shrink-0 text-primary" strokeWidth={2.4} />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
