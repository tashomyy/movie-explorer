import { useState, useEffect } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const ButtonScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200); // Show button after 200px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-10 p-3 bg-accent text-white rounded-full shadow-lg transition-opacity duration-300 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-400 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ChevronUpIcon className="w-6 h-6" />
    </button>
  );
};

export default ButtonScrollTop;
