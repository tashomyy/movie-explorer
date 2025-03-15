import { Link } from "react-router-dom";
import { Movie } from "../../lib/types";
import { useState } from "react";
import { AddToFavoritesButton, AddToWatchlistButton } from "./MovesListButtons";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageUrl = movie.poster_path
    ? `${import.meta.env.VITE_IMAGE_URL}w500${movie.poster_path}`
    : null;

  return (
    <Link
      to={`/movie/${movie?.id}`}
      className="relative flex flex-col my-6 bg-white dark:bg-secondary shadow-sm border border-slate-200 rounded-lg min-w-[350px] h-full"
    >
      <div className="relative p-2.5 h-120 overflow-hidden rounded-xl bg-clip-border">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={movie?.title || ""}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onLoadStart={() => setIsLoaded(false)}
            className={`h-full w-full object-cover rounded-md transition-opacity ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <img
            src={"/no-image-placeholder.svg"}
            alt={"No image available"}
            className={`w-full h-full object-cover rounded-xl`}
          />
        )}
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-text-primary element-heading font-semibold">
            {" "}
            {movie?.title || ""}
          </p>
          <p className="!text-accent element-heading font-semibold">
            {movie.vote_average?.toFixed(1)} ⭐
          </p>
        </div>
        <p className="text-text-primary leading-normal font-light line-clamp-3 secondary-body">
          {movie?.overview || ""}
        </p>
        <div
          className="w-max ml-auto flex justify-between items-center gap-2 p-2 bg-transparent"
          onClick={(e) => e.preventDefault()}
        >
          <AddToWatchlistButton movie={movie} />
          <AddToFavoritesButton movie={movie} />
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
