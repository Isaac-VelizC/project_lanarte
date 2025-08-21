import { LazyLoadImage } from "react-lazy-load-image-component";
import imgSrc from "@/assets/imgs/hero.jpg";
import Button from "@/components/ButtonComponent";
import { type Variants, motion } from "framer-motion";
import VideoButton from "@/components/VideoButton";

// Variantes para animación escalonada
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen md:h-auto xl:h-screen py-24 lg:py-32 flex items-center"
    >
      {/* Imagen lazy */}
      <LazyLoadImage
        src={imgSrc}
        alt="Fondo de prendas de lana hechas en Potosí"
        //effect="blur"
        className="absolute inset-0 w-full h-full object-cover object-top -z-10"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/60 -z-10"></div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10 items-center h-full">
          {/* Texto principal */}
          {/* Texto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="col-span-2 text-left text-white"
          >
            {/* Título */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight"
            >
              Tejidos que abrigan el cuerpo{" "}
              <span className="text-primary">y el alma.</span>
            </motion.h1>

            {/* Párrafo */}
            <motion.p
              variants={fadeLeft}
              className="mt-6 text-sm sm:text-base text-white/80 xs:max-w-sm mx-auto lg:mx-0"
            >
              Diseñamos y fabricamos todo tipo de prendas de lana con acabados
              de excelencia, listas para tu negocio o marca.
            </motion.p>

            {/* Botones */}
            <motion.div
              variants={fadeRight}
              className="flex flex-row justify-center lg:justify-start gap-2 lg:gap-4 mt-16 lg:mt-20"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  label="Solicita una cotización"
                  onClick={() => {
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Solicita una cotización
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" label="Ver productos" outline onClick={() => {
                    document
                      .getElementById("gallery")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}>
                  {" "}
                  Ver productos{" "}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Sección de video */}
          <VideoButton />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
