//cartslices
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  total: JSON.parse(localStorage.getItem("cartTotal")) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload.item._id
      );

      if (existingItem) {
        existingItem.so_luong += action.payload.so_luong;
      } else {
        state.items.push({
          ...action.payload.item,
          so_luong: action.payload.so_luong,
        });
      }
      state.total = calculateTotal(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotal", JSON.stringify(state.total));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.total = calculateTotal(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotal", JSON.stringify(state.total));
    },
    updateCartItemQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);

      if (item) {
        item.so_luong = action.payload.so_luong;
      }
      state.total = calculateTotal(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("cartTotal", JSON.stringify(state.total));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartTotal");
    },
  },
});

const calculateTotal = (items) => {
  return items.reduce(
    (total, item) => total + item.gia_giam * item.so_luong,
    0
  );
};
export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice;
