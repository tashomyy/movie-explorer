import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme } from "../lib/enums";
import { toast } from "react-toastify";

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode
      ? JSON.parse(savedMode)
      : window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const classList = document.documentElement.classList;
    if (isDarkMode) {
      classList.add("dark");
    } else {
      classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const theme = isDarkMode ? Theme.Dark : Theme.Light;

  return (
    <ThemeContext.Provider value={{ theme, toggle: toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    toast.error("useTheme must be used within a ThemeProvider");
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
