import { useEffect, useState } from "react";
import { Genre, Movie } from "../../lib/types";
import { PAGE_NUMBER } from "../../lib/constants";
import { fetchSearchMovies } from "../../services/movies";
import MoviesList from "./MoviesList";
import useDebounce from "../../hooks/useDebounce";
import { fetchGenres } from "../../services/info";

const SearchMoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  const [searchType, setSearchType] = useState<"name" | "genre" | "year">(
    "name"
  );
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    fetchGenres().then((data) => setGenres(data.genres));
  }, []);

  const resetData = () => {
    setMovies([]);
    setPage(1);
    setEmpty(false);
  };

  useEffect(() => {
    resetData();
  }, [debouncedQuery, selectedGenre, selectedYear]);

  useEffect(() => {
    let fetchQuery = "";
    let fetchGenre = null;
    let fetchYear = null;

    if (searchType === "name") fetchQuery = debouncedQuery;
    if (searchType === "genre") fetchGenre = selectedGenre;
    if (searchType === "year") fetchYear = selectedYear;

    if (!fetchQuery && !fetchGenre && !fetchYear) {
      resetData();
      return;
    }

    setLoading(true);
    fetchSearchMovies(fetchQuery, page, fetchGenre, fetchYear).then((data) => {
      setMovies((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
      setLoading(false);
      setEmpty(data.results.length === 0);
    });
  }, [debouncedQuery, page, selectedGenre, selectedYear]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 50;
    if (bottom && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const resetFilters = () => {
    setQuery("");
    setSelectedGenre(null);
    setSelectedYear(null);
    resetData();
  };

  return (
    <div
      className={`app flex flex-col bg-card rounded-lg p-4 ${
        query || selectedGenre || selectedYear
          ? "min-h-[500px] h-[70vh]"
          : "h-max"
      }`}
    >
      <h1 className="secondary-heading text-center">👀 Movie finder 👀</h1>
      {/* Search Type Selector */}
      <div className="flex justify-center my-4">
        <select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value as "name" | "genre" | "year");
            resetFilters();
          }}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="name">Search by Name</option>
          <option value="genre">Filter by Genre</option>
          <option value="year">Filter by Year</option>
        </select>
      </div>

      {/* input fields for every filtering choice */}
      <div className="flex justify-center gap-4 mb-4">
        {searchType === "name" && (
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        )}
        {searchType === "genre" && (
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            value={selectedGenre || ""}
            onChange={(e) => setSelectedGenre(e.target.value || null)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        )}
        {searchType === "year" && (
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            value={selectedYear || ""}
            onChange={(e) => setSelectedYear(e.target.value || null)}
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
          query || selectedGenre || selectedYear
            ? "opacity-100 flex"
            : "opacity-0 hidden"
        }`}
        onScroll={handleScroll}
      >
        {query || selectedGenre || selectedYear ? (
          movies.length > 0 ? (
            <MoviesList moviesData={movies} />
          ) : query && empty ? (
            <h1 className="text-center my-auto primary-heading">
              Ooops.. Looks like we can't find what you are looking for
            </h1>
          ) : null
        ) : null}
        {loading && (
          <div className="text-center my-5">Loading more movies...</div>
        )}
      </div>
    </div>
  );
};

export default SearchMoviesList;
