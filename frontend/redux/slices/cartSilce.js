import { createSlice, payLoadAction } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
        existingItem.so_luong =
          Number(existingItem.so_luong) + Number(action.payload.so_luong);
      } else {
        state.items.push({
          ...action.payload.item,
          so_luong: action.payload.so_luong,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);

      if (item) {
        item.so_luong = action.payload.so_luong;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice;
