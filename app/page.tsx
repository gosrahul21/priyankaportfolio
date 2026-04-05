import Cursor from "@/components/Cursor";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Practice from "@/components/Practice";
import Education from "@/components/Education";
import AISection from "@/components/AISection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import FloatingChat from "@/components/FloatingChat";

export default function Home() {
  return (
    <>
      {/* Client-side utilities */}
      <Cursor />
      <ScrollReveal />
      <FloatingChat />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <main>
        <Hero />
        <About />
        <Practice />
        <Education />
        <AISection />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
