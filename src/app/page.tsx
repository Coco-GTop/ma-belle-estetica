import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Servizi } from "@/components/sections/Servizi";
import { ChiSono } from "@/components/sections/ChiSono";
import { Galleria } from "@/components/sections/Galleria";
import { Recensioni } from "@/components/sections/Recensioni";
import { Contatti } from "@/components/sections/Contatti";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee
          items={[
            "Nail Art",
            "Microneedling",
            "Epilazione Laser",
            "Massaggi",
            "Make-up",
            "Trattamenti Viso",
            "Pedicure",
            "Laminazione Ciglia",
          ]}
        />
        <Servizi />
        <ChiSono />
        <Galleria />
        <Recensioni />
        <Contatti />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
