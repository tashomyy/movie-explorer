import PopularMoviesWrapper from "../components/Movies/PopularMoviesWrapper";
import SearchMoviesList from "../components/Movies/SearchMoviesList";

const Home = () => {
  return (
    <div className="flex flex-col gap-12">
      <SearchMoviesList />
      <PopularMoviesWrapper />
    </div>
  );
};

export default Home;
