export const selectCart = (state) => state.cart;

export const selectTicket = (state, id: string) => selectCart(state)[id] || 0;