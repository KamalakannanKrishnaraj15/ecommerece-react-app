import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';


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
      <div className='sign-up'>
        <h2 className='title'>Sign up</h2>
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
          {showPasswordMismatch && (<div className='signup-input-error'>Password doesn't match</div>)}
        </form>
        <CustomButton type='submit' onClick={this.handleSubmit}>Sign Up</CustomButton>
      </div>
    );
  }
}

export default SingUp;
