import { Link } from "react-router-dom";
import useScrollDetection from "../../hooks/useScrollDetection";
import { useTheme } from "../../store/ThemeContext";
import LightSwitch from "./LightSwitch";

interface HeaderProps {
  classNameWidth: string;
}

const Header = ({ classNameWidth }: HeaderProps) => {
  const { toggle, theme } = useTheme();

  const isScrolled = useScrollDetection();

  return (
    <header
      className={`flex flex-col sticky top-0 z-20 py-6 gap-4 ${
        isScrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className={`flex justify-between items-center ${classNameWidth}`}>
        <Link to={"/"} className="secondary-heading">
          Movie explorer
        </Link>
        <LightSwitch toggle={toggle} theme={theme} />
      </div>
      <nav className="mx-auto">navigation bar</nav>
    </header>
  );
};

export default Header;
