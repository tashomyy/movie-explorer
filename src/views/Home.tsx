import PopularMoviesWrapper from "../components/Movies/PopularMovies";
import SearchMoviesList from "../components/Movies/SearchMovies";

const Home = () => {
  return (
    <div className="flex flex-col gap-12">
      <SearchMoviesList />
      <PopularMoviesWrapper />
    </div>
  );
};

export default Home;
