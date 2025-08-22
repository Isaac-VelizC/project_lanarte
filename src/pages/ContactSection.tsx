"use client";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import BadgeComponent from "@/components/BadgeComponent";
import Button from "@/components/ButtonComponent";
import InputField from "@/components/InputField";
import InfoCard from "@/components/CardContact";
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";
import { badgeVariants, containerVariants, titleVariants } from "@/utils/AnimatesMotion";

// Variantes de animación optimizadas
const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94], // Easing más suave
    },
  },
};

const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const inputVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const buttonVariants: Variants = {
  idle: { 
    scale: 1,
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
  loading: {
    scale: 1,
    opacity: 0.8,
  },
};

const statusVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -10,
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: { 
    opacity: 0, 
    y: -10,
    scale: 0.9,
    transition: { 
      duration: 0.2,
    },
  },
};

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full h-auto py-20 px-6 md:px-16 xl:px-32 overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "-100px" }}
        className="flex flex-col items-center text-center max-w-6xl mx-auto"
      >
        {/* Badge con animación de escala */}
        <motion.div variants={badgeVariants}>
          <BadgeComponent text="Contacto" />
        </motion.div>

        {/* Título y descripción con mejor timing */}
        <div className="relative">
          <motion.div 
            variants={titleVariants} 
            className="mt-4 mb-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              ¿Listo para trabajar con nosotros?
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-base text-textlight/70 leading-relaxed opacity-90 max-w-2xl mx-auto"
          >
            Cuéntanos sobre tu proyecto y recibe una propuesta personalizada en
            menos de 24 horas.
          </motion.p>
        </div>

        {/* Contenedor principal con animaciones direccionales */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-16 w-full text-left">
          {/* Formulario con animación desde la izquierda */}
          <motion.form
            variants={slideInLeft}
            className="space-y-6 p-4 lg:p-8 bg-transparent rounded-2xl shadow-sm border border-white/20"
            action={import.meta.env.VITE_FORMSPREE_URL}
            method="POST"
            onSubmit={handleSubmit}
          >
            {/* Honeypot (anti-spam) */}
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} />

            {/* Campos con animación escalonada */}
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={inputVariants}>
                <InputField label="Nombre Completo" name="nombre" required />
              </motion.div>
              
              <motion.div variants={inputVariants}>
                <InputField
                  label="Nombre de la empresa (opcional)"
                  required={false}
                  name="empresa"
                />
              </motion.div>
              
              <motion.div variants={inputVariants}>
                <InputField
                  type="email"
                  label="Correo electrónico"
                  name="email"
                  required
                />
              </motion.div>

              <motion.div variants={inputVariants} className="mb-4">
                <label className="text-sm font-semibold mb-2 block">
                  Mensaje
                </label>
                <textarea
                  rows={5}
                  name="mensaje"
                  required
                  minLength={10}
                  placeholder="Escribe tu mensaje..."
                  className="w-full px-4 py-3 rounded-lg border-none bg-white/80 focus:ring-2 focus:ring-primary focus:outline-none resize-none transition-all duration-200 focus:bg-white focus:shadow-md"
                />
              </motion.div>

              <motion.div variants={inputVariants} className="pt-4">
                <motion.div
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  animate={loading ? "loading" : "idle"}
                >
                  <Button
                    label="Enviar Solicitud"
                    className="w-full relative overflow-hidden"
                    type="submit"
                    disabled={loading}
                  >
                    <motion.span
                      initial={false}
                      animate={{ opacity: loading ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      Enviar Solicitud
                    </motion.span>
                    
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span className="ml-2">Enviando...</span>
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Mensajes de estado con animación */}
            <motion.div
              key={status}
              variants={statusVariants}
              initial="hidden"
              animate={status !== "idle" ? "visible" : "hidden"}
              exit="exit"
              className="relative"
            >
              {status === "success" && (
                <motion.p 
                  className="text-green-600 text-sm mt-2 flex items-center gap-2 bg-green-50 p-3 rounded-lg border border-green-200"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  >
                    ✅
                  </motion.span>
                  Mensaje enviado con éxito, te contactaremos pronto.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p 
                  className="text-red-600 text-sm mt-2 flex items-center gap-2 bg-red-50 p-3 rounded-lg border border-red-200"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  >
                    ❌
                  </motion.span>
                  Hubo un problema, inténtalo nuevamente.
                </motion.p>
              )}
            </motion.div>
          </motion.form>

          {/* Información de contacto con animación desde la derecha */}
          <motion.div
            variants={slideInRight}
            className="flex flex-col justify-center space-y-6"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                variants={fadeUp}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <InfoCard
                  title="Dirección"
                  description="Calle Falsa 123, Ciudad, País"
                  Icon={
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <MapPinIcon className="text-secondary" size={24} />
                    </motion.div>
                  }
                />
              </motion.div>
              
              <motion.div
                variants={fadeUp}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <InfoCard
                  title="Teléfono"
                  description="(+591) 700-12345"
                  Icon={
                    <motion.div
                      whileHover={{ 
                        rotate: [0, 15, -15, 0],
                        transition: { duration: 0.6 }
                      }}
                    >
                      <PhoneIcon className="text-secondary" size={24} />
                    </motion.div>
                  }
                />
              </motion.div>
              
              <motion.div
                variants={fadeUp}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <InfoCard
                  title="Correo"
                  description="contacto@textileriaficticia.com"
                  Icon={
                    <motion.div
                      whileHover={{ 
                        y: [-2, 0, -2],
                        transition: { duration: 0.5, repeat: 2 }
                      }}
                    >
                      <MailIcon className="text-secondary" size={24} />
                    </motion.div>
                  }
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;