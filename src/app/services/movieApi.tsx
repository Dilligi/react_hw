import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/api/'}),
    endpoints: (builder) => ({
        getMovies: builder.query({ query: () => 'movies' }),
        getMovie: builder.query({ query: (id) => `movie?id=${id}`})
    })
});

export const { useGetMoviesQuery, useGetMovieQuery } = movieApi;