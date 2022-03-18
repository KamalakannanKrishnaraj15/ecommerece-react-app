import React from 'react';
import styled from 'styled-components';

import Directory from '../../components/directory/directory.component';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

export default HomePage;
