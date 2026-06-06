import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { loadCart } from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const token = localStorage.getItem("auth:token");
if (token) {
  store.dispatch(loadCart());
}