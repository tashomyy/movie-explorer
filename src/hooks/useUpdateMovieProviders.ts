import { useCallback } from "react";
import { Movie } from "../lib/types";
import { fetchMovieProviders } from "../services/movies";

export const useUpdateMovieProviders = () => {
  const updateMovieWithProviders = useCallback(async (movie: Movie) => {
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
  }, []);

  const updateMoviesList = useCallback(
    async (movies: Movie[]) => {
      const moviesWithoutProviders = movies.filter((m) => !m.providers);
      const updated = await Promise.all(
        moviesWithoutProviders.map(updateMovieWithProviders)
      );

      const updatedIds = new Set(updated.map((m) => m.id));
      const merged = [
        ...movies.filter((m) => !updatedIds.has(m.id)),
        ...updated,
      ];

      return merged;
    },
    [updateMovieWithProviders]
  );

  return updateMoviesList;
};
