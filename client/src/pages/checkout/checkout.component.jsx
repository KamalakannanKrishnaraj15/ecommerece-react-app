import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import lottie from 'lottie-web';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal
} from '../../redux/cart/cart.selectors';

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer
} from './checkout.styles.jsx';

const CheckoutPage = ({ cartItemsCount, cartItems, total }) => {
  useEffect(() => {
    if (cartItemsCount === 0) {
      const lottieRef = document.getElementById('empty-checkout-cart');
      lottie.loadAnimation({
        container: lottieRef,
        background: 'white',
        renderer: 'svg',
        autoplay: true,
        loop: true,
        path: 'https://assets6.lottiefiles.com/packages/lf20_cy82iv.json',
      });
    }
  }, [cartItemsCount])

  if (cartItemsCount === 0) {
    return (
      <div className='empty-cart-lottie-container'>
        <div id="empty-checkout-cart" className='empty-cart-lottie-anmiation' />
      </div>
    );
  }
  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <TotalContainer>TOTAL: ${total}</TotalContainer>
      <WarningContainer>
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
      </WarningContainer>
      <StripeCheckoutButton price={total} />
    </CheckoutPageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItemsCount: selectCartItemsCount,
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);