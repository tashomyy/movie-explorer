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

    let endpoint = "/search/movie";

    if (name) {
      params.append("query", name);
    } else if (selectedGenre || selectedYear) {
      endpoint = "/discover/movie";
      if (selectedGenre) params.append("with_genres", selectedGenre);
      if (selectedYear) params.append("primary_release_year", selectedYear);
    }

    const response = await apiClient.get(`${endpoint}?${params.toString()}`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      `There was an error while fetching movies`;
    toast.error(errorMessage);
    throw new Error(errorMessage);
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
    const errorMessage =
      error?.response?.data?.message ||
      `There was an error while fetching the ${type} movies`;
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const fetchSingleMovie = async (id: string) => {
  try {
    const response = await apiClient.get(
      `/movie/${id}?append_to_response=credits`
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      `There was an error while fetching the ${id} movie`;
    toast.error(errorMessage);
    throw new Error(errorMessage);
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
    const errorMessage =
      error?.response?.data?.message ||
      `There was an error while fetching the ${id} trailer`;
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const fetchMovieProviders = async (id: string) => {
  try {
    const { data } = await apiClient.get(`/movie/${id}/watch/providers`);
    return data.results;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      `Failed to fetch providers for movie ID: ${id}`;
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
