import { MapPin, Phone, Mail } from "lucide-react";
import { business, nav } from "@/lib/site-data";

function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z" />
    </svg>
  );
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-line px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-semibold text-ink">Ma Belle Estetica</p>
          <p className="text-xs uppercase tracking-[0.34em] text-gold">di {business.owner}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">{business.description}</p>
          <div className="mt-5 flex gap-3">
            <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook di Ma Belle Estetica" className="glass grid size-11 place-items-center rounded-full text-gold transition-colors hover:bg-gold hover:text-bg-deep">
              <Facebook className="size-5" />
            </a>
            <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram di Natalia" className="glass grid size-11 place-items-center rounded-full text-gold transition-colors hover:bg-gold hover:text-bg-deep">
              <Instagram className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Navigazione footer">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Naviga</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-ink-muted transition-colors hover:text-gold">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Dove siamo</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-muted">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              {business.address.full}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" />
              <a href={`tel:${business.phone.intl}`} className="hover:text-gold">{business.phone.display}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`mailto:${business.email}`} className="break-all hover:text-gold">{business.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row">
        <p>© {new Date().getFullYear()} {business.legalName}. Tutti i diritti riservati.</p>
        <p>Sernaglia della Battaglia (TV) · {business.priceRange}</p>
      </div>
    </footer>
  );
}
