"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { Star, MapPin, ChevronDown } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { business, whatsappDefault, featured } from "@/lib/site-data";

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pb-24 lg:pt-40"
    >
      {/* soft decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 size-80 rounded-full bg-secondary/40 blur-3xl" />
        <div className="absolute right-0 top-32 size-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* text */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-sm text-ink-soft shadow-[var(--shadow-soft)]"
          >
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
              ))}
            </span>
            <span>
              <strong className="text-ink">{business.rating.toFixed(1)}</strong> · {business.reviewsCount} recensioni Google
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Ma Belle <span className="text-gradient">Estetica</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            {business.claim}: per ognuna un trattamento su misura, con{" "}
            <span className="text-primary">passione e amore</span>. Il tuo angolo di
            bellezza a Sernaglia della Battaglia.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton href={whatsappDefault} size="lg">
              Prenota su WhatsApp
            </WhatsAppButton>
            <a
              href="#servizi"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-line bg-white/60 px-7 py-3.5 text-base font-medium text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Scopri i servizi
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-7 flex items-center gap-2 text-sm text-ink-soft"
          >
            <MapPin className="size-4 text-primary" />
            {business.address.full} · ampio parcheggio
          </motion.div>
        </motion.div>

        {/* featured images */}
        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)] ring-1 ring-line">
            <Image
              src={featured.hero}
              alt="Make-up e cura del viso da Ma Belle Estetica"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 440px"
              className="object-cover"
            />
          </div>

          {/* floating secondary image */}
          <motion.div
            className="absolute -bottom-6 -left-6 hidden aspect-square w-36 overflow-hidden rounded-2xl shadow-[var(--shadow-card)] ring-4 ring-cream sm:block"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={featured.heroSecondary}
              alt="Nail art pastello da Ma Belle Estetica"
              fill
              sizes="160px"
              className="object-cover"
            />
          </motion.div>

          {/* floating badge */}
          <div className="absolute -right-3 top-6 rounded-2xl bg-white/95 px-4 py-3 text-center shadow-[var(--shadow-card)] ring-1 ring-line">
            <p className="font-display text-2xl font-semibold text-primary">2012</p>
            <p className="text-[0.65rem] uppercase tracking-wider text-ink-soft">dal</p>
          </div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#servizi"
        aria-label="Scorri ai servizi"
        className="mx-auto mt-14 hidden w-fit text-ink-soft lg:flex"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-7" />
      </motion.a>
    </section>
  );
}
