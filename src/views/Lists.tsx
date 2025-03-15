import { lazy, Suspense } from "react";
import Loader from "../components/UI/Loader";
import { ErrorBoundary } from "react-error-boundary";

const ListsDisplay = lazy(() => import("../components/Movies/ListsDisplay"));

const ListsPage = () => {
  return (
    <ErrorBoundary
      fallback={
        <p className="text-red-500">Something went wrong! Please try again.</p>
      }
    >
      <Suspense fallback={<Loader />}>
        <ListsDisplay />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ListsPage;
