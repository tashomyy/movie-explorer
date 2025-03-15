import { Movie } from "../../lib/types";
import { useMovieLists } from "../../store/MoviesListContext";
import { PlusIcon, MinusIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

interface AddToWatchlistButtonProps {
  movie: Movie;
}

export const AddToWatchlistButton = ({ movie }: AddToWatchlistButtonProps) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useMovieLists();

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  return (
    <button
      onClick={() =>
        isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
      }
      className={`relative flex items-center justify-center p-3 transition-all duration-200 rounded-full shadow-md ${
        isInWatchlist
          ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          : "bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
      }`}
      aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
    >
      {isInWatchlist ? (
        <MinusIcon className="w-6 h-6 text-white transition-all duration-200" />
      ) : (
        <PlusIcon className="w-6 h-6 text-blue-600 transition-all duration-200" />
      )}
    </button>
  );
};

interface AddToFavoriteButtonProps {
  movie: Movie;
}

export const AddToFavoritesButton = ({ movie }: AddToFavoriteButtonProps) => {
  const { favorites, addToFavorites, removeFromFavorites } = useMovieLists();

  const isInFavorites = favorites.some((m) => m.id === movie.id);

  return (
    <button
      onClick={() =>
        isInFavorites ? removeFromFavorites(movie.id) : addToFavorites(movie)
      }
      className={`relative flex items-center justify-center p-3 transition-all duration-200 rounded-full shadow-md ${
        isInFavorites
          ? "bg-red-600 hover:bg-red-700 active:bg-red-800"
          : "bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
      }`}
      aria-label={isInFavorites ? "Remove from favorites" : "Add to favorites"}
    >
      {isInFavorites ? (
        <HeartIcon className="w-6 h-6 text-white transition-all duration-200" />
      ) : (
        <OutlineHeartIcon className="w-6 h-6 text-red-600 transition-all duration-200" />
      )}
    </button>
  );
};
