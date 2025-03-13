import MovieCard from "./MovieCard";
import {
  FixedSizeGrid as Grid,
  GridOnItemsRenderedProps,
  GridChildComponentProps,
} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { useMovies } from "../../hooks/useMovies";

const COLUMN_COUNT = 3;
const ITEM_HEIGHT = 480;
const MoviesComponent = () => {
  const { movies, fetchNextPage, hasMore, isLoading } = useMovies();

  const rowCount = Math.ceil(movies.length / COLUMN_COUNT);
  const itemCount = hasMore ? movies.length + COLUMN_COUNT : movies.length;

  const isItemLoaded = (index: number) => index < movies.length;

  const loadMoreItems = isLoading ? () => {} : fetchNextPage;

  return (
    <div className="h-[80vh] w-full">
      <AutoSizer>
        {({ height, width }) => {
          const columnWidth = width / COLUMN_COUNT;

          return (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <Grid
                  height={height}
                  width={width + 17}
                  columnCount={COLUMN_COUNT}
                  rowCount={rowCount}
                  columnWidth={columnWidth}
                  rowHeight={ITEM_HEIGHT}
                  onItemsRendered={({
                    overscanRowStartIndex,
                    overscanRowStopIndex,
                    visibleRowStartIndex,
                    visibleRowStopIndex,
                  }: GridOnItemsRenderedProps) =>
                    onItemsRendered({
                      overscanStartIndex: overscanRowStartIndex * COLUMN_COUNT,
                      overscanStopIndex: overscanRowStopIndex * COLUMN_COUNT,
                      visibleStartIndex: visibleRowStartIndex * COLUMN_COUNT,
                      visibleStopIndex: visibleRowStopIndex * COLUMN_COUNT,
                    })
                  }
                  ref={ref}
                >
                  {({
                    columnIndex,
                    rowIndex,
                    style,
                  }: GridChildComponentProps) => {
                    const movieIndex = rowIndex * COLUMN_COUNT + columnIndex;
                    if (!isItemLoaded(movieIndex)) {
                      return (
                        <div
                          style={style}
                          className="flex justify-center items-center"
                        >
                          Loading...
                        </div>
                      );
                    }

                    const movie = movies[movieIndex];
                    return movie ? (
                      <div style={style} className="p-2">
                        <MovieCard movie={movie} />
                      </div>
                    ) : null;
                  }}
                </Grid>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default MoviesComponent;
