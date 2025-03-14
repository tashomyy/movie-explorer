import { SearchType } from "./enums";
import { NavItem } from "./types";

export const PAGE_NUMBER = 1;

export const YEARS = Array.from({ length: 50 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

export const SEARCH_TYPES: { value: SearchType; label: string }[] = [
  { value: SearchType.Name, label: "Search by Name" },
  { value: SearchType.Genre, label: "Search by Genre" },
  { value: SearchType.Year, label: "Search by Year" },
];
export const NAV_LINKS: NavItem[] = [
  { name: "Home", path: "/", isLink: true },
  {
    name: "Movie finder",
    scrollTo: "movie-finder-section",
    path: "#movie-finder",
  },
  {
    name: "Streaming",
    scrollTo: "streaming-section",
    path: "#streaming",
  },
  {
    name: "Upcoming",
    scrollTo: "upcoming-section",
    path: "#upcoming",
  },
  {
    name: "Trending",
    scrollTo: "trending-section",
    path: "#trending",
  },
  {
    name: "Popular",
    scrollTo: "popular-section",
    path: "#popular",
  },
];
