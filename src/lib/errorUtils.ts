import { toast } from "react-toastify";

export const handleError = (error: any, customMessage: string) => {
  const errorMessage =
    error?.response?.data?.message ||
    customMessage ||
    "An unexpected error occurred.";

  toast.error(errorMessage);

  throw new Error(errorMessage);
};
