"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { nav, whatsappDefault, business } from "@/lib/site-data";

export function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/80 backdrop-blur-md shadow-[var(--shadow-soft)] border-b border-line/60"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="group flex flex-col leading-none">
          <span
            className={`font-display text-xl font-semibold tracking-tight transition-colors sm:text-2xl ${
              scrolled ? "text-ink" : "text-white"
            }`}
          >
            Ma Belle
          </span>
          <span
            className={`text-[0.62rem] uppercase tracking-[0.32em] transition-colors ${
              scrolled ? "text-primary" : "text-secondary"
            }`}
          >
            Estetica
          </span>
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm font-medium transition-colors hover:text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                scrolled ? "text-ink-soft" : "text-white/85"
              }`}
            >
              {l.label}
            </a>
          ))}
          <WhatsAppButton href={whatsappDefault} size="md">
            Prenota
          </WhatsAppButton>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          className={`grid size-11 place-items-center rounded-full transition-colors md:hidden cursor-pointer ${
            scrolled || open ? "text-ink" : "text-white"
          }`}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-line/60 bg-cream/95 backdrop-blur-md md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {nav.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-secondary/30"
                >
                  {l.label}
                </a>
              ))}
              <WhatsAppButton href={whatsappDefault} size="lg" className="mt-2">
                Prenota su WhatsApp
              </WhatsAppButton>
              <p className="mt-3 px-3 text-sm text-ink-soft">{business.phone.display}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
