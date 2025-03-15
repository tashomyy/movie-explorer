import { useState, useEffect } from "react";
import { Movie, PossibleMovieLists } from "../lib/types";
import { PAGE_NUMBER } from "../lib/constants";
import { fetchMoviesByType } from "../services/movies";
import { useErrorBoundary } from "react-error-boundary";

interface MovieState {
  [key: string]: { movies: Movie[]; page: number; lastFetchedPage: number };
}

const useInfiniteMovies = (type: PossibleMovieLists) => {
  const [movieData, setMovieData] = useState<MovieState>({});
  const [loading, setLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (!movieData[type]) {
      setMovieData((prev) => ({
        ...prev,
        [type]: { movies: [], page: PAGE_NUMBER, lastFetchedPage: 0 },
      }));
    }
  }, [type]);

  useEffect(() => {
    if (!movieData[type]) return;

    const { page, lastFetchedPage } = movieData[type];

    // prevent re-fetching if the page has already been fetched
    if (page === lastFetchedPage) return;

    setLoading(true);
    fetchMoviesByType(type, page)
      .then((data) => {
        setMovieData((prev) => ({
          ...prev,
          [type]: {
            movies: [...(prev[type]?.movies || []), ...data.results],
            page,
            lastFetchedPage: page, // update last fetched page to prevent infinite fetch
          },
        }));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showBoundary(
          new Error(`Failed to fetch movies for type ${type}: ${error.message}`)
        );
      });
  }, [type, movieData[type]?.page]);

  const loadMore = () => {
    if (!loading) {
      setMovieData((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          page: (prev[type]?.page || PAGE_NUMBER) + 1,
        },
      }));
    }
  };

  return { movies: movieData[type]?.movies || [], loading, loadMore };
};

export default useInfiniteMovies;
