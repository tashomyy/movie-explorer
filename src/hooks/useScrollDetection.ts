import { useState, useEffect } from "react";

function useScrollDetection() {
  const [isScrolled, setIsScrolled] = useState(
    typeof window !== "undefined" ? window.scrollY > 0 : false
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrolled;
}

export default useScrollDetection;
