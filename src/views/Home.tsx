import { lazy, Suspense } from "react";
import MoviesListWrapper from "../components/Movies/MoviesListWrapper";
import { MovieSectionType } from "../lib/enums";
import Loader from "../components/UI/Loader";
import { ErrorBoundary } from "react-error-boundary";

const SearchMoviesList = lazy(
  () => import("../components/Movies/SearchMovies")
);

const Home = () => {
  return (
    <div className="flex flex-col gap-12 lg:gap-28">
      <ErrorBoundary
        fallback={
          <p className="text-red-500">
            Something went wrong while loading search results! Please try again.
          </p>
        }
      >
        <Suspense fallback={<Loader />}>
          <SearchMoviesList />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <p className="text-red-500">
            Something went wrong while loading streaming movies! Please try
            again.
          </p>
        }
      >
        <MoviesListWrapper type={MovieSectionType.Streaming} />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <p className="text-red-500">
            Something went wrong while loading upcoming movies! Please try
            again.
          </p>
        }
      >
        <MoviesListWrapper type={MovieSectionType.Upcoming} />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <p className="text-red-500">
            Something went wrong while loading trending movies! Please try
            again.
          </p>
        }
      >
        <MoviesListWrapper type={MovieSectionType.Trending} />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <p className="text-red-500">
            Something went wrong while loading popular movies! Please try again.
          </p>
        }
      >
        <MoviesListWrapper type={MovieSectionType.Popular} />
      </ErrorBoundary>
    </div>
  );
};

export default Home;
