export const handleError = (error: any, customMessage: string) => {
  const errorMessage =
    error?.response?.data?.message ||
    customMessage ||
    "An unexpected error occurred.";

  throw new Error(errorMessage);
};
