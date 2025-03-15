import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../components/UI/Loader";
const SingleMovie = lazy(() => import("../components/Movies/SingleMovie"));

const MoviePage = () => {
  return (
    <ErrorBoundary
      fallback={
        <p className="text-red-500">Something went wrong! Please try again.</p>
      }
    >
      <Suspense fallback={<Loader />}>
        <SingleMovie />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MoviePage;
