import { Link, useNavigate } from "react-router-dom";
import useScrollDetection from "../../hooks/useScrollDetection";
import { useTheme } from "../../store/ThemeContext";
import LightSwitch from "./LightSwitch";
import { handleNavigationScroll } from "../../lib/helpers";
import { NavItem } from "../../lib/types";
import { NAV_LINKS } from "../../lib/constants";
import { useAuth } from "../../store/AuthContext";
import LogoutButton from "../Auth/LogoutButton";
import LoginButton from "../Auth/LoginButtons";

interface HeaderProps {
  classNameWidth: string;
}

const Header = ({ classNameWidth = "" }: HeaderProps) => {
  const { toggle, theme } = useTheme();
  const navigate = useNavigate();
  const isScrolled = useScrollDetection();

  const { user } = useAuth();

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

  console.log(user);

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
        <div className="flex gap-8 items-center">
          <LightSwitch toggle={toggle} theme={theme} />
          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user?.photoURL as string}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <p>{user.displayName}</p>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
      <nav className="container flex justify-between gap-4 flex-wrap">
        {NAV_LINKS.map(renderNavItem)}
      </nav>
    </header>
  );
};

export default Header;
