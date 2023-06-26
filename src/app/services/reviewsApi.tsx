import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/api/'}),
    endpoints: (builder) => ({
        getReviews: builder.query({ query: () => 'reviews' }),
        
    })
});

export const { useGetReviewsQuery } = reviewsApi;