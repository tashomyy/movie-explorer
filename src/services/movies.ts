import { toast } from "react-toastify";
import { apiClient } from "./apiClient";

export const fetchPopularMovies = async (page: number) => {
  try {
    const response = await apiClient.get(`/movie/popular?page=${page}`);
    console.log(response.data.results);
    return response.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "There was an error while fetching the popular movies"
    );
    throw new Error(
      error?.response?.data?.message || "Failed to fetch popular movies"
    );
  }
};
