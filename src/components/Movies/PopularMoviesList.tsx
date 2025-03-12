import { use } from "react";

interface Movie {
  results: { id: number; title: string }[];
}

interface MoviesProps {
  moviesPromise: Promise<Movie>;
}

const MoviesComponent = ({ moviesPromise }: MoviesProps) => {
  const movies = use(moviesPromise);
  console.log(movies);
  return (
    <ul className="mx-auto w-max my-5">
      {movies.results.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
};

export default MoviesComponent;
