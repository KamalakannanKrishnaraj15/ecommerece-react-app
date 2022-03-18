import React, { Component } from 'react';
import styled from 'styled-components';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

const SignUpContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  text-align: center;

  @media screen and (min-width: 768px) {
    width: 440px;
  }
`;

const SignUpTitle = styled.h2`
  margin: 10px 0;
`;

const SignUpInputError = styled.div`
  color: red;
  margin: 0 0 30px;
  text-align: left;
`;
class SingUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPasswordMismatch: false,
    };
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        showPasswordMismatch: true,
      });
      return;
    }

    this.props.onSingUpSubmit(true);

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }, () => {
        this.props.onSingUpSubmit(false);
      });
    } catch(error) {
      this.props.onSingUpSubmit(false);
      console.log(error);
    }
  }

  render() {
    const {
        displayName,
        email,
        password,
        confirmPassword,
        showPasswordMismatch
      } = this.state;
    return (
      <SignUpContainer>
        <SignUpTitle>Sign up</SignUpTitle>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='displayName'
            type='text'
            handleChange={this.handleChange}
            value={displayName}
            label='Display Name'
            required
          />
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={email}
            label='Email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            handleChange={this.handleChange}
            label='Confirm password'
            required
          />
          {showPasswordMismatch && (<SignUpInputError>Password doesn't match</SignUpInputError>)}
        </form>
        <CustomButton type='submit' onClick={this.handleSubmit}>Sign Up</CustomButton>
      </SignUpContainer>
    );
  }
}

export default SingUp;
