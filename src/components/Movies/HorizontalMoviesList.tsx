import { useRef, useEffect } from "react";
import { MoviesListProps } from "../../lib/types";
import MovieCard from "./MovieCard";

interface HorizontalMoviesListProps extends MoviesListProps {
  loadMore: () => void;
}

const HorizontalMoviesList = ({
  moviesData,
  loadMore,
}: HorizontalMoviesListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      if (scrollWidth - scrollLeft <= clientWidth + 100) {
        loadMore();
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return (
    <div ref={containerRef} className="w-full overflow-x-auto">
      <div className="flex space-x-4">
        {moviesData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalMoviesList;
