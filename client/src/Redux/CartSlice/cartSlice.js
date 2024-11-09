import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isOpen: false,
  totalCount: 0, // Total item count in the cart
  token: null, // Store the discount token code
  discount: 0, // Store the discount percentage
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1, sliderQuantity: 1 });
      }
      state.totalCount += 1;
    },
    removeItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.totalCount -= item.sliderQuantity;
      }
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.token = null; // Clear token when the cart is cleared
      state.discount = 0; // Clear discount when the cart is cleared
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    incrementSliderQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.sliderQuantity += 1;
        state.totalCount += 1;
      }
    },
    decrementSliderQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.sliderQuantity > 0) {
        item.sliderQuantity -= 1;
        state.totalCount -= 1;
      }
    },
    setToken: (state, action) => {
      state.token = action.payload.token; // Set the token code
      state.discount = action.payload.discount; // Set the discount percentage
    },
    clearToken: (state) => {
      state.token = null;
      state.discount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  toggleCart,
  incrementSliderQuantity,
  decrementSliderQuantity,
  setToken,
  clearToken,
} = cartSlice.actions;

export default cartSlice.reducer;
