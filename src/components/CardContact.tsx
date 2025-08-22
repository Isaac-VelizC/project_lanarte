import React, { type ReactElement } from "react";
interface InfoCardProps {
  title: string;
  description: string;
  Icon: ReactElement;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  Icon,
  className = ""
}) => {
  return (
    <div
      className={`flex items-center p-4 rounded-lg w-auto gap-4 ${className}`}
    >
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-sm bg-primary flex items-center justify-center">
        {Icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <p className="text-textlight/80 text-sm md:text-base break-words max-w-xs truncate">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
