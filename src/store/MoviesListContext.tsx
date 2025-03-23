import React, { createContext, useContext, useState, useEffect } from "react";
import { Movie } from "../lib/types";
import { useUpdateMovieProviders } from "../hooks/useUpdateMovieProviders";
import { useListManager } from "../hooks/useListManager";

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
    return JSON.parse(localStorage.getItem("watchlist") || "[]");
  });

  const [favorites, setFavorites] = useState<Movie[]>(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  const updateMoviesList = useUpdateMovieProviders();

  const { addToList: addToWatchlist, removeFromList: removeFromWatchlist } =
    useListManager({
      list: watchlist,
      setList: setWatchlist,
      updateMoviesList,
    });

  const { addToList: addToFavorites, removeFromList: removeFromFavorites } =
    useListManager({
      list: favorites,
      setList: setFavorites,
      updateMoviesList,
    });

  useEffect(() => {
    const runUpdate = async () => {
      const updatedWatchlist = await updateMoviesList(watchlist);
      const updatedFavorites = await updateMoviesList(favorites);

      setWatchlist(updatedWatchlist);
      setFavorites(updatedFavorites);
    };

    runUpdate();
  }, [updateMoviesList]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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
