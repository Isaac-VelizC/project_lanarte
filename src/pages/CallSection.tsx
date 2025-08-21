import imgSrc from "@/assets/imgs/call_section.jpg";
import Button from "@/components/ButtonComponent";

const CallSection = () => {
  return (
    <div
      className="relative w-full h-auto bg-cover bg-center py-12 px-0"
      style={{ backgroundImage: `url(${imgSrc})` }}
    >
      {/* Overlay con degradado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full p-4">
        <div className="flex flex-col justify-center items-center text-center max-w-3xl px-6">
          <h1 className="font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
            Diseños personalizados que hablan de quién eres.
          </h1>
          <Button label="Cotizar mi estilo" className="mt-6">
            Cotizar mi estilo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallSection;
