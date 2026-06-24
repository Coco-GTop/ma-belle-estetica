"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { whatsappDefault } from "@/lib/site-data";

export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappDefault}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scrivi su WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-on-primary shadow-[var(--shadow-lift)]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
          whileHover={reduce ? undefined : { scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <MessageCircle className="size-6" />
          <span className="hidden text-sm font-medium sm:inline">Prenota</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
