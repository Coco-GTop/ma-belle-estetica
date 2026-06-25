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
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: evidenzia la sezione visibile
  useEffect(() => {
    const ids = nav.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Ma Belle
          </span>
          <span className="text-[0.62rem] uppercase tracking-[0.34em] text-gold">Estetica</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-200 hover:text-gold hover:after:w-full ${
                  isActive ? "text-gold after:w-full" : "text-ink-muted after:w-0"
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <WhatsAppButton href={whatsappDefault} size="md">
            Prenota
          </WhatsAppButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          className="grid size-11 place-items-center rounded-full text-ink md:hidden cursor-pointer"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass overflow-hidden border-t border-line md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {nav.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-white/5 hover:text-gold"
                >
                  {l.label}
                </a>
              ))}
              <WhatsAppButton href={whatsappDefault} size="lg" className="mt-2">
                Prenota su WhatsApp
              </WhatsAppButton>
              <p className="mt-3 px-3 text-sm text-ink-muted">{business.phone.display}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
