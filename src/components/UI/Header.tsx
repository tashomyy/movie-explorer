import { Link } from "react-router-dom";
import useScrollDetection from "../../hooks/useScrollDetection";
import { useTheme } from "../../store/ThemeContext";
import LightSwitch from "./LightSwitch";

import { useAuth } from "../../store/AuthContext";
import LogoutButton from "../Auth/LogoutButton";
import LoginButton from "../Auth/LoginButtons";
import Navbar from "./Navbar";

interface HeaderProps {
  classNameWidth: string;
}

const Header = ({ classNameWidth = "" }: HeaderProps) => {
  const { toggle, theme } = useTheme();
  const isScrolled = useScrollDetection();

  const { user } = useAuth();

  return (
    <header
      className={`flex flex-col sticky top-0 z-20 py-6 gap-6 ${
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
      <Navbar />
    </header>
  );
};

export default Header;
