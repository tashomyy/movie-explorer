import { Suspense, lazy, useEffect, useState } from "react";
import { apiClient, BASE_URL } from "../../services/apiClient";
import { toast } from "react-toastify";
import { Movie } from "../../lib/types";

const MoviesList = lazy(() => import("./PopularMoviesList"));

const PAGE_NUMBER = 1;

const PopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(
          `${BASE_URL}/movie/popular?page=${page}`
        );
        setMovies((prev) => [...prev, ...response.data.results]);
      } catch (error) {
        toast.error("Error fetching popular movies");
        console.error("Error fetching popular movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        if (!loading) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="app">
      <h1 className="primary-heading text-center">Popular Movies</h1>

      <Suspense
        fallback={<div className="text-center my-5">Loading movies...</div>}
      >
        <MoviesList moviesData={movies} />
      </Suspense>
      {loading && (
        <div className="text-center my-5">Loading more movies...</div>
      )}
    </div>
  );
};

export default PopularMovies;
