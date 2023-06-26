import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cinemasApi = createApi({
    reducerPath: 'cinemasApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/api/'}),
    endpoints: (builder) => ({
        getCinemas: builder.query({ query: () => 'cinemas' }),
        getCinema: builder.query({ query: (id) => `movies?cinemaId=${id}`})
    })
});

export const { useGetCinemasQuery, useGetCinemaQuery } = cinemasApi;