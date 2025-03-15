import { Theme } from "../../lib/enums";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

interface LightSwitchProps {
  toggle: () => void;
  theme: Theme.Dark | Theme.Light;
}

const LightSwitch = ({ toggle, theme }: LightSwitchProps) => {
  const isLightMode = theme === Theme.Light;

  return (
    <button
      onClick={toggle}
      className={`relative flex items-center justify-center gap-2 p-3 transition-all duration-200 rounded-full shadow-md ${
        isLightMode
          ? "bg-primary hover:bg-gray-300 active:bg-gray-400"
          : "bg-primary hover:bg-gray-700 active:bg-gray-600"
      }`}
      aria-label={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
      aria-live="polite"
    >
      {isLightMode ? (
        <MoonIcon className="w-6 h-6 text-gray-700 transition-all duration-200" />
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-400 transition-all duration-200" />
      )}
    </button>
  );
};

export default LightSwitch;
