import axios from "axios";
import type { MoviesResponse } from "../types/movie";

interface FetchMoviesParams {
  query: string;
  page: number;
}

const TMDB_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies({
  query,
  page,
}: FetchMoviesParams): Promise<MoviesResponse> {
  const response = await axios.get<MoviesResponse>(TMDB_URL, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  return response.data;
}
