import WhatsappIcon from "@/assets/icons/whatsapp.svg";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/591XXXXXXXXX" // Coloca aquí tu número con código de país
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-2 md:px-4 py-2 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110"
    >
      <img src={WhatsappIcon} alt="WhatsApp Icon" className="w-8" />
      <span className="ml-2 text-sm hidden md:inline font-medium">
        Hablar por WhatsApp
      </span>
    </a>
  );
}
