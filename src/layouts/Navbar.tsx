import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react"; // Iconos para el menú hamburguesa
import Button from "@/components/ButtonComponent";
import LogoComponent from "@/components/LogoComponent";
import { logEvent } from "@/analytics";

const navLinks = [
  { to: "home", label: "Inicio" },
  { to: "about", label: "Sobre Nosotros" },
  { to: "gallery", label: "Galería" },
  { to: "testimonials", label: "Testimonios" },
  { to: "contact", label: "Contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50
          ? "bg-secondary shadow-md"
          : isOpen
          ? "bg-secondary"
          : "bg-transparent text-secondary"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 lg:px-10 xl:px-16 h-18">
        {/* Logo */}
        <LogoComponent />

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-10 font-medium">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                smooth={true}
                duration={600}
                spy={true}
                offset={-80}
                activeClass="text-primary font-bold"
                className="cursor-pointer hover:text-primary transition-colors duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Button
            size="sm"
            label="Contactanos"
            onClick={() => {
              logEvent("CTA", "click", "Contactanos Button");
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Contactanos
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-secondary text-textlight/80 transition-transform duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "absolute -translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col space-y-6 px-6 py-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                smooth={true}
                duration={600}
                spy={true}
                offset={-80}
                onClick={() => setIsOpen(false)}
                activeClass="text-primary font-bold"
                className="block text-lg cursor-pointer hover:text-primary transition-colors duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Button
              size="sm"
              label="Contactanos"
              onClick={() => logEvent("CTA", "click", "Contactanos Button")}
            >
              Contactanos
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
