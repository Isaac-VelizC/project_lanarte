import { testimonios } from "@/utils/datas";
import imgSrc from "@/assets/imgs/comillas.svg";
import BadgeComponent from "@/components/BadgeComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyMotion, domAnimation, m } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useRef, memo } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { sectionVariants } from "@/utils/AnimatesMotion";

// Componente para las flechas personalizadas
type CustomArrowProps = {
  direction: 'prev' | 'next';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
};

const CustomArrow = ({ direction, onClick, disabled }: CustomArrowProps) => (
  <m.button
    onClick={onClick}
    disabled={disabled}
    className={`absolute top-1/2 -translate-y-1/2 z-10 ${
      direction === 'prev' ? 'left-4 lg:left-8' : 'right-4 lg:right-8'
    } bg-white/10 backdrop-blur-md hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-full border border-white/20 transition-all duration-300`}
    whileHover={{ 
      scale: disabled ? 1 : 1.1,
      backgroundColor: disabled ? undefined : "rgba(255,255,255,0.25)"
    }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
  >
    {direction === 'prev' ? (
      <ChevronLeft size={20} className="text-primary" />
    ) : (
      <ChevronRight size={20} className="text-primary" />
    )}
  </m.button>
);

// Componente para los indicadores personalizados
type Testimonio = {
  nombre: string;
  puesto: string;
  mensaje: string;
  avatar: string;
};

type CustomDotsProps = {
  testimonios: Testimonio[];
  activeSlide: number;
  goToSlide: (index: number) => void;
};

const CustomDots = ({ testimonios, activeSlide, goToSlide }: CustomDotsProps) => (
  <div className="flex justify-center space-x-2 mt-8">
    {testimonios.map((_, index) => (
      <m.button
        key={index}
        onClick={() => goToSlide(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          activeSlide === index 
            ? 'bg-primary scale-125' 
            : 'bg-white/40 hover:bg-white/60'
        }`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: activeSlide === index ? 1.25 : 1,
          opacity: 1
        }}
        transition={{ 
          delay: index * 0.1,
          type: "spring",
          stiffness: 300
        }}
      />
    ))}
  </div>
);

// Componente individual del testimonio
type TestimonialCardProps = {
  testimonio: {
    mensaje: string;
    avatar: string;
    nombre: string;
    puesto: string;
    // agrega aquí otras propiedades si existen en tus datos
  };
  isActive: boolean;
};

const TestimonialCard = memo(({ testimonio, isActive }: TestimonialCardProps) => {
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -30,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 200 }
    }
  };

  const quoteVariants: Variants = {
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
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const avatarVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.6
      }
    }
  };

  return (
    <m.div
      variants={cardVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className="flex flex-col justify-center items-center text-center p-8 lg:p-12 mx-4"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Icono de comillas con animación mejorada */}
      <m.div
        variants={quoteVariants}
        className="relative mb-6"
      >
        <div className="relative">
          <m.img
            src={imgSrc}
            alt="Comillas de testimonio"
            className="w-16 h-16 object-cover opacity-80"
            whileHover={{ 
              rotate: [0, -10, 10, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
          />
          {/* Efecto de brillo detrás */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 -z-10" />
        </div>
      </m.div>

      {/* Testimonio con animación de texto */}
      <m.div variants={itemVariants} className="mb-8">
        <m.p 
          className="italic text-lg lg:text-xl text-textlight/70 border-none border-transparent leading-relaxed max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-primary text-2xl">"</span>
          {testimonio.mensaje}
          <span className="text-primary text-2xl">"</span>
        </m.p>
      </m.div>

      {/* Estrellas de calificación */}
      <m.div
        variants={itemVariants}
        className="flex space-x-1 mb-6"
      >
        {[...Array(5)].map((_, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.8 + (i * 0.1),
              type: "spring",
              stiffness: 500
            }}
          >
            <Star 
              size={16} 
              className="text-yellow-400 fill-current drop-shadow-sm" 
            />
          </m.div>
        ))}
      </m.div>

      {/* Avatar y información del usuario */}
      <m.div variants={avatarVariants} className="flex flex-col items-center">
        <div className="relative mb-4">
          <m.img
            src={testimonio.avatar}
            alt={`${testimonio.nombre} - Cliente satisfecho`}
            className="w-16 h-16 rounded-full object-cover border-3 border-primary shadow-lg"
            transition={{ type: "spring", stiffness: 300 }}
          />
          {/* Indicador de verificado */}
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 400 }}
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </m.div>
        </div>
        
        <m.h3 
          className="text-lg font-semibold text-primary mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {testimonio.nombre}
        </m.h3>
        
        <m.h5 
          className="text-sm text-textlight/70 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          {testimonio.puesto}
        </m.h5>
      </m.div>

    </m.div>
  );
});

const TestimonialsSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderRef, setSliderRef] = useState(null);
  const sectionRef = useRef(null);

  // Configuración mejorada del slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    fade: true,
    cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    beforeChange: (current, next) => setActiveSlide(next),
    pauseOnHover: true,
    swipeToSlide: true,
    touchThreshold: 10,
  };

  // Variantes de animación para la sección

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={sectionRef}
        id="testimonials"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative w-full h-auto py-24 flex justify-center items-center overflow-hidden"
      >

        <div className="relative z-10 w-full max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <m.div
            variants={headerVariants}
            className="text-center mb-12"
          >
            <BadgeComponent text="Testimonios" />
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-3xl lg:text-4xl font-bold text-textlight leading-tight"
            >
              Lo que dicen nuestros <span className="text-primary">clientes</span>
            </m.h2>
          </m.div>

          {/* Slider Container */}
          <div className="relative">
            {/* Flechas de navegación */}
            <CustomArrow
              direction="prev"
              onClick={() => sliderRef?.slickPrev()}
              disabled={testimonios.length <= 1}
            />
            <CustomArrow
              direction="next"
              onClick={() => sliderRef?.slickNext()}
              disabled={testimonios.length <= 1}
            />

            {/* Slider */}
            <Slider ref={setSliderRef} {...settings}>
              {testimonios.map((testimonio, idx) => (
                <div key={idx}>
                  <TestimonialCard
                    testimonio={testimonio}
                    isActive={activeSlide === idx}
                  />
                </div>
              ))}
            </Slider>

            {/* Indicadores personalizados */}
            <CustomDots
              testimonios={testimonios}
              activeSlide={activeSlide}
              goToSlide={(index) => sliderRef?.slickGoTo(index)}
            />
          </div>

          {/* Estadísticas adicionales */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex justify-center items-center space-x-8 mt-12 text-textlight/70 text-sm"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">150+</div>
              <div>Clientes satisfechos</div>
            </div>
            <div className="w-px h-12 bg-textlight/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.9/5</div>
              <div>Calificación promedio</div>
            </div>
            <div className="w-px h-12 bg-textlight/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div>Prendas entregadas</div>
            </div>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default TestimonialsSection;