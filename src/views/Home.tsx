import { lazy, Suspense } from "react";
import MoviesListWrapper from "../components/Movies/MoviesListWrapper";
import { MovieSectionType } from "../lib/enums";
import Loader from "../components/UI/Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/UI/ErrorFallback";

const SearchMoviesList = lazy(
  () => import("../components/Movies/SearchMovies")
);

const Home = () => {
  return (
    <div className="flex flex-col gap-12 lg:gap-28">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loader />}>
          <SearchMoviesList />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MoviesListWrapper type={MovieSectionType.Streaming} />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MoviesListWrapper type={MovieSectionType.Upcoming} />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MoviesListWrapper type={MovieSectionType.Trending} />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MoviesListWrapper type={MovieSectionType.Popular} />
      </ErrorBoundary>
    </div>
  );
};

export default Home;
