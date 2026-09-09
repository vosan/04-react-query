import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginateModule, { type ReactPaginateProps } from "react-paginate";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";

// Vite 8 can expose react-paginate's UMD export under a nested default.
const ReactPaginate =
  (
    ReactPaginateModule as unknown as {
      default?: typeof ReactPaginateModule;
    }
  ).default ?? ReactPaginateModule;

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query !== "",
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  const handlePageChange: ReactPaginateProps["onPageChange"] = ({
    selected,
  }): void => {
    setPage(selected + 1);
    setSelectedMovie(null);
  };

  const handleCloseModal = (): void => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorMessage />}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
