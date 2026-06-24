"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { business, hours, whatsappDefault, mapsEmbed, mapsLink } from "@/lib/site-data";

export function Contatti() {
  const today = new Date().getDay(); // 0=Dom
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <section id="contatti" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
            Contatti
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Ti aspettiamo da Ma Belle
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Prenota il tuo appuntamento su WhatsApp o passa a trovarci: c&apos;è un ampio parcheggio.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* info */}
          <Reveal y={28} className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${business.phone.intl}`}
                className="flex items-start gap-3 rounded-2xl border border-line/70 bg-white/70 p-5 transition-colors hover:border-primary"
              >
                <Phone className="size-5 shrink-0 text-primary" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-ink-soft">Telefono</span>
                  <span className="font-medium text-ink">{business.phone.display}</span>
                </span>
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-start gap-3 rounded-2xl border border-line/70 bg-white/70 p-5 transition-colors hover:border-primary"
              >
                <Mail className="size-5 shrink-0 text-primary" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-ink-soft">Email</span>
                  <span className="break-all font-medium text-ink">{business.email}</span>
                </span>
              </a>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-2xl border border-line/70 bg-white/70 p-5 transition-colors hover:border-primary sm:col-span-2"
              >
                <MapPin className="size-5 shrink-0 text-primary" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-ink-soft">Indirizzo</span>
                  <span className="font-medium text-ink">{business.address.full}</span>
                </span>
              </a>
            </div>

            {/* hours */}
            <div className="rounded-[var(--radius-soft)] border border-line/70 bg-white/70 p-6">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-primary" />
                <h3 className="font-semibold text-ink">Orari di apertura</h3>
              </div>
              <ul className="mt-4 divide-y divide-line/60">
                {hours.map((h, i) => (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between py-2.5 text-sm ${
                      i === todayIndex ? "font-semibold text-primary" : "text-ink-soft"
                    }`}
                  >
                    <span>
                      {h.day}
                      {i === todayIndex && (
                        <span className="ml-2 rounded-full bg-secondary/40 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-primary-dark">
                          oggi
                        </span>
                      )}
                    </span>
                    <span className={h.closed ? "text-ink-soft/60" : ""}>{h.open}</span>
                  </li>
                ))}
              </ul>
            </div>

            <WhatsAppButton href={whatsappDefault} size="lg" className="w-full">
              Prenota ora su WhatsApp
            </WhatsAppButton>
          </Reveal>

          {/* map */}
          <Reveal y={28}>
            <div className="h-full min-h-[420px] overflow-hidden rounded-[var(--radius-soft)] border border-line/70 shadow-[var(--shadow-card)]">
              <iframe
                title="Mappa Ma Belle Estetica"
                src={mapsEmbed}
                className="size-full min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
