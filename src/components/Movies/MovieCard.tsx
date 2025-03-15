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
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg min-w-[350px]">
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
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-slate-800 text-xl font-semibold">
            {" "}
            {movie?.title || ""}
          </p>
          <p className="text-cyan-600 text-xl font-semibold">
            {movie.vote_average?.toFixed(1)} ⭐
          </p>
        </div>
        <p className="text-slate-600 leading-normal font-light">
          {movie?.overview.slice(0, 100) || ""}
        </p>
        <div className="w-full flex justify-between items-center gap-2 p-2 bg-gradient-to-t from-white via-white/80 to-transparent">
          <AddToWatchlistButton movie={movie} />
          <AddToFavoritesButton movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
