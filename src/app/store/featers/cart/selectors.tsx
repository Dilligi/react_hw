export const selectCart = (state: any) => state.cart;

export const selectTicket = (state: any, id: string) => selectCart(state)[id] || 0;