// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./slices/cartSlice";

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });


import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { loadCart } from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// ✅ App start hote hi — agar user logged in hai toh cart load karo
const token = localStorage.getItem("auth:token");
if (token) {
  store.dispatch(loadCart());
}