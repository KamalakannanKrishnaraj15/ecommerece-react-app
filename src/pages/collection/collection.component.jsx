import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

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
      <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
          {items.map(item => (
            <CollectionItem key={item.id} item={item} />)
          )}
        </div>
      </div>
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
