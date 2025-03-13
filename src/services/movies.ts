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

export const fetchSearchMovies = async (
  name: string,
  page: number,
  selectedGenre: string | null,
  selectedYear: string | null
) => {
  try {
    const params = new URLSearchParams();

    if (name) params.append("query", name);
    params.append("page", page.toString());
    if (selectedGenre) params.append("with_genres", selectedGenre);
    if (selectedYear) params.append("primary_release_year", selectedYear);

    const response = await apiClient.get(`/search/movie?${params.toString()}`);
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
