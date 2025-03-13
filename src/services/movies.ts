import { toast } from "react-toastify";
import { apiClient } from "./apiClient";

export const fetchPopularMovies = async (page: number) => {
  try {
    const response = await apiClient.get(`/movie/popular?page=${page}`);
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

export const fetchSearchMovies = async (name: string, page: number) => {
  try {
    const response = await apiClient.get(
      `/search/movie?query=${name}&page=${page}`
    );
    return response.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "There was an error while fetching the search movies"
    );
    throw new Error(
      error?.response?.data?.message || "Failed to fetch search movies"
    );
  }
};
