import React from "react";
interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  placeholder = "",
  required = true,
  className = ""
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="text-sm font-semibold mb-2 block">{label}</label>
      <input
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border-none bg-white focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>
  );
};

export default InputField;
