import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1); // Remove the item from the basket
      }
    },
  },
});

// Action creators
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors
const selectBasketState = (state) => state.basket;

export const selectBasketItems = createSelector(
  [selectBasketState],
  (basket) => basket.items
);

export const selectBasketItemsWithId = createSelector(
    [selectBasketItems, (_, dishId) => dishId], // Use dishId to filter
    (items, dishId) => items.filter((item) => item.dishId === dishId)
  );
export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => total += item.price, 0);

export default basketSlice.reducer;
