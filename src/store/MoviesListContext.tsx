import React, { createContext, useContext, useState, useEffect } from "react";
import { Movie } from "../lib/types";

interface MovieListsContextProps {
  watchlist: Movie[];
  favorites: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: string) => void;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: string) => void;
}

const MovieListsContext = createContext<MovieListsContextProps | undefined>(
  undefined
);

export const MovieListsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });

  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToWatchlist = (movie: Movie) => {
    if (!watchlist.some((m) => m.id === movie.id)) {
      const updatedWatchlist = [...watchlist, movie];
      setWatchlist(updatedWatchlist);
    }
  };

  const removeFromWatchlist = (id: string) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
  };

  const addToFavorites = (movie: Movie) => {
    if (!favorites.some((m) => m.id === movie.id)) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
    }
  };

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <MovieListsContext.Provider
      value={{
        watchlist,
        favorites,
        addToWatchlist,
        removeFromWatchlist,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </MovieListsContext.Provider>
  );
};

export const useMovieLists = () => {
  const context = useContext(MovieListsContext);
  if (!context) {
    throw new Error("useMovieLists must be used within a MovieListsProvider");
  }
  return context;
};
