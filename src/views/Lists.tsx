import { Link } from "react-router-dom";
import { useMovieLists } from "../store/MoviesListContext";
import GridMoviesList from "../components/Movies/GridMoviesList";

const ListsPage = () => {
  const { watchlist, favorites, removeFromWatchlist, removeFromFavorites } =
    useMovieLists();

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-28">
      <h1 className="primary-heading text-center">Your Lists</h1>

      <section>
        <h2 className="secondary-heading">Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-500">No movies in your watchlist.</p>
        ) : (
          <GridMoviesList moviesData={watchlist} />
        )}
      </section>

      <section className="mt-6">
        <h2 className="secondary-heading">Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">No movies in your favorites.</p>
        ) : (
          <GridMoviesList moviesData={favorites} />
        )}
      </section>

      <Link to="/" className="block text-center text-accent hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default ListsPage;
