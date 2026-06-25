import {
  Sparkles,
  Hand,
  Smile,
  Waves,
  Zap,
  Scissors,
  Brush,
  type LucideIcon,
} from "lucide-react";

/** Single source of truth — dati verificati di Ma Belle Estetica */

export const business = {
  name: "Ma Belle Estetica",
  legalName: "Ma Belle Estetica di Natalia Miroshnikova",
  owner: "Natalia Miroshnikova",
  tagline: "Passione e amore per la cura della persona",
  claim: "Ogni persona è un essere speciale",
  description:
    "Centro estetico a Sernaglia della Battaglia. Un'estetica non tradizionale, arricchita di nuove discipline, dove ogni trattamento è personalizzato sulle tue esigenze.",
  rating: 5.0,
  reviewsCount: 5,
  priceRange: "€€",
  address: {
    street: "Corte della Seta, 10",
    zip: "31020",
    city: "Sernaglia della Battaglia",
    province: "TV",
    region: "Veneto",
    country: "IT",
    full: "Corte della Seta 10, 31020 Sernaglia della Battaglia (TV)",
  },
  geo: { lat: 45.8869, lng: 12.1216 }, // approssimato — Sernaglia della Battaglia
  phone: { display: "328 343 4034", intl: "+393283434034" },
  email: "sistemabellezza10@gmail.com",
  social: {
    facebook: "https://www.facebook.com/Cortedellaseta10",
    instagram: "https://www.instagram.com/nataliam_miroshnikova/",
  },
  perks: ["Trattamenti personalizzati", "Facile da raggiungere", "Ampio parcheggio"],
} as const;

export const whatsappBase = `https://wa.me/${business.phone.intl.replace("+", "")}`;
export function whatsappLink(message: string): string {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}
export const whatsappDefault = whatsappLink(
  "Ciao Ma Belle Estetica! Vorrei informazioni / prenotare un appuntamento."
);

export const mapsEmbed =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("Ma Belle Estetica, Corte della Seta 10, Sernaglia della Battaglia TV") +
  "&output=embed";
export const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Ma Belle Estetica, Corte della Seta 10, Sernaglia della Battaglia TV");

export type Hour = { day: string; short: string; open: string; closed?: boolean };
export const hours: Hour[] = [
  { day: "Lunedì", short: "Lun", open: "10:00 – 16:00" },
  { day: "Martedì", short: "Mar", open: "10:00 – 19:00" },
  { day: "Mercoledì", short: "Mer", open: "14:00 – 20:00" },
  { day: "Giovedì", short: "Gio", open: "13:00 – 19:00" },
  { day: "Venerdì", short: "Ven", open: "10:00 – 19:00" },
  { day: "Sabato", short: "Sab", open: "09:00 – 13:00" },
  { day: "Domenica", short: "Dom", open: "Chiuso", closed: true },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
};

export const services: Service[] = [
  {
    icon: Hand,
    title: "Unghie & Nail Art",
    description:
      "Ricostruzione, allungamento e nail art stagionale. Mani e piedi sempre curati.",
    items: ["Ricostruzione & allungamento", "Smalto semipermanente", "Nail art personalizzata", "Manicure SPA"],
  },
  {
    icon: Smile,
    title: "Viso",
    description:
      "Trattamenti su misura per una pelle luminosa, dalla pulizia profonda al microneedling.",
    items: ["Pulizia del viso", "Idratante · liftante · antiossidante", "Microneedling", "Trattamento sguardo"],
  },
  {
    icon: Waves,
    title: "Corpo & Massaggi",
    description:
      "Massaggi estetici manuali e trattamenti corpo per ritrovare benessere ed equilibrio.",
    items: ["Rilassante · drenante · tonificante", "Linfatico & decontratturante", "Detox · lipolitico", "Riflessologia plantare"],
  },
  {
    icon: Zap,
    title: "Epilazione Laser",
    description:
      "Sessioni di epilazione laser definitiva, con cadenza mensile su prenotazione.",
    items: ["Laser definitivo", "Tutte le zone", "Appuntamenti mensili", "Su prenotazione"],
  },
  {
    icon: Scissors,
    title: "Depilazione",
    description:
      "Ceretta delicata con cera a freddo, per una pelle liscia e rispettata.",
    items: ["Cera a freddo", "Viso e corpo", "Pelli sensibili"],
  },
  {
    icon: Brush,
    title: "Make-up",
    description:
      "Trucco professionale per ogni occasione: dal naturale al look da sposa.",
    items: ["Giorno & sera", "Sposa", "Su misura"],
  },
];

export type GalleryItem = {
  src: string;
  category: "unghie" | "trattamenti" | "prodotti";
  alt: string;
  /** dimensioni reali del file — per masonry senza layout shift */
  w: number;
  h: number;
};
export const galleryCategories = [
  { id: "tutte", label: "Tutte" },
  { id: "trattamenti", label: "Trattamenti" },
  { id: "unghie", label: "Unghie" },
  { id: "prodotti", label: "Prodotti" },
] as const;

export const gallery: GalleryItem[] = [
  // Trattamenti in cabina (viso / massaggi) — verticali
  { src: "/gallery/g-massaggio-viso.jpg", category: "trattamenti", alt: "Applicazione maschera viso in cabina — Ma Belle Estetica", w: 688, h: 1000 },
  { src: "/gallery/g-massaggio-viso-2.jpg", category: "trattamenti", alt: "Massaggio viso personalizzato — Ma Belle Estetica", w: 750, h: 1000 },
  // Unghie / nail art
  { src: "/gallery/g-605135935.jpg", category: "unghie", alt: "Nail art rosa con stelle dorate — Ma Belle Estetica", w: 414, h: 414 },
  { src: "/gallery/g-605121933.jpg", category: "unghie", alt: "Unghie effetto mauve — Ma Belle Estetica", w: 414, h: 414 },
  { src: "/gallery/g-528298654.jpg", category: "unghie", alt: "Ricostruzione unghie elegante — Ma Belle Estetica", w: 414, h: 414 },
  { src: "/gallery/g-605114205.jpg", category: "unghie", alt: "Semipermanente naturale — Ma Belle Estetica", w: 414, h: 414 },
  { src: "/gallery/g-494498038.jpg", category: "unghie", alt: "Manicure curata — Ma Belle Estetica", w: 414, h: 414 },
  // Prodotti professionali in uso al centro
  { src: "/gallery/g-prodotti-1.jpg", category: "prodotti", alt: "Olio viso ozonizzato Equilibrio — trattamento Essere Pro — Ma Belle Estetica", w: 1065, h: 1500 },
  { src: "/gallery/g-prodotti-2.jpg", category: "prodotti", alt: "Siero viso professionale — Ma Belle Estetica", w: 825, h: 1100 },
  { src: "/gallery/g-prodotti-3.jpg", category: "prodotti", alt: "Linea prodotti per la cura quotidiana — Ma Belle Estetica", w: 1091, h: 1100 },
];

/** Foto in evidenza (hero / chi sono) */
export const featured = {
  hero: "/gallery/g-massaggio-viso.jpg",
  heroSecondary: "/gallery/g-605135935.jpg",
  about: "/natalia.jpg",
};

export const nav = [
  { href: "#servizi", label: "Servizi" },
  { href: "#chi-sono", label: "Chi sono" },
  { href: "#galleria", label: "Galleria" },
  { href: "#contatti", label: "Contatti" },
] as const;
