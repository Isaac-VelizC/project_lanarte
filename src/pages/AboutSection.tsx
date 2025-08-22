import { LazyLoadImage } from "react-lazy-load-image-component";
import imgSrc from "@/assets/imgs/about_banner.jpg";
import BadgeComponent from "@/components/BadgeComponent";
import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import { memo } from "react";
import { containerVariants, itemVariants, sectionVariants, titleVariants } from "@/utils/AnimatesMotion";

const AboutSectionContent = memo(() => {
  // Variantes de animación para el contenido de texto

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const listItemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12
      }
    }
  };

  return (
    <m.div 
      className="flex-1 text-left"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <m.div variants={itemVariants}>
        <BadgeComponent text="Sobre nosotros" />
      </m.div>

      <m.h2
        variants={titleVariants}
        className="text-3xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mt-4"
        style={{ 
          willChange: "transform, opacity",
          transformOrigin: "left center"
        }}
      >
        Donde la <span className="text-primary">tradición</span> se encuentra con
        el <span className="text-primary">diseño.</span>
      </m.h2>

      <m.p
        variants={itemVariants}
        className="mt-6 text-sm sm:text-base text-textlight/70 leading-relaxed max-w-xl mx-auto md:mx-0"
        style={{ willChange: "transform, opacity" }}
      >
        Somos un taller familiar en Potosí dedicado a transformar la lana en
        prendas que abrigan historias. Cada chompa, chalina o bufanda es el
        resultado de un equilibrio entre tradición artesanal y diseño
        contemporáneo, hechas para realzar tu estilo con identidad boliviana.
      </m.p>

      <m.ul 
        variants={listVariants}
        className="list-disc pl-6 text-textlight/80 space-y-3 mt-6 max-w-lg mx-auto md:mx-0"
      >
        {[
          "Diseños auténticos con esencia boliviana",
          "Atención personalizada y cercana",
          "Orgullosamente hecho en Potosí",
          "Envíos a todo el país con confianza",
        ].map((item, index) => (
          <m.li
            key={index}
            variants={listItemVariants}
            className="text-sm sm:text-base"
            style={{ willChange: "transform, opacity" }}
            whileHover={{ 
              x: 5, 
              color: "rgb(var(--color-primary))",
              transition: { duration: 0.2 }
            }}
          >
            {item}
          </m.li>
        ))}
      </m.ul>
    </m.div>
  );
});

const AboutSection = () => {
  // Variantes para la imagen
  const imageVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1.2
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="about"
        className="relative w-full min-h-auto py-20 px-6 md:px-16 lg:px-20 xl:px-32"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-7xl mx-auto">
          
          {/* Contenedor de imagen con animación mejorada */}
          <m.div
            variants={imageVariants}
            className="flex-1 w-full"
            style={{ 
              willChange: "transform, opacity",
              transformOrigin: "center center"
            }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
              }
            }}
          >
            <LazyLoadImage
              src={imgSrc}
              alt="Fondo de prendas de lana hechas en Potosí"
              className="w-full h-auto max-w-md mx-auto md:max-w-lg rounded-lg shadow-lg"
              effect="blur"
              beforeLoad={() => {
                // Preload optimización
                const img = new Image();
                img.src = imgSrc;
              }}
            />
          </m.div>

          {/* Contenido de texto */}
          <AboutSectionContent />
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default AboutSection;