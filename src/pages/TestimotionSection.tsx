import { testimonios } from "@/utils/datas";
import imgBodySrc from "@/assets/bg/az-subtle-1920x1080.png";
import imgSrc from "@/assets/imgs/comillas.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false,
};

const TestimotionSection = () => {
  return (
    <section id="testimonials"
      className="relative w-full h-auto bg-cover bg-center py-24 flex justify-center items-center"
      style={{ backgroundImage: `url(${imgBodySrc})` }}
    >
      {/* Slider */}
      <div className="w-full max-w-2xl px-6">
        <Slider {...settings}>
          {testimonios.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center items-center text-center p-8 rounded-2xl"
            >
              {/* Icono de comillas */}
              <div className="relative w-full h-28 flex justify-center items-center overflow-hidden">
                <img
                  src={imgSrc}
                  alt="Call Section"
                  className="w-20 h-20 object-cover object-center"
                />
              </div>

              {/* Testimonio */}
              <p className="italic text-xl text-textlight/80 leading-relaxed mb-6">
                "{t.mensaje}"
              </p>

              {/* Avatar + nombre */}
              <div className="relative w-full h-28 flex justify-center items-center overflow-hidden">
                <img
                  src={t.avatar}
                  alt={t.nombre}
                  className="w-14 h-14 rounded-full object-cover mb-3 shadow-md"
                />
              </div>
              <h3 className="text-lg font-semibold text-accentcolor">
                {t.nombre}
              </h3>
              <h5 className="text-sm text-textlight">{t.puesto}</h5>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimotionSection;
