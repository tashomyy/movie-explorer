import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleMovie } from "../../services/movies";
import { toast } from "react-toastify";
import { Movie } from "../../lib/types";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing ID for movie");
      return;
    }

    fetchSingleMovie(id).then((data) => {
      setMovie(data);
    });
  }, [id]);

  if (error) {
    toast.error(error);
    throw new Error(error);
  }

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (movie?.backdrop_path) {
      const image = new Image();
      image.src = `${import.meta.env.VITE_IMAGE_URL}original${
        movie.backdrop_path
      }`;
      image.onload = () => {
        document.body.style.backgroundImage = `url(${image.src})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        setIsLoaded(true);
      };
    }

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [movie]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[-1] bg-white dark:bg-black transition-opacity duration-500 ${
          isLoaded ? "opacity-60" : "opacity-60"
        }`}
      />

      <div className="relative flex flex-col gap-3 justify-start items-center isolate h-full">
        <h1 className="text-4xl font-bold text-primary-text">{movie?.title}</h1>

        <p className="text-primary-text text-center text-lg max-w-2xl">
          {movie?.overview}
        </p>

        <div className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
          ⭐ {movie?.vote_average?.toFixed(1)} / 10
        </div>

        <div className="text-primary-text text-center text-lg">
          <p>
            <span className="font-bold">Director:</span>{" "}
            {movie?.director || "N/A"}
          </p>
          <p>
            <span className="font-bold">Starring:</span>{" "}
            {movie?.cast?.slice(0, 5).join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
