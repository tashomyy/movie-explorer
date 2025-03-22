import { Suspense, lazy } from "react";
import { PossibleMovieLists } from "../../lib/types";
import useInfiniteMovies from "../../hooks/useInfiniteMovies";
import { MovieSectionType } from "../../lib/enums";
import Loader from "../UI/Loader";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const GridMoviesList = lazy(() => import("./GridMoviesList"));
const HorizontalMoviesList = lazy(() => import("./HorizontalMoviesList"));

interface PopularMoviesProps {
  type: PossibleMovieLists;
}

const MoviesListWrapper = ({
  type = MovieSectionType.Popular,
}: PopularMoviesProps) => {
  const { movies, loading, loadMore } = useInfiniteMovies(type);

  const loaderRef = useInfiniteScroll({
    callback: loadMore,
    root: null,
    direction: "vertical",
  });

  return (
    <section id={`${type}-section`}>
      <h1 className="primary-heading text-center mb-8">
        {type.toUpperCase()} MOVIES
      </h1>

      <Suspense fallback={<Loader />}>
        {type === MovieSectionType.Popular ? (
          <GridMoviesList moviesData={movies} />
        ) : (
          <HorizontalMoviesList moviesData={movies} loadMore={loadMore} />
        )}
      </Suspense>
      {loading && <Loader />}
      {type === MovieSectionType.Popular && (
        <div ref={loaderRef} className="min-h-[1px] h-4"></div>
      )}
    </section>
  );
};

export default MoviesListWrapper;
