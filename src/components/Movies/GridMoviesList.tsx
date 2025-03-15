import { MoviesListProps } from "../../lib/types";
import MovieCard from "./MovieCard";
import { useLocation } from "react-router-dom";

const GridMoviesList = ({ moviesData }: MoviesListProps) => {
  const location = useLocation();
  const isListsPage = location.pathname.includes("lists");

  const userCountry = "US";

  return (
    <div className="mx-auto w-full my-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {moviesData?.map((movie, index) => {
        const providersByCountry = movie.providers as
          | Record<
              string,
              { flatrate?: { provider_name: string; logo_path: string }[] }
            >
          | undefined;

        const countryProviders =
          providersByCountry?.[userCountry]?.flatrate || [];

        return (
          <div key={index} className="flex flex-col items-center">
            <MovieCard movie={movie} />

            {isListsPage && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {countryProviders.length > 0 ? (
                  <>
                    <h3 className="text-lg font-semibold">Available on:</h3>
                    <div className="flex flex-wrap gap-2">
                      {countryProviders.map(
                        (provider: {
                          provider_name: string;
                          logo_path: string;
                        }) => (
                          <img
                            key={provider.provider_name}
                            src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                            alt={provider.provider_name}
                            title={provider.provider_name}
                            className="h-10 w-10 rounded-md shadow-md"
                          />
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">
                    No available provider for your country
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GridMoviesList;
