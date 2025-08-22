import BadgeComponent from "@/components/BadgeComponent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import img1 from "@/assets/imgs/gallery/img_1.jpg";
import img2 from "@/assets/imgs/gallery/img_2.jpg";
import img3 from "@/assets/imgs/gallery/img_3.jpg";
import img4 from "@/assets/imgs/gallery/img_4.jpg";
import img5 from "@/assets/imgs/gallery/img_5.jpg";
import img6 from "@/assets/imgs/gallery/img_6.jpg";

import { domAnimation, LazyMotion, m, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, memo, useState } from "react";
import { badgeVariants, titleVariants } from "@/utils/AnimatesMotion";
import type { Variants } from "framer-motion";

const images = [img1, img2, img3, img4, img5, img6];

// Componente memoizado para el header
const GalleryHeader = memo(() => {
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  return (
    <m.div
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="flex flex-col items-center text-center mb-16"
    >
      {/* Badge con animación mejorada */}
      <m.div 
        variants={badgeVariants}
        style={{ 
          willChange: "transform, opacity",
          transformOrigin: "center center"
        }}
      >
        <BadgeComponent text="Galería" />
      </m.div>

      {/* Título con efecto de revelación */}
      <m.h2
        variants={titleVariants}
        className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
        style={{ willChange: "transform, opacity" }}
      >
        Algunos de nuestros trabajos más destacados en{" "}
        <m.span 
          className="text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
        >
          prendas de lana
        </m.span>
      </m.h2>
    </m.div>
  );
});

// Componente individual para cada imagen
type GalleryItemProps = {
  img: string;
  index: number;
  totalImages: number;
};

const GalleryItem = memo(({ img, index }: GalleryItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });

  // Diferentes patrones de animación basados en el índice
  const getAnimationVariants = (index: number) => {
    const patterns = [
      // Patrón 1: Desde abajo izquierda
      { x: -100, y: 100, rotate: -10 },
      // Patrón 2: Desde arriba
      { x: 0, y: -100, rotate: 5 },
      // Patrón 3: Desde abajo derecha
      { x: 100, y: 100, rotate: 10 },
      // Patrón 4: Desde izquierda
      { x: -150, y: 0, rotate: -5 },
      // Patrón 5: Desde derecha
      { x: 150, y: 0, rotate: 5 },
      // Patrón 6: Desde abajo centro
      { x: 0, y: 120, rotate: 0 }
    ];
    return patterns[index % patterns.length];
  };

  const animationPattern = getAnimationVariants(index);

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.6,
      x: animationPattern.x,
      y: animationPattern.y,
      rotate: animationPattern.rotate,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
        delay: index * 0.15
      }
    }
  };

  // Efecto parallax sutil para cada imagen
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <m.div
      ref={itemRef}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ 
        y,
        scale,
        willChange: "transform, opacity, filter"
      }}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
      whileHover={{
        y: -8,
        rotateY: 5,
        scale: 1.02,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Overlay con gradiente */}
      <m.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 flex items-end justify-center p-4"
        transition={{ duration: 0.3 }}
      >
        <m.p
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          className="text-white font-medium text-sm"
        >
          Prenda {index + 1}
        </m.p>
      </m.div>

      {/* Efecto de brillo al hover */}
      <m.div
        initial={{ x: "-100%", skewX: -15 }}
        whileHover={{ x: "200%", skewX: -15 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
        style={{ width: "50%" }}
      />

      <PhotoView src={img}>
        <m.div
          initial={{ scale: 1.1 }}
          animate={{ scale: imageLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.8 }}
        >
          <LazyLoadImage
            src={img}
            alt={`Prenda de lana artesanal ${index + 1} - Lana&Arte Potosí`}
            className="w-full h-60 sm:h-72 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            effect="opacity"
            threshold={100}
            afterLoad={() => setImageLoaded(true)}
            beforeLoad={() => {
              // Preload optimization
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = img;
              document.head.appendChild(link);
            }}
            placeholderSrc={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%23999'%3ECargando...%3C/text%3E%3C/svg%3E`}
          />
        </m.div>
      </PhotoView>

      {/* Indicador de carga */}
      {!imageLoaded && (
        <m.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
        >
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
        </m.div>
      )}
    </m.div>
  );
});

// Componente para el CTA
const GalleryCTA = memo(() => {
  const ctaVariants: Variants = {
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
        delay: 1.2
      }
    }
  };

  return (
    <m.div
      variants={ctaVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className="mt-12 text-center"
    >
      <m.a
        href="#contact"
        className="inline-flex items-center text-primary font-semibold text-lg hover:underline underline-offset-4 group"
        whileHover={{ 
          x: 5,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("contact")?.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
          });
        }}
      >
        Explora la colección completa
        <m.span
          className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          →
        </m.span>
      </m.a>
    </m.div>
  );
});

const GallerySection = () => {
  const sectionRef = useRef(null);
  
  // Parallax para la sección completa
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={sectionRef}
        id="gallery"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{ y: sectionY }}
        className="relative w-full py-20 px-6 md:px-16 lg:px-32 overflow-hidden"
      >
        {/* Efectos de fondo decorativos */}
        <m.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 2 }}
          className="absolute top-20 right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
        />
        <m.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.03, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute bottom-32 left-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl"
        />

        <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
          
          {/* Header */}
          <GalleryHeader />

          {/* Galería con Lightbox */}
          <PhotoProvider
            maskOpacity={0.8}
            bannerVisible={false}
            loadingElement={<div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full" />}
          >
            <m.div
              variants={gridVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"
            >
              {images.map((img, index) => (
                <GalleryItem
                  key={index}
                  img={img}
                  index={index}
                  totalImages={images.length}
                />
              ))}
            </m.div>
          </PhotoProvider>

          {/* CTA */}
          <GalleryCTA />
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default GallerySection;