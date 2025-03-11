import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../../lib/enums";

type ThemeType = Theme.Dark | Theme.Light;

interface ThemeState {
  theme: ThemeType;
}

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) return storedTheme;

    // Auto-detect system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? Theme.Dark : Theme.Light;
  }
  return Theme.Light; // Default if localStorage is not available (e.g., during SSR)
};

const initialState: ThemeState = {
  theme: (localStorage.getItem("theme") as Theme) || Theme.Light,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === Theme.Light ? Theme.Dark : Theme.Light;
      document.documentElement.classList.toggle(
        Theme.Dark,
        state.theme === Theme.Dark
      );
      localStorage.setItem("theme", state.theme);
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      document.documentElement.classList.toggle(
        Theme.Dark,
        action.payload === Theme.Dark
      );
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
