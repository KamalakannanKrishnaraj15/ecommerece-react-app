import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { ReactComponent as Logo } from '../../assets/ecomm-logo.svg';

import {
  HeaderContainer,
  LogoContainer,
  Options,
  Option
} from './header.styles.jsx';

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <Options>
      <Option to='/shop'>
        SHOP
      </Option>
      <Option to='/shop'>
        CONTACT
      </Option>
      {
        currentUser
        ? (
          <div className='option' onClick={() => auth?.signOut()}>SIGN OUT</div>
        )
        : (
          <Option to='/signin'>SIGN IN</Option>
        )
      }
      <CartIcon />
    </Options>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
