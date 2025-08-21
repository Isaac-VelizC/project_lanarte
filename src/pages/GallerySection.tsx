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

import { motion, type Variants } from "framer-motion";

const images = [img1, img2, img3, img4, img5, img6];

// Animaciones
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const GallerySection = () => {
  return (
    <section
      id="gallery"
      className="relative w-full py-20 px-6 md:px-16 lg:px-32"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center text-center max-w-6xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <BadgeComponent text="Galería" />
        </motion.div>

        {/* Título */}
        <motion.div variants={fadeUp} className="mt-4 mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Algunos de nuestros trabajos más destacados en{" "}
            <span className="text-primary">prendas de lana</span>
          </h2>
        </motion.div>

        {/* Galería con Lightbox */}
        <PhotoProvider>
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <PhotoView src={img}>
                  <LazyLoadImage
                    src={img}
                    alt={`Prenda de lana ${index + 1}`}
                    className="w-full h-60 sm:h-72 lg:h-80 object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </PhotoView>
              </motion.div>
            ))}
          </motion.div>
        </PhotoProvider>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-10">
          <a
            href="#"
            className="text-primary font-semibold hover:underline underline-offset-4"
          >
            Explora la colección completa →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GallerySection;
