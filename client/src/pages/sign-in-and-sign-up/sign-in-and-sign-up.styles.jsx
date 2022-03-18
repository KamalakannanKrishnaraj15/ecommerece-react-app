import styled from 'styled-components';

export const SignInAndSingUp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const WelcomeMsgContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: calc(100vh - 180px);
  width: 100%;
  text-align: center;
`;

export const WelcomeLottieAnimationWrapper = styled.div`
  width: 300px;
  height: 300px;
  margin-bottom: 30px;
`;

export const ContinueShoppingMsg = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const ContinueShoppingAnimationWrapper = styled.div`
  margin-top: 8px;
  margin-left: -5px;
  width: 24px;
  height: 40px;
`;