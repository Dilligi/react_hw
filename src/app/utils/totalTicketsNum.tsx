import { store } from "../store/store"

export const TotalTicketsNum = () => {
    let cart = store.getState().cart;
    let count = 0;

    for (const id in cart) {
        count += cart[id];
    }

    return count;
}