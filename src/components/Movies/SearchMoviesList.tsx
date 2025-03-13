import { useEffect, useState } from "react";
import { Genre, Movie } from "../../lib/types";
import { PAGE_NUMBER } from "../../lib/constants";
import { fetchSearchMovies } from "../../services/movies";
import MoviesList from "./PopularMoviesList";
import useDebounce from "../../hooks/useDebounce";
import { fetchGenres } from "../../services/info";

const SearchMoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [page, setPage] = useState(PAGE_NUMBER);

  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    fetchGenres().then((data) => setGenres(data.genres));
  }, []);

  useEffect(() => {
    if (!debouncedQuery && !selectedGenre && !selectedYear) {
      setMovies([]);
      setEmpty(false);
      return;
    }

    setLoading(true);
    setEmpty(false);
    fetchSearchMovies(debouncedQuery, page, selectedGenre, selectedYear).then(
      (data) => {
        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setLoading(false);
        setEmpty(data.results.length === 0);
      }
    );
  }, [debouncedQuery, page, selectedGenre, selectedYear]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 50;
    if (bottom && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const queryNotEmpty = query?.length !== 0;

  const resetFilters = () => {
    setQuery("");
    setSelectedGenre(null);
    setSelectedYear(null);
    setPage(1);
  };

  return (
    <div
      className={`app flex flex-col bg-card rounded-lg px-4 py-12 ${
        queryNotEmpty ? "min-h-[500px] h-[70vh]" : "h-max"
      }`}
    >
      <h1 className="primary-heading text-center">👀 Movie finder 👀</h1>
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
            className="ml-2 px-3 py-1 text-white bg-red-400 rounded-md hover:bg-red-500 transition-colors cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={selectedGenre || ""}
          onChange={(e) => {
            setSelectedGenre(e.target.value || null);
            setPage(1);
          }}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        {selectedGenre && (
          <button
            onClick={() => setSelectedGenre(null)}
            className="text-red-400 cursor-pointer"
          >
            Reset
          </button>
        )}

        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={selectedYear || ""}
          onChange={(e) => {
            setSelectedYear(e.target.value || null);
            setPage(1);
          }}
        >
          <option value="">All Years</option>
          {Array.from({ length: 50 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        {selectedYear && (
          <button
            onClick={() => setSelectedYear(null)}
            className="text-red-400 cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      {(query || selectedGenre || selectedYear) && (
        <div className="flex justify-center mb-4">
          <button
            onClick={resetFilters}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Reset All
          </button>
        </div>
      )}

      <div
        className={`flex-1 overflow-y-auto px-4 transition-[opacity] duration-300 flex-col ${
          queryNotEmpty ? "opacity-100 flex" : "opacity-0 hidden"
        }`}
        onScroll={handleScroll}
      >
        {!empty ? (
          <MoviesList moviesData={movies} />
        ) : (
          <h1 className="text-center my-auto primary-heading">
            Ooops.. Looks like we can't find what you are looking for
          </h1>
        )}
        {loading && (
          <div className="text-center my-5">Loading more movies...</div>
        )}
      </div>
    </div>
  );
};

export default SearchMoviesList;
