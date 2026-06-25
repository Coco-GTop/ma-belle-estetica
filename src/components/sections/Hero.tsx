"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Star, MessageCircle, Sparkles } from "lucide-react";
import { ArchVideo } from "@/components/ui/ArchVideo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CountUp } from "@/components/ui/CountUp";
import { business, whatsappDefault } from "@/lib/site-data";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const px = useMotionValue(50);
  const py = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${px}% ${py}%, rgba(228,197,144,0.12), transparent 60%)`;

  // Parallax/fade allo scroll: testo e visual si muovono a velocità diverse → profondità
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);
  const visualY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -28]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.85], reduce ? [1, 1] : [1, 0.15]);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 100);
    py.set(((e.clientY - r.top) / r.height) * 100);
  }

  const fade = {
    hidden: { opacity: 0, y: 26 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      onMouseMove={onMove}
      className="relative flex min-h-[820px] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:pt-32"
    >
      {/* cursor spotlight */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* text */}
        <motion.div style={{ y: textY, opacity: fadeOut }}>
          <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <Sparkles className="size-4 text-gold" />
            <span className="text-sm tracking-wide text-ink/80">
              Centro estetico · {business.rating.toFixed(1)}★ a Sernaglia della Battaglia
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-ink">Bellezza</span>
            <br />
            <span className="shimmer">su misura</span>
            <br />
            <span className="font-display italic text-ink/90">con passione</span>
          </motion.h1>

          <motion.p custom={2} variants={fade} initial="hidden" animate="show" className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
            {business.claim}: per ognuna un trattamento studiato su misura. Unghie, viso,
            massaggi, laser e make-up — il tuo angolo di bellezza in Veneto.
          </motion.p>

          <motion.div custom={3} variants={fade} initial="hidden" animate="show" className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href={whatsappDefault} variant="gold" pulse>
              <MessageCircle className="size-5" />
              Prenota su WhatsApp
            </MagneticButton>
            <MagneticButton href="#servizi" variant="outline">
              Scopri i servizi
            </MagneticButton>
          </motion.div>

          {/* stats */}
          <motion.dl custom={4} variants={fade} initial="hidden" animate="show" className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { v: <CountUp to={2012} />, l: "Dal" },
              { v: <><CountUp to={5} decimals={1} />★</>, l: `${business.reviewsCount} recensioni` },
              { v: <><CountUp to={100} suffix="%" /></>, l: "Su misura" },
            ].map((s, i) => (
              <div key={i} className="border-l border-line pl-3">
                <dt className="font-display text-2xl font-semibold text-gold">{s.v}</dt>
                <dd className="text-xs uppercase tracking-wider text-ink-faint">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* video reale dei trattamenti in cornice ad arco */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: visualY }}
          className="relative"
        >
          <ArchVideo
            src="/hero/hero-loop"
            poster="/hero/hero-poster.jpg"
            alt="Trattamenti viso e massaggi da Ma Belle Estetica"
          />
          <div className="mt-5 flex items-center justify-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-gold text-gold" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
