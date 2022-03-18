import React from 'react';
import { connect } from 'react-redux';

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  CollectionImage,
  NameContainer,
  PriceContainer
} from './collection-item.styles.jsx';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItem }) => {
  const { imageUrl, name, price } = item;
  return (
    <CollectionItemContainer>
      <CollectionImage imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton
        customClassName='inverted'
        onClick={() => addItem(item)}
      >
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});


export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);
