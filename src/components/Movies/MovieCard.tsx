import { Link } from "react-router-dom";

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
    <Link
      to={"/page"}
      className="relative flex flex-col gap-3 justify-end items-center text-center bg-card rounded-xl p-2  shadow-lg h-full isolate group"
    >
      <div
        className="absolute inset-0 w-full h-full z-[-1] p-4 rounded-xl bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_IMAGE_URL}${
            movie.poster_path
          })`,
        }}
      ></div>

      <div className="w-full h-max flex flex-col gap-2 justify-start items-center text-center bg-card/60 hover:bg-card/80 transition-color duration-200 cursor-pointer rounded-xl px-2 py-4 backdrop-blur-[3px] transition-transform hover:scale-105">
        <h2 className="secondary-heading font-semibold pointer-events-none">
          {movie.title}
        </h2>
        <p className="primary-body pointer-events-none">
          {movie.overview.slice(0, 115)}...
        </p>
        <span className="secondary-body font-bold pointer-events-none">
          {movie.vote_average.toFixed(1)} ⭐
        </span>
      </div>
    </Link>
  );
};

export default MovieCard;
