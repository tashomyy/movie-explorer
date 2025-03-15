import { Theme } from "../../lib/enums";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import ActionButton from "./ActionButton";

interface LightSwitchProps {
  toggle: () => void;
  theme: Theme.Dark | Theme.Light;
}

const LightSwitch = ({ toggle, theme }: LightSwitchProps) => {
  const isLightMode = theme === Theme.Light;

  // in this case activeBg can be looked at as darkMode and inactiveBg as lightMode styles

  return (
    <ActionButton
      isActive={!isLightMode}
      onClick={toggle}
      activeIcon={<SunIcon className="active-icon" />}
      inactiveIcon={<MoonIcon className="inactive-icon" />}
      activeBg="bg-primary"
      inactiveBg="bg-primary"
      ariaLabel="Toggle dark mode"
    />
  );
};

export default LightSwitch;
