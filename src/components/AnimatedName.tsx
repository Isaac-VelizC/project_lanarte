import { motion } from "framer-motion";

const AnimatedName = () => {
  const name = "Lana&Arte";

  // Variants para cada letra
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotate: 10 }, // puedes ajustar la rotación o la posición
    visible: { opacity: 1, y: 0, rotate: 0 }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // retardo entre cada letra
      },
    },
  };

  return (
    <motion.h1
      className="text-white text-3xl sm:text-8xl font-extrabold flex justify-center space-x-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {name.split("").map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char === " " ? "\u00A0" : char} {/* conserva los espacios */}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedName;
