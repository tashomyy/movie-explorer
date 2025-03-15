import MoviesListWrapper from "../components/Movies/MoviesListWrapper";
import SearchMoviesList from "../components/Movies/SearchMovies";
import { MovieSectionType } from "../lib/enums";

const Home = () => {
  return (
    <div className="flex flex-col gap-12">
      <SearchMoviesList />
      <MoviesListWrapper type={MovieSectionType.Streaming} />
      <MoviesListWrapper type={MovieSectionType.Upcoming} />
      <MoviesListWrapper type={MovieSectionType.Trending} />
      <MoviesListWrapper type={MovieSectionType.Popular} />
    </div>
  );
};

export default Home;
