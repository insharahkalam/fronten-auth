// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
// };

// const getInitialCart = () => {
//   try {
//     const data = JSON.parse(localStorage.getItem("cart"));
//     return Array.isArray(data) ? data : [];
//   } catch {
//     return [];
//   }
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,

//   reducers: {
//     addToCart: (state, action) => {
//       const existing = state.items.find(
//         (item) => item._id === action.payload._id
//       );

//       if (existing) {
//         existing.qty += 1;
//       } else {
//         state.items.push({
//           ...action.payload,
//           qty: 1,
//         });
//       }

//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item._id !== action.payload
//       );

//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

//     updateQty: (state, action) => {
//       const { id, qty } = action.payload;

//       state.items = state.items
//         .map((item) =>
//           item._id === id
//             ? { ...item, qty }
//             : item
//         )
//         .filter((item) => item.qty > 0);

//       localStorage.setItem("cart", JSON.stringify(state.items));
//     },

//     clearCart: (state) => {
//       state.items = [];

//       localStorage.setItem("cart", JSON.stringify([]));
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   updateQty,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const getInitialCart = () => {
//   try {
//     const data = JSON.parse(localStorage.getItem("cart"));
//     return Array.isArray(data) ? data : [];
//   } catch {
//     return [];
//   }
// };

// const initialState = {
//   items: getInitialCart(),
// };

// const save = (items) => {
//   localStorage.setItem("cart", JSON.stringify(items));
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,

//   reducers: {
//     addToCart: (state, action) => {
//       const existing = state.items.find(
//         (i) => i._id === action.payload._id
//       );

//       if (existing) {
//         existing.qty += 1;
//       } else {
//         state.items.push({ ...action.payload, qty: 1 });
//       }

//       save(state.items);
//     },

//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(
//         (i) => i._id !== action.payload
//       );

//       save(state.items);
//     },

//     updateQty: (state, action) => {
//       const { id, qty } = action.payload;

//       state.items = state.items
//         .map((i) => (i._id === id ? { ...i, qty } : i))
//         .filter((i) => i.qty > 0);

//       save(state.items);
//     },

//     clearCart: (state) => {
//       state.items = [];
//       save([]);
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   updateQty,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

// ✅ FIX — nested items ko handle karo
const getInitialCart = () => {
  try {
    const data = JSON.parse(localStorage.getItem("cart"));
    if (!data) return [];
    // agar { items: [...] } structure hai toh
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.items)) return data.items;
    return [];
  } catch {
    return [];
  }
};

// ✅ FIX — array directly save karo, object nahi
const save = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: getInitialCart() },

  reducers: {
    // ✅ YEH NAYA ACTION — login ke baad localStorage se store sync karta hai
    loadCart: (state) => {
      state.items = getInitialCart();
    },

    addToCart: (state, action) => {
      const existing = state.items.find((i) => i._id === action.payload._id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
      save(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      save(state.items);
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      state.items = state.items
        .map((i) => (i._id === id ? { ...i, qty } : i))
        .filter((i) => i.qty > 0);
      save(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart"); // ✅ logout pe clean removal
    },
    loadCart: (state) => {
      state.items = getInitialCart(); // localStorage se fresh read
    },
  },
});

export const { loadCart, addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
