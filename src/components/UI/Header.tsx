import { Link, useNavigate } from "react-router-dom";
import useScrollDetection from "../../hooks/useScrollDetection";
import { useTheme } from "../../store/ThemeContext";
import LightSwitch from "./LightSwitch";
import { handleNavigationScroll } from "../../lib/helpers";
import { NavItem } from "../../lib/types";
import { NAV_LINKS } from "../../lib/constants";

interface HeaderProps {
  classNameWidth: string;
}

const Header = ({ classNameWidth = "" }: HeaderProps) => {
  const { toggle, theme } = useTheme();
  const navigate = useNavigate();
  const isScrolled = useScrollDetection();

  const handleNavClick = (scrollTo?: string, path?: string, isLink = false) => {
    if (scrollTo) handleNavigationScroll(scrollTo, navigate);
    if (isLink && path) navigate(path);
  };

  const renderNavItem = (
    { name, scrollTo, path, isLink }: NavItem,
    index: number
  ) => {
    return isLink ? (
      <Link
        key={index}
        className="nav-item"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick(undefined, path, true);
        }}
        to={path}
      >
        {name.toUpperCase()}
      </Link>
    ) : (
      <button
        key={index}
        className="nav-item"
        onClick={() => handleNavClick(scrollTo)}
      >
        {name.toUpperCase()}
      </button>
    );
  };

  return (
    <header
      className={`flex flex-col sticky top-0 z-20 py-6 gap-4 ${
        isScrolled ? "bg-secondary" : "bg-transparent"
      }`}
    >
      <div className={`flex justify-between items-center ${classNameWidth}`}>
        <Link to="/" className="secondary-heading">
          Movie Explorer
        </Link>
        <LightSwitch toggle={toggle} theme={theme} />
      </div>
      <nav className="container flex justify-between gap-4 flex-wrap">
        {NAV_LINKS.map(renderNavItem)}
      </nav>
    </header>
  );
};

export default Header;
