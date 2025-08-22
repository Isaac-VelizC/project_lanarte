import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { PlayIcon, X, Volume2, VolumeX } from "lucide-react";

// Componente memoizado para el botón de play
const PlayButton = memo(() => {
  return (
    <motion.div
      className="bg-primary/90 p-4 rounded-full text-white cursor-pointer relative overflow-hidden"
      whileHover={{ 
        scale: 1.1,
        backgroundColor: "#ee832b / 1)",
        boxShadow: "0 0 25px #ee832b / 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {/* Efecto de ondas */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30"
        animate={{
          scale: [1, 1.5, 2],
          opacity: [0.6, 0.3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/20"
        animate={{
          scale: [1, 1.5, 2],
          opacity: [0.4, 0.2, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
          ease: "easeOut"
        }}
      />
      
      {/* Ícono de play con animación */}
      <motion.div
        animate={{ 
          x: [0, 2, 0],
          transition: { duration: 2, repeat: Infinity }
        }}
      >
        <PlayIcon size={24} fill="currentColor" />
      </motion.div>
    </motion.div>
  );
});

// Componente para el modal de video
type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
};

const VideoModal = memo(({ isOpen, onClose, videoId }: VideoModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // Manejar tecla ESC
  useEffect(() => {
    interface EscapeEvent extends KeyboardEvent {
      key: string;
    }

    const handleEscape = (e: EscapeEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const modalVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del modal */}
          <div className="flex justify-between items-center mb-4">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white text-xl font-semibold"
            >
              Proceso de Elaboración - Lana&Arte
            </motion.h3>
            
            <div className="flex gap-2">
              {/* Botón de silencio */}
              <motion.button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>

              {/* Botón cerrar */}
              <motion.button
                onClick={onClose}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                title="Cerrar (ESC)"
              >
                <X size={24} />
              </motion.button>
            </div>
          </div>

          {/* Contenedor del video */}
          <motion.div
            className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-900 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Loading spinner */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isLoading ? 1 : 0 }}
                className="absolute inset-0 flex items-center justify-center bg-gray-900"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full"
                />
              </motion.div>
            )}

            {/* Video iframe */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1${isMuted ? '&mute=1' : ''}`}
              title="Proceso de elaboración de prendas de lana - Lana&Arte Potosí"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
            />

            {/* Overlay con información adicional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md rounded-lg p-3 text-white text-sm max-w-xs"
            >
              <p className="font-medium">🧶 Artesanía Potosina</p>
              <p className="text-white/80 text-xs">
                Descubre nuestro proceso tradicional
              </p>
            </motion.div>
          </motion.div>

          {/* Información adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-center text-white/60 text-sm"
          >
            <p>Presiona <kbd className="bg-white/10 px-2 py-1 rounded text-xs">ESC</kbd> para cerrar</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

export default function VideoButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  // ID real del video de YouTube (reemplazar con el ID correcto)
  const videoId = "dQw4w9WgXcQ"; // Placeholder - cambiar por el video real

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  // Variantes de animación para el botón principal
  const buttonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: 80,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 1
      }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 200 }
    }
  };

  return (
    <>
      {/* Botón principal mejorado */}
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex justify-center lg:justify-start items-center h-full mt-10 lg:mt-0"
      >
        <motion.button
          variants={containerVariants}
          onClick={handleOpen}
          className="group flex items-center md:space-x-4 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 p-3 rounded-full shadow-xl hover:shadow-2xl border border-white/10"
          whileHover={{ 
            scale: 1.05,
            y: -2,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <PlayButton />
          
          <motion.div 
            variants={textVariants}
            className="hidden md:block md:pr-4"
          >
            <span className="text-lg font-semibold text-white block">
              Ver proceso
            </span>
            <span className="text-sm text-white/70 block">
              Artesanía en video
            </span>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Modal de video mejorado */}
      <VideoModal 
        isOpen={isOpen}
        onClose={handleClose}
        videoId={videoId}
      />

      {/* Versión móvil */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="md:hidden flex justify-center mt-8"
      >
        <motion.button
          onClick={handleOpen}
          className="flex items-center space-x-3 bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlayIcon size={20} fill="currentColor" />
          <span className="font-medium">Ver proceso</span>
        </motion.button>
      </motion.div>
    </>
  );
}