import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import lottie from 'lottie-web';

import CartItem from '../cart-item/cart-item.component';

import { selectCartItemsCount, selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyCartAnimationWrapper,
  CartItemsContainer
} from './cart-dropdown.styles.jsx';

const CartDropdown = ({
  cartItems,
  cartItemsCount,
  history,
  dispatch,
}) => {
  useEffect(() => {
    if (cartItemsCount === 0) {
      const lottieRef = document.getElementById('empty-cart');
      lottie.loadAnimation({
        container: lottieRef,
        background: 'white',
        renderer: 'svg',
        autoplay: true,
        loop: true,
        path: 'https://assets6.lottiefiles.com/packages/lf20_cy82iv.json',
      });
    }
  }, [cartItemsCount]);

  const returnCartItemsMap = () => {
    return cartItems.map(cartItem => (
      <CartItem key={cartItem.id} item={cartItem} />
    ));
  };

  const handleCheckoutButton = () => {
    dispatch(toggleCartHidden());
    history.push('/checkout');
  }
  
  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {
          cartItemsCount === 0
            ? (
              <EmptyCartAnimationWrapper id="empty-cart" />
            )
            : returnCartItemsMap()
        }
      </CartItemsContainer>
      <CartDropdownButton
        onClick={handleCheckoutButton}
        customClassName='cart-checkout-button'
      >
        Checkout
      </CartDropdownButton>
    </CartDropdownContainer>
  );
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  cartItemsCount: selectCartItemsCount(state),
});

export default withRouter(
  connect(
    mapStateToProps,
  )(CartDropdown)
);
