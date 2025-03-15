import { MovieSectionType } from "./enums";

export interface WatchProvider {
  provider_name: string;
  logo_path: string;
}

export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  backdrop_path: string;
  credits: { cast: { name: string }[]; crew: { name: string; job: string }[] };
  providers?: WatchProvider[];
}

export interface Genre {
  id: number;
  name: string;
}

export type PossibleMovieLists =
  | MovieSectionType.Popular
  | MovieSectionType.Trending
  | MovieSectionType.Upcoming
  | MovieSectionType.Streaming;

export interface MoviesListProps {
  moviesData: Movie[];
}
export interface NavItem {
  name: string;
  scrollTo?: string;
  path: string;
  isLink?: boolean;
}
