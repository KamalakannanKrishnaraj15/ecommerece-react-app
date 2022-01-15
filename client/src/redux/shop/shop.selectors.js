import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections,
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collection => collection ? Object.keys(collection).map(key => collection[key]) : []
);

export const selectCollection = collectionUrlParam => createSelector(
  [selectCollections],
  /* to see no results replace collection[collectionUrlParam] with null */
  collection => collection ? collection[collectionUrlParam] : null
);

export const selectIsFetching = createSelector(
  [selectShop],
  shop => shop.isFetching,
);
