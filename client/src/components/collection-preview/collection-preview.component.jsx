import React from 'react';
import { Link } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import { CollectionPreviewContainer, Title, Preview } from './collection-preview.styles.jsx';

const CollectionPreview = ({ title, items }) => (
  <CollectionPreviewContainer>
    <Title>
      <Link to={`/shop/${title.toLowerCase()}`}>{title.toUpperCase()}</Link>
    </Title>
    <Preview>
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </Preview>
  </CollectionPreviewContainer>
);

export default CollectionPreview;
