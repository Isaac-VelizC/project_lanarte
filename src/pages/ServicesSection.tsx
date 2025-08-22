import iconUnoSrc from "@/assets/icons/icon-1.svg";
import iconDosSrc from "@/assets/icons/icon-2.svg";
import iconTresSrc from "@/assets/icons/icon-3.svg";
import BadgeComponent from "@/components/BadgeComponent";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/ButtonComponent";
import { m, LazyMotion, domAnimation, type Variants } from "framer-motion";
import { memo, useRef } from "react";
import { badgeVariants, buttonVariants, cardVariants, containerVariants, gridVariants, paragraphVariants, sectionVariants, titleVariants } from "@/utils/AnimatesMotion";

// Componente memoizado para el contenido principal
const ServicesContent = memo(() => {

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col justify-center text-center lg:text-left"
      style={{ willChange: "transform, opacity" }}
    >
      <m.div variants={badgeVariants}>
        <BadgeComponent text="Nuestros servicios" />
      </m.div>

      <m.h2
        variants={titleVariants}
        className="mt-2 xl:mt-6 text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-tight drop-shadow-xl"
        style={{ 
          willChange: "transform, opacity",
          transformOrigin: "center left"
        }}
      >
        Más que prendas,{" "}
        <m.span 
          className="text-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          experiencias tejidas
        </m.span>{" "}
        para ti y tu familia
      </m.h2>

      <m.p
        variants={paragraphVariants}
        className="mt-6 max-w-xl mx-auto lg:mx-0 text-sm text-textlight/70 sm:text-base leading-relaxed opacity-90"
        style={{ willChange: "transform, opacity, filter" }}
      >
        Cada servicio que ofrecemos nace del mismo propósito: llevar
        calidez, identidad y estilo auténtico a tu vida. Ya sea un detalle
        especial o un pedido a gran escala, lo hacemos con dedicación desde
        Potosí.
      </m.p>

      <m.div
        variants={buttonVariants}
        className="hidden mt-8 sm:flex justify-center lg:justify-start"
      >
        <m.div
          whileHover={{ 
            scale: 1.05, 
            y: -2,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.95 }}
          style={{ willChange: "transform" }}
        >
          <Button size="md" label="Solicitar catálogo completo">
            Solicitar catálogo completo
          </Button>
        </m.div>
      </m.div>
    </m.div>
  );
});

// Componente para las tarjetas de servicio
const ServicesGrid = memo(() => {
  const services = [
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
  ];

  return (
    <m.div
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:gap-8"
    >
      {services.map(({ icon, title, description }, i) => (
        <m.div 
          key={i}
          variants={cardVariants}
          whileHover={{
            y: -8,
            scale: 1.03,
            rotateY: 2,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }}
          style={{ 
            willChange: "transform",
            transformOrigin: "center center"
          }}
        >
          <ServiceCard
            icon={icon}
            title={title}
            description={description}
          />
        </m.div>
      ))}
    </m.div>
  );
});

// Botón móvil memoizado
const MobileButton = memo(() => {
  const mobileButtonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 0.8
      }
    }
  };

  return (
    <m.div
      variants={mobileButtonVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className="sm:hidden mt-8 flex justify-center lg:justify-start"
    >
      <m.div
        whileHover={{ 
          scale: 1.05, 
          y: -2,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.95 }}
        style={{ willChange: "transform" }}
      >
        <Button size="md" label="Solicitar catálogo completo">
          Solicitar catálogo completo
        </Button>
      </m.div>
    </m.div>
  );
});

const ServicesSection = () => {
  const sectionRef = useRef(null);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={sectionRef}
        id="services"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative w-full h-auto flex items-center py-24 overflow-hidden"
      >
        <div className="container mx-auto px-6 md:px-16 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16">
          
          {/* Contenido principal */}
          <ServicesContent />

          {/* Grid de servicios */}
          <ServicesGrid />

          {/* Botón móvil */}
          <MobileButton />
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default ServicesSection;