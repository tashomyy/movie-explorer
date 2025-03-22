import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="p-4 bg-red-100 text-red-800 rounded-md text-center"
    >
      <p className="font-semibold">Something went wrong.</p>
      <p className="text-sm mt-2">
        {error.message || "We are sorry for the inconvenience."}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
