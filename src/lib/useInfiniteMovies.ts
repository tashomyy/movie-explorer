import { useEffect, useState, useRef } from "react";
import { Movie, PossibleMovieLists } from "../lib/types";
import { fetchMoviesByType } from "../services/movies";

export const useInfiniteMovies = (type: PossibleMovieLists) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  // strict mode was fetching the first page twice, this is the workaround for dev env - it won't make any difference for prod, it was just bugging me seeing double movies
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // skip the first render in strict mode
    }

    setLoading(true);
    fetchMoviesByType(type, page).then((data) => {
      setMovies((prev) => [...prev, ...data.results]);
      setLoading(false);
    });
  }, [page, type]);

  return { movies, setPage, loading };
};
