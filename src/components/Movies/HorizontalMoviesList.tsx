import { useRef } from "react";
import { MoviesListProps } from "../../lib/types";
import MovieCard from "./MovieCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

interface HorizontalMoviesListProps extends MoviesListProps {
  loadMore: () => void;
}

const HorizontalMoviesList = ({
  moviesData,
  loadMore,
}: HorizontalMoviesListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useInfiniteScroll({
    callback: loadMore,
    root: containerRef.current,
    direction: "horizontal",
  });

  return (
    <div ref={containerRef} className="w-full overflow-x-auto">
      <div className="flex space-x-4">
        {moviesData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        <div
          ref={loaderRef}
          className="min-w-[4px] w-4 h-full shrink-0 border"
        ></div>
      </div>
    </div>
  );
};

export default HorizontalMoviesList;
