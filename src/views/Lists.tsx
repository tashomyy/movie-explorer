import { Link } from "react-router-dom";
import { useMovieLists } from "../store/MoviesListContext";

const ListsPage = () => {
  const { watchlist, favorites, removeFromWatchlist, removeFromFavorites } =
    useMovieLists();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Your Lists</h1>

      <section>
        <h2 className="text-xl font-semibold">Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-500">No movies in your watchlist.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {watchlist.map((movie) => (
              <div key={movie.id} className="p-2 border rounded-md">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">No movies in your favorites.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favorites.map((movie) => (
              <div key={movie.id} className="p-2 border rounded-md">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
                <button
                  onClick={() => removeFromFavorites(movie.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Link
        to="/"
        className="block text-center mt-4 text-blue-500 hover:underline"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ListsPage;
