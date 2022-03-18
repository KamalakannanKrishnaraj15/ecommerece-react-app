import styled from 'styled-components';

export const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  @media screen and (min-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 25px;

  @media screen and (min-width: 768px) {
    font-size: 28px;
    margin-bottom: 25px;
  }
`;

export const Preview = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
