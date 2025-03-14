import MoviesListWrapper from "../components/Movies/MoviesListWrapper";
import SearchMoviesList from "../components/Movies/SearchMovies";

const Home = () => {
  return (
    <div className="flex flex-col gap-12">
      <SearchMoviesList />
      <MoviesListWrapper type="streaming" />
      <MoviesListWrapper type="upcoming" />
      <MoviesListWrapper type="trending" />
      <MoviesListWrapper type="popular" />
    </div>
  );
};

export default Home;
