import React from 'react';

import {
  CartItemContainer,
  ItemDetailsContainer,
  CartItemImage,
  ItemName
} from './cart-item.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={imageUrl} alt='item' />
    <ItemDetailsContainer>
      <ItemName>{name}</ItemName>
      <span>
        {quantity} x Rs. {price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default CartItem;
