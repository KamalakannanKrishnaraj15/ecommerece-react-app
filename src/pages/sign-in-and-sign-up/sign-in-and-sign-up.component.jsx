import React, { useState, useEffect, Fragment } from 'react';
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import ShoppingLoader from '../../components/shopping-loader/shopping-loader.component';

import './sign-in-and-sign-up.styles.scss';
import { selectCurrentUser, selectIsFetching } from '../../redux/user/user.selector';

const SignInAndSignUpPage = ({ currentUser, isFetching }) => {
  const [isWelcomeVisible, setWelcomeVisible] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (currentUser === null) {
      setRedirect(false);
      setWelcomeVisible(false);
    } else {
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
          <div className='welcome-msg-container'>
            <div>
              <div>
                <div id='welcome-lottie' className='welcome-lottie-anmiation' />
              </div>
              <h2 className='welcome-msg'>Welcome to crown shopping!</h2>
              <div className='continue-shopping-msg'>
                Continue shopping
                <div id='continue-shopping' className='continue-shopping-animation' />
              </div>
            </div>
          </div>
        );
      }
      case isFetching: {
        return (
          <ShoppingLoader state={isFetching} />
        );
      }
      default: {
        return (
          <Fragment>
            <SignIn />
            <SignUp />
          </Fragment>
        );
      }
    };
  };

  return (
    <div className='sign-in-and-sign-up'>
      {getComponent()}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isFetching: selectIsFetching,
});

export default connect(mapStateToProps)(SignInAndSignUpPage);
