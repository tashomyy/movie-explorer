import { Link } from "react-router-dom";
import useScrollDetection from "../../hooks/useScrollDetection";

import Navbar from "./Navbar";
import HeaderSettings from "./HeaderSettings";

interface HeaderProps {
  classNameWidth: string;
}

const Header = ({ classNameWidth = "" }: HeaderProps) => {
  const isScrolled = useScrollDetection();

  return (
    <header
      className={`grid grid-cols-2 lg:flex lg:flex-col sticky top-0 z-20 py-6 gap-6 ${
        isScrolled ? "bg-white dark:bg-secondary" : "bg-transparent"
      }`}
    >
      <div className={`flex justify-between items-center ${classNameWidth}`}>
        <Link to="/" className="secondary-heading">
          Movie Explorer
        </Link>
        <HeaderSettings className="hidden lg:flex" />
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
