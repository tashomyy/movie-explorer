import { useEffect, useState } from "react";
import "./App.css";
import LightSwitch from "./components/UI/LightSwitch";
import { Theme } from "./lib/enums";

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
    <div className="flex flex-col items-center justify-center min-h-screen p:4 lg:p-12 tw-px">
      <h1 className="main-heading text-center">
        This is the best Movie explorer app
      </h1>
      <p className="my-8 primary-body">Setting up the theme changer</p>
      <LightSwitch
        toggle={toggleDarkMode}
        theme={isDarkMode ? Theme.Dark : Theme.Light}
      />
      <img
        className="w-144"
        src="/movie-player.svg"
        alt="Movie explorer logo"
      />
      <p className="mt-8 secondary-body">tashomy</p>
    </div>
  );
}

export default App;
