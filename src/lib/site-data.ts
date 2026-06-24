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

export type GalleryItem = { src: string; category: "unghie" | "sguardo" | "viso" | "piedi"; alt: string };
export const galleryCategories = [
  { id: "tutte", label: "Tutte" },
  { id: "unghie", label: "Unghie" },
  { id: "sguardo", label: "Sguardo" },
  { id: "viso", label: "Viso & Labbra" },
  { id: "piedi", label: "Piedi" },
] as const;

export const gallery: GalleryItem[] = [
  // Unghie / nail art
  { src: "/gallery/g-605135935.jpg", category: "unghie", alt: "Nail art rosa con stelle dorate — Ma Belle Estetica" },
  { src: "/gallery/g-605121933.jpg", category: "unghie", alt: "Unghie effetto mauve — Ma Belle Estetica" },
  { src: "/gallery/g-528298654.jpg", category: "unghie", alt: "Ricostruzione unghie elegante — Ma Belle Estetica" },
  { src: "/gallery/g-605114205.jpg", category: "unghie", alt: "Semipermanente naturale — Ma Belle Estetica" },
  { src: "/gallery/g-494498038.jpg", category: "unghie", alt: "Manicure curata — Ma Belle Estetica" },
  { src: "/gallery/g-495009239.jpg", category: "unghie", alt: "Unghie eleganti — Ma Belle Estetica" },
  // Sguardo (sopracciglia / ciglia)
  { src: "/gallery/g-527523053.jpg", category: "sguardo", alt: "Sopracciglia e ciglia definite — Ma Belle Estetica" },
  { src: "/gallery/g-528047204.jpg", category: "sguardo", alt: "Make-up sguardo — Ma Belle Estetica" },
  { src: "/gallery/g-526568073.jpg", category: "sguardo", alt: "Trattamento sguardo — Ma Belle Estetica" },
  { src: "/gallery/g-528074986.jpg", category: "sguardo", alt: "Laminazione sopracciglia — Ma Belle Estetica" },
  { src: "/gallery/g-495339665.jpg", category: "sguardo", alt: "Sopracciglia disegnate — Ma Belle Estetica" },
  { src: "/gallery/g-496938280.jpg", category: "sguardo", alt: "Sguardo definito — Ma Belle Estetica" },
  // Viso & labbra
  { src: "/gallery/g-494957289.jpg", category: "viso", alt: "Trucco labbra — Ma Belle Estetica" },
  { src: "/gallery/g-495374718.jpg", category: "viso", alt: "Make-up labbra — Ma Belle Estetica" },
  { src: "/gallery/g-496150106.jpg", category: "viso", alt: "Labbra valorizzate — Ma Belle Estetica" },
  { src: "/gallery/g-496797839.jpg", category: "viso", alt: "Trucco labbra glossy — Ma Belle Estetica" },
  // Piedi
  { src: "/gallery/g-605204610.jpg", category: "piedi", alt: "Pedicure curativa colorata — Ma Belle Estetica" },
];

/** Foto in evidenza (hero / chi sono) */
export const featured = {
  hero: "/gallery/g-527523053.jpg",
  heroSecondary: "/gallery/g-605135935.jpg",
  about: "/natalia.jpg",
};

export const nav = [
  { href: "#servizi", label: "Servizi" },
  { href: "#chi-sono", label: "Chi sono" },
  { href: "#galleria", label: "Galleria" },
  { href: "#contatti", label: "Contatti" },
] as const;
