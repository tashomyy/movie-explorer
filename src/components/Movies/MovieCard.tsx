interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
  };
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="relative flex flex-col gap-3 justify-end items-center text-center bg-card rounded-xl px-4 shadow-lg h-full isolate group">
      <img
        className="h-full object-contain absolute z-[-2]"
        src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="absolute bottom-0 left-0 w-full h-max flex flex-col gap-2 justify-end items-center text-center bg-card/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 p-4 rounded-xl">
        <h2 className="secondary-heading font-semibold cursor-default">
          {movie.title}
        </h2>
        <p className="primary-body cursor-default">
          {movie.overview.slice(0, 100)}...
        </p>
        <span className="secondary-body font-bold cursor-default">
          {movie.vote_average} ⭐
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
