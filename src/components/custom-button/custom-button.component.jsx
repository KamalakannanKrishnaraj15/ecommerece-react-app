import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({ children, isGoogleSingIn, ...otherProps }) => (
  <button
    className={`custom-button ${isGoogleSingIn ? `google-sign-in` : ``}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
