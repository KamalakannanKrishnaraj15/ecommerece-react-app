import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({ children, customClassName, ...otherProps }) => (
  <button
    className={`custom-button ${customClassName}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
