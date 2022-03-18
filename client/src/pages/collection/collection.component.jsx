import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0 auto 15px;
`;

const Items = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const CollectionPage = ({ collection }) => {
  useEffect(() => {
    const noResultsElementRef = document.getElementById('no-results-lottie');
    lottie.loadAnimation({
      container: noResultsElementRef,
      background: 'white',
      renderer: 'svg',
      autoplay: true,
      loop: true,
      path: 'https://assets7.lottiefiles.com/packages/lf20_sosleqza.json',
    });
  }, [collection]);

  if (!!collection) {
    const { title, items } = collection;
    return (
      <CollectionPageContainer>
        <Title>{title}</Title>
        <Items>
          {items.map(item => (
            <CollectionItem key={item.id} item={item} />)
          )}
        </Items>
      </CollectionPageContainer>
    );
  }
  return (
    <div className='shopping-loader-container'>
      <div id='no-results-lottie' className='shopping-loader-animation' />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state) /* function currying approach */
});

export default connect(mapStateToProps)(CollectionPage);
