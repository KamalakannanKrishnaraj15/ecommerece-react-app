import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/* For redux-thunk approach */
// import { fetchCollectionsAsync } from '../../redux/shop/shop.actions';
import { fetchCollectionStart } from '../../redux/shop/shop.actions';
import { selectIsFetching } from '../../redux/shop/shop.selectors';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import ShoppingLoader from '../../components/shopping-loader/shopping-loader.component';

class ShopPage extends React.Component {
  /* To follow the observable pattern use the below code to store the ref for onSnapShot() from firestore */
  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    /* For redux-thunk approach */
    // const { fetchCollectionsAsync } = this.props;
    // fetchCollectionsAsync();

    /* For redux-sagas approach */
    const { fetchCollectionStart } = this.props;
    fetchCollectionStart();

    /* To follow the observable pattern use the below code when the firestore data is updated our UI will also be updated here */
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   fetchCollectionSuccess(collectionsMap);
    //   this.updateLoaderState();
    // });
  }

  /* To follow the observable pattern use the below code to unsubscribe from onSnapShot from firestore */
  // componentWillUnmount() {
  //   this.unsubscribeFromSnapshot();
  // }

  render() {
    const { match, showLoader } = this.props;
    if (showLoader) {
      return (<ShoppingLoader isShoppingLoaderVisible={showLoader} />);
    }
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  showLoader: selectIsFetching,
});

/* For redux-thunk approach */
// const mapDispatchToProps = (dispatch) => ({
//   fetchCollectionsAsync: () => dispatch(fetchCollectionsAsync()),
// });

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
