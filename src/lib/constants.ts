import { SearchType } from "./enums";

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
