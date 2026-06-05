// export const selectCartItems = (state) =>
//   Array.isArray(state.cart.items) ? state.cart.items : [];

// export const selectCartCount = (state) =>
//   (Array.isArray(state.cart.items) ? state.cart.items : []).reduce(
//     (total, item) => total + (item.qty || 0),
//     0
//   );

// export const selectCartTotal = (state) =>
//   (Array.isArray(state.cart.items) ? state.cart.items : []).reduce(
//     (total, item) => total + (item.price || 0) * (item.qty || 0),
//     0
//   );


// // export const selectCartItems = (state) => state.cart.items;

// // export const selectCartCount = (state) =>
// //   state.cart.items.reduce((total, item) => total + item.qty, 0);

// // export const selectCartTotal = (state) =>
// //   state.cart.items.reduce(
// //     (total, item) => total + item.price * item.qty,
// //     0
// //   );



// export const selectCartItems = (state) => state.cart.items;

// export const selectCartCount = (state) =>
//   state.cart.items.reduce((t, i) => t + i.qty, 0);

// export const selectCartTotal = (state) =>
//   state.cart.items.reduce(
//     (t, i) => t + i.price * i.qty,
//     0
//   );

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((t, i) => t + i.qty, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((t, i) => t + i.price * i.qty, 0);