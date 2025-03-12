import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { fetchPopularMovies } from "../services/movies";
import MoviesComponent from "../components/Movies/PopularMoviesList";

const moviesPromise = fetchPopularMovies();

const Home = () => {
  const centerClassNameTemp =
    "flex items-center justify-center mx-auto text-center my-5";
  return (
    <div>
      <h1 className="primary-heading">This is the homepage</h1>
      <p className="secondary-body text-center my-4">
        I want to fetch all of the popular movies
      </p>
      <ErrorBoundary
        fallback={
          <div className={centerClassNameTemp}>
            Something went wrong with loading movies
          </div>
        }
      >
        <Suspense
          fallback={
            <div className={centerClassNameTemp}>Loading movies...</div>
          }
        >
          <MoviesComponent moviesPromise={moviesPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
