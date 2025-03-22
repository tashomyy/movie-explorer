import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

export const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

apiClient.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    if (apiKey) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.params = { ...config.params, api_key: apiKey };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    const status = error.response?.status;
    const message = error.message;
    const url = config?.url || "unknown endpoint";

    console.error(`[API Error] ${status} @ ${url} → ${message}`);
    toast.error(message);

    if (!config._retry && status >= 500) {
      config._retry = true;

      return apiClient(config);
    }

    return Promise.reject(error);
  }
);
