type CardProps = {
  title: string;
  description: string;
  icon?: string;
  iconAlt?: string;
  className?: string;
  onClick?: () => void;
};

const ServiceCard = ({
  title,
  description,
  icon,
  iconAlt = "Icono del servicio",
  className = "",
  onClick,
}: CardProps) => {
  return (
    <article
      role="region"
      aria-label={title}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          onClick();
        }
      }}
      className={`
        bg-secondary
        h-[14rem] lg:h-[12rem]
        text-center 
        px-4 py-6 xl:py-8 
        rounded-3xl 
        flex flex-col justify-center items-center 
        shadow-md 
        hover:shadow-xl 
        hover:scale-105 
        transition-transform duration-300 ease-in-out
        ${onClick ? "cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-300" : ""}
        ${className}
      `}
    >
      {icon && (
        <img
          src={icon}
          alt={iconAlt}
          className="w-16 h-16 lg:w-8 lg:h-8 mb-5 object-contain drop-shadow-md"
        />
      )}
      <h3 className="text-primary font-semibold text-xl lg:text-base xl:text-lg mb-3">{title}</h3>
      <p className="text-textlight/85 text-base lg:text-xs leading-relaxed">{description}</p>
    </article>
  );
};

export default ServiceCard;
