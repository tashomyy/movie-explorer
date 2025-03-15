import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { MovieListsProvider } from "./MoviesListContext";

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MovieListsProvider>{children}</MovieListsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
