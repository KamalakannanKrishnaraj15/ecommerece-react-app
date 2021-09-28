import ShopActionTypes from './shop.types';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils.js';

export const fetchCollectionStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionStart());
    /* To follow the promise pattern use the below code,
      but when the firestore data is updated our UI will also be updated here only when component is re-rendered */
    collectionRef
      .get()
      .then(
        snapshot => {
          const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
          dispatch(fetchCollectionsSuccess(collectionsMap));
        }
      ).catch(error => {
        dispatch(fetchCollectionsFailure(error.message))
      });
  }
};

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});
