import { Movie } from "../../lib/types";
import MovieCard from "./MovieCard";
import { useRef, useEffect } from "react";

interface MoviesListProps {
  moviesData: Movie[];
}

const HorizontalMoviesList = ({ moviesData }: MoviesListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      // Implement infinite scroll logic if needed
      if (scrollWidth - scrollLeft <= clientWidth + 100) {
        console.log("Load more movies"); // Replace with setPage logic if needed
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full overflow-x-auto scrollbar-hide" ref={containerRef}>
      <div className="flex space-x-4 p-4">
        {moviesData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalMoviesList;
