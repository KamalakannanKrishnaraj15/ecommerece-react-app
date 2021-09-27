import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils.js';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import ShoppingLoader from '../../components/shopping-loader/shopping-loader.component';

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoader: false,
    };

    this.unsubscribeFromSnapshot = null;
  }

  updateLoaderState = () => {
    this.setState({
      showLoader: !this.state.showLoader,
    });
  }

  componentDidMount() {
    const { updateCollections } = this.props;
    this.updateLoaderState();
    const collectionRef = firestore.collection('collections');
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.updateLoaderState();
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { match } = this.props;
    const { showLoader } = this.state;
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

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
