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
      query: () => `/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&${API_KEY}&language=ru`
    }),
    getGenres: build.query({
      query: () => `/genre/movie/list?${API_KEY}&language=ru`
    }),
    getFilmsWithGenre: build.query({
      query: ({genreId, page}) => `/discover/movie?sort_by=popularity.desc&${API_KEY}&with_genres=${genreId}&page=${page}&language=ru`
    })
  })
});

export const {useGetPopularityQuery, useGetMostPopularQuery, useGetGenresQuery, useGetFilmsWithGenreQuery} = moviesApi;