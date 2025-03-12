import { useState, useEffect } from "react";
import { apiClient, BASE_URL } from "../services/apiClient";
import { toast } from "react-toastify";

export const useMovies = () => {
  const [movies, setMovies] = useState<
    {
      id: number;
      title: string;
      poster_path: string;
      overview: string;
      vote_average: number;
    }[]
  >([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(
        `${BASE_URL}/movie/popular?page=${page}`
      );
      const data = response.data;

      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
    } catch (error) {
      toast.error("Error fetching movies!");
      console.error("Error fetching movies:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return {
    movies,
    fetchNextPage: () => setPage((prev) => prev + 1),
    hasMore,
    isLoading,
  };
};
