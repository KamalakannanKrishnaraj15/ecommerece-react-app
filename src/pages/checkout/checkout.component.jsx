import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import lottie from 'lottie-web';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal
} from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

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
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className='total'>TOTAL: Rs. {total}</div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItemsCount: selectCartItemsCount,
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);