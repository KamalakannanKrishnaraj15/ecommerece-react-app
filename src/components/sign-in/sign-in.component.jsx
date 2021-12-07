import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';
import { ReactComponent as GoogleLogo } from '../../assets/google-icon.svg';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.onSingInSubmit(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);

      this.setState({
        email: '',
        password: ''
      }, () => {
        this.props.onSingInSubmit(false);
      });
    } catch (error) {
      this.props.onSingInSubmit(false);
      console.log(error);
    }
  };

  handleSocialHandle = () => {
    this.props.onSingInSubmit(true);
    signInWithGoogle(this.props.onSingInSubmit(false));
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className='sign-in'>
        <h2 className='title'>Sign in</h2>
        <form onSubmit={this.handleSubmit}>
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
          <div className="buttons">
            <CustomButton type='submit'> Sign in </CustomButton>
            <CustomButton
              type="button"
              onClick={this.handleSocialHandle}
              customClassName='google-sign-in'
            >
              <GoogleLogo className="google-sign-in-icon" />
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
