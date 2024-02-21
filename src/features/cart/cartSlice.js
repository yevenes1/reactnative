import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    user: "nicoyevenes",
    items: [],
    total: null,
    updateAt: "",
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const foundItem = state.value.items.find(
        (item) => item.id === action.payload.id
      );

      if (foundItem) foundItem.quantity++;
      else state.value.items.push({ ...action.payload, quantity: 1 });

      state.value.total = state.value.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.value.updateAt = new Date().toLocaleString();
    },
    removeItem: () => {},
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
