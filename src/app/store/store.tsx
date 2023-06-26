import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { cartSlice } from './featers/cart';
import { movieApi } from '../services/movieApi';
import { cinemasApi } from '../services/cinemasApi';
import { reviewsApi } from '../services/reviewsApi';

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        [cinemasApi.reducerPath]: cinemasApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        cart: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([movieApi.middleware, cinemasApi.middleware, reviewsApi.middleware]),
});