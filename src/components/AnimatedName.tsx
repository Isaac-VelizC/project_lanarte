import { motion } from "framer-motion";

const AnimatedName = () => {
  const name = "Lana&Arte";

  // Variantes para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Retraso entre cada letra
        delayChildren: 0.3,   // Retraso inicial
      }
    }
  };

  // Variantes para cada letra
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      scale: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
        duration: 0.6
      }
    }
  };

  // Animación de hover para cada letra
  const letterHover = {
    scale: 1.2,
    color: "#ee832b", // Color naranja vibrante
    textShadow: "0px 0px 15px rgba(238, 131, 43, 0.8)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 10
    }
  };

  return (
    <motion.h1
      className="text-white text-3xl sm:text-8xl font-extrabold flex justify-center space-x-1 cursor-default"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // Animación de pulsación continua sutil
      // Si quieres la animación de pulsación, combínala con los variants o usa solo una
    >
      {name.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          whileHover={letterHover}
          whileTap={{ scale: 0.9 }}
          className="inline-block"
          style={{
            transformOrigin: "center bottom"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedName;