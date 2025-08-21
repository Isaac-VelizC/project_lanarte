import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { ChevronUpIcon } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button
        onClick={() => scroll.scrollToTop({ duration: 600, smooth: "easeInOutQuad" })}
        className="fixed bottom-22 md:bottom-26 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/80 transition cursor-pointer"
        aria-label="Scroll to top"
      >
        <ChevronUpIcon className="w-5 h-5" />
      </button>
    )
  );
}
