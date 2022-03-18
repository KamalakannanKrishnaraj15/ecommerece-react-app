import React, { useState, useEffect } from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components';

const ShoppingLoaderContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: calc(100vh - 180px);
  width: 100%;
`;

const ShoppingLoaderAnimationWrapper = styled.div`
  width: 300px;
  height: 300px;
  margin-bottom: 30px;
`;

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
    <ShoppingLoaderContainer>
      <div>
        <ShoppingLoaderAnimationWrapper id='shopping-loader-lottie' />
      </div>
    </ShoppingLoaderContainer>
  );
};

export default ShoppingLoader;
