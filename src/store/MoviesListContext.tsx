import React, { createContext, useContext, useState, useEffect } from "react";
import { Movie } from "../lib/types";
import { fetchMovieProviders } from "../services/movies";

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

  const updateMovieWithProviders = async (movie: Movie) => {
    const storedProviders = JSON.parse(
      localStorage.getItem("movieProviders") || "{}"
    );

    if (storedProviders[movie.id]) {
      return { ...movie, providers: storedProviders[movie.id] };
    }

    try {
      const providersData = await fetchMovieProviders(movie.id);

      const updatedProviders = {
        ...storedProviders,
        [movie.id]: providersData,
      };

      localStorage.setItem("movieProviders", JSON.stringify(updatedProviders));
      return { ...movie, providers: providersData };
    } catch (error) {
      console.error(`Failed to fetch providers for ${movie.id}`, error);
      return movie;
    }
  };

  useEffect(() => {
    const updateLists = async () => {
      const updatedWatchlist = await Promise.all(
        watchlist.map(updateMovieWithProviders)
      );
      const updatedFavorites = await Promise.all(
        favorites.map(updateMovieWithProviders)
      );

      setWatchlist(updatedWatchlist);
      setFavorites(updatedFavorites);
    };

    updateLists();
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToWatchlist = async (movie: Movie) => {
    if (!watchlist.some((m) => m.id === movie.id)) {
      const movieWithProviders = await updateMovieWithProviders(movie);
      setWatchlist([...watchlist, movieWithProviders]);
    }
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== id));
  };

  const addToFavorites = async (movie: Movie) => {
    if (!favorites.some((m) => m.id === movie.id)) {
      const movieWithProviders = await updateMovieWithProviders(movie);
      setFavorites([...favorites, movieWithProviders]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
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
