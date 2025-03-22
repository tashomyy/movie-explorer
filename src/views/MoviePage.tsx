import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../components/UI/Loader";
import ErrorFallback from "../components/UI/ErrorFallback";
const SingleMovie = lazy(() => import("../components/Movies/SingleMovie"));

const MoviePage = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <SingleMovie />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MoviePage;
