import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { cartSlice } from './featers/cart';
import { movieApi } from '../services/movieApi';

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        cart: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([movieApi.middleware]),
});