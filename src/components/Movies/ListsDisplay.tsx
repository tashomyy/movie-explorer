import { Link } from "react-router-dom";
import { useMovieLists } from "../../store/MoviesListContext";
import { useMemo, useState } from "react";
import HorizontalMoviesList from "./HorizontalMoviesList";
import { MOVIE_LISTS_RENDER_NUM } from "../../lib/constants";

const ListsDisplay = () => {
  const { watchlist, favorites } = useMovieLists();

  const [visibleWatchCount, setVisibleWatchCount] = useState(
    MOVIE_LISTS_RENDER_NUM
  );
  const [visibleFavCount, setVisibleFavCount] = useState(
    MOVIE_LISTS_RENDER_NUM
  );

  const visibleWatchlist = useMemo(
    () => watchlist.slice(0, visibleWatchCount),
    [watchlist, visibleWatchCount]
  );

  const visibleFavorites = useMemo(
    () => favorites.slice(0, visibleFavCount),
    [favorites, visibleFavCount]
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-28">
      <h1 className="primary-heading text-center">Your Lists</h1>

      <section>
        <h2 className="secondary-heading">Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-500">No movies in your watchlist.</p>
        ) : (
          <HorizontalMoviesList
            moviesData={visibleWatchlist}
            loadMore={() =>
              setVisibleWatchCount((prev) => prev + MOVIE_LISTS_RENDER_NUM)
            }
          />
        )}
      </section>

      <section className="mt-6">
        <h2 className="secondary-heading">Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">No movies in your favorites.</p>
        ) : (
          <HorizontalMoviesList
            moviesData={visibleFavorites}
            loadMore={() =>
              setVisibleFavCount((prev) => prev + MOVIE_LISTS_RENDER_NUM)
            }
          />
        )}
      </section>

      <Link to="/" className="block text-center text-accent hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default ListsDisplay;
