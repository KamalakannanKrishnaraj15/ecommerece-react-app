import React, { useState, useEffect } from 'react';
import lottie from 'lottie-web';

import './shopping-loader.styles.scss';

const ShoppingLoader = ({ state }) => {
  const [isShoppingLoaderVisible] = useState(state);

  useEffect(() => {
    const lottieRef = document.getElementById('shopping-loader-lottie');
    lottie.loadAnimation({
      container: lottieRef,
      background: 'white',
      renderer: 'svg',
      autoplay: true,
      loop: true,
      path: 'https://assets5.lottiefiles.com/private_files/lf30_x2lzmtdl.json',
    });
  }, [isShoppingLoaderVisible]);

  return (
    <div className='shopping-loader-container'>
      <div>
        <div id='shopping-loader-lottie' className='shopping-loader-animation' />
      </div>
    </div>
  );
};

export default ShoppingLoader;
