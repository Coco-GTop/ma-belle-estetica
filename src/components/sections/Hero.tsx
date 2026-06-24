"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star, MessageCircle } from "lucide-react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { business, whatsappDefault } from "@/lib/site-data";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative">
      <HeroGeometric
        badge={`Centro Estetico · ${business.rating.toFixed(1)}★ a Sernaglia della Battaglia`}
        title1="Bellezza su misura,"
        title2="con passione e amore"
        description={
          <>
            {business.claim}: per ognuna un trattamento studiato su misura. Unghie, viso,
            massaggi, laser e make-up — il tuo angolo di bellezza in Veneto.
          </>
        }
      >
        <motion.a
          href={whatsappDefault}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-medium text-on-primary shadow-[var(--shadow-lift)]"
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          aria-label="Prenota su WhatsApp"
        >
          <MessageCircle className="size-5" />
          Prenota su WhatsApp
        </motion.a>
        <a
          href="#servizi"
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-white/25 bg-white/5 px-7 py-3.5 text-base font-medium text-white backdrop-blur transition-colors hover:border-white/50"
        >
          Scopri i servizi
        </a>

        <div className="mt-2 flex w-full items-center justify-center gap-2 text-sm text-white/55">
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
            ))}
          </span>
          {business.reviewsCount} recensioni · {business.perks.join(" · ")}
        </div>
      </HeroGeometric>
    </section>
  );
}
