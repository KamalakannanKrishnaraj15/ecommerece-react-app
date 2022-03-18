import React, { useState, useEffect, Fragment } from 'react';
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import ShoppingLoader from '../../components/shopping-loader/shopping-loader.component';

import {
  SignInAndSingUp,
  WelcomeMsgContainer,
  WelcomeLottieAnimationWrapper,
  ContinueShoppingMsg,
  ContinueShoppingAnimationWrapper
} from './sign-in-and-sign-up.styles.jsx';

const SignInAndSignUpPage = ({ currentUser }) => {
  const [isWelcomeVisible, setWelcomeVisible] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [isShoppingLoaderVisible, setShoppingLoaderVisible] = useState(false);

  const handleSubmit = (value) => {
    setShoppingLoaderVisible(value);
  };

  useEffect(() => {
    setShoppingLoaderVisible(true);
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      setRedirect(false);
      setShoppingLoaderVisible(false);
      setWelcomeVisible(false);
    } else {
      setShoppingLoaderVisible(false);
      setWelcomeVisible(true);
      setTimeout(() => {
        setRedirect(true);
      }, 3000);
    }
  }, [currentUser]);

  useEffect(() => {
    const lottieRef = document.getElementById('welcome-lottie');
    const loadingRef = document.getElementById('continue-shopping');
    lottie.loadAnimation({
      container: lottieRef,
      background: 'white',
      renderer: 'svg',
      autoplay: true,
      loop: true,
      path: 'https://assets2.lottiefiles.com/packages/lf20_47pyyfcf.json',
    });
    lottie.loadAnimation({
      container: loadingRef,
      background: 'white',
      renderer: 'svg',
      autoplay: true,
      loop: true,
      path: 'https://assets2.lottiefiles.com/packages/lf20_azhtvt8x.json',
    });
  }, [isWelcomeVisible]);


  const getComponent = () => {
    switch(true) {
      case redirect: {
        return (
          <Redirect to="/shop" />
        );
      }
      case isWelcomeVisible: {
        return (
          <WelcomeMsgContainer>
            <>
              <div>
                <WelcomeLottieAnimationWrapper id='welcome-lottie' />
              </div>
              <h2 className='welcome-msg'>Welcome to crown shopping!</h2>
              <ContinueShoppingMsg>
                Continue shopping
                <ContinueShoppingAnimationWrapper id='continue-shopping' />
              </ContinueShoppingMsg>
            </>
          </WelcomeMsgContainer>
        );
      }
      case isShoppingLoaderVisible: {
        return (
          <ShoppingLoader state={isShoppingLoaderVisible} />
        );
      }
      default: {
        return (
          <Fragment>
            <SignIn onSingInSubmit={handleSubmit} />
            <SignUp onSingUpSubmit={handleSubmit} />
          </Fragment>
        );
      }
    };
  };

  return (
    <SignInAndSingUp>
      {getComponent()}
    </SignInAndSingUp>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(SignInAndSignUpPage);
