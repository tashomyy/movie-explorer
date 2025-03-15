import { MoviesListProps } from "../../lib/types";
import MovieCard from "./MovieCard";

const GridMoviesList = ({ moviesData }: MoviesListProps) => {
  return (
    <div className="mx-auto w-full my-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {moviesData?.map((movie, index) => {
        return <MovieCard key={index} movie={movie} />;
      })}
    </div>
  );
};

export default GridMoviesList;
