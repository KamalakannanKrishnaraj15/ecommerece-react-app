import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 12px;

  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
`;

export const Options = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Option = styled(Link)`
  margin: 0 7.5px;
  padding: 10px 0;
  cursor: pointer;
`;
