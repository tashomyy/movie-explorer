import { toast } from "react-toastify";
import { apiClient } from "./apiClient";
import { PossibleMovieLists } from "../lib/types";

export const fetchSearchMovies = async (
  name: string,
  page: number,
  selectedGenre?: string | null,
  selectedYear?: string | null
) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    let endpoint = "/search/movie"; // Default endpoint for name search

    if (name) {
      params.append("query", name);
    } else if (selectedGenre || selectedYear) {
      endpoint = "/discover/movie"; // Use discover for filtering
      if (selectedGenre) params.append("with_genres", selectedGenre);
      if (selectedYear) params.append("primary_release_year", selectedYear);
    }

    const response = await apiClient.get(`${endpoint}?${params.toString()}`);
    return response.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "There was an error while fetching movies"
    );
    throw new Error(error?.response?.data?.message || "Failed to fetch movies");
  }
};

export const fetchMoviesByType = async (
  type: PossibleMovieLists,
  page: number
) => {
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);
  const maxDate = nextMonth.toISOString().split("T")[0];
  const url =
    type === "popular"
      ? `/movie/popular?page=${page}`
      : type === "trending"
      ? `/trending/movie/day?page=${page}`
      : type === "upcoming"
      ? `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}&release_date.lte=${maxDate}`
      : `/movie/now_playing?page=${page}`;
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        `There was an error while fetching the ${type} movies`
    );
    throw new Error(
      error?.response?.data?.message || `Failed to fetch ${type} movies`
    );
  }
};

export const fetchSingleMovie = async (id: string) => {
  try {
    const response = await apiClient.get(`/movie/${id}`);
    return response.data;
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        `There was an error while fetching the ${id} movie`
    );
    throw new Error(
      error?.response?.data?.message || `Failed to fetch ${id} movie`
    );
  }
};

export const fetchTrailer = async (id: string) => {
  try {
    const res = await apiClient.get(
      `/movie/${id}/videos?api_key=YOUR_TMDB_API_KEY`
    );
    const officialTrailer = res.data.results.find((vid: any) =>
      vid.name.toLowerCase().includes("trailer")
    );
    if (officialTrailer) return officialTrailer.key;
    else return "";
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        `There was an error while fetching the ${id} trailer`
    );
    throw new Error(
      error?.response?.data?.message || `Failed to fetch ${id} trailer`
    );
  }
};
