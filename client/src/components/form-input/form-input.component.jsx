import React, { useState } from 'react';

import './form-input.styles.scss';
import { ReactComponent as PasswordProtected } from '../../assets/password-protected.svg';
import { ReactComponent as PasswordUnProtected } from '../../assets/password-unprotected.svg';


const FormInput = ({ handleChange, label, type, ...otherProps }) => {
  const [isPasswordType, setPasswordType] = useState(true);

  const handlePasswordIconClick = () => {
    if (isPasswordType) {
      setPasswordType(false);
    } else {
      setPasswordType(true);
    }
  };

  if (type !== 'password') {
    return (
      <div className='group'>
        <input
          className='form-input'
          onChange={handleChange}
          type={type}
          {...otherProps}
        />
        {label ? (
          <label
            className={`${
              otherProps.value.length ? 'shrink' : ''
            } form-input-label`}
          >
            {label}
          </label>
        ) : null}
      </div>
    );
  }

  return (
    <div className='group'>
      <input
        className='form-input'
        onChange={handleChange}
        type={isPasswordType ? type : 'text'}
        {...otherProps}
      />
      <div
        className='form-input-password-icon-container'
        onClick={handlePasswordIconClick}>
        {
          isPasswordType
          ? (<PasswordProtected />)
          : (<PasswordUnProtected />)
        }
      </div>
      {label ? (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}

export default FormInput;
