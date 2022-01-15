import { createSelector } from 'reselect';

const selectCart = state => state.cart;
const shop = state => state.shop;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const shopProducts = createSelector(
  [shop],
  shop => shop.products
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);
