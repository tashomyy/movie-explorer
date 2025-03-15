import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleMovie, fetchTrailer } from "../../services/movies";
import { toast } from "react-toastify";
import { Movie } from "../../lib/types";
import { AddToFavoritesButton, AddToWatchlistButton } from "./MovesListButtons";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

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

    if (movie?.id) fetchTrailer(movie?.id).then((data) => setTrailerKey(data));

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [movie]);

  const handleShare = (platform: "facebook" | "twitter" | "whatsapp") => {
    const url = encodeURIComponent(window.location.href);
    if (!movie?.title) return;
    const title = encodeURIComponent(movie?.title);

    const shareUrls: Record<"facebook" | "twitter" | "whatsapp", string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title}%20${url}`,
    };

    window.open(shareUrls[platform], "_blank");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[-1] bg-white dark:bg-black transition-opacity duration-500 ${
          isLoaded ? "opacity-60" : "opacity-60"
        }`}
      />

      <div className="relative flex flex-col gap-3 justify-start items-center isolate h-full">
        <div className="grid grid-cols-1 gap-4 md:gap-12">
          <div className="flex flex-col gap-4 md:gap-12 items-start justify-center">
            <h1 className="font-bold text-primary-text primary-heading">
              {movie?.title}
            </h1>

            <p className="text-primary-text  text-lg ">{movie?.overview}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            <div className="flex flex-col gap-4 md:gap-12 w-full">
              {trailerKey && (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg shadow-lg"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Movie Trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => handleShare("facebook")}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Share on Facebook
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="bg-blue-400 text-white px-3 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                  Share on Twitter
                </button>
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Share on WhatsApp
                </button>
              </div>
            </div>
            <div className="text-primary-text text-lg flex flex-col gap-2">
              <p>
                <span className="font-bold">Director:</span>{" "}
                {movie?.director || "N/A"}
              </p>
              <p>
                <span className="font-bold">Starring:</span>{" "}
                {movie?.cast?.slice(0, 5).join(", ") || "N/A"}
              </p>
              <div className="flex flex-wrap gap-4">
                {movie && (
                  <>
                    <AddToWatchlistButton movie={movie} />
                    <AddToFavoritesButton movie={movie} />
                  </>
                )}
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
                  ⭐ {movie?.vote_average?.toFixed(1)} / 10
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
