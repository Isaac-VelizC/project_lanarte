import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/Navbar";
import { logPageView, initGA } from "./analytics";
import ScrollToTop from "./components/ScrollToTop";

import { lazy, useEffect } from "react";
import Preloader from "./components/Preloader";
import ContactSection from "./pages/ContactSection";
import WhatsAppButton from "./components/WhatsAppButton";
const HeroSection = lazy(() => import("@/pages/HeroSection"));
const AboutSection = lazy(() => import("@/pages/AboutSection"));
const ServicesSection = lazy(() => import("@/pages/ServicesSection"));
const GallerySection = lazy(() => import("@/pages/GallerySection"));
const CallSection = lazy(() => import("@/pages/CallSection"));
const TestimotionSection = lazy(() => import("@/pages/TestimotionSection"));

function App() {
  useEffect(() => {
    initGA();
    logPageView(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Preloader />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <CallSection />
        <TestimotionSection />
        <ContactSection />
      </main>
      <ScrollToTop />
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default App;
