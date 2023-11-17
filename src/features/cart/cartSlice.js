import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  //   cart: [
  //     { pizzaId: 1, name: "Pizza1", quantity: 3, unitPrice: 12, totalPrice: 36 },
  //   ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity += 1;
      item.totalPrice += item.unitPrice;
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity -= 1;
      item.totalPrice -= item.unitPrice;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

const getCart = (state) => state.cart.cart;

export const selectTotalPrice = createSelector(getCart, (cart) =>
  cart.reduce((acc, item) => acc + item.totalPrice, 0)
);

export const selectTotalQuantity = createSelector(getCart, (cart) =>
  cart.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCurrentItem = function (id) {
  return createSelector([getCart], (cart) =>
    cart.find((item) => item.pizzaId === id)
  );
};

export const selectCart = createSelector(getCart, (cart) => cart);

export const {
  addItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} = cartSlice.actions;
export default cartSlice.reducer;
