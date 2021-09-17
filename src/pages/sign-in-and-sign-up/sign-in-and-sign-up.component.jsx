import React, { useState, useEffect, Fragment } from 'react';
import lottie from 'lottie-web';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import ShoppingLoader from '../../components/shopping-loader/shopping-loader.component';
import { auth } from '../../firebase/firebase.utils';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => {
  const [isWelcomeVisible, setWelcomeVisible] = useState(false);
  const [isShoppingLoaderVisible, setShoppingLoaderVisible] = useState(false);

  const { currentUser = null } = auth || {};

  const handleSignUp = (value) => {
    setShoppingLoaderVisible(value);
  };

  useEffect(() => {
    if (currentUser === null) {
      setWelcomeVisible(false);
    } else {
      setWelcomeVisible(true);
    }
  }, [currentUser]);

  useEffect(() => {
    const lottieRef = document.getElementById('welcome-lottie');
    lottie.loadAnimation({
      container: lottieRef,
      background: 'white',
      renderer: 'svg',
      autoplay: true,
      loop: true,
      path: 'https://assets2.lottiefiles.com/packages/lf20_47pyyfcf.json',
    });
  }, [isWelcomeVisible]);


  const getComponent = () => {
    if (isWelcomeVisible) {
      return (
        <div className='welcome-msg-container'>
          <div>
            <div>
              <div id='welcome-lottie' className='welcome-lottie-anmiation' />
            </div>
            <h2 className='welcome-msg'>Welcome to crown shopping!</h2>
          </div>
        </div>
      );
    } else if (isShoppingLoaderVisible) {
      return (
        <ShoppingLoader state={isShoppingLoaderVisible} />
      );
    } else {
      return (
        <Fragment>
          <SignIn />
          <SignUp onSingUpSubmit={handleSignUp} />
        </Fragment>
      );
    }  
  };

  return (
    <div className='sign-in-and-sign-up'>
      {getComponent()}
    </div>
  );
};

export default SignInAndSignUpPage;
