import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
const SingleMovie = lazy(() => import("../components/Movies/SingleMovie"));

const MoviePage = () => {
  return (
    <ErrorBoundary
      fallback={
        <p className="text-red-500">Something went wrong! Please try again.</p>
      }
    >
      <Suspense
        fallback={<p className="text-center my-5">Loading movie details...</p>}
      >
        <SingleMovie />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MoviePage;
