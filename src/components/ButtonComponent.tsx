import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset'; // Tipo de botón
  onClick?: () => void;
  label: string;
  outline?: boolean; // Si es outline o no (default sólido)
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg'; // Tamaños (small, medium, large)
  className?: string; // Para agregar clases extras si se desea
};

const sizeClasses = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-4 py-2',
  md: 'px-[22px] py-2.5 text-lg',
  lg: 'px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-xl',
};

const Button = ({ children, outline = false, size = 'md', type, onClick, disabled = false, className = '', label }: ButtonProps) => {
  const baseClasses = 'flex items-center justify-center font-medium rounded-lg transition-colors duration-200 cursor-pointer';
  const sizeClass = sizeClasses[size];
  const variantClasses = outline
    ? 'bg-transparent border-2 border-primary text-white hover:bg-cta'
    : 'bg-primary text-white hover:bg-cta';

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${baseClasses} ${sizeClass} ${variantClasses} ${className}`} aria-label={label}>
      {children}
    </button>
  );
};

export default Button;
