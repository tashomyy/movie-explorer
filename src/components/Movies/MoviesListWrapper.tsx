import { Suspense, lazy, useEffect } from "react";
import { PossibleMovieLists } from "../../lib/types";
import useInfiniteMovies from "../../hooks/useInfiniteMovies";

const GridMoviesList = lazy(() => import("./GridMoviesList"));
const HorizontalMoviesList = lazy(() => import("./HorizontalMoviesList"));

interface PopularMoviesProps {
  type: PossibleMovieLists;
}

const PopularMovies = ({ type = "popular" }: PopularMoviesProps) => {
  const { movies, loading, loadMore } = useInfiniteMovies(type);

  useEffect(() => {
    if (type === "popular") {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100
        ) {
          loadMore();
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [type, loadMore]);

  return (
    <section>
      <h1 className="primary-heading text-center">
        {type.toUpperCase()} Movies
      </h1>

      <Suspense
        fallback={<div className="text-center my-5">Loading movies...</div>}
      >
        {type === "popular" ? (
          <GridMoviesList moviesData={movies} />
        ) : (
          <HorizontalMoviesList moviesData={movies} loadMore={loadMore} />
        )}
      </Suspense>
      {loading && (
        <div className="text-center my-5">Loading more movies...</div>
      )}
    </section>
  );
};

export default PopularMovies;
