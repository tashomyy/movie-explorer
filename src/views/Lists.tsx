import { lazy, Suspense } from "react";
import Loader from "../components/UI/Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/UI/ErrorFallback";

const ListsDisplay = lazy(() => import("../components/Movies/ListsDisplay"));

const ListsPage = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader />}>
        <ListsDisplay />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ListsPage;
