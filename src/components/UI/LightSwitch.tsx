import { Theme } from "../../lib/enums";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

interface LightSwitchProps {
  toggle: () => void;
  theme: Theme.Dark | Theme.Light;
}

const LightSwitch = ({ toggle, theme }: LightSwitchProps) => {
  const iconClassName = "pointer-events-none h-4 w-4 stroke-current";

  const isLightMode = theme === Theme.Light;
  const content = {
    icon: isLightMode ? (
      <MoonIcon className={iconClassName} />
    ) : (
      <SunIcon className={iconClassName} />
    ),
    text: isLightMode ? "Dark mode" : "Light mode",
  };

  return (
    <button
      className="cursor-pointer flex items-center justify-center gap-2 bg-primary px-4 py-1 rounded-lg hover:bg-hover-color transition-color duration-300"
      onClick={toggle}
      aria-label={content.text}
    >
      {content.icon} <span className="pointer-events-none">{content.text}</span>
    </button>
  );
};

export default LightSwitch;
