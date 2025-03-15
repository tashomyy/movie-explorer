import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollTop = () => {
  const location = useLocation();
  useEffect(() => {
    document.body.scroll({ top: 0, behavior: "smooth" });
    document.documentElement.scroll({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
};

export default ScrollTop;
