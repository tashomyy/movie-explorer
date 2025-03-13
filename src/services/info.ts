import { toast } from "react-toastify";
import { apiClient } from "./apiClient";

export const fetchGenres = async () => {
  try {
    const response = await apiClient.get(`/genre/movie/list`);
    return response.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "There was an error while fetching the genres"
    );
    throw new Error(error?.response?.data?.message || "Failed to fetch genres");
  }
};
