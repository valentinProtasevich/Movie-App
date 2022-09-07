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
      query: ({genreId, page, language}) => `/discover/movie?sort_by=popularity.desc&${API_KEY}&with_genres=${genreId}&page=${page}&language=${language}`
    }),
    getSeriesGenres: build.query({
      query: (language) => `/genre/tv/list?${API_KEY}&language=${language}`
    }),
    getSeriesWithGenre: build.query({
      query: ({genreId, page, language}) => `/discover/tv?sort_by=popularity.desc&${API_KEY}&with_genres=${genreId}&page=${page}&language=${language}`
    }),
    getPopularActors: build.query({
      query: ({page, language}) => `/person/popular?${API_KEY}&page=${page}&language=${language}`
    }),
    getFilmOrSeries: build.query({
      query: ([type, id, language]) => `/${type}/${id}?${API_KEY}&language=${language}`
    }),
    getActors: build.query({
      query: ([type, id, language]) => `/${type}/${id}?${API_KEY}&append_to_response=credits&language=${language}`
    }),
    getImages: build.query({
      query: ([type, id]) => `/${type}/${id}/images?${API_KEY}`
    }),
    getRecommendations: build.query({
      query: ([type, id, language]) => `/${type}/${id}/recommendations?${API_KEY}&language=${language}`
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