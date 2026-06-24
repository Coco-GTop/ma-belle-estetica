import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Servizi } from "@/components/sections/Servizi";
import { ChiSono } from "@/components/sections/ChiSono";
import { Galleria } from "@/components/sections/Galleria";
import { Recensioni } from "@/components/sections/Recensioni";
import { Contatti } from "@/components/sections/Contatti";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
