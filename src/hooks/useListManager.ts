import { useCallback } from "react";
import { Movie } from "../lib/types";

type UseListManagerParams = {
  list: Movie[];
  setList: React.Dispatch<React.SetStateAction<Movie[]>>;
  updateMoviesList: (movies: Movie[]) => Promise<Movie[]>;
};

export const useListManager = ({
  list,
  setList,
  updateMoviesList,
}: UseListManagerParams) => {
  const addToList = useCallback(
    async (movie: Movie) => {
      const exists = list.some((m) => m.id === movie.id);
      if (exists) return;

      const [movieWithProviders] = await updateMoviesList([movie]);
      setList((prev) => [...prev, movieWithProviders]);
    },
    [list, setList, updateMoviesList]
  );

  const removeFromList = useCallback(
    (id: string) => {
      setList((prev) => prev.filter((m) => m.id !== id));
    },
    [setList]
  );

  return { addToList, removeFromList };
};
