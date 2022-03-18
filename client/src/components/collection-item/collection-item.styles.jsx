import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export const CollectionItemContainer = styled.div`
  width: 42vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  margin-bottom: 40px;

  &:hover {
    .image {
      opacity: 0.8;
    }
    button {
      opacity: 0.85;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media screen and (min-width: 768px) {
    width: 22vw;
    margin-bottom: 0;
    margin-bottom: 40px;
  }
`;

export const CollectionImage = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const AddButton = styled(CustomButton)`
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
  width: 80%;
  font-size: 10px;

  @media screen and (min-width: 896px) {
    font-size: 15px;
  }
`;

export const CollectionFooterContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const NameContainer = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const PriceContainer = styled.div`
  width: 10%;
  text-align: right;
`;