import { LazyLoadImage } from "react-lazy-load-image-component";
import imgBodySrc from "@/assets/bg/az-subtle-1920x1080.png";
import iconUnoSrc from "@/assets/icons/icon-1.svg";
import iconDosSrc from "@/assets/icons/icon-2.svg";
import iconTresSrc from "@/assets/icons/icon-3.svg";
import BadgeComponent from "@/components/BadgeComponent";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/ButtonComponent";
import { motion, type Variants } from "framer-motion";

// Variants para animaciones
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const ServicesSection = () => {
  return (
    <section id="services" className="relative w-full h-auto flex items-center py-24">
      {/* Imagen lazy */}
      <LazyLoadImage
        src={imgBodySrc}
        alt="Fondo de ilustracion para seccion servicios" //effect="blur"
        className="absolute inset-0 w-full h-full object-cover object-center -z-10"
      />
      <div className="absolute inset-0 bg-black/10 bg-opacity-90 -z-5" />

      <div className="container mx-auto px-6 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16">
        {/* Contenido principal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col justify-center text-center lg:text-left"
        >
          <motion.div variants={fadeUp}>
            <BadgeComponent text="Nuestros servicios" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-2 xl:mt-6 text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-tight drop-shadow-xl"
          >
            Más que prendas,{" "}
            <span className="text-primary">experiencias tejidas</span> para
            ti y tu familia
          </motion.h2>

          <motion.p
            variants={fadeRight}
            className="mt-6 max-w-xl mx-auto lg:mx-0 text-sm text-textlight/70 sm:text-base leading-relaxed opacity-90"
          >
            Cada servicio que ofrecemos nace del mismo propósito: llevar
            calidez, identidad y estilo auténtico a tu vida. Ya sea un detalle
            especial o un pedido a gran escala, lo hacemos con dedicación desde
            Potosí.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="hidden mt-8 sm:flex justify-center lg:justify-start"
          >
            <Button size="md" label="Solicitar catálogo completo">
              Solicitar catálogo completo
            </Button>
          </motion.div>
        </motion.div>

        {/* Cards de servicios */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:gap-8"
        >
          {[
            {
              icon: iconTresSrc,
              title: "Producción a Medida",
              description: "De Uniformes a Moda en Lana",
            },
            {
              icon: iconDosSrc,
              title: "Diseño Textil Único",
              description: "Patrones y Acabados Exclusivos",
            },
            {
              icon: iconUnoSrc,
              title: "Calidad Impecable",
              description: "Inspección Minuciosa en Cada Prenda",
            },
            {
              icon: iconUnoSrc,
              title: "Entrega Garantizada",
              description: "Distribución Rápida y Segura",
            },
          ].map(({ icon, title, description }, i) => (
            <motion.div key={i} variants={fadeUp}>
              <ServiceCard
                icon={icon}
                title={title}
                description={description}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
            variants={fadeUp}
            className="sm:hidden mt-8 flex justify-center lg:justify-start"
          >
            <Button size="md" label="Solicitar catálogo completo">
              Solicitar catálogo completo
            </Button>
          </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
