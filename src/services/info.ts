import { apiClient } from "./apiClient";
import { handleError } from "../lib/errorUtils";

export const fetchGenres = async () => {
  try {
    const response = await apiClient.get(`/genre/movie/list`);
    return response.data;
  } catch (error: any) {
    handleError(error, `There was an error while fetching the genres`);
  }
};
