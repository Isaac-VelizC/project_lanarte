"use client";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import BadgeComponent from "@/components/BadgeComponent";
import Button from "@/components/ButtonComponent";
import InputField from "@/components/InputField";
import InfoCard from "@/components/CardContact";
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";

// Variants para animaciones
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
        form.reset(); // limpiar campos
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
      className="relative w-full h-auto py-20 px-6 md:px-16 xl:px-32"
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
          <BadgeComponent text="Contacto" />
        </motion.div>

        {/* Título y descripción */}
        <div>
          <motion.div variants={fadeUp} className="mt-4 mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              ¿Listo para trabajar con nosotros?
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-base text-textlight/70 leading-relaxed opacity-90"
          >
            Cuéntanos sobre tu proyecto y recibe una propuesta personalizada en
            menos de 24 horas.
          </motion.p>
        </div>

        {/* Contenedor principal */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-16 w-full text-left">
          {/* Formulario con validaciones */}
          <motion.form
            variants={containerVariants}
            className="space-y-6 p-4 lg:p-8 bg-white/50 rounded-2xl shadow-sm"
            action={import.meta.env.VITE_FORMSPREE_URL}
            method="POST"
            onSubmit={handleSubmit}
          >
            {/* Honeypot (anti-spam) */}
            <input type="text" name="_gotcha" className="hidden" />

            <InputField label="Nombre Completo" name="nombre" required />
            <InputField
              label="Nombre de la empresa (opcional)"
              required={false}
              name="empresa"
            />
            <InputField
              type="email"
              label="Correo electrónico"
              name="email"
              required
            />

            <div className="mb-4">
              <label className="text-sm font-semibold mb-2 block">
                Mensaje
              </label>
              <motion.textarea
                variants={fadeUp}
                rows={5}
                name="mensaje"
                required
                minLength={10}
                placeholder="Escribe tu mensaje..."
                className="w-full px-4 py-3 rounded-lg border-none bg-white/80 focus:ring-2 focus:ring-primary focus:outline-none resize-none"
              />
            </div>

            <motion.div variants={fadeUp} className="pt-4">
              <Button
                label="Enviar Solicitud"
                className="w-full"
                type="submit"
                disabled={loading}
              >{loading ? "Enviando..." : "Enviar Solicitud"}</Button>
            </motion.div>

            {/* Mensajes de estado */}
            {status === "success" && (
              <p className="text-green-600 text-sm mt-2">
                ✅ Mensaje enviado con éxito, te contactaremos pronto.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-sm mt-2">
                ❌ Hubo un problema, inténtalo nuevamente.
              </p>
            )}
          </motion.form>

          {/* Información de contacto */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col justify-center space-y-6"
          >
            <InfoCard
              title="Dirección"
              description="Calle Falsa 123, Ciudad, País"
              Icon={<MapPinIcon className="text-secondary" size={24} />}
            />
            <InfoCard
              title="Teléfono"
              description="(+591) 700-12345"
              Icon={<PhoneIcon className="text-secondary" size={24} />}
            />
            <InfoCard
              title="Correo"
              description="contacto@textileriaficticia.com"
              Icon={<MailIcon className="text-secondary" size={24} />}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
