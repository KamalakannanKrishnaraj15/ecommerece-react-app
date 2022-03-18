import styled from 'styled-components';

import { ReactComponent as GoogleLogo } from '../../assets/google-icon.svg';
import CustomButton from '../custom-button/custom-button.component';

export const SignInContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  text-align: center;

  @media screen and (min-width: 768px) {
    width: 440px;
  }
`;

export const SignInTitle = styled.h2`
  margin: 10px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const GoogleIconContainer = styled(GoogleLogo)`
  height: 32px;
`;

export const GoogleSignIn = styled(CustomButton)`
  background-color: whitesmoke;
  color: white;
  padding: 8px 10px;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;