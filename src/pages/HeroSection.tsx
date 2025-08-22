import { LazyLoadImage } from "react-lazy-load-image-component";
import { LazyMotion, domAnimation, m, useScroll, useTransform, type Variants } from "framer-motion";
import { memo, useEffect, useState } from "react";
import Button from "@/components/ButtonComponent";
import VideoButton from "@/components/VideoButton";
import imgSrc from "@/assets/imgs/hero.jpg";
import { containerVariants, paragraphVariants, sectionVariants, titleVariants } from "@/utils/AnimatesMotion";

// Componente memo para los botones
const AnimatedButtons = memo(() => {
  const buttonsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.6
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <m.div
      variants={buttonsVariants}
      className="flex flex-row justify-center lg:justify-start gap-2 lg:gap-4 mt-16 lg:mt-20"
    >
      <m.div
        variants={buttonVariants}
        whileHover={{ 
          scale: 1.05,
          y: -2,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.95 }}
        style={{ willChange: "transform" }}
      >
        <Button
          size="lg"
          label="Solicita una cotización"
          onClick={() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Solicita una cotización
        </Button>
      </m.div>

      <m.div
        variants={buttonVariants}
        whileHover={{ 
          scale: 1.05,
          y: -2,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.95 }}
        style={{ willChange: "transform" }}
      >
        <Button
          size="lg"
          label="Ver productos"
          outline
          onClick={() => {
            document
              .getElementById("gallery")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Ver productos
        </Button>
      </m.div>
    </m.div>
  );
});

// Componente para el contenido de texto
const HeroContent = memo(() => {
  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="col-span-2 text-left text-white"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Título con animación mejorada */}
      <m.h1
        variants={titleVariants}
        className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight"
        style={{ 
          willChange: "transform, opacity",
          transformOrigin: "left center"
        }}
      >
        Tejidos que abrigan el cuerpo{" "}
        <m.span 
          className="text-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          y el alma.
        </m.span>
      </m.h1>

      {/* Párrafo con blur inicial */}
      <m.p
        variants={paragraphVariants}
        className="mt-6 text-sm sm:text-base text-white/80 xs:max-w-sm mx-auto lg:mx-0"
        style={{ willChange: "transform, opacity, filter" }}
      >
        Diseñamos y fabricamos todo tipo de prendas de lana con acabados
        de excelencia, listas para tu negocio o marca.
      </m.p>

      {/* Botones animados */}
      <AnimatedButtons />
    </m.div>
  );
});

// Componente principal del Hero
const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect para el fondo
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.6, 0.8]);

  // Preload de la imagen crítica
  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => setImageLoaded(true);
  }, []);

  // Variantes para el VideoButton
  const videoButtonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 0.8
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="home"
        className="relative w-full h-screen md:h-auto xl:h-screen py-24 lg:py-32 flex items-center overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Imagen de fondo con parallax */}
        <m.div
          className="absolute inset-0 w-full h-full -z-10"
          style={{ y: backgroundY }}
        >
          <LazyLoadImage
            src={imgSrc}
            alt="Fondo de prendas de lana hechas en Potosí"
            className="w-screen h-screen object-cover object-top"
            effect="opacity"
            threshold={100}
            beforeLoad={() => {
              // Optimización de carga
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = imgSrc;
              document.head.appendChild(link);
            }}
            afterLoad={() => setImageLoaded(true)}
            placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3C/svg%3E"
          />
        </m.div>

        {/* Overlay mejorado con parallax */}
        <m.div 
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90 -z-10"
          style={{ opacity: overlayOpacity }}
        />

        {/* Efecto de partículas/brillo opcional */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 0.1 : 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 -z-10"
        />

        {/* Contenido principal */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10 items-center h-full">
            
            {/* Contenido de texto */}
            <HeroContent />
            
            {/* Sección de video con animación mejorada */}
            <m.div
              variants={videoButtonVariants}
              className="flex justify-center lg:justify-end"
              style={{ willChange: "transform, opacity" }}
            >
              <VideoButton />
            </m.div>
          </div>
        </div>

        {/* Indicador de scroll animado */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs mb-2">Desliza hacia abajo</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
            </div>
          </div>
        </m.div>
      </m.section>
    </LazyMotion>
  );
};

export default HeroSection;