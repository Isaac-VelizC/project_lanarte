import logoSrc from "@/assets/logo/logo.svg";
import { Link } from "react-scroll";
import {
  FacebookIcon,
  InstagramIcon,
  MapPin,
  PhoneIcon,
  TimerIcon,
  TwitterIcon,
} from "lucide-react";

const links = [
  { to: "home", label: "Inicio" },
  { to: "about", label: "Sobre Nosotros" },
  { to: "services", label: "Servicios" },
  { to: "gallery", label: "Galería" },
  { to: "testimonials", label: "Testimonios" },
  { to: "contact", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary px-8 sm:px-16 xl:px-44 pt-12 pb-4">
      {/* Sección superior */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-5 gap-10 mb-10">
        {/* Logo + descripción */}
        <div className="space-y-5 col-span-1 lg:col-span-2 order-1">
          <Link to="home" className="flex items-center space-x-2 xl:space-x-4 cursor-pointer">
            <img src={logoSrc} alt="Lana&Arte" className="h-16" />
            <h1 className="flex font-semibold text-2xl xl:text-3xl">
              Lana <span className="text-lg">&</span>
              <span className="text-cta">Arte</span>
            </h1>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Cada prenda cuenta una historia; calidad y pasión que sentirás al
            vestirla.
          </p>
          <div className="flex space-x-5 mt-8">
            <div className="w-10 h-10 flex justify-center items-center p-2 bg-secondary rounded-full text-primary hover:bg-primary hover:text-secondary transition-colors cursor-pointer">
              <FacebookIcon aria-label="Facebook" role="link" tabIndex={0} />
            </div>
            <div className="w-10 h-10 flex justify-center items-center p-2 bg-secondary rounded-full text-primary hover:bg-primary hover:text-secondary transition-colors cursor-pointer">
              <InstagramIcon aria-label="Instagram" role="link" tabIndex={0} />
            </div>
            <div className="w-10 h-10 flex justify-center items-center p-2 bg-secondary rounded-full text-primary hover:bg-primary hover:text-secondary transition-colors cursor-pointer">
              <TwitterIcon aria-label="Twitter" role="link" tabIndex={0} />
            </div>
          </div>
        </div>

        {/* Links 1 */}
        <nav className="order-2 md:order-3 lg:order-2" aria-label="Enlaces principales">
          <div>
            <h2 className="text-lg font-semibold mb-4">Contenido</h2>
            <hr className="border-secondary/70 border-2 w-16 mb-4 -mt-2" />
          </div>
          <ul className="space-y-3 text-sm">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-cta transition-colors cursor-pointer"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Links 2 (podrías personalizar para otros enlaces o quitar duplicado) */}
        <nav className="order-3 md:order-4 lg:order-3" aria-label="Enlaces secundarios">
          <div>
            <h2 className="text-lg font-semibold mb-4">Servicios</h2>
            <hr className="border-secondary/70 border-2 w-16 mb-4 -mt-2" />
          </div>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Servicios
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        {/* Contacto */}
        <section className="col-span-1 lg:col-span-2 xl:col-span-1 order-4 md:order-2 lg:order-4" aria-label="Información de contacto">
          <div>
            <h2 className="text-lg font-semibold mb-4">Contactos</h2>
            <hr className="border-secondary/70 border-2 w-16 mb-4 -mt-2" />
          </div>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2">
              <TimerIcon
                className="w-5 h-5 text-secondary"
                aria-hidden="true"
              />
              <span
                className="break-words max-w-xs truncate"
                title="contacto@textileriaficticia.com"
              >
                contacto@textileriaficticia.com
              </span>
            </li>

            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" aria-hidden="true" />
              <span title="Zona Industrial, Ciudad X">
                Zona Industrial, Ciudad X
              </span>
            </li>
            <li className="flex items-center gap-4 bg-cta/50 p-4 rounded-lg">
              <PhoneIcon
                className="w-6 h-6 p-1 bg-secondary rounded-full text-primary"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-semibold text-secondary">Teléfono</h3>
                <p title="(+591) 700-12345">(+591) 700-12345</p>
              </div>
            </li>
          </ul>
        </section>
      </div>

      {/* Línea divisoria */}
      <hr className="border-secondary/30 mb-4" />

      {/* Copy final */}
      <div className="flex flex-col md:flex-row text-center justify-center md:justify-between items-center text-secondary font-light text-xs md:text-sm">
        <p className="mb-4 md:mb-0">
          Diseños que inspiran, calidad que perdura – por Lana&Arte
        </p>
        <p>© 2025 Lana&Arte. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
