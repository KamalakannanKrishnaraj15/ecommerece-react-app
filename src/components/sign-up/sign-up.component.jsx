import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';


class SingUp extends Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
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
      return;
    }

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
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>Sign up</h2>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='displayName'
            type='text'
            handleChange={this.handleChange}
            value={displayName}
            label='displayName'
            required
          />
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <FormInput
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            handleChange={this.handleChange}
            label='confirm password'
            required
          />
        </form>
        <CustomButton type='submit' onSubmit={this.handleSubmit}>Sign Up</CustomButton>
      </div>
    );
  }
}

export default SingUp;
