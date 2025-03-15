import LightSwitch from "./LightSwitch";

import { useTheme } from "../../store/ThemeContext";
import { useAuth } from "../../store/AuthContext";
import LogoutButton from "../Auth/LogoutButton";
import LoginButton from "../Auth/LoginButtons";

interface HeaderSettingProps {
  className: string;
}

const HeaderSettings = ({ className }: HeaderSettingProps) => {
  const { toggle, theme } = useTheme();

  const { user } = useAuth();
  return (
    <div className={`gap-8 items-center ${className}`}>
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
  );
};

export default HeaderSettings;
