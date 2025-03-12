import { use } from "react";
import MovieCard from "./MovieCard";

interface Movie {
  results: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
  }[];
}

interface MoviesProps {
  moviesPromise: Promise<Movie>;
}

const MoviesComponent = ({ moviesPromise }: MoviesProps) => {
  const movies = use(moviesPromise);
  console.log(movies);
  return (
    <ul className="mx-auto w-full my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-16">
      {movies.results.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </ul>
  );
};

export default MoviesComponent;
