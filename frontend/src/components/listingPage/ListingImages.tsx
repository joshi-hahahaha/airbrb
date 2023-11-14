import React from 'react';
import { ListingHeaderProps } from '../../pages/ListingPage';
import {
  listingImageContainer,
  listingImageContainerChild,
  thumbnail,
} from '../../styles/imageStyles';

export const ListingImage: React.FC<ListingHeaderProps> = ({ listing }) => {
  console.log(listing);
  return (
    <div style={listingImageContainer}>
      <div style={listingImageContainerChild}>
        <img src={listing.thumbnail} alt='Thumbnail' style={thumbnail} />
      </div>
      <div style={listingImageContainerChild}>image list</div>
    </div>
  );
};
