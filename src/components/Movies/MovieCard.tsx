import { Link } from "react-router-dom";
import { Movie } from "../../lib/types";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageUrl = movie.poster_path
    ? `${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`
    : null;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative flex flex-col gap-3 justify-end items-center text-center bg-card rounded-xl p-4 shadow-lg h-[400px] md:h-[500px] lg:h-[600px] isolate group overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full z-[-1] p-4 rounded-xl bg-cover bg-no-repeat transition-opacity duration-500">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={movie.title}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onLoadStart={() => setIsLoaded(false)}
            className={`w-full h-full object-cover rounded-xl transition-opacity ${
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

      <div className="relative w-full h-max flex flex-col gap-2 justify-start items-center text-center bg-card/60 hover:bg-card/80 transition-colors duration-200 cursor-pointer rounded-xl px-2 py-4 backdrop-blur-[3px] transition-transform hover:scale-105">
        <h2 className="secondary-heading font-semibold pointer-events-none">
          {movie.title}
        </h2>
        <p className="primary-body pointer-events-none line-clamp-3">
          {movie.overview}
        </p>
        <span className="secondary-body font-bold pointer-events-none">
          {movie.vote_average.toFixed(1)} ⭐
        </span>
      </div>
    </Link>
  );
};

export default MovieCard;
