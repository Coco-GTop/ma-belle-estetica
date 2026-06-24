import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { business, hours } from "@/lib/site-data";
import { SiteBackground } from "@/components/ui/SiteBackground";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://ma-belle-estetica.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ma Belle Estetica · Centro estetico a Sernaglia della Battaglia",
    template: "%s · Ma Belle Estetica",
  },
  description:
    "Centro estetico Ma Belle a Sernaglia della Battaglia (TV): unghie e nail art, viso, massaggi, epilazione laser, depilazione e make-up. Trattamenti su misura, 5,0★ su Google. Prenota su WhatsApp.",
  keywords: [
    "centro estetico Sernaglia della Battaglia",
    "estetista Treviso",
    "nail art",
    "ricostruzione unghie",
    "epilazione laser",
    "massaggi",
    "trattamenti viso",
    "Ma Belle Estetica",
  ],
  authors: [{ name: business.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "Ma Belle Estetica",
    title: "Ma Belle Estetica · Centro estetico a Sernaglia della Battaglia",
    description:
      "Unghie, viso, massaggi, epilazione laser e make-up. Trattamenti su misura con passione e amore. 5,0★ su Google.",
    images: [{ url: "/gallery/g-527523053.jpg", width: 1200, height: 630, alt: "Ma Belle Estetica" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0610",
  width: "device-width",
  initialScale: 1,
};

function JsonLd() {
  const dayMap: Record<string, string> = {
    Lunedì: "Monday", Martedì: "Tuesday", Mercoledì: "Wednesday", Giovedì: "Thursday",
    Venerdì: "Friday", Sabato: "Saturday", Domenica: "Sunday",
  };
  const openingHours = hours
    .filter((h) => !h.closed)
    .map((h) => {
      const [open, close] = h.open.replace(/\s/g, "").split("–");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[h.day],
        opens: open,
        closes: close,
      };
    });

  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: business.legalName,
    image: `${SITE_URL}/gallery/g-527523053.jpg`,
    url: SITE_URL,
    telephone: business.phone.intl,
    email: business.email,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.zip,
      addressLocality: business.address.city,
      addressRegion: business.address.province,
      addressCountry: business.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    openingHoursSpecification: openingHours,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviewsCount,
      bestRating: 5,
    },
    sameAs: [business.social.facebook, business.social.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body>
        <SiteBackground />
        <ScrollProgress />
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
