import { motion, type Variants } from "framer-motion";
import React from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  variants?: Variants;
  required?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  placeholder = "",
  variants = fadeUp,
  required = true,
  className = ""
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="text-sm font-semibold mb-2 block">{label}</label>
      <motion.input
        variants={variants}
        name={name}
        initial="hidden"
        animate="visible"
        required={required}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border-none bg-white/80 focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>
  );
};

export default InputField;
