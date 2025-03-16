import axios, { AxiosInstance } from "axios";

export const BASE_URL: string = import.meta.env.VITE_API_URL;
export const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;

export const apiClient: AxiosInstance = axios.create({ baseURL: BASE_URL });

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
