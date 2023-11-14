import React from 'react';
import { Listing } from '../../interfaces/listingInterfaces';
import { Typography } from '@mui/material';

interface ListingHeaderProps {
  listing: Listing;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({ listing }) => {
  console.log(listing);
  return (
    <div>
      <div>
        <Typography>{listing.title}</Typography>
      </div>
      <div style={{ display: 'flex' }}>
        <div>rating and reviews</div>
        <div>location</div>
      </div>
    </div>
  );
};

/**
 * 1. Title
 * 2. Rating . no. of reviews --- > location
 */
