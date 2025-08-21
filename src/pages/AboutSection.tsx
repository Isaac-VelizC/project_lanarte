import { LazyLoadImage } from "react-lazy-load-image-component";
import imgSrc from "@/assets/imgs/about_banner.jpg";
import BadgeComponent from "@/components/BadgeComponent";
import { motion, type Variants } from "framer-motion";

// Variants reutilizables
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const AboutSection = () => {
  return (
    <section id="about" className="relative w-full min-h-auto py-20 px-6 md:px-16 lg:px-20 xl:px-32">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-7xl mx-auto">
        {/* Imagen */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex-1 w-full"
        >
          <LazyLoadImage
            src={imgSrc}
            alt="Fondo de prendas de lana hechas en Potosí"
            //effect="blur"
            className="w-full h-auto max-w-md mx-auto md:max-w-lg"
          />
        </motion.div>

        {/* Contenido */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex-1 text-left"
        >
          {/* Badge */}
          <motion.div variants={fadeDown}>
            <BadgeComponent text="Sobre nosotros" />
          </motion.div>

          {/* Título */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mt-4"
          >
            Donde la <span className="text-primary">tradición</span> se
            encuentra con el <span className="text-primary">diseño.</span>
          </motion.h2>

          {/* Párrafo */}
          <motion.p
            variants={fadeLeft}
            className="mt-6 text-sm sm:text-base text-textlight/70 leading-relaxed max-w-xl mx-auto md:mx-0"
          >
            Somos un taller familiar en Potosí dedicado a transformar la lana en
            prendas que abrigan historias. Cada chompa, chalina o bufanda es el
            resultado de un equilibrio entre tradición artesanal y diseño
            contemporáneo, hechas para realzar tu estilo con identidad
            boliviana.
          </motion.p>

          {/* Lista */}
          <motion.ul
            variants={containerVariants}
            className="list-disc pl-6 text-textlight/80 space-y-3 mt-6 max-w-lg mx-auto md:mx-0"
          >
            {[
              "Diseños auténticos con esencia boliviana",
              "Atención personalizada y cercana",
              "Orgullosamente hecho en Potosí",
              "Envíos a todo el país con confianza",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={fadeUp}
                className="text-sm sm:text-base"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
