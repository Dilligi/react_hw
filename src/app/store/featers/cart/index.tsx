import {createSlice} from '@reduxjs/toolkit'

let initialState = {}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        increment: (state: any, {payload}) => {
            const count = state[payload] || 0;

            if (count == 30)
                return;

            state[payload] = count + 1;
        },

        decrement: (state: any, {payload}) => {
            const count = state[payload];
            
            if (!count) {
                return;
            }

            if (count == 1) {
                delete state[payload];
                return;
            }

            state[payload] = count - 1;
        },

        remove: (state: any, {payload}) => {
            delete state[payload];
        }
    }
});