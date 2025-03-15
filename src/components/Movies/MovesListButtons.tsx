import { Movie } from "../../lib/types";
import { useMovieLists } from "../../store/MoviesListContext";
import { PlusIcon, MinusIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import ActionButton from "../UI/ActionButton";

interface AddToWatchlistButtonProps {
  movie: Movie;
}

export const AddToWatchlistButton = ({ movie }: AddToWatchlistButtonProps) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useMovieLists();

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  return (
    <ActionButton
      isActive={isInWatchlist}
      onClick={() =>
        isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
      }
      activeIcon={<MinusIcon className="active-icon" />}
      inactiveIcon={<PlusIcon className="inactive-icon" />}
      activeBg="bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
      inactiveBg="inactive-bg"
      ariaLabel="Add to watchlist"
    />
  );
};

interface AddToFavoriteButtonProps {
  movie: Movie;
}

export const AddToFavoritesButton = ({ movie }: AddToFavoriteButtonProps) => {
  const { favorites, addToFavorites, removeFromFavorites } = useMovieLists();

  const isInFavorites = favorites.some((m) => m.id === movie.id);

  return (
    <ActionButton
      isActive={isInFavorites}
      onClick={() =>
        isInFavorites ? removeFromFavorites(movie.id) : addToFavorites(movie)
      }
      activeIcon={<OutlineHeartIcon className="active-icon" />}
      inactiveIcon={<HeartIcon className="inactive-icon" />}
      activeBg="bg-red-600 hover:bg-red-700 active:bg-red-800"
      inactiveBg="inactive-bg"
      ariaLabel="Add to favorites"
    />
  );
};
