export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export type PossibleMovieLists =
  | "popular"
  | "trending"
  | "upcoming"
  | "streaming";

export interface MoviesListProps {
  moviesData: Movie[];
}
