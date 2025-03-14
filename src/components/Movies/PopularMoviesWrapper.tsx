import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Movie } from "../../lib/types";
import { fetchPopularMovies } from "../../services/movies";
import { PAGE_NUMBER } from "../../lib/constants";

const MoviesList = lazy(() => import("./PopularMoviesList"));

const PopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [loading, setLoading] = useState(false);

  // strict mode was fetching the first page twice, this is the workaround for dev env - it won't make any difference for prod, it was just bugging me seeing double movies
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // skip the first render in strict mode
    }

    setLoading(true);
    fetchPopularMovies(page).then((data) => {
      setMovies((prev) => [...prev, ...data.results]);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        if (!loading) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="app">
      <h1 className="primary-heading text-center">Popular Movies</h1>

      <Suspense
        fallback={<div className="text-center my-5">Loading movies...</div>}
      >
        <MoviesList moviesData={movies} />
      </Suspense>
      {loading && (
        <div className="text-center my-5">Loading more movies...</div>
      )}
    </div>
  );
};

export default PopularMovies;
