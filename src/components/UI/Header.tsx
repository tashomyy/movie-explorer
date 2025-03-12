import { useTheme } from "../../store/ThemeContext";
import LightSwitch from "./LightSwitch";

const Header = () => {
  const { toggle, theme } = useTheme();

  return (
    <header className="flex justify-between items-center sticky top-0 z-20 bg-primary py-6">
      <h2 className="secondary-heading">Movie explorer</h2>
      <LightSwitch toggle={toggle} theme={theme} />
    </header>
  );
};

export default Header;
