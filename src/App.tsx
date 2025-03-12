import { useEffect, useState } from "react";
import "./App.css";
import LightSwitch from "./components/UI/LightSwitch";
import { Theme } from "./lib/enums";
import Home from "./views/Home";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode
      ? JSON.parse(savedMode)
      : window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  useEffect(() => {
    const classList = document.documentElement.classList;
    if (isDarkMode) {
      classList.add("dark");
    } else {
      classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p:4 lg:p-12 tw-px gap-4">
      <LightSwitch
        toggle={toggleDarkMode}
        theme={isDarkMode ? Theme.Dark : Theme.Light}
      />
      <Home />
    </div>
  );
}

export default App;
