import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'api_key=' + process.env.REACT_APP_TMDM_API_KEY;

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
  endpoints: (build) => ({
    getPopularity: build.query({
      query: () => `/discover/movie?sort_by=popularity.desc&${API_KEY}&language=ru`
    }),
    getMostPopular: build.query({
      query: () => `/discover/movie?with_genres=18&primary_release_year=2022&${API_KEY}&language=ru`
    }),
    getFilmsGenres: build.query({
      query: () => `/genre/movie/list?${API_KEY}&language=ru`
    }),
    getFilmsWithGenre: build.query({
      query: ({genreId, page}) => `/discover/movie?sort_by=popularity.desc&${API_KEY}&with_genres=${genreId}&page=${page}&language=ru`
    }),
    getSeriesGenres: build.query({
      query: () => `/genre/tv/list?${API_KEY}&language=ru`
    }),
    getSeriesWithGenre: build.query({
      query: ({genreId, page}) => `/discover/tv?sort_by=popularity.desc&${API_KEY}&with_genres=${genreId}&page=${page}&language=ru`
    }),
    getPopularActors: build.query({
      query: (page) => `/person/popular?${API_KEY}&page=${page}&language=ru`
    }),
    getFilmOrSeries: build.query({
      query: ([type, id]) => `/${type}/${id}?${API_KEY}&language=ru`
    }),
    getActors: build.query({
      query: ([type, id]) => `/${type}/${id}?${API_KEY}&append_to_response=credits&language=ru`
    }),
    getImages: build.query({
      query: ([type, id]) => `/${type}/${id}/images?${API_KEY}`
    }),
    getRecommendations: build.query({
      query: ([type, id]) => `/${type}/${id}/recommendations?${API_KEY}&language=ru`
    }),
    searchMovieOrTv: build.query({
      query: ([type, keyWords]) => `/search/${type}?${API_KEY}&language=ru&query=${keyWords}`
    })
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
              useSearchMovieOrTvQuery} = moviesApi;