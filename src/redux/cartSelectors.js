export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((t, i) => t + i.qty, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((t, i) => t + i.price * i.qty, 0);