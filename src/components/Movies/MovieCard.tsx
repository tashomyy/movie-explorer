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
    <div className="relative flex flex-col gap-2 w-[350px]">
      <h2 className="element-heading">{movie.title}</h2>
      <img
        className="w-full"
        src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
        alt={movie.title}
      />
      <p className="secondary-body">{movie.overview}</p>
    </div>
  );
};

export default MovieCard;
