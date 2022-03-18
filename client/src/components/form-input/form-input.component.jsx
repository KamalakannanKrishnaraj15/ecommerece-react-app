import React, { useState } from 'react';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
  FormInputPasswordIconContainer
} from './form-input.styles.jsx';
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
      <GroupContainer>
        <FormInputContainer
          onChange={handleChange}
          type={type}
          {...otherProps}
        />
        {label ? (
          <FormInputLabel
            className={`${
              otherProps.value.length ? 'shrink' : ''
            }`}
          >
            {label}
          </FormInputLabel>
        ) : null}
      </GroupContainer>
    );
  }

  return (
    <GroupContainer>
      <FormInputContainer
        onChange={handleChange}
        type={isPasswordType ? type : 'text'}
        {...otherProps}
      />
      <FormInputPasswordIconContainer
        onClick={handlePasswordIconClick}>
        {
          isPasswordType
          ? (<PasswordProtected />)
          : (<PasswordUnProtected />)
        }
      </FormInputPasswordIconContainer>
      {label ? (
        <FormInputLabel
          className={`${
            otherProps.value.length ? 'shrink' : ''
          }`}
        >
          {label}
        </FormInputLabel>
      ) : null}
    </GroupContainer>
  );
}

export default FormInput;
