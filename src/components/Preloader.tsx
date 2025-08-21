import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedName from "./AnimatedName";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula la carga de recursos (ajusta según tu app)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 bg-primary flex flex-col justify-center items-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          {/* Nombre del negocio */}
          <AnimatedName />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
