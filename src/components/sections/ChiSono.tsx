"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { GraduationCap, Heart, Star, Car } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { business, featured } from "@/lib/site-data";

const facts = [
  { icon: GraduationCap, label: "Estetista dal 2012", sub: "Diploma S.E.M. 2013" },
  { icon: Heart, label: "Trattamenti su misura", sub: "Per ogni esigenza" },
  { icon: Star, label: "5,0 / 5 su Google", sub: "Clienti soddisfatte" },
  { icon: Car, label: "Ampio parcheggio", sub: "Facile da raggiungere" },
];

export function ChiSono() {
  const reduce = useReducedMotion();

  return (
    <section id="chi-sono" className="relative scroll-mt-20 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* image with clip-path reveal */}
        <Reveal y={30}>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-gold/20 to-rose/10 blur-xl" />
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-gold/30"
              initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
              whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={featured.about}
                alt="Natalia Miroshnikova, titolare di Ma Belle Estetica"
                fill
                sizes="(max-width: 1024px) 90vw, 440px"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              className="glass-strong absolute -bottom-5 -right-3 max-w-[15rem] rounded-2xl px-5 py-4"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="font-display text-lg italic text-ink">«Passione e amore»</p>
              <p className="mt-1 text-sm text-gold">— Natalia</p>
            </motion.div>
          </div>
        </Reveal>

        {/* text */}
        <Reveal y={30}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">Chi sono</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Natalia Miroshnikova
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>
              Ma Belle nasce dalla passione per la cura della persona e per ciò che l&apos;estetica
              può donare. Ho scelto un&apos;estetica non tradizionale, arricchita di nuove discipline —
              dalla riflessologia plantare ai massaggi estetici manuali.
            </p>
            <p>
              Credo che <span className="text-ink">ogni persona vada trattata con delicatezza e
              attenzione</span>: per questo ogni trattamento è studiato su di te.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="glass flex items-start gap-3 rounded-2xl p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/25">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{f.label}</p>
                    <p className="text-xs text-ink-faint">{f.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-ink-faint">{business.legalName}</p>
        </Reveal>
      </div>
    </section>
  );
}
