import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon, X } from "lucide-react";

export default function VideoButton() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Botón */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden md:flex justify-center lg:justify-start items-center h-full mt-10 lg:mt-0"
      >
        <button
          onClick={() => setOpen(true)}
          className="flex items-center md:space-x-3 bg-primary/10 backdrop-blur-md hover:bg-white/20 transition p-2 rounded-full shadow-lg"
        >
          <div className="bg-primary/80 p-4 rounded-full text-white cursor-pointer">
            <PlayIcon size={24} />
          </div>
          <span className="hidden md:block text-lg font-semibold text-secondary md:pr-6">
            Ver video
          </span>
        </button>
      </motion.div>

      {/* Modal de video */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <div className="relative w-full max-w-3xl p-4">
              {/* Botón cerrar */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 text-white hover:text-gray-300"
              >
                <X size={28} />
              </button>

              {/* Video embebido */}
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
                  title="Video"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
