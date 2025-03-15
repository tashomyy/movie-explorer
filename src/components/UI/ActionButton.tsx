import React from "react";

interface ActionButtonProps {
  isActive: boolean;
  onClick: () => void;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  activeBg: string;
  inactiveBg: string;
  ariaLabel: string;
}

const ActionButton = ({
  isActive,
  onClick,
  activeIcon,
  inactiveIcon,
  activeBg,
  inactiveBg,
  ariaLabel,
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md transition-all duration-300 
        ${
          isActive
            ? `${activeBg} text-primary-text`
            : `${inactiveBg} text-primary-text`
        } 
        hover:brightness-110 dark:hover:brightness-90`}
      aria-label={ariaLabel}
    >
      {isActive ? activeIcon : inactiveIcon}
    </button>
  );
};

export default ActionButton;
