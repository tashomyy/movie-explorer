import { useEffect, useState } from "react";
import { Genre, Movie } from "../../lib/types";
import { PAGE_NUMBER, SEARCH_TYPES, YEARS } from "../../lib/constants";
import { fetchSearchMovies } from "../../services/movies";
import MoviesList from "./GridMoviesList";
import useDebounce from "../../hooks/useDebounce";
import { fetchGenres } from "../../services/info";
import { SearchType } from "../../lib/enums";
import FormField from "../UI/FormField";

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
    setSelectedGenre("");
    setSelectedYear("");
    resetData();
  };

  return (
    <section
      className={`app flex flex-col bg-card rounded-lg p-4 ${
        query || selectedGenre || selectedYear
          ? "min-h-[500px] h-[70vh]"
          : "h-max"
      }`}
    >
      <h1 className="secondary-heading text-center">👀 Movie finder 👀</h1>

      <div className="flex justify-center my-4">
        <FormField
          label="Search Type"
          name="search-type"
          type="select"
          value={searchType}
          options={SEARCH_TYPES}
          onChange={(value) => setSearchType(value as SearchType)}
        />
      </div>

      {/* input fields for every filtering choice */}
      <div className="flex justify-center gap-4 mb-4">
        {searchType === SearchType.Name && (
          <FormField
            label="Search for a movie"
            name="search-name"
            type="text"
            value={query}
            placeholder="Type a movie name..."
            onChange={(value) => setQuery(value as string)}
            onReset={() => resetFilters()}
          />
        )}
        {searchType === SearchType.Genre && (
          <FormField
            label="Select Genre"
            name="search-genre"
            type="select"
            placeholder="Select a genre"
            value={selectedGenre as string}
            options={genres.map((g) => ({
              value: g.id.toString(),
              label: g.name,
            }))}
            onChange={(value) => setSelectedGenre((value as string) || null)}
            onReset={() => resetFilters()}
          />
        )}
        {searchType === SearchType.Year && (
          <FormField
            label="Select Year"
            name="search-genre"
            type="select"
            placeholder="Select a year"
            options={YEARS}
            value={selectedYear as string}
            onChange={(value) => setSelectedYear((value as string) || null)}
            onReset={() => resetFilters()}
          />
        )}
      </div>

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
    </section>
  );
};

export default SearchMoviesList;
