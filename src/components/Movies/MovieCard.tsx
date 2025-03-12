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
    <div className="relative flex flex-col gap-2 items-center justify-start text-center">
      <h2 className="secondary-heading font-bold">{movie.title}</h2>
      <img
        className="w-max"
        src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
        alt={movie.title}
      />
      <p className="secondary-body">{movie.overview}</p>
    </div>
  );
};

export default MovieCard;
