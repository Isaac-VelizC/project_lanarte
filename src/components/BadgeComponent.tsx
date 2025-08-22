import { motion } from "framer-motion";

type BadgeProps = {
  text: string;
  className?: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "info";
};

const BadgeComponent = ({
  text,
  className = "",
  variant = "primary",
}: BadgeProps) => {
  const baseStyles =
    "inline-block px-3 py-1 mb-4 rounded-full text-xs font-semibold uppercase tracking-wide";

  const variantStyles = {
    primary: "bg-primary text-white",
    secondary: "bg-gray-300 text-gray-800",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-400 text-black",
    info: "bg-blue-400 text-white",
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {text}
    </motion.span>
  );
};

export default BadgeComponent;
