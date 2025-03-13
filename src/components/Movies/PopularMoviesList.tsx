import { Movie } from "../../lib/types";
import MovieCard from "./MovieCard";

interface MoviesListProps {
  moviesData: Movie[];
}

const MoviesList = ({ moviesData }: MoviesListProps) => {
  return (
    <div className="mx-auto w-full my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {moviesData.map((movie, index) => {
        return <MovieCard key={index} movie={movie} />;
      })}
    </div>
  );
};

export default MoviesList;
