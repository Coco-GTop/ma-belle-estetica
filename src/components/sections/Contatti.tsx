"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { business, hours, whatsappDefault, mapsEmbed, mapsLink } from "@/lib/site-data";

export function Contatti() {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <section id="contatti" className="relative scroll-mt-20 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">Contatti</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Ti aspettiamo da <span className="text-gold">Ma Belle</span>
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Prenota su WhatsApp o passa a trovarci: c&apos;è un ampio parcheggio.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal y={28} className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <a href={`tel:${business.phone.intl}`} className="glass group flex items-start gap-3 rounded-2xl p-5 transition-[color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:text-gold hover:shadow-[0_0_30px_-12px_rgba(228,197,144,0.5)]">
                <Phone className="size-5 shrink-0 text-gold" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-ink-faint">Telefono</span>
                  <span className="font-medium text-ink">{business.phone.display}</span>
                </span>
              </a>
              <a href={`mailto:${business.email}`} className="glass group flex items-start gap-3 rounded-2xl p-5 transition-[color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:text-gold hover:shadow-[0_0_30px_-12px_rgba(228,197,144,0.5)]">
                <Mail className="size-5 shrink-0 text-gold" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-ink-faint">Email</span>
                  <span className="break-all font-medium text-ink">{business.email}</span>
                </span>
              </a>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="glass group flex items-start gap-3 rounded-2xl p-5 transition-[color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:text-gold hover:shadow-[0_0_30px_-12px_rgba(228,197,144,0.5)] sm:col-span-2">
                <MapPin className="size-5 shrink-0 text-gold" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-ink-faint">Indirizzo</span>
                  <span className="font-medium text-ink">{business.address.full}</span>
                </span>
              </a>
            </div>

            <div className="glass rounded-[var(--radius-soft)] p-6">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-gold" />
                <h3 className="font-semibold text-ink">Orari di apertura</h3>
              </div>
              <ul className="mt-4 divide-y divide-line">
                {hours.map((h, i) => (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between py-2.5 text-sm ${
                      i === todayIndex ? "font-semibold text-gold" : "text-ink-muted"
                    }`}
                  >
                    <span>
                      {h.day}
                      {i === todayIndex && (
                        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-gold ring-1 ring-gold/30">
                          <span className="size-1.5 rounded-full bg-gold twinkle" />
                          oggi
                        </span>
                      )}
                    </span>
                    <span className={h.closed ? "text-ink-faint" : ""}>{h.open}</span>
                  </li>
                ))}
              </ul>
            </div>

            <WhatsAppButton href={whatsappDefault} size="lg" className="w-full">
              Prenota ora su WhatsApp
            </WhatsAppButton>
          </Reveal>

          <Reveal y={28}>
            <Parallax distance={26} className="glass h-full min-h-[440px] overflow-hidden rounded-[var(--radius-soft)] p-1.5 ring-1 ring-gold/20">
              <iframe
                title="Mappa Ma Belle Estetica"
                src={mapsEmbed}
                className="size-full min-h-[420px] rounded-[1rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
