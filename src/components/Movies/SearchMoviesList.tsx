import { useEffect, useState } from "react";
import { Movie } from "../../lib/types";
import { PAGE_NUMBER } from "../../lib/constants";
import { fetchSearchMovies } from "../../services/movies";
import MoviesList from "./PopularMoviesList";
import useDebounce from "../../hooks/useDebounce";

const SearchMoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      return;
    }

    setLoading(true);
    fetchSearchMovies(debouncedQuery, page).then((data) => {
      setMovies((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
      setLoading(false);
    });
  }, [debouncedQuery, page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 50;
    if (bottom && !loading) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <div
      className={`app flex flex-col bg-card rounded-lg p-4 ${
        query?.length !== 0 ? "min-h-[500px] h-[70vh]" : "h-max"
      }`}
    >
      <h1 className="secondary-heading text-center">👀 Movie finder 👀</h1>
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="ml-2 text-red-400 cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4" onScroll={handleScroll}>
        <MoviesList moviesData={movies} />
        {loading && (
          <div className="text-center my-5">Loading more movies...</div>
        )}
      </div>
    </div>
  );
};

export default SearchMoviesList;
