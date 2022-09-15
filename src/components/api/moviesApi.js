import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'api_key=' + process.env.REACT_APP_TMDM_API_KEY;

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
  endpoints: (build) => ({
    getPopularity: build.query({
      query: (language) => `/discover/movie?sort_by=popularity.desc&${API_KEY}&language=${language}`
    }),
    getMostPopular: build.query({
      query: (language) => `/discover/movie?with_genres=18&primary_release_year=2022&${API_KEY}&language=${language}`
    }),
    getFilmsGenres: build.query({
      query: (language) => `/genre/movie/list?${API_KEY}&language=${language}`
    }),
    getFilmsWithGenre: build.query({
      query: (options) => `/discover/movie?sort_by=popularity.desc&${API_KEY}&with_genres=${options.genreId}&page=${options.page}&language=${options.language}`
    }),
    getSeriesGenres: build.query({
      query: (language) => `/genre/tv/list?${API_KEY}&language=${language}`
    }),
    getSeriesWithGenre: build.query({
      query: (options) => `/discover/tv?sort_by=popularity.desc&${API_KEY}&with_genres=${options.genreId}&page=${options.page}&language=${options.language}`
    }),
    getPopularActors: build.query({
      query: (options) => `/person/popular?${API_KEY}&page=${options.page}&language=${options.language}`
    }),
    getFilmOrSeries: build.query({
      query: (options) => `/${options.type}/${options.id}?${API_KEY}&language=${options.language}`
    }),
    getActors: build.query({
      query: (options) => `/${options.type}/${options.id}?${API_KEY}&append_to_response=credits&language=${options.language}`
    }),
    getImages: build.query({
      query: (options) => `/${options.type}/${options.id}/images?${API_KEY}`
    }),
    getRecommendations: build.query({
      query: (options) => `/${options.type}/${options.id}/recommendations?${API_KEY}&language=${options.language}`
    }),
    searchMovieOrTv: build.query({
      query: (options) => `/search/${options.type}?${API_KEY}&language=${options.language}&query=${options.keyWords}`
    }),
    autocompleteMovieOrTv: build.query({
      query: (options) => `/search/${options.type}?${API_KEY}&language=${options.language}&query=${options.keyWords}`
    }),
    getActorInfo: build.query({
      query: (options) => `/person/${options.id}?${API_KEY}&language=${options.language}`
    }),
    getActorsCredits: build.query({
      query: (options) => `/person/${options.id}/combined_credits?${API_KEY}&language=${options.language}`
    }),
  })
});

export const {useGetPopularityQuery, 
              useGetMostPopularQuery, 
              useGetFilmsGenresQuery, 
              useGetFilmsWithGenreQuery,
              useGetSeriesGenresQuery,
              useGetSeriesWithGenreQuery,
              useGetPopularActorsQuery,
              useGetFilmOrSeriesQuery,
              useGetActorsQuery,
              useGetImagesQuery,
              useGetRecommendationsQuery,
              useSearchMovieOrTvQuery,
              useAutocompleteMovieOrTvQuery,
              useGetActorInfoQuery,
              useGetActorsCreditsQuery} = moviesApi;